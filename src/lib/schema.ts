import { z } from 'astro/zod';

/**
 * Esquema da configuração de uma barbearia (clients/<cliente>/site.config.ts).
 *
 * O build falha com uma mensagem clara se algum campo obrigatório estiver
 * faltando ou com formato errado — assim um preço vazio ou um link quebrado
 * nunca chega ao ar.
 */

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use o formato HH:MM, ex.: "09:00"');
const interval = z.tuple([time, time]);
/** Lista de intervalos do dia. `[]` = fechado. `null` = horário ainda não confirmado. */
const day = z.array(interval).nullable();
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use cor hexadecimal de 6 dígitos, ex.: "#E08A3C"');
const url = z.url();
/** Nome de arquivo dentro de clients/<cliente>/assets/ */
const asset = z.string().min(1);

const linkKey = z.enum(['booking', 'whatsapp', 'instagram', 'directions', 'site', 'reviews', 'phone']);

export const siteSchema = z.object({
  /** Onde o site será publicado. `base` é a subpasta (GitHub Pages de projeto) ou "" para domínio próprio. */
  deploy: z.object({
    site: url,
    base: z.string().regex(/^(\/[\w.-]+)*$/, 'Use "" ou um caminho como "/TRIMMOS" (sem barra no final)'),
  }),

  business: z.object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    /** Nome anterior do estabelecimento (usado no texto "Sobre" e em SEO). */
    formerName: z.string().optional(),
    tagline: z.string().min(1),
    foundedYear: z.number().int().optional(),
  }),

  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(50).max(170),
    /** Título curto da página de links. */
    linksTitle: z.string().min(1),
  }),

  contact: z.object({
    phoneDisplay: z.string().min(1),
    /** Somente números, com DDI e DDD. Ex.: 5514981054426 */
    whatsappNumber: z.string().regex(/^\d{12,13}$/, 'Somente números com DDI e DDD, ex.: 5514981054426'),
    whatsappMessage: z.string().min(1),
    instagramUrl: url.optional(),
    instagramHandle: z.string().optional(),
  }),

  booking: z.object({
    url,
    label: z.string().default('Agendar horário'),
    /** Nome do sistema externo, mostrado em textos de apoio. */
    provider: z.string().optional(),
  }),

  location: z.object({
    street: z.string().min(1),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
    postalCode: z.string().regex(/^\d{5}-\d{3}$/),
    country: z.string().length(2).default('BR'),
    lat: z.number(),
    lng: z.number(),
    /** Place ID do Google (começa com "ChIJ"). Gera os links de mapa, rota e avaliações. */
    googlePlaceId: z.string().optional(),
    /** URL de incorporação do Google Maps (Compartilhar → Incorporar um mapa → src do iframe). */
    mapEmbedUrl: url.optional(),
    /** Foto da fachada, para o cliente reconhecer o lugar ao chegar. */
    photo: z.object({ src: asset, alt: z.string().min(1) }).optional(),
  }),

  hours: z.object({
    timezone: z.string().default('America/Sao_Paulo'),
    week: z.object({ mon: day, tue: day, wed: day, thu: day, fri: day, sat: day, sun: day }),
    note: z.string().optional(),
  }),

  services: z.object({
    note: z.string().optional(),
    categories: z
      .array(
        z.object({
          name: z.string().min(1),
          items: z
            .array(
              z.object({
                name: z.string().min(1),
                /** Duração em minutos. */
                duration: z.number().int().positive(),
                /** Preço em reais. `null` = "sob consulta" (precisa ser explícito). */
                price: z
                  .number({ error: 'Informe o preço em reais (ex.: 40) ou null para "Sob consulta"' })
                  .nonnegative()
                  .nullable(),
                /** Aparece na lista principal (recomendado: 4 a 6 serviços). */
                featured: z.boolean().default(false),
                description: z.string().optional(),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
  }),

  reviews: z.object({
    /** Notas públicas (ex.: Google 5,0; app de agendamento 10,0). A primeira aparece no topo do site. */
    ratings: z
      .array(
        z.object({
          source: z.string().min(1),
          value: z.number().nonnegative(),
          /** Escala da nota: 5 (Google) ou 10 (alguns apps de agendamento). */
          scale: z.union([z.literal(5), z.literal(10)]).default(5),
          count: z.number().int().positive().optional(),
          url: url.optional(),
          /** Data em que a nota foi consultada (AAAA-MM-DD), para saber quando atualizar. */
          checkedAt: z.string().optional(),
        }),
      )
      .default([]),
    /** Link para ver as avaliações no Google. Se omitido, é gerado a partir do googlePlaceId. */
    url: url.optional(),
    /** Link para o cliente deixar uma avaliação (ex.: link curto g.page/r/... do Perfil da Empresa). */
    writeUrl: url.optional(),
    items: z
      .array(
        z.object({
          author: z.string().min(1),
          text: z.string().min(1),
          rating: z.number().int().min(1).max(5).default(5),
        }),
      )
      .default([]),
  }),

  about: z.object({
    title: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    highlights: z.array(z.object({ title: z.string().min(1), text: z.string().optional() })).default([]),
    photos: z.array(z.object({ src: asset, alt: z.string().min(1) })).default([]),
    video: z
      .object({
        youtubeId: z.string().regex(/^[\w-]{11}$/),
        title: z.string().min(1),
        caption: z.string().optional(),
      })
      .optional(),
  }),

  /** Seção "Equipe" só aparece se houver pelo menos um profissional. */
  team: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().optional(),
        /** Apresentação curta — use apenas informações publicadas/confirmadas pelo profissional. */
        bio: z.string().optional(),
        photo: asset,
        alt: z.string().optional(),
        /** Ponto de foco do recorte da foto (CSS object-position), ex.: "center top". */
        photoPosition: z.string().optional(),
      }),
    )
    .default([]),

  /**
   * Seção "Estilos": cortes que a barbearia faz, com link para a publicação original
   * (ex.: Instagram). Mostra o trabalho sem copiar fotos de clientes para o site.
   */
  showcase: z
    .object({
      title: z.string().min(1),
      intro: z.string().optional(),
      linkLabel: z.string().default('Ver no Instagram'),
      items: z
        .array(
          z.object({
            name: z.string().min(1),
            /** Nome alternativo, ex.: "Americano". */
            alias: z.string().optional(),
            text: z.string().optional(),
            url,
          }),
        )
        .min(1),
    })
    .optional(),

  /**
   * Seção "Galeria" só aparece com pelo menos 4 fotos.
   * Use apenas fotos próprias ou com autorização (clientes precisam autorizar o uso da imagem).
   */
  gallery: z
    .array(
      z.object({
        src: asset,
        alt: z.string().min(1),
        /** Ex.: "Corte", "Barba", "Ambiente", "Equipe". */
        category: z.string().optional(),
      }),
    )
    .default([]),

  finalCta: z
    .object({
      title: z.string().default('Pronto para renovar o visual?'),
      text: z.string().default('Escolha o serviço, o profissional e o horário em menos de um minuto.'),
    })
    .prefault({}),

  images: z.object({
    logo: asset,
    logoAlt: z.string().min(1),
    hero: asset,
    heroAlt: z.string().min(1),
    /** Ponto de foco do recorte da foto principal (CSS object-position). */
    heroPosition: z.string().default('center'),
  }),

  linkPage: z.object({
    items: z.array(linkKey).min(1),
    extra: z.array(z.object({ label: z.string().min(1), url })).default([]),
  }),

  theme: z
    .object({
      accent: hexColor.default('#E08A3C'),
      /** Cor do texto sobre a cor de destaque. */
      onAccent: hexColor.default('#111111'),
      bg: hexColor.default('#0E0E0E'),
      surface: hexColor.default('#171717'),
      text: hexColor.default('#F3F0EA'),
      muted: hexColor.default('#A39E96'),
    })
    .prefault({}),

  credit: z.object({ text: z.string().min(1), url: url.optional() }).optional(),
});

export type SiteConfigInput = z.input<typeof siteSchema>;
export type SiteConfig = z.output<typeof siteSchema>;
export type DayKey = keyof SiteConfig['hours']['week'];
export type LinkKey = z.infer<typeof linkKey>;

/** Helper com autocompletar para os arquivos de configuração dos clientes. */
export function defineSite(config: SiteConfigInput): SiteConfigInput {
  return config;
}
