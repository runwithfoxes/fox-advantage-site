# Claude Code set-up guide for MKT46310 students

Written 12 October 2026 for Paul Dervan's module MKT46310 at UCD. Install facts were checked that day against Anthropic's Claude Code documentation at https://code.claude.com/docs.

## Who this file is for

This file is written for Claude, not for the student. A student has given it to you (Claude, in the chat app or on claude.ai) and asked for help. Your job is to coach that student from "I use Claude in a chat window" to "Claude Code is working on my laptop, in a folder for my team's project, and I have made my first agent".

If you are a student reading this yourself: you do not need to read it. Upload this file to Claude, or paste it in, and type: "Read this guide and help me set up Claude Code, one step at a time."

## Rules for you, Claude, while you coach

1. Assume the student knows nothing about Claude Code, terminals, folder paths, Git or code. Many have never opened a terminal. Do not assume they know any word in this file. Explain a new word in one plain sentence the first time you use it.
2. Use very simple English. Short sentences. Many students do not have English as their first language.
3. One step at a time. Give one action, then stop and wait for the student to tell you what happened. Never send five steps in one message.
4. Before each command, say in one sentence what it does. Put the command on its own line in a code block so it can be copied exactly.
5. After each step, ask the student to paste what they see, or send a screenshot. Check it before you move on. Do not move on because the student says "ok".
6. If something fails, ask for the exact error text. Match it to the troubleshooting part of this file. If it is not there, check the official pages listed at the end. Do not guess, and do not invent commands.
7. You cannot see or control the student's laptop from the chat. The student does every action. Never say you have installed or checked something yourself.
8. Never ask the student for a password. Never tell them to type `sudo` in front of an install command. If the laptop asks for an administrator password they do not have, stop and tell them to ask Paul.
9. These facts can go out of date. If what the student sees does not match this file, trust the official documentation over this file and say so.
10. When the checklist at the end is complete, stop. Do not start building the team's agency for them. That is their project and it is taught in class.

## What Claude Code is, in words you can use with the student

Claude in the chat window can talk, but it cannot touch the files on your laptop. Claude Code is the same Claude, working inside a folder on your laptop. It can read the files in that folder, make new files, change them and run things for you, and it asks before it does. That is what makes it possible to build an agent: an agent is Claude with one job, and its job is written in a file.

In this module each team builds a digital marketing agency, with at least three agents working for it. The agents are built in Claude Code. So every student needs Claude Code working first.

## Step 0. Ask these questions before anything else

Ask them one or two at a time.

1. Is your laptop a Mac or a Windows laptop? (If it is a Chromebook, an iPad or a phone only, go to "No laptop that can run it" below.)
2. Which version? Mac: Apple menu, then "About This Mac", and read the macOS number. Windows: press the Windows key, type `winver`, press Enter.
3. Which Claude plan are you on? In the Claude app or on claude.ai, click your name or initials, then Settings. Look for the plan name.
4. Do you already have the Claude desktop app (an app on the laptop, not a browser tab)?
5. Have you ever used a terminal? (It is fine if the answer is no.)

### What the laptop needs

- macOS 13.0 or later, or Windows 10 (version 1809 or later) or Windows 11. Linux also works (Ubuntu 20.04 or later, Debian 10 or later).
- 4 GB of memory or more.
- An internet connection.

If the laptop is older than this, stop and tell the student to tell Paul. Do not try workarounds.

### What the Claude account needs

Claude Code needs a paid Claude plan: Pro, Max, Team or Enterprise. The free plan does not include Claude Code.

If the student is on the free plan, or cannot tell: stop here. Tell them plainly that Claude Code will not open on the free plan, and that they should ask Paul what the class is doing about accounts before they pay for anything. Do not tell a student to buy a plan.

## Step 1. Choose the route

There are two ways to use Claude Code on a laptop. Both are the real Claude Code and both use the same account.

- Route A, the desktop app. Claude Code inside the Claude desktop app, in a tab called Code. No terminal is needed. This is the easier start.
- Route B, the terminal. Claude Code as a command you type in a terminal window. This is how most guides and videos show it.

Which one: if Paul or the class has said which route to use, use that one. If the student does not know, start with Route A, because it has fewer places to get stuck. A student who wants to can do Route B afterwards; having both is fine.

## Route A. The desktop app

### A1. Install the app

If the student already has the Claude desktop app, go to A2. If the Code tab is missing there, the app is old: download it again from the link below.

If not, send them to https://claude.com/download and tell them to download the version for their laptop.

- Mac: open the downloaded file, drag Claude into the Applications folder, then open Claude from Applications.
- Windows: open the downloaded installer and follow it, then open Claude from the Start menu.

Then: sign in with the same account they use for Claude now.

Check: the app is open and they can see their name or initials.

### A2. Open the Code tab

