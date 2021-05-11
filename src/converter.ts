import Vibrant = require('node-vibrant');
import { Palette, CustomColor } from './types';
import { validateCustomColors } from './validation';
//User's ColorList to Hex
//url이 잘못들어온경우
//
class Converter {
  constructor(public customColorList?: CustomColor[]) {
    if (customColorList) {
      if (!validateCustomColors(customColorList)) {
        throw new Error('CustomColor should be "#ffffff" form.');
      }
    }
    this.customColorList = customColorList;
  }
  private async _getOriginalPalette(url: string): Promise<Palette> {
    const vibrant = Vibrant.from(url);
    const palette = await vibrant.getPalette();

    return {
      vibrant: palette.Vibrant?.hex,
      muted: palette.Muted?.hex,
      darkVibrant: palette.DarkVibrant?.hex,
      darkMuted: palette.DarkMuted?.hex,
      lightVibrant: palette.LightVibrant?.hex,
      lightMuted: palette.LightMuted?.hex,
    };
  }
  private _compareColors(originalColors: string) {
    originalColors = originalColors.slice(1);
    const numOriginalColor: number = parseInt(originalColors, 16);
    const numCustomColorList: number[] = this.customColorList!.map((customColor) => {
      return parseInt(customColor, 16);
    });
    const differences: number[] = numCustomColorList.map((customColor) => {
      return Math.abs(numOriginalColor - customColor);
    });
    const minDiff: number = Math.min(...differences);
    return this.customColorList![differences.indexOf(minDiff)];
  }
  public async convert(url: string): Promise<Palette> {
    const originalPalette = await this._getOriginalPalette(url);
    if (!this.customColorList) {
      return originalPalette;
    }
    const originalColors: string[] = Object.values(originalPalette);
    const convertedColors: string[] = originalColors.map((color: string) => {
      return this._compareColors(color);
    });
    return {
      vibrant: convertedColors[0],
      muted: convertedColors[1],
      darkVibrant: convertedColors[2],
      darkMuted: convertedColors[3],
      lightVibrant: convertedColors[4],
      lightMuted: convertedColors[5],
    };
  }
}

export default Converter;
