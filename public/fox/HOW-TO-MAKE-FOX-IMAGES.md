# How to Make Fox Images for Chapter Pages

## The Short Version

1. Generate a fox pose using SeedReam on Replicate
2. Remove the white background using the Python script below
3. Drop the transparent PNG into `/public/fox/`
4. Add it to the `FOX_POSES` array in `ChapterReader.tsx`

---

## Step 1: Generate with SeedReam

**Model:** bytedance/seedream-4.5 on Replicate
**API:** https://replicate.com/bytedance/seedream-4.5

You can run this through the Replicate web UI or the API.

### Settings

| Setting | Value |
|---------|-------|
| Aspect ratio | 1:1 |
| Num outputs | 1 |
| Guidance scale | 3.5 |
| Style reference image | `bored_fox_no_background.png` from `/fox-ads/product_images/` |

### Prompt Template

Every prompt must follow this structure. Don't deviate from it or the fox changes character.

```
grumpyfox, a grumpy Pixar-style orange fox character with big expressive golden-yellow eyes that are [EYE DESCRIPTION], fluffy orange fur, white chest, [POSE DESCRIPTION], soft contact shadow on the ground beneath him, plain white background, bright even studio lighting, cinematic 3D Pixar animation style
```

### What to change per pose

Only change two bits:
- **Eye description** - what his eyes are doing (half-closed, narrowed, glancing sideways, etc.)
- **Pose description** - what his body is doing (sitting, standing, arms crossed, etc.)

### Prompts that worked well

**Annoyed sitting (arms folded):**
```
...golden-yellow eyes that are half-closed and glancing sideways with suspicious disdain...standing upright with both dark brown mitten paws crossed firmly over his chest, head tilted slightly, bushy tail hanging behind, flat unimpressed mouth...
```

**Bored (chin on paw):**
```
...golden-yellow eyes that are half-lidded and staring directly at viewer with complete and utter boredom...sitting with one dark brown mitten paw propping up his chin, slouched posture, tail curled around his body, mouth set in a flat unimpressed line...
```

**Walking away:**
```
...golden-yellow eyes that are narrowed with dismissive judgement as he looks back over his shoulder...walking away with one dark brown mitten paw mid-stride, tail swishing, head turned back with an expression that says he expected better...
```

**Sitting unimpressed:**
```
...golden-yellow eyes that are half-closed with weary resignation...sitting cross-legged on the ground with dark brown mitten paws resting in his lap, slouched forward slightly, bushy tail wrapped around one side...
```

### Rules (learned the hard way)

- **Always say "plain white background"** - SeedReam defaults to dramatic scenes otherwise
- **Never ask for books or text** - SeedReam can't render text. It'll garble "THE FOX ADVANTAGE" across two pages
- **Never say "dark" or "dramatic" or "moody"** - the fox goes villain mode
- **Never say "orange glow" or "black background"** - same problem
- **Keep prompts under 150 words** - longer prompts get ignored
- **No camera descriptions** - skip "shot from below" type stuff
- **Always include "soft contact shadow on the ground beneath him"** - this gives you a natural shadow to keep after bg removal
- **Always include the style reference image** - without it, you get a different fox entirely
- **Bright warm settings only** - grumpy-cute, not grumpy-evil

### API Details (if using the API)

```
Replicate Token: r8_cG5N3xVoDObCkArR9telsMhDgS9nPwp1Q8PL8
Model version: 8356ab00a2acd0f79338ecf1ffa0e32493c6f7cdfc7178b5cfbdb1461202fdc2
```

The API rate limits aggressively. If you get 503 errors, wait 30 seconds and try again. It usually works on the 3rd or 4th attempt.

---

## Step 2: Remove the White Background

SeedReam always outputs a white background. Our page background is #FAFAF8 (warm off-white), so pure white shows up as a visible box. You need to remove it.

### Python script

Save this anywhere and run it. Needs `Pillow` and `numpy` (`pip install Pillow numpy`).

