import puppeteer from 'puppeteer';
import { resolve } from 'node:path';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const htmlPath = resolve('reports/a11y-report.html');
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

await page.pdf({
  path: 'reports/a11y-report.pdf',
  format: 'A4',
  printBackground: true,
});

await browser.close();
console.log('PDF gerado: reports/a11y-report.pdf');