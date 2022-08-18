import * as fs from 'fs';
import path from 'path';
import { getPixels, savePixels } from 'ndarray-pixels';

const pixelArtColors = {
  primary: '80,80,80,255',
  secondary: '120,120,120,255',
  accent: '140,140,140,255',
  highlight: '180,180,180,255',
  complementary: '200,200,200,255',
  polymeric: '220,220,220,255',
  environmental: '240,240,240,255',
  recessive: '255,255,255,255',
  empty: '0,0,0,255',
};

const getPixelsFromImg = async () => {
  const bufferIn = fs.readFileSync(path.join(__dirname, '../src/images/base/BOAT.png'));
  const pixels = await getPixels(bufferIn, 'image/png');
  console.log(pixels);
};

getPixelsFromImg();
