import sharp from 'sharp';

async function inspect() {
  const images = [
    'src/assets/images/yjmweb_logo_source_1780145948323.png',
    'src/assets/images/yjmweb_tab_icon_1780146247395.png'
  ];

  for (const img of images) {
    try {
      const metadata = await sharp(img).metadata();
      console.log(`Image: ${img}`);
      console.log(`  Width: ${metadata.width}, Height: ${metadata.height}, Format: ${metadata.format}`);
    } catch (e) {
      console.log(`Error reading ${img}:`, e.message);
    }
  }
}

inspect();
