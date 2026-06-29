#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const inputDir = path.join(rootDir, 'tmp', 'icon-cat-sheets');
const outputDir = path.join(rootDir, 'packages', 'react', 'src', 'assets', 'icons', 'cloud-cat');

const names = [
  '01-hello', '02-next', '03-checklist', '04-search', '05-message', '06-loading', '07-success', '08-warning', '09-empty',
  '10-button', '11-input', '12-table', '13-chart', '14-upload', '15-calendar', '16-settings', '17-user', '18-theme',
  '19-code', '20-package', '21-release', '22-git', '23-test', '24-bug-fix', '25-security', '26-responsive', '27-docs',
];

const minComponentArea = 1000;

function magick(args, options = {}) {
  return execFileSync('magick', args, {
    cwd: rootDir,
    encoding: options.encoding ?? 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  });
}

function identifySize(file) {
  const result = magick(['identify', '-format', '%w %h', file]).trim();
  const [width, height] = result.split(/\s+/).map(Number);
  return { width, height };
}

function nearestCell(component, width, height) {
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const index = row * 3 + col;
      const cx = (col + 0.5) * width / 3;
      const cy = (row + 0.5) * height / 3;
      const distance = (component.cx - cx) ** 2 + (component.cy - cy) ** 2;
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    }
  }

  return best;
}

function parseComponents(sheet) {
  const output = magick([
    sheet,
    '-alpha', 'extract',
    '-threshold', '1%',
    '-define', 'connected-components:verbose=true',
    '-connected-components', '8',
    'null:',
  ]);

  return output
    .split('\n')
    .map((line) => {
      const match = line.match(/^\s*\d+:\s+(\d+)x(\d+)\+(\d+)\+(\d+)\s+([0-9.]+),([0-9.]+)\s+([0-9.eE+-]+)\s+(.+)$/);
      if (!match) return null;
      const [, w, h, x, y, cx, cy, area, color] = match;
      return {
        w: Number(w),
        h: Number(h),
        x: Number(x),
        y: Number(y),
        cx: Number(cx),
        cy: Number(cy),
        area: Number(area),
        color,
      };
    })
    .filter(Boolean);
}

function unionBox(target, component) {
  if (!target) {
    return {
      x1: component.x,
      y1: component.y,
      x2: component.x + component.w,
      y2: component.y + component.h,
    };
  }

  return {
    x1: Math.min(target.x1, component.x),
    y1: Math.min(target.y1, component.y),
    x2: Math.max(target.x2, component.x + component.w),
    y2: Math.max(target.y2, component.y + component.h),
  };
}

function contentCrop(box, width, height) {
  const x1 = Math.max(0, Math.floor(box.x1));
  const y1 = Math.max(0, Math.floor(box.y1));
  const x2 = Math.min(width, Math.ceil(box.x2));
  const y2 = Math.min(height, Math.ceil(box.y2));
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

for (let sheetIndex = 1; sheetIndex <= 3; sheetIndex += 1) {
  const sheet = path.join(inputDir, `icon-cat-sheet-0${sheetIndex}.png`);
  if (!existsSync(sheet)) {
    throw new Error(`Missing ${sheet}`);
  }

  const { width, height } = identifySize(sheet);
  const boxes = Array.from({ length: 9 }, () => null);
  const components = parseComponents(sheet)
    .filter((component) => component.area >= minComponentArea)
    .filter((component) => component.w < width || component.h < height)
    .filter((component) => component.color.includes('srgb(255'));

  for (const component of components) {
    const cell = nearestCell(component, width, height);
    boxes[cell] = unionBox(boxes[cell], component);
  }

  for (let cell = 0; cell < 9; cell += 1) {
    const fallbackW = Math.floor(width / 3);
    const fallbackH = Math.floor(height / 3);
    const fallback = {
      x: (cell % 3) * fallbackW,
      y: Math.floor(cell / 3) * fallbackH,
      w: fallbackW,
      h: fallbackH,
    };
    const crop = boxes[cell] ? contentCrop(boxes[cell], width, height) : fallback;
    mkdirSync(outputDir, { recursive: true });
    const output = path.join(outputDir, `icon-cat-${names[(sheetIndex - 1) * 9 + cell]}.png`);

    magick([
      sheet,
      '-crop', `${crop.w}x${crop.h}+${crop.x}+${crop.y}`,
      '+repage',
      output,
    ], { stdio: 'inherit', encoding: 'buffer' });

    console.log(`Wrote ${output}`);
  }
}

rmSync(inputDir, { recursive: true, force: true });
console.log(`Removed ${inputDir}`);
