// Gera imagens de exemplo (placeholders) para o cliente fictício clients/exemplo.
// Uso: node scripts/placeholders.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const dir = 'clients/exemplo/assets';
mkdirSync(`${dir}/equipe`, { recursive: true });
mkdirSync(`${dir}/galeria`, { recursive: true });

const svg = (w, h, label, hue) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="hsl(${hue},18%,24%)"/><stop offset="1" stop-color="hsl(${hue},14%,10%)"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" fill="hsl(${hue},20%,70%)" font-family="Arial" font-size="${Math.round(Math.min(w, h) / 12)}"
    text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`);

const jobs = [
  ['ambiente.jpg', 1600, 1000, 'Foto do ambiente', 210],
  ['fachada.jpg', 1200, 900, 'Foto da fachada', 30],
  ['sobre.jpg', 1200, 900, 'Foto sobre a barbearia', 200],
  ...[1, 2, 3].map((i) => [`equipe/barbeiro-${i}.jpg`, 720, 880, `Barbeiro ${i}`, 20 + i * 40]),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => [`galeria/corte-${i}.jpg`, 900, 900, `Corte ${i}`, i * 45]),
];
for (const [file, w, h, label, hue] of jobs) {
  await sharp(svg(w, h, label, hue)).jpeg({ quality: 80 }).toFile(`${dir}/${file}`);
}

const logo = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
  <circle cx="300" cy="300" r="300" fill="#0f1216"/>
  <circle cx="300" cy="300" r="270" fill="none" stroke="#C9A23A" stroke-width="8"/>
  <text x="300" y="285" fill="#F2EFE8" font-family="Arial Black, Arial" font-weight="900" font-size="92" text-anchor="middle">EXEMPLO</text>
  <text x="300" y="365" fill="#C9A23A" font-family="Arial" font-size="40" letter-spacing="14" text-anchor="middle">BARBEARIA</text>
</svg>`);
await sharp(logo).png().toFile(`${dir}/logo.png`);
console.log(`${jobs.length + 1} imagens geradas em ${dir}`);
