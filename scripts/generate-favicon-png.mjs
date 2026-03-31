import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const svgBuffer = readFileSync("public/favicon.svg");

// Generate all PNG sizes from the SVG
const sizes = [
  { size: 16, output: null },          // for .ico only
  { size: 32, output: "public/icon.png" },
  { size: 48, output: null },          // for .ico only
  { size: 64, output: "public/favicon.png" },
  { size: 180, output: "public/apple-icon.png" },
  { size: 192, output: "public/icon-192.png" },
  { size: 512, output: "public/icon-512.png" },
];

const pngBuffers = {};

for (const { size, output } of sizes) {
  const buf = await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toBuffer();

  pngBuffers[size] = buf;

  if (output) {
    await sharp(buf).toFile(output);
    console.log(`Generated ${output} (${size}x${size})`);
  }
}

// Generate favicon.ico (multi-resolution: 16x16, 32x32, 48x48)
// ICO format: https://en.wikipedia.org/wiki/ICO_(file_format)
function createIco(pngBuffersMap) {
  const icoSizes = [16, 32, 48];
  const images = icoSizes.map(s => pngBuffersMap[s]);
  const numImages = images.length;

  // ICO header: 6 bytes
  // ICO directory entries: 16 bytes each
  // Then PNG data for each image
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  let dataOffset = headerSize + dirSize;

  // Calculate total size
  let totalSize = dataOffset;
  for (const img of images) {
    totalSize += img.length;
  }

  const ico = Buffer.alloc(totalSize);

  // ICO header
  ico.writeUInt16LE(0, 0);           // Reserved
  ico.writeUInt16LE(1, 2);           // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4);   // Number of images

  // Directory entries
  let currentOffset = dataOffset;
  for (let i = 0; i < numImages; i++) {
    const size = icoSizes[i];
    const imgData = images[i];
    const entryOffset = headerSize + (i * dirEntrySize);

    ico.writeUInt8(size === 256 ? 0 : size, entryOffset);      // Width
    ico.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);  // Height
    ico.writeUInt8(0, entryOffset + 2);                          // Color palette
    ico.writeUInt8(0, entryOffset + 3);                          // Reserved
    ico.writeUInt16LE(1, entryOffset + 4);                       // Color planes
    ico.writeUInt16LE(32, entryOffset + 6);                      // Bits per pixel
    ico.writeUInt32LE(imgData.length, entryOffset + 8);          // Image data size
    ico.writeUInt32LE(currentOffset, entryOffset + 12);          // Image data offset

    imgData.copy(ico, currentOffset);
    currentOffset += imgData.length;
  }

  return ico;
}

const icoBuffer = createIco(pngBuffers);
writeFileSync("public/favicon.ico", icoBuffer);
console.log("Generated public/favicon.ico (16x16, 32x32, 48x48)");

console.log("\nAll favicon assets generated successfully.");
