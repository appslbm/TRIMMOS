import { defineSite } from '../../src/lib/schema';

/**
 * Cliente FICTÍCIO usado para demonstrar e testar o template.
 * Todos os dados abaixo são inventados. Imagens geradas por scripts/placeholders.mjs.
 *
 * Gerar:  CLIENT=exemplo npm run build   (PowerShell: $env:CLIENT="exemplo"; npm run build)
 */
export default defineSite({
  deploy: {
    site: 'https://www.barbeariaexemplo.com.br',
    base: '',
  },

  business: {
    name: 'Barbearia Exemplo',
    shortName: 'Exemplo',
    tagline: 'Corte clássico, atendimento sem pressa.',
    foundedYear: 2018,
  },

  seo: {
    title: 'Barbearia Exemplo | Barbearia no Centro de Cidade Exemplo',
    description:
      'Barbearia Exemplo, no Centro de Cidade Exemplo. Cortes clássicos e modernos, barba e tratamentos com hora marcada. Agende online.',
    linksTitle: 'Barbearia Exemplo · Links',
  },

  contact: {
    phoneDisplay: '(11) 90000-0000',
    whatsappNumber: '5511900000000',
    whatsappMessage: 'Olá! Gostaria de agendar um horário.',
    instagramUrl: 'https://www.instagram.com/',
    instagramHandle: '@barbeariaexemplo',
  },

  booking: {
    url: 'https://example.com/agendar',
    label: 'Agendar horário',
    provider: 'Sistema externo',
  },

  location: {
    street: 'Rua Exemplo, 123',
    neighborhood: 'Centro',
    city: 'Cidade Exemplo',
    state: 'SP',
    postalCode: '01000-000',
    country: 'BR',
    lat: -23.55052,
    lng: -46.633308,
    photo: { src: 'fachada.jpg', alt: 'Fachada da Barbearia Exemplo' },
  },

  hours: {
    timezone: 'America/Sao_Paulo',
    week: {
      mon: [],
      tue: [['09:00', '19:00']],
      wed: [['09:00', '19:00']],
      thu: [['09:00', '19:00']],
      fri: [['09:00', '20:00']],
      sat: [['08:00', '14:00']],
      sun: [],
    },
    note: 'Feriados: consulte pelo WhatsApp.',
  },

  services: {
    categories: [
      {
        name: 'Cabelo',
        items: [
          { name: 'Corte masculino', duration: 40, price: 45, featured: true },
          { name: 'Corte infantil', duration: 30, price: 35, featured: true },
          { name: 'Máquina', duration: 20, price: 30 },
        ],
      },
      {
        name: 'Barba',
        items: [
          { name: 'Barba completa', duration: 30, price: 40, featured: true },
          { name: 'Barba com toalha quente', duration: 45, price: 55, featured: true },
        ],
      },
      {
        name: 'Combos',
        items: [{ name: 'Corte + barba', duration: 70, price: 80, featured: true }],
      },
    ],
  },

  reviews: {
    ratings: [{ source: 'Google', value: 4.9, scale: 5, count: 128, url: 'https://www.google.com/maps' }],
    url: 'https://www.google.com/maps',
    items: [
      { author: 'Cliente A.', text: 'Atendimento pontual e corte impecável. Recomendo.' },
      { author: 'Cliente B.', text: 'Ambiente tranquilo e profissionais muito atenciosos.' },
      { author: 'Cliente C.', text: 'Melhor barba que já fiz. Voltarei com certeza.' },
    ],
  },

  about: {
    title: 'Sobre a Exemplo',
    paragraphs: ['Texto de exemplo sobre a história da barbearia, em duas ou três frases curtas.'],
    highlights: [
      { title: 'Hora marcada', text: 'Sem fila e sem espera.' },
      { title: 'Estacionamento', text: 'Vagas em frente.' },
    ],
    photos: [{ src: 'sobre.jpg', alt: 'Interior da Barbearia Exemplo' }],
  },

  team: [
    { name: 'Barbeiro Um', role: 'Degradê e desenhos', photo: 'equipe/barbeiro-1.jpg' },
    { name: 'Barbeiro Dois', role: 'Barba e tratamentos', photo: 'equipe/barbeiro-2.jpg' },
    { name: 'Barbeiro Três', role: 'Cortes clássicos', photo: 'equipe/barbeiro-3.jpg' },
  ],

  gallery: Array.from({ length: 8 }, (_, i) => ({
    src: `galeria/corte-${i + 1}.jpg`,
    alt: `Exemplo de corte ${i + 1}`,
  })),

  images: {
    logo: 'logo.png',
    logoAlt: 'Logo da Barbearia Exemplo',
    hero: 'ambiente.jpg',
    heroAlt: 'Interior da Barbearia Exemplo',
  },

  linkPage: {
    items: ['booking', 'whatsapp', 'instagram', 'directions', 'site', 'reviews', 'phone'],
    extra: [{ label: 'Clube de assinatura', url: 'https://example.com/clube' }],
  },

  theme: {
    accent: '#C9A23A',
    bg: '#0F1216',
    surface: '#171B21',
  },
});
