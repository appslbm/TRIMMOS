import { defineSite } from '../../src/lib/schema';

/**
 * Trimmos Barbearia (antiga Barbearia Hunziker) — Bauru/SP
 *
 * Tudo o que aparece no site vem deste arquivo + das imagens em ./assets.
 * Fontes consultadas em 04/10/2026:
 *   [IG]  Instagram oficial  https://www.instagram.com/trimmosbarbearia/
 *   [GM]  Google Maps        ficha da barbearia (Place ID abaixo; lá o nome ainda aparece como "Barbearia Trimmos")
 *   [FZ]  Frizzar            https://app.frizzar.com.br/p/trimmosbarbearia
 *   [SA]  Site anterior      (versão HTML preservada na branch main)
 *   [DONO] Confirmado pelo proprietário (via Lucas Marques)
 * Nome, horários, preços, equipe, fotos e ano de fundação confirmados pelo proprietário [DONO].
 */
export default defineSite({
  deploy: {
    site: 'https://appslbm.github.io',
    base: '/TRIMMOS',
  },

  business: {
    // [DONO] nome oficial
    name: 'Trimmos Barbearia',
    shortName: 'Trimmos',
    formerName: 'Barbearia Hunziker',
    // [IG] bio oficial
    tagline: 'Na Trimmos o padrão é premium. Pra quem valoriza qualidade e conforto.',
    // [SA] [DONO] "Desde 2020" (época Hunziker, mesmo endereço)
    foundedYear: 2020,
  },

  seo: {
    title: 'Trimmos Barbearia | Barbearia em Bauru – Vila Alto Paraíso',
    description:
      'Trimmos Barbearia (antiga Barbearia Hunziker), na Vila Alto Paraíso em Bauru-SP. Low fade, taper fade, barba e sobrancelha com hora marcada.',
    linksTitle: 'Trimmos Barbearia · Links',
  },

  contact: {
    // [GM] [FZ] mesmo número nas duas fontes
    phoneDisplay: '(14) 98105-4426',
    whatsappNumber: '5514981054426',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de agendar um horário.',
    // [IG] perfil oficial confirmado
    instagramUrl: 'https://www.instagram.com/trimmosbarbearia/',
    instagramHandle: '@trimmosbarbearia',
    // Facebook e TikTok: nenhum perfil oficial encontrado (ver relatório).
  },

  booking: {
    url: 'https://app.frizzar.com.br/p/trimmosbarbearia',
    label: 'Agendar horário',
    provider: 'Frizzar',
  },

  // [GM]
  location: {
    street: 'R. José Chaves de França, 1-05',
    neighborhood: 'Vila Alto Paraíso',
    city: 'Bauru',
    state: 'SP',
    postalCode: '17055-020',
    country: 'BR',
    lat: -22.3306939,
    lng: -49.1053727,
    googlePlaceId: 'ChIJReC7t3Bnv5QRZ158wsvoZBc',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6206.862048542557!2d-49.112976401265335!3d-22.330121531887002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf6770b7bbe045%3A0x1764e8cbc27c5e67!2sBarbearia%20Trimmos!5e0!3m2!1spt-BR!2sbr!4v1666460514355!5m2!1spt-BR!2sbr',
    // [SA] foto própria já presente no projeto
    photo: {
      src: 'fachada.jpg',
      alt: 'Fachada preta da Trimmos Barbearia, com o letreiro TRIMMOS, na esquina',
    },
  },

  // [GM] Horário exibido no Google — fonte oficial confirmada pelo dono [DONO].
  // (O Frizzar mostra horários diferentes e NÃO deve ser usado como referência.)
  hours: {
    timezone: 'America/Sao_Paulo',
    week: {
      mon: [],
      tue: [['09:00', '19:00']],
      wed: [['09:00', '19:00']],
      thu: [['09:00', '19:00']],
      fri: [['09:00', '19:00']],
      sat: [['09:00', '18:00']],
      sun: [],
    },
  },

  // [SA] [DONO] Preços confirmados pelo proprietário.
  services: {
    note: 'Valores e durações podem variar. Confirme ao agendar.',
    categories: [
      {
        name: 'Cabelo',
        items: [
          {
            name: 'Corte degradê',
            duration: 60,
            price: 40,
            featured: true,
            // [IG] estilos publicados pela barbearia
            description: 'Low fade, taper fade (americano), jit fade e outros.',
          },
          { name: 'Corte social', duration: 30, price: 40, featured: true },
          { name: 'Pezinho', duration: 15, price: 15, featured: true },
        ],
      },
      {
        name: 'Barba',
        items: [
          { name: 'Barba expressa', duration: 30, price: 35, featured: true },
          { name: 'Barboterapia', duration: 45, price: 50, featured: true },
          { name: 'Barba + acabamento', duration: 45, price: 50 },
        ],
      },
      {
        name: 'Combos',
        items: [
          { name: 'Corte degradê + barba', duration: 90, price: 70, featured: true },
          { name: 'Corte degradê + barba + sobrancelha', duration: 90, price: 82 },
          { name: 'Corte degradê + sobrancelha', duration: 60, price: 52 },
          { name: 'Corte degradê + sobrancelha + bigode', duration: 90, price: 52 },
          { name: 'Corte social + barba', duration: 60, price: 70 },
          { name: 'Corte social + barba + sobrancelha', duration: 90, price: 82 },
          { name: 'Corte social + sobrancelha', duration: 60, price: 52 },
        ],
      },
      {
        name: 'Estética e química',
        items: [
          { name: 'Limpeza de pele', duration: 30, price: 25 },
          // Observação: duração (15 min) vem do site anterior; preço confirmado [DONO].
          { name: 'Hidratação + limpeza profunda', duration: 15, price: 25 },
          { name: 'Relaxamento', duration: 30, price: 40 },
        ],
      },
    ],
  },

  // [IG] Cortes publicados pela própria barbearia. Os cards levam à publicação original;
  // as fotos (de clientes) NÃO foram copiadas para o site.
  showcase: {
    title: 'Cortes da casa',
    intro: 'Alguns dos estilos que saem da nossa cadeira. Veja os resultados no nosso Instagram.',
    linkLabel: 'Ver no Instagram',
    items: [
      {
        name: 'Low fade',
        text: 'Degradê que começa baixo, rente à orelha e à nuca.',
        url: 'https://www.instagram.com/p/DQjsR5CDcKX/',
      },
      {
        name: 'Taper fade',
        alias: 'Americano',
        text: 'Degradê concentrado no pezinho e nas costeletas.',
        url: 'https://www.instagram.com/p/DaG6se_CpXC/',
      },
      {
        name: 'Jit fade',
        text: 'O corte do momento.',
        url: 'https://www.instagram.com/p/DRsYwAeifNR/',
      },
      {
        name: 'Freestyle',
        text: 'Desenhos na máquina. Um bom freestyle muda tudo!',
        url: 'https://www.instagram.com/p/DYI0h_5AlD7/',
      },
    ],
  },

  reviews: {
    ratings: [
      // [GM] "5,0 · 319 avaliações"
      {
        source: 'Google',
        value: 5,
        scale: 5,
        count: 319,
        url: 'https://www.google.com/maps/place/?q=place_id:ChIJReC7t3Bnv5QRZ158wsvoZBc',
        checkedAt: '2026-10-04',
      },
      // [FZ] "10,0 (189 avaliações)"
      {
        source: 'Frizzar',
        value: 10,
        scale: 10,
        count: 189,
        url: 'https://app.frizzar.com.br/p/trimmosbarbearia',
        checkedAt: '2026-10-04',
      },
    ],
    // [SA] Avaliações públicas do Google (mesma ficha, desde a época Hunziker).
    // Nomes abreviados por privacidade; fotos dos clientes não são publicadas;
    // apenas pontuação e espaços corrigidos, sem mudar o sentido.
    items: [
      {
        author: 'Daniel B.',
        text: 'Atendimento excelente, ambiente bacana, limpo e organizado. Utilizam um sistema muito bom de agendamento, que permite escolher com tranquilidade o serviço, a data e a hora do corte.',
      },
      {
        author: 'Adriana S.',
        text: 'Sempre pontual e cordial. Ambiente agradável, com água, café e ar-condicionado. Produtos de qualidade e educação excepcional. Qualidade nota mil!',
      },
      {
        author: 'Mel O.',
        text: 'Fui acompanhar meu namorado, que já está acostumado a cortar aqui. Ele foi muito bem atendido: tinha o cabelo bem cacheado e grande e saiu com um black afro lindo, do jeito que queria.',
      },
      {
        author: 'André F.',
        text: 'Profissional super capacitado, atencioso e que está sempre investindo em capacitação e especialização para elevar ainda mais a qualidade.',
      },
      {
        author: 'Israel R.',
        text: 'Atendimento excelente, limpeza e organização espetaculares, profissional incrível no que faz e ambiente super descontraído. Recomendamos muito!',
      },
      {
        author: 'Ricardo G.',
        text: 'Ambiente muito bom, pessoal bem atencioso, atendimento excelente.',
      },
    ],
  },

  about: {
    title: 'Sobre a Trimmos',
    paragraphs: [
      // [IG] bio oficial
      'Na Trimmos o padrão é premium: um espaço pensado para quem valoriza qualidade e conforto, na Vila Alto Paraíso, em Bauru.',
      // [SA] fundada em 2020 como Hunziker; a fachada antiga e a atual são o mesmo prédio
      'Antes conhecida como Barbearia Hunziker, a casa está no bairro desde 2020 e hoje segue sua história como Trimmos, no mesmo endereço.',
      // [SA] missão anterior + [IG] "encontre sua melhor versão"
      'O objetivo continua o mesmo: que você saia daqui na sua melhor versão.',
    ],
    highlights: [
      { title: 'Hora marcada', text: 'Agende online ou pelo WhatsApp.' },
      // [IG]
      { title: 'Degradês e freestyle', text: 'Low fade, taper fade, jit fade e desenhos.' },
      // [SA] avaliação no Google + [IG] reel do café
      { title: 'Ambiente climatizado', text: 'Ar-condicionado, água e café.' },
      // [IG] publicação de 30/11/2025
      { title: 'Produtos masculinos', text: 'Variedade de produtos à venda na barbearia.' },
    ],
    photos: [],
    // [SA] vídeo do canal oficial da época Hunziker (mesmo estabelecimento)
    video: {
      youtubeId: '6HMD2OQKljA',
      title: 'Atendimento diferenciado na Barbearia Hunziker',
      caption: 'Vídeo da época em que nos chamávamos Barbearia Hunziker.',
    },
  },

  // [IG] [DONO] Profissionais confirmados — publicações oficiais de apresentação:
  //   https://www.instagram.com/p/DBY8hE4uYON/ (Tiago Hunziker)
  //   https://www.instagram.com/p/DBeHKH4ubVE/ (Matheus Tsucada)
  // Cargo e apresentação conforme o texto das próprias publicações. Fotos recortadas das artes
  // (somente o retrato), com autorização do proprietário.
  team: [
    {
      name: 'Tiago Hunziker',
      role: 'Barbeiro',
      bio: 'Especialista em cortes modernos e tradicionais, barba e cuidados masculinos. Sua missão é elevar a sua autoestima com base no conhecimento de visagismo.',
      photo: 'equipe/tiago-hunziker.jpg',
      alt: 'Tiago Hunziker, barbeiro da Trimmos Barbearia',
      photoPosition: 'center top',
    },
    {
      name: 'Matheus Tsucada',
      role: 'Barbeiro',
      bio: 'Apaixonado por estilos e detalhes. Sua missão é oferecer a melhor experiência de barbearia que você poderia ter.',
      photo: 'equipe/matheus-tsucada.jpg',
      alt: 'Matheus Tsucada, barbeiro da Trimmos Barbearia',
      photoPosition: 'center top',
    },
  ],

  // [IG] [DONO] Fotos de publicações oficiais, autorizadas pelo proprietário.
  // A foto do freestyle (https://www.instagram.com/p/DYI0h_5AlD7/) NÃO foi incluída:
  // mostra uma criança e exige consentimento específico dos pais/responsável (LGPD, art. 14).
  gallery: [
    { src: 'galeria/low-fade.jpg', alt: 'Cliente com corte low fade, de perfil, em fundo laranja', category: 'Low fade' },
    { src: 'galeria/taper-fade.jpg', alt: 'Cliente de cabelo cacheado ruivo com taper fade, em fundo laranja', category: 'Taper fade' },
    { src: 'galeria/jit-fade.jpg', alt: 'Cliente com corte jit fade, de perfil, em fundo laranja', category: 'Jit fade' },
    { src: 'galeria/tiago-em-acao.jpg', alt: 'Barbeiro Tiago Hunziker cortando o cabelo de um cliente', category: 'Em ação' },
    { src: 'galeria/produtos.jpg', alt: 'Prateleira com produtos masculinos à venda na barbearia', category: 'Produtos' },
  ],

  finalCta: {
    // [IG] "Click abaixo, encontre sua melhor versão."
    title: 'Encontre sua melhor versão',
    text: 'Agende online em menos de um minuto ou chame a gente no WhatsApp.',
  },

  images: {
    logo: 'logo.png',
    logoAlt: 'Logo da Trimmos Barbearia',
    hero: 'ambiente.jpg',
    heroAlt: 'Interior da Trimmos Barbearia, com cadeiras de couro caramelo e parede de tijolos',
    heroPosition: 'center 60%',
  },

  linkPage: {
    items: ['booking', 'whatsapp', 'instagram', 'directions', 'site', 'reviews'],
  },

  theme: {
    // Laranja do fundo das fotos de corte do Instagram [IG] e das linhas da logo
    accent: '#EE8A12',
  },

  credit: {
    text: 'Site por Lucas Marques & Bruno Marques',
  },
});