```python
from PIL import Image
import numpy as np
import os, sys

def remove_white_bg(input_path, output_path, threshold=240):
    """Remove white background, keep shadows as semi-transparent."""
    img = Image.open(input_path).convert('RGBA')
    data = np.array(img)

    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3
    max_rgb = np.maximum(np.maximum(r.astype(float), g.astype(float)), b.astype(float))
    min_rgb = np.minimum(np.minimum(r.astype(float), g.astype(float)), b.astype(float))
    saturation = max_rgb - min_rgb

    # Pure white -> fully transparent
    white_mask = (brightness > threshold) & (saturation < 20)

    # Near-white (shadow zone) -> semi-transparent
    shadow_mask = (brightness > 200) & (brightness <= threshold) & (saturation < 40)

    new_alpha = np.full_like(a, 255)
    new_alpha[white_mask] = 0

    shadow_alpha = ((threshold - brightness[shadow_mask]) / (threshold - 180)) * 255
    shadow_alpha = np.clip(shadow_alpha, 30, 200).astype(np.uint8)
    new_alpha[shadow_mask] = shadow_alpha

    data[:,:,3] = new_alpha
    result = Image.fromarray(data)

    # Resize to 1024x1024 for consistency
    result = result.resize((1024, 1024), Image.LANCZOS)
    result.save(output_path, optimize=True)

    size_kb = os.path.getsize(output_path) / 1024
    print(f'Saved: {output_path} ({size_kb:.0f}KB)')

# Usage:
# python remove_bg.py input.png output-nobg.png
if __name__ == '__main__':
    remove_white_bg(sys.argv[1], sys.argv[2])
```

Run it:
```bash
python remove_bg.py chapter-fox-sitting.png chapter-fox-sitting-nobg.png
```

The `-nobg` suffix is the naming convention. The script:
- Strips pure white pixels to fully transparent
- Fades near-white shadow areas to semi-transparent (so shadows look natural on any background)
- Resizes to 1024x1024
- Outputs should be 700-900KB each

---

## Step 3: Add to the Site

Drop the `-nobg.png` file into `/public/fox/`.

Then open `src/components/ChapterReader.tsx` and add a line to the `FOX_POSES` array:

```tsx
const FOX_POSES = [
  { src: "/fox/annoyed fox no background.png", alt: "Grumpy fox sitting cross-legged" },
  { src: "/fox/chapter-fox-sitting-nobg.png", alt: "Grumpy fox sitting unimpressed" },
  { src: "/fox/chapter-fox-bored-nobg.png", alt: "Bored fox with chin on paw" },
  { src: "/fox/chapter-fox-arms-folded-nobg.png", alt: "Grumpy fox with arms folded" },
  { src: "/fox/chapter-fox-walking-away-nobg.png", alt: "Fox walking away unimpressed" },
  // Add new ones here:
  // { src: "/fox/chapter-fox-NEW-POSE-nobg.png", alt: "Description" },
];
```

The rotation uses `chapterNumber % FOX_POSES.length`, so adding more poses just spreads them across more chapters automatically.

---

## File Inventory

| File | Status | Notes |
|------|--------|-------|
| `annoyed fox no background.png` | Active | Original SeedReam, bg removed externally |
| `chapter-fox-sitting-nobg.png` | Active | SeedReam, bg removed with script above |
| `chapter-fox-bored-nobg.png` | Active | SeedReam, bg removed with script above |
| `chapter-fox-arms-folded-nobg.png` | Active | SeedReam, bg removed with script above |
| `chapter-fox-walking-away-nobg.png` | Active | SeedReam, bg removed with script above |
| `fox-book.png` | Active | Used in hero section (landing page) |
| `chapter-fox-sitting.png` | Raw | White bg, SeedReam output before removal |
| `chapter-fox-bored.png` | Raw | White bg, SeedReam output before removal |
| `chapter-fox-arms-folded.png` | Raw | White bg, SeedReam output before removal |
| `chapter-fox-walking-away.png` | Raw | White bg, SeedReam output before removal |
| `chapter-fox-reading.png` | Discard | Has garbled book text, don't use |

---

## Pose Ideas for Later

- Facepalm (paw over face, one eye peeking through)
- Yawning (mid-yawn, eyes squeezed shut)
- Tapping foot (arms crossed, one foot tapping impatiently)
- Lying down (sprawled on stomach, chin on ground, zero effort)
- Side-eye (standing, body facing away, head turned with extreme side-eye)
