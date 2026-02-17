const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Use absolute path to the HTML file
  const htmlPath = path.resolve(__dirname, 'Novo_Nordisk_Trade_Analysis.html');

  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0', // waits for all Chart.js renders to finish
    timeout: 30000
  });

  // Extra wait to ensure fonts load from Google Fonts CDN
  await page.waitForTimeout(2000);

  await page.pdf({
    path: path.resolve(__dirname, 'Novo_Nordisk_Trade_Analysis.pdf'),
    format: 'Letter',
    printBackground: true,   // preserves dark backgrounds, colors
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });

  console.log('✓ PDF saved: Novo_Nordisk_Trade_Analysis.pdf');
  await browser.close();
})();
