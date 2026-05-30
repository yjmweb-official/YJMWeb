import sharp from 'sharp';

async function analyzeLogo() {
  try {
    const { data, info } = await sharp('public/logo.png')
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    console.log(`Analyzing logo.png: ${width}x${height}, channels=${channels}`);

    // Let's count completely transparent pixels (alpha = 0), and check if white is present
    let transparentCount = 0;
    let whiteCount = 0;
    let darkCount = 0;

    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = channels === 4 ? data[idx + 3] : 255;

        if (a === 0) {
          transparentCount++;
        } else {
          // If not transparent, let's check color
          if (r > 240 && g > 240 && b > 240) {
            whiteCount++;
          } else {
            // It's a non-white positive pixel of the logo
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            if (r < 50 && g < 50 && b < 50) {
              darkCount++;
            }
          }
        }
      }
    }

    const totalPixels = width * height;
    console.log(`Total pixels: ${totalPixels}`);
    console.log(`Transparent pixels (alpha=0): ${transparentCount} (${(transparentCount/totalPixels*100).toFixed(1)}%)`);
    console.log(`White/Off-white pixels (RGB > 240): ${whiteCount} (${(whiteCount/totalPixels*100).toFixed(1)}%)`);
    console.log(`Dark pixels (RGB < 50): ${darkCount}`);
    console.log(`Content bounding box (excluding pure white/transparent):`);
    console.log(`  X: [${minX}, ${maxX}] (Width: ${maxX - minX + 1})`);
    console.log(`  Y: [${minY}, ${maxY}] (Height: ${maxY - minY + 1})`);

  } catch (err) {
    console.error('Error analyzing logo:', err);
  }
}

analyzeLogo();
