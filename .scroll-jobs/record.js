const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const url = process.argv[2];
const slug = process.argv[3];
const duration = parseInt(process.argv[4] || '30', 10);

if (!url || !slug) {
    console.error('Usage: node record.js <url> <slug> [duration_seconds]');
    process.exit(1);
}

const OUT_DIR = path.join(__dirname, '..');

(async () => {
    const framesDir = path.join(__dirname, `frames-${slug}`);
    if (fs.existsSync(framesDir)) fs.rmSync(framesDir, { recursive: true });
    fs.mkdirSync(framesDir);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    console.log(`Loading ${url} ...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    // Attempt to dismiss common cookie banners by clicking any element matching accept-y text
    const bannerClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
        const target = buttons.find(b => {
            const t = (b.innerText || b.textContent || '').trim().toLowerCase();
            return /^(accept all|accept|agree|got it|ok|i agree|allow all)$/i.test(t);
        });
        if (target) { target.click(); return true; }
        return false;
    });
    if (bannerClicked) {
        console.log('Dismissed cookie/consent banner.');
        await new Promise(r => setTimeout(r, 1000));
    }

    // Trigger lazy loads: scroll to bottom in chunks then back to top
    await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 60));
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 500));
        window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 1500));

    await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .quote-block, .four-ps').forEach(el => {
            el.classList.add('visible');
        });
    });

    await new Promise(r => setTimeout(r, 500));

    const totalHeight = await page.evaluate(() =>
        Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight
    );
    const fps = 30;
    const totalFrames = fps * duration;

    console.log(`Slug: ${slug}  Height: ${totalHeight}px  Duration: ${duration}s  Frames: ${totalFrames}`);

    for (let i = 0; i < totalFrames; i++) {
        const t = i / (totalFrames - 1);
        const eased = t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const scrollY = Math.round(eased * totalHeight);

        await page.evaluate((y) => {
            document.documentElement.scrollTop = y;
            document.body.scrollTop = y;
            window.scrollTo(0, y);
        }, scrollY);

        await new Promise(r => setTimeout(r, 5));

        const framePath = path.join(framesDir, `frame_${String(i).padStart(5, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });

        if (i % 150 === 0) console.log(`  ${Math.round(i/totalFrames*100)}%`);
    }

    console.log('  100%');
    await browser.close();

    const outputPath = path.join(OUT_DIR, `${slug}-scroll.mp4`);
    execSync(`ffmpeg -y -framerate ${fps} -i "${framesDir}/frame_%05d.png" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -vf "scale=2880:1800" "${outputPath}"`, { stdio: 'inherit' });

    console.log(`Done: ${outputPath}`);
    fs.rmSync(framesDir, { recursive: true });
})();
