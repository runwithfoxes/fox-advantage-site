#!/usr/bin/env python3
"""A headless Chrome screenshot that actually terminates.

    python3 scripts/shot.py <url> <out.png> [width] [height] [wait-seconds]

Three things in here are scars, and every one of them cost real time on 25 Jul 2026.

⛔ ALWAYS PASS --user-data-dir. Without it Chrome attaches to Paul's REAL browser profile.
   It took his Chrome down twice in one evening and left the profile locked so it would
   not reopen at all. And never pkill on "Google Chrome": any pattern must include
   --headless, or it kills his browser and looks like a crash from his side.

⭐ CHROME WRITES --screenshot AND THEN DOES NOT EXIT. Waiting on the process is the bug,
   and it reads exactly like slowness rather than like a hang. Poll for the FILE, wait for
   its size to settle, then kill the process group.

⛔ WE KILL IT WITH SIGKILL, so it never clears its own singleton lock. Reusing a profile
   afterwards fails instantly and silently, which reads exactly like a page that would not
   render. Clear the locks first.
"""
import os
import pathlib
import signal
import subprocess
import sys
import tempfile
import time

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def shot(url, out, width=1400, height=2600, wait=3.0, profile=None,
         reduced=False) -> bool:
    out = pathlib.Path(out)
    if out.exists():
        out.unlink()
    # One profile across a run means a webfont is fetched once and then cached. A fresh
    # profile per shot re-downloads it, the render races the font, and the result is a
    # "difference" that is only ever antialiasing on the glyph edges.
    profile = profile or tempfile.mkdtemp(prefix="rwf-shot-")
    for lock in ("SingletonLock", "SingletonSocket", "SingletonCookie"):
        pathlib.Path(profile, lock).unlink(missing_ok=True)

    args = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
            f"--user-data-dir={profile}",
            f"--window-size={width},{height}",
            f"--virtual-time-budget={int(wait * 1000)}"]
    if reduced:
        args.append("--force-prefers-reduced-motion")
    args += [f"--screenshot={out}", url]
    p = subprocess.Popen(
        args,
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        preexec_fn=os.setsid)

    deadline, size = time.time() + 45, -1
    while time.time() < deadline:
        if out.exists():
            s = out.stat().st_size
            if s > 0 and s == size:
                break
            size = s
        time.sleep(0.35)
    try:
        os.killpg(os.getpgid(p.pid), signal.SIGKILL)
    except ProcessLookupError:
        pass
    return out.exists() and out.stat().st_size > 0


def shot_or_die(url, out, width=1400, height=2600, wait=3.0, tries=3,
                profile=None, reduced=False):
    """Chrome drops a launch now and then. Retry rather than call it a failed render."""
    for n in range(tries):
        if shot(url, out, width, height, wait, profile, reduced):
            return
        print(f"  retry {n + 1} for {url}", file=sys.stderr)
    sys.exit(f"no screenshot written for {url} after {tries} tries")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2:
        sys.exit(__doc__)
    shot_or_die(a[0], a[1],
                int(a[2]) if len(a) > 2 else 1400,
                int(a[3]) if len(a) > 3 else 2600,
                float(a[4]) if len(a) > 4 else 3.0)
