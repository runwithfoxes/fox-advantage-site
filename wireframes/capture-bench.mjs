import { chromium } from 'playwright';

const OUT = new URL('../public/bench/', import.meta.url).pathname;
const home = process.env.HOME;

// source HTML file -> output png. Local files for reliability; live URLs used only as "open live" links in the page.
const shots = [
  { src: `${home}/paul-hub/clients/sabre/builds/banner-ads-gallery.html`, out: 'sabre-banner-set.png', full: true },
  { src: `${home}/projects/weatherbys-factbook/index.html`, out: 'weatherbys-factbook.png' },
  { src: `${home}/projects/moloco/ad-engine/output/staging/20260405-021407/preview.html`, out: 'moloco-ad-engine.png' },
  { src: `${home}/projects/triton-retail-ads/demo/index.html`, out: 'triton-toolkit.png' },
  { src: `${home}/projects/brand-measurement-dashboard/operations.html`, out: 'ops-dashboard.png' },
  { src: `${home}/paul-hub/clients/sabre/studio-measurement/studio-measurement.html`, out: 'studio-measurement.png' },
  { src: `${home}/projects/metrics-pyramid/index.html`, out: 'metrics-pyramid.png' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const s of shots) {
  try {
    await page.goto('file://' + s.src, { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
    await page.waitForTimeout(1800); // let fonts/animations/first video frame settle
    const opts = { path: OUT + s.out };
    if (s.full) {
      // cap full-page height so a tall gallery doesn't become a useless ribbon
      opts.fullPage = false;
      await page.setViewportSize({ width: 1600, height: 1400 });
      await page.waitForTimeout(400);
    }
    await page.screenshot(opts);
    console.log('OK   ' + s.out);
  } catch (e) {
    console.log('FAIL ' + s.out + '  ' + e.message);
  }
}

await browser.close();
console.log('done');
