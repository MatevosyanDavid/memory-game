const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function generateScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Generate desktop screenshot
  const desktopHtmlPath = path.join(__dirname, '../public/screenshots/desktop.html');
  const desktopPngPath = path.join(__dirname, '../public/screenshots/desktop.png');

  await page.goto(`file://${desktopHtmlPath}`);
  await page.setViewport({ width: 1280, height: 800 });
  await page.screenshot({ path: desktopPngPath });

  // Generate mobile screenshot with correct dimensions (750x1334)
  const mobileHtmlPath = path.join(__dirname, '../public/screenshots/mobile.html');
  const tempMobilePath = path.join(__dirname, '../public/screenshots/temp_mobile.png');

  await page.goto(`file://${mobileHtmlPath}`);
  await page.setViewport({ width: 375, height: 667 });
  await page.screenshot({ path: tempMobilePath });

  // Ensure exact dimensions by creating a new image with the exact size
  const mobilePngPath = path.join(__dirname, '../public/screenshots/mobile.png');

  // Use sharp to resize the image to exact dimensions
  await sharp(tempMobilePath).resize(375, 667, { fit: 'fill' }).toFile(mobilePngPath);

  // Remove the temporary file
  fs.unlinkSync(tempMobilePath);

  await browser.close();

  console.log('Screenshots generated successfully!');
  console.log(`Desktop: 1280x800, Mobile: 375x667`);
}

generateScreenshots().catch(console.error);
