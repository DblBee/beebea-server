// import { TinyColor, random } from '@ctrl/tinycolor';
import axios from 'axios';
import * as fs from 'fs';
import path from 'path';
import colorPaletteJson from './color-palettes.json';

// const tc = new TinyColor('#FCB934');

// const colors = tc.analogous();

// let i = 0;
// while (i < 5) {
//   const randomColor = random({ hue: colors[0].toHex() });
//   console.log({
//     hex: `#${randomColor.toHex()}`,
//   });
//   i++;
// }

// colors.forEach((color) => {
//   console.log({
//     hex: `#${color.complement().toHex()}`,
//   });
// });

const colorPalettes: any[] = [];

let paletteArray: any[] = [];
const palettes: any = colorPaletteJson.data.palettes;

colorPaletteJson.data.colors.forEach((colorName) => {
  const colorWithPalette: any = palettes[colorName];
  const paletteKeys = Object.keys(colorWithPalette);
  paletteKeys.forEach((paletteKey) => {
    paletteArray = paletteArray.concat(colorWithPalette[paletteKey]);
  });
});

paletteArray.forEach((palette) => {
  if (palette.length > 3) {
    const colorPalette = {
      primary: `#${palette[0]}`,
      secondary: `#${palette[1]}`,
      accent: `#${palette[2]}`,
      highlight: `#${palette[3]}`,
    };
    if (colorPalettes.includes(colorPalette)) {
      console.log('found palette', colorPalette);
      throw new Error('Found Palette');
    }
    colorPalettes.push(colorPalette);
  }
});

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let i = 0;

const getColorPaletteFromAPI = async (nextId = 'B07gp8c93sH') => {
  const apiUrl = `https://colors.dopely.top/api/palettes/${nextId}/`;
  const res = await axios(apiUrl);
  if (res.data.colors.length > 3) {
    const colorPalette = {
      primary: res.data.colors[0].hexadecimal,
      secondary: res.data.colors[1].hexadecimal,
      accent: res.data.colors[2].hexadecimal,
      highlight: res.data.colors[3].hexadecimal,
    };
    if (colorPalettes.includes(colorPalette)) {
      console.log('found palette', colorPalette);
      throw new Error('Found Palette');
    }
    colorPalettes.push(colorPalette);
  }
  i++;
  if (i <= 50) {
    await sleep(200);
    await getColorPaletteFromAPI(res.data.next);
  }
};

// getColorPaletteFromAPI().then(() => {
//   console.log(colorPalettes.length);
//   console.log(colorPalettes);
// });

const textColors: any[] = [];
const textColorHexs: any[] = [];

type textColorType = {
  text_color_name: any;
  text_color: any;
  background_color_name: any;
  background_color: any;
};

const getTextColorsFromApi = async (pageNumber = 1) => {
  const apiUrl = `https://colors.dopely.top/api/text_colors/?page=${pageNumber}`;
  const res = await axios(apiUrl);
  res.data.results.forEach((textColor: textColorType) => {
    const textColorDef = {
      name: textColor.text_color_name,
      hex: textColor.text_color,
    };
    if (!textColorHexs.includes(textColorDef.hex)) {
      textColors.push(textColorDef);
      textColorHexs.push(textColorDef.hex);
    }
    const bgColorDef = {
      name: textColor.background_color_name,
      hex: textColor.background_color,
    };
    if (!textColorHexs.includes(bgColorDef.hex)) {
      textColors.push(bgColorDef);
      textColorHexs.push(bgColorDef.hex);
    }
  });
};

const promises: Promise<void>[] = [];

for (let i = 1; i <= 750; i++) {
  promises.push(getTextColorsFromApi(i));
}

Promise.all(promises)
  .then(() => {
    const textColorPath = `trait_tools/textColors.json`;
    fs.writeFileSync(textColorPath, JSON.stringify(textColors));
  })
  .catch((err) => {
    console.log(err);
  });
