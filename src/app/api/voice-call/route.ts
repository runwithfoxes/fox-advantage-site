export const maxDuration = 30;

interface OutboundCallRequest {
  phone_number: string;
  respondent_id?: string;
  brief_id?: string;
  first_message?: string;
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.VOICE_PROXY_TOKEN;
  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!process.env.ELEVENLABS_API_KEY || !process.env.ELEVENLABS_AGENT_ID) {
    return new Response("ElevenLabs not configured", { status: 503 });
  }

  let body: OutboundCallRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!body.phone_number) {
    return new Response("phone_number required", { status: 400 });
  }

  const phone = body.phone_number.replace(/[^+0-9]/g, "");
  if (phone.length < 8) {
    return new Response("Invalid phone number", { status: 400 });
  }

  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/convai/conversation/phone-call",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: process.env.ELEVENLABS_AGENT_ID,
          customer_phone_number: phone,
          agent_overrides: {
            agent: {
              first_message: "Hello?",
            },
            conversation_config: {
              agent: {
                custom_llm: {
                  extra_body: {
                    respondent_id: body.respondent_id || phone,
                    brief_id: body.brief_id || "ai-research",
                  },
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[voice-call] ElevenLabs error:", response.status, error);
      return new Response(`ElevenLabs error: ${response.status}`, {
        status: 502,
      });
    }

    const result = await response.json();
    return Response.json({
      success: true,
      conversation_id: result.conversation_id,
      phone_number: phone,
    });
  } catch (err) {
    console.error("[voice-call] error:", err);
    return new Response("Failed to initiate call", { status: 500 });
  }
}
