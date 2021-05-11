import { CustomColor } from './types';
export const validateCustomColors = (customColors: CustomColor[]): boolean => {
  customColors.forEach((customColor) => {
    let i = 0;
    for (; i < customColor.length; i++) {
      if (i === 0) {
        if (customColor[i] === '#') {
          continue;
        } else {
          return false;
        }
      } else if (
        customColor[i] === 'a' ||
        'b' ||
        'c' ||
        'd' ||
        'e' ||
        'f' ||
        '0' ||
        '1' ||
        '2' ||
        '3' ||
        '4' ||
        '5' ||
        '6' ||
        '7' ||
        '8' ||
        '9'
      ) {
        continue;
      } else {
        return false;
      }
    }
  });
  return true;
};
