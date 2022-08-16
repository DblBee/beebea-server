const diacriticsTop = [
  '̀',
  '́',
  '̂',
  '̃',
  '̄',
  '̅',
  '̆',
  '̇',
  '̈',
  '̉',
  '̊',
  '̋',
  '̌',
  '̍',
  '̎',
  '̏',
  '̐',
  '̑',
  '̒',
  '̓',
  '̔',
  '̕',
  '̚',
  '̛',
  '̽',
  '̾',
  '̿',
  '̀',
  '́',
  '͂',
  '̓',
  '̈́',
  '̈́',
  '͆',
  '͊',
  '͋',
  '͌',
  '͐',
  '͑',
  '͒',
  '͗',
  '͘',
  '͛',
  '͝',
  '͝',
  '͠',
  '͡',
];

const diacriticsMiddle = ['̴', '̵', '̶', '̷', '̸'];

const diacriticsBottom = [
  '̖',
  '̗',
  '̘',
  '̙',
  '̜',
  '̝',
  '̞',
  '̟',
  '̠',
  '̡',
  '̢',
  '̣',
  '̤',
  '̥',
  '̦',
  '̧',
  '̨',
  '̩',
  '̪',
  '̫',
  '̬',
  '̭',
  '̮',
  '̯',
  '̰',
  '̱',
  '̲',
  '̳',
  '̹',
  '̺',
  '̻',
  '̼',
  'ͅ',
  '͇',
  '͈',
  '͉',
  '͍',
  '͎',
  '͓',
  '͔',
  '͕',
  '͖',
  '͙',
  '͚',
  '͜',
  '͟',
];

export class CreepifyOptions {
  top!: boolean;
  middle!: boolean;
  bottom!: boolean;
  maxHeight!: number;
  randomization!: number;
}

export class Creepify {
  static encode(
    input: string,
    options: CreepifyOptions = {
      top: true,
      middle: false,
      bottom: true,
      maxHeight: 2,
      randomization: 21,
    },
  ): string {
    let result = '';
    console.log('options', options);
    for (let i = 0; i < input.length; i++) {
      let currentChar = input.charAt(i);
      if (options.middle) {
        currentChar += diacriticsMiddle[Math.floor(Math.random() * diacriticsMiddle.length)];
      }

      if (options.top) {
        const diacriticsTopLength = diacriticsTop.length - 1;
        const howManyTops =
          options.maxHeight - Math.random() * ((options.randomization / 100) * options.maxHeight);
        for (let i = 0; i < howManyTops; i++) {
          currentChar += diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)];
        }
      }

      if (options.bottom) {
        const diacriticsBottomLength = diacriticsBottom.length - 1;
        const howManyBottoms =
          options.maxHeight - Math.random() * ((options.randomization / 100) * options.maxHeight);
        for (let j = 0; j < howManyBottoms; j++) {
          currentChar += diacriticsBottom[Math.floor(Math.random() * diacriticsBottomLength)];
        }
      }

      result += currentChar;
    }

    return result;
  }

  static getHTML(text: string): string {
    let html = '';
    let highSurrogate = 0;
    let codepoint = 0;
    let lastSpaceWasNonBreaking = true;

    for (let i = 0, len = text.length; i < len; i++) {
      const ch = text.charCodeAt(i);

      // line break: add <br>\n
      if (ch == 10 || ch == 13) {
        html += '<br>\n';
        lastSpaceWasNonBreaking = true;

        // space: add alternating space and non-breaking space (U+00A0). Otherwise
        // a series of normal spaces       would collapse to one in the browser
      } else if (ch == 32) {
        if (lastSpaceWasNonBreaking) {
          html += ' ';
          lastSpaceWasNonBreaking = false;
        } else {
          html += '&nbsp;';
          lastSpaceWasNonBreaking = true;
        }

        // Normal character: Decode. Special cases for higher numbers:
        // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
      } else {
        // Character is high surrogate: Remember and continue
        if (ch >= 0xd800 && ch <= 0xdbff) {
          highSurrogate = ch;
          codepoint = 0;

          // last character was high surrogate: Combine with low surrogate
        } else if (highSurrogate > 0) {
          // If char is low surrogate:
          if (ch >= 0xdc00 && ch <= 0xdfff) {
            codepoint = (highSurrogate - 0xd800) * 1024 + (ch - 0xdc00) + 0x10000;
          }
          highSurrogate = 0;

          // no surrogates: Just take the character
        } else {
          codepoint = ch;
        }

        if (codepoint != 0) {
          html += '&#x' + codepoint.toString(16) + ';';
          lastSpaceWasNonBreaking = true;
        }
      }
    }

    return html;
  }
}