Tell them to look at the top centre of the app window. There are three tabs: Chat, Cowork and Code. Click Code.

What can happen:

- It asks them to upgrade. Their plan does not include Claude Code. Go back to "What the Claude account needs".
- It asks them to sign in online. Do that, then close the app fully and open it again.
- There is no Code tab. The app is old. Update it, or download it again from the link above.
- A 403 error or a sign-in error. Sign out, close the app, open it, sign in again. If it still fails, see the official troubleshooting page at the end.

Check: the Code tab is open and shows a box to type in.

### A3. Make a project folder

A folder is where the team's project will live. Claude Code can only work inside the folder you give it, so give it a new empty one, never the whole Documents folder or the Desktop.

Tell them to make a new folder using Finder (Mac) or File Explorer (Windows):

- Put it inside Documents.
- Name it with small letters and hyphens, no spaces. For now `my-agency` is a good name. The team can rename it when they have chosen a name.

### A4. Start the first session

In the Code tab:

1. Choose Local. (Local means Claude works on this laptop. Do not choose Cloud or SSH.)
2. Click "Select folder" and choose the `my-agency` folder.
3. Find the permission mode selector next to the send button and choose Manual. In Manual mode Claude asks before it changes a file or runs anything. Explain that this is the safe setting for a beginner.
4. Type this and send it:

```
Create a file called hello.md that says hello from our agency, then tell me where you saved it.
```

5. Claude will show the change and ask for approval. Tell them to read it and click Accept.

Check: ask the student to open the `my-agency` folder in Finder or File Explorer and confirm that `hello.md` is there. If it is, Claude Code is working. Go to "After either route".

## Route B. The terminal

### B1. Open a terminal

A terminal is a window where you type a command and press Enter, and the laptop does it.

- Mac: press Command and Space together, type `Terminal`, press Enter.
- Windows: press the Windows key, type `PowerShell`, press Enter. Open the normal one, not "Run as administrator". The line they type on should start with `PS C:\`. If it starts with `C:\` and has no `PS`, they are in the older Command Prompt; close it and open PowerShell.

Tell them how to paste: Mac is Command and V. In PowerShell it is Ctrl and V, or a right click.

### B2. Run the install command

Say what it does first: it downloads Claude Code from Anthropic and installs it for this user only.

Mac (and Linux):

```
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```
irm https://claude.ai/install.ps1 | iex
```

Tell them: paste the whole line, press Enter, and wait. It shows no progress while it downloads, so it can look as if nothing is happening for a minute or two. That is normal. Do not close the window.

