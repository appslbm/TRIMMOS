import type { ImageMetadata } from 'astro';
import rawConfig from '@client/site.config';
import { siteSchema, type DayKey, type LinkKey, type SiteConfig } from './schema';

/* ------------------------------------------------------------------ */
/* Configuração validada do cliente atual (variável de ambiente CLIENT) */
/* ------------------------------------------------------------------ */

function load(): SiteConfig {
  const parsed = siteSchema.safeParse(rawConfig);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  • ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Configuração inválida em clients/${import.meta.env.CLIENT_NAME}/site.config.ts:\n${issues}`);
  }
  return parsed.data;
}

export const site = load();

/* ------------------------------------------------------------------ */
/* Imagens do cliente (clients/<cliente>/assets)                      */
/* ------------------------------------------------------------------ */

const assets = import.meta.glob<ImageMetadata>('@client/assets/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

export function asset(name: string): ImageMetadata {
  const key = Object.keys(assets).find((k) => k.endsWith(`/assets/${name}`));
  if (!key) throw new Error(`Imagem "${name}" não encontrada em clients/${import.meta.env.CLIENT_NAME}/assets/`);
  return assets[key];
}

/* ------------------------------------------------------------------ */
/* URLs                                                               */
/* ------------------------------------------------------------------ */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Caminho interno respeitando o `base` (ex.: /TRIMMOS/inicio.html). */
export const path = (p = '') => `${base}/${p.replace(/^\//, '')}`;

/** URL absoluta (para canonical, Open Graph e dados estruturados). */
export const absolute = (p = '') => new URL(path(p), import.meta.env.SITE ?? site.deploy.site).href;

const { location: loc, contact, reviews } = site;
const placeId = loc.googlePlaceId;
const addressQuery = encodeURIComponent(`${site.business.name}, ${loc.street}, ${loc.city} - ${loc.state}`);

export const links = {
  booking: site.booking.url,
  whatsapp: `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`,
  phone: `tel:+${contact.whatsappNumber}`,
  instagram: contact.instagramUrl,
  maps: placeId
    ? `https://www.google.com/maps/search/?api=1&query=${addressQuery}&query_place_id=${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
  directions: placeId
    ? `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}&destination_place_id=${placeId}`
    : `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`,
  // Abre direto nas avaliações: no desktop, a busca do Google com o painel de avaliações; no celular,
  // o visualizador de avaliações. (O antigo maps/place/?q=place_id:... não abre a ficha no app do Maps.)
  reviews:
    reviews.url ?? (placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : undefined),
  writeReview:
    reviews.writeUrl ?? (placeId ? `https://search.google.com/local/writereview?placeid=${placeId}` : undefined),
  site: path('inicio.html'),
};

/** Botões disponíveis na página de links. */
export const linkMeta: Record<LinkKey, { label: string; icon: string; href?: string; external: boolean }> = {
  booking: { label: site.booking.label, icon: 'calendar', href: links.booking, external: true },
  whatsapp: { label: 'WhatsApp', icon: 'whatsapp', href: links.whatsapp, external: true },
  instagram: { label: 'Instagram', icon: 'instagram', href: links.instagram, external: true },
  directions: { label: 'Como chegar', icon: 'pin', href: links.directions, external: true },
  site: { label: 'Conheça a barbearia', icon: 'scissors', href: links.site, external: false },
  reviews: { label: 'Avaliações no Google', icon: 'star', href: links.reviews, external: true },
  phone: { label: 'Ligar', icon: 'phone', href: links.phone, external: false },
};

/* ------------------------------------------------------------------ */
/* Formatação                                                          */
/* ------------------------------------------------------------------ */

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 5 → "5,0" */
export const formatRating = (value: number) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Nota exibida no topo do site (a primeira da lista). */
export const primaryRating = site.reviews.ratings[0];

export const formatPrice = (price: number | null) => (price === null ? 'Sob consulta' : brl.format(price));

/** 30 → "30min", 60 → "1h", 90 → "1h 30min" */
export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m}min`;
  return m ? `${h}h ${m}min` : `${h}h`;
}

/** Telefone que não quebra linha no meio (espaço e hífen inseparáveis). */
export const phoneNoBreak = contact.phoneDisplay.replace(/ /g, '\u00A0').replace(/-/g, '\u2011');

export const fullAddress = `${loc.street} – ${loc.neighborhood}, ${loc.city} – ${loc.state}, ${loc.postalCode}`;

/* ------------------------------------------------------------------ */
/* Horários                                                            */
/* ------------------------------------------------------------------ */

export const dayOrder: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const dayNames: Record<DayKey, string> = {
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
  sun: 'Domingo',
};
const dayShort: Record<DayKey, string> = { mon: 'Seg', tue: 'Ter', wed: 'Qua', thu: 'Qui', fri: 'Sex', sat: 'Sáb', sun: 'Dom' };

/** "09:00" → "9h", "13:30" → "13h30" */
export const formatTime = (t: string) => {
  const [h, m] = t.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
};

/** Texto de um dia: "9h–12h · 13h–18h", "Fechado" ou "A confirmar". */
export function formatDay(intervals: [string, string][] | null) {
  if (intervals === null) return 'A confirmar';
  if (!intervals.length) return 'Fechado';
  return intervals.map(([a, b]) => `${formatTime(a)}–${formatTime(b)}`).join(' · ');
}

/** Agrupa dias consecutivos com o mesmo horário: [{ label: "Seg a Sex", value: "9h–12h · 13h–18h" }, ...] */
export function hoursSummary() {
  const groups: { days: DayKey[]; value: string }[] = [];
  for (const d of dayOrder) {
    const value = formatDay(site.hours.week[d]);
    const last = groups.at(-1);
    if (last && last.value === value) last.days.push(d);
    else groups.push({ days: [d], value });
  }
  return groups.map((g) => ({
    label:
      g.days.length === 1
        ? dayNames[g.days[0]]
        : g.days.length === 2
          ? `${dayShort[g.days[0]]} e ${dayShort[g.days[1]]}`
          : `${dayShort[g.days[0]]} a ${dayShort[g.days.at(-1)!]}`,
    value: g.value,
    closed: g.value === 'Fechado',
  }));
}

/** Resumo curto de uma linha, ex.: "Seg a Sex, 9h–18h". Usa abertura/fechamento extremos. */
export function hoursOneLine() {
  return hoursSummary()
    .filter((g) => !g.closed && g.value !== 'A confirmar')
    .map((g) => {
      const parts = g.value.split(' · ');
      const open = parts[0].split('–')[0];
      const close = parts.at(-1)!.split('–')[1];
      return `${g.label}, ${open}–${close}`;
    })
    .join(' · ');
}

/** Dados mínimos para o script "aberto agora" (executado no navegador). */
export const hoursData = JSON.stringify({ tz: site.hours.timezone, week: site.hours.week });

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export const allServices = site.services.categories.flatMap((c) => c.items);
export const featuredServices = allServices.filter((s) => s.featured);

const prices = allServices.map((s) => s.price).filter((p): p is number => p !== null);
export const priceRange = prices.length ? `${brl.format(Math.min(...prices))} – ${brl.format(Math.max(...prices))}` : undefined;
