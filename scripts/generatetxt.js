import {readFileSync, writeFileSync} from 'node:fs';
import * as path from 'node:path';
import boxen from 'boxen';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import stringWidth from 'string-width';
import {ui} from '../src/i18n/ui.ts';

const colors = {
  peach: '#fab387',
  mauve: '#cba6f7',
  sky: '#89dceb',
  flamingo: '#f2cdcd',
  yellow: '#f9e2af',
  text: '#cdd6f4',
  maroon: '#eba0ac',
  lavander: '#b4befe',
  rosewater: '#f5e0dc',
  green: '#a6e3a1'
};

const asciiArt = readFileSync(
  path.join(import.meta.dirname, './ascii.txt'),
  'utf8'
);

const startColor = [0xfa, 0xb3, 0x87]; // #fab387
const endColor = [0xcb, 0xa6, 0xf7]; // #cba6f7

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolateColor(start, end, t) {
  return start.map((s, i) => Math.round(lerp(s, end[i], t)));
}

function rgbToAnsi(r, g, b) {
  return `\x1b[38;2;${r};${g};${b}m`;
}

export function combineBoxes(gap, ...boxes) {
  const split = boxes.map(b => b.split('\n'));

  const boxWidths = split.map(lines =>
    Math.max(...lines.map(l => stringWidth(stripAnsi(l))))
  );
  const boxHeights = split.map(lines => lines.length);
  const maxHeight = Math.max(...boxHeights);

  const padLine = (line, target) => {
    const w = stringWidth(stripAnsi(line));
    return w < target ? line + ' '.repeat(target - w) : line;
  };

  const normalized = split.map((lines, i) => {
    const w = boxWidths[i];
    const paddedLines = lines.map(l => padLine(l, w));
    while (paddedLines.length < maxHeight) paddedLines.push(' '.repeat(w));
    return paddedLines;
  });

  const spacer = ' '.repeat(gap);
  const combined = Array.from({length: maxHeight}, (_, y) =>
    normalized.map(box => box[y]).join(spacer)
  ).join('\n');

  return combined;
}

const buildAscii = () => {
  const chunks = [];

  const lines = asciiArt.trimEnd().split('\n');
  const height = lines.length;
  const width = Math.max(...lines.map(l => l.length));

  // Apply diagonal gradient
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const char = lines[y][x] || ' ';
      const t = (x / (width - 1) + y / (height - 1)) / 2; // diagonal blend
      const [r, g, b] = interpolateColor(startColor, endColor, t);
      line += `${rgbToAnsi(r, g, b)}${char}\x1b[0m`;
    }
    chunks.push('   ' + line);
  }

  return chunks.join('\n');
};

const coloredText = (color, text) => {
  return chalk.hex(color)(text);
};

const msg = chalk.bold.hex(colors.peach)(ui.en.description);
const aboutBox = boxen(msg, {
  title: 'About',
  padding: 1,
  margin: 1,
  borderColor: colors.mauve
});

const replaceColors = box => {
  const webpages = {
    Telegram: colors.sky,
    Github: colors.rosewater,
    Monkeytype: colors.yellow,
    Steam: colors.text,
    'Last.fm': colors.maroon,
    Wakatime: colors.lavander,
    LeetCode: colors.yellow
  };

  const reg = /│\s+?((?:\w|\.)+).+?(henmalib\.dev\/.+?)\s/g;

  const results = [...box.matchAll(reg)];

  for (const result of results) {
    const webColor = webpages[result[1]] || colors.peach;

    box = box.replace(result[1], coloredText(webColor, result[1]));
    box = box.replace(result[2], coloredText(colors.peach, result[2]));
  }

  return box;
};

const socials = coloredText(
  colors.mauve,
  replaceColors(
    `
┌─Socials─────┬──────────────────────────┐
│             │                          │
│  Github     │ henmalib.dev/github      │
│  Telegram   │ henmalib.dev/telegram    │
│  Monkeytype │ henmalib.dev/monkeytype  │
│  Steam      │ henmalib.dev/steam       │
│  Last.fm    │ henmalib.dev/lastfm      │
│  Wakatime   │ henmalib.dev/wakatime    │
│  LeetCode   │ henmalib.dev/leetcode    │
│             │                          │
└─────────────┴──────────────────────────┘`
  )
);

const text = [];

text.push('');
text.push(buildAscii());
text.push(combineBoxes(2, aboutBox, socials));
text.push(chalk.bold.hex(colors.flamingo)('   Legend'));
text.push();
text.push(
  [
    coloredText(colors.green, '   $ curl '),
    coloredText(colors.flamingo, 'henmalib.dev'),
    ' '.repeat(5),
    coloredText(colors.mauve, 'This page duh')
  ].join(' ')
);

console.log(text.join('\n'));
writeFileSync(
  path.join(import.meta.dirname, '../dist/index.txt'),
  text.join('\n') + '\n'
);