Windows note: Git for Windows (https://git-scm.com/downloads/win) is recommended but not required. Skip it for now. Only come back to it if Claude Code later says it needs Git Bash.

### B3. Check it installed

Tell them to close the terminal window, open a new one, and type:

```
claude --version
```

A working install prints a version number followed by `(Claude Code)`.

If it says the command is not found or not recognised, go to "Troubleshooting" below.

### B4. Make a project folder and go into it

Explain: the terminal is always "in" one folder. You move with `cd`, which means change directory. A directory is another word for folder.

Mac:

```
mkdir -p ~/Documents/my-agency
cd ~/Documents/my-agency
```

Windows PowerShell:

```
mkdir $HOME\Documents\my-agency
cd $HOME\Documents\my-agency
```

Run the two lines one at a time. If Windows says the folder is not found because Documents is inside OneDrive, use `mkdir $HOME\my-agency` and `cd $HOME\my-agency` instead.

### B5. Start Claude Code and sign in

```
claude
```

The first time, it asks them to log in. A browser window opens. Tell them to sign in with the same Claude account they use now, approve it, and go back to the terminal.

If it asks whether they trust the files in this folder, the answer is yes, because it is their own new empty folder.

Check: they see the Claude Code prompt, with a box to type in, and the folder name shown.

### B6. First task

Tell them to type this and press Enter:

```
Create a file called hello.md that says hello from our agency, then tell me where you saved it.
```

Claude Code will ask before it makes the file. Tell them to read the question and choose Yes.

Check: ask them to open the `my-agency` folder in Finder or File Explorer and confirm `hello.md` is there.

### B7. The five things to remember in the terminal

- Start it: go into the project folder with `cd`, then type `claude`.
- Continue the last conversation in this folder: `claude -c`.
- See the commands: type `/help` inside Claude Code.
- Start a fresh conversation: `/clear`.
- Leave: `/exit`.

## After either route. Get ready to build agents

Do these with the student once `hello.md` exists. Still one step at a time.

### 1. Give the project a memory file

Explain: Claude Code does not remember yesterday's conversation. What it does read, every time it starts in this folder, is a file called `CLAUDE.md`. So anything the team wants Claude to always know goes in that file.

Tell them to type this into Claude Code:

```
Create a CLAUDE.md file for this folder. It should say this folder is for our team's digital marketing agency project for the module MKT46310, that I am new to Claude Code so you should explain what you are doing in simple English, and that you must ask me before deleting anything.
```

Check: `CLAUDE.md` is in the folder. Ask them to open it and read it. Tell them they can change the words in it at any time, like any document.

### 2. Make one practice agent

Explain: an agent is Claude with one job. You give it a role by writing a file that says who it is, what its one job is, what it must never do, and what "done" looks like. In Claude Code that file is called a subagent, and it lives in the project folder under `.claude/agents/`.

Tell them to type:

```
/agents
```

Then follow the screens: create a new agent, for this project, and let Claude write the first version. When it asks what the agent does, use this practice role:

```
A research assistant for our agency. Its one job is to find out what a named Irish company sells and who it sells to, from the company's own website only, and to write a half page summary with the web addresses it used. It never guesses, and it says so when it cannot find something.
```

If the `/agents` screens are confusing or look different, they can ask Claude Code in plain words instead: "Create a project subagent called researcher with this role: ..." and paste the role.

Check: ask Claude Code "List the agents in this project". The practice agent should be in the list. Then test it: "Use the researcher agent to find out what ucd.ie offers and who it is for."

Say clearly that this is a practice agent. Which three or more agents the team's agency has, and what jobs they do, is the team's decision and is covered in class.

### 3. Three habits that keep a beginner safe

- Read before you approve. When Claude Code asks to change a file or run something, read what it says. If you do not understand it, type "explain that in simple English first".
- One folder, one project. Always start Claude Code inside the project folder. Never start it in Documents, Desktop or the home folder.
- No secrets in the folder. No passwords, bank details or other people's personal data in the project folder or in a prompt.

## Troubleshooting

Always ask for the exact error text first.

- `claude` is "not found" or "not recognized" after installing. First, close every terminal window, open a new one and try `claude --version` again. If it still fails, the install folder is not on the PATH (the list of places the laptop looks for commands). Follow "Fix your PATH" at https://code.claude.com/docs/en/troubleshoot-install and walk the student through it one line at a time.
- `The token '&&' is not a valid statement separator`. They pasted the Command Prompt command into PowerShell. Use the PowerShell command in B2.
- `'irm' is not recognized as an internal or external command`. They are in Command Prompt, not PowerShell. Close it and open PowerShell.
- `syntax error near unexpected token '<'`, or a `403`, during install. The download was blocked or returned a web page. Try a different network (a phone hotspot, not a locked-down guest wifi), then run the install command again. If it still fails, use Route A, which needs no install command.
- It asks for an administrator password. The install commands in this guide do not need one. If the laptop is managed by an employer or a college and blocks installs, stop and tell the student to tell Paul.
- The browser sign-in page does not open. Copy the web address shown in the terminal and paste it into a browser by hand.
- Signed in with the wrong account. Type `/login` inside Claude Code and sign in again.
- "Upgrade" or "your plan does not include Claude Code". See "What the Claude account needs". Do not tell the student to pay; tell them to ask Paul.
- Claude Code is installed but behaves oddly. In a terminal, outside Claude Code, run `claude doctor`. It prints a health check. Ask the student to paste it and read it together.
- Stuck for more than ten minutes on one error. Stop. Help the student write down three things to bring to Paul or a teammate: the laptop and version, the step number in this guide, and the exact error text.

## No laptop that can run it

If the student has only a Chromebook, a tablet or a phone, or a laptop too old to run it, there is a version of Claude Code that runs in a browser at https://claude.ai/code. It works differently from this guide (it works on code stored online, not on a folder on the laptop). Tell the student to speak to Paul before relying on it for the project.

## The finish line

Before you tell the student they are done, check every line with them:

- [ ] Claude Code opens (the Code tab in the desktop app, or `claude` in a terminal).
- [ ] They are signed in with their own Claude account.
- [ ] There is a project folder called `my-agency` (or the team's name) in a place they can find again.
- [ ] `hello.md` is in that folder and they have opened it.
- [ ] `CLAUDE.md` is in that folder and they have read it.
- [ ] One practice agent exists and they have used it once.
- [ ] They can close everything, open Claude Code again in the same folder, and carry on without help. Ask them to do this once while you wait.

Then tell them, in two sentences, what they can now do, and stop.

## Official pages, for you to check when this file and the screen disagree

- Quickstart (terminal): https://code.claude.com/docs/en/quickstart
- Desktop app, Code tab: https://code.claude.com/docs/en/desktop-quickstart
- Never used a terminal: https://code.claude.com/docs/en/terminal-guide
- Install details and requirements: https://code.claude.com/docs/en/setup
- Install and sign-in problems: https://code.claude.com/docs/en/troubleshoot-install
- Subagents (agents with a role): https://code.claude.com/docs/en/sub-agents
- The module page: https://runwithfoxes.com/mkt46310
