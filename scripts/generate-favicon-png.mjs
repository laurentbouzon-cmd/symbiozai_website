import sharp from "sharp";
import { readFileSync } from "fs";

const svgBuffer = readFileSync("public/favicon.svg");

// Generate 32x32 icon.png
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile("public/icon.png");

console.log("Generated public/icon.png (32x32)");

// Generate 180x180 apple-icon.png
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile("public/apple-icon.png");

console.log("Generated public/apple-icon.png (180x180)");

// Generate 64x64 favicon.png
await sharp(svgBuffer)
  .resize(64, 64)
  .png()
  .toFile("public/favicon.png");

console.log("Generated public/favicon.png (64x64)");
