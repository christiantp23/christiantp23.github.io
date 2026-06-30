/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const SNEAKER_PRODUCTS: Product[] = [
  {
    id: 'adidas-badbo10',
    name: 'Adidas Badbo 1.0',
    brand: 'Adidas',
    price: 200000,
    rating: 4.8,
    image: '/productos/hombre/adidas_badbo_10_cafe.jpg',
    category: 'Urbano',
    description: 'Es la primera zapatilla de la línea exclusiva de Bad Bunny en colaboración con la marca. El bordado azul en el talón señala el número de serie de una edición limitada a 1994 pares a nivel mundial. La cantidad fue elegida en honor al año de nacimiento del artista. El diseño destaca por sus paneles de gamuza café con recortes triangulares sobre una base clara y el uso de cordones gruesos.',
    colors: ['Café'],
    sizes: [40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Caballero'
  },
  {
    id: 'adidas-forum-low-strap-black',
    name: 'Adidas Forum Low Strap Black & White',
    brand: 'Adidas',
    price: 185000,
    originalPrice: 200000,
    rating: 4.9,
    image: '/productos/mujer/adidas_forum_negras.jpeg',
    category: 'Urbano',
    description: 'La combinación icónica de blanco con las tres rayas negras. Ajuste seguro mediante la correa clásica Forum, con entresuela de caucho adherente y un estilo impecable.',
    colors: ['Blanco/Negro'],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Unisex'
  },
  {
    id: 'adidas-forum-low-strap-blue',
    name: 'Adidas Forum Low Strap Royal Blue',
    brand: 'Adidas',
    price: 185000,
    rating: 4.7,
    image: '/productos/mujer/adidas_forum_azul.jpeg',
    category: 'Urbano',
    description: 'Estilo retro con vibras de baloncesto de los 80. Detalles en azul rey sobre cuero blanco que le dan un toque llamativo, elegante y deportivo a tus outfits de dama.',
    colors: ['Blanco/Azul Rey'],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Unisex'
  },
  {
    id: 'nike-dunk-low-brown-sail',
    name: 'Nike Dunk Low Cacao',
    brand: 'Nike',
    price: 200000,
    rating: 4.9,
    image: '/productos/mujer/nike_sb_dunk_cocoa.jpg',
    category: 'Urbano',
    description: 'El colorway más codiciado de la temporada. Cuero premium café chocolate sobre una base color crema (Sail), perfecto para combinar con tonos tierra de manera espectacular.',
    colors: ['Café Cacao'],
    sizes: [35, 36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },
  {
    id: 'on-cloudrunner-lavender-storm',
    name: 'On Cloud',
    brand: 'OnCloud',
    price: 190000,
    rating: 4.8,
    image: '/productos/mujer/oncloud_gris.jpg',
    category: 'Deportivo',
    description: 'Zapatillas On Cloudrunner para mujer. Tienen suela con sistema CloudTec y espuma Helion que amortiguan tus pasos.gris claro con detalles blancos.',
    colors: ['Gris'],
    sizes: [35, 36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },
  {
    id: 'on-cloudrunner-beige-sunset',
    name: 'On Cloudrunner Sand Beige & Pink',
    brand: 'OnCloud',
    price: 190000,
    rating: 4.8,
    image: '/productos/mujer/oncloud_cafe.jpg',
    category: 'Deportivo',
    description: 'Tonos arena combinados con unos cordones rosa vibrante que destacan en cualquier trote o caminata. Ligereza, ventilación y amortiguación excepcionales.',
    colors: ['Arena/Rosa Vibrante'],
    sizes: [35, 36, 37, 38, 39],
    isNew: true,
    gender: 'Dama'
  },
  {
    id: 'adidas-superstar-maroon-teddy',
    name: 'Adidas Superstar',
    brand: 'Adidas',
    price: 190000,
    rating: 4.9,
    // 1. Esta es la foto principal que se muestra por defecto:
    image: '/productos/mujer/adidas_superstar_vinotinto.jpg',
    category: 'Urbano',
    description: 'El diseño resalta por sus franjas laterales y talón en tono vinotinto. Las franjas incluyen un patrón de costuras decorativas blancas. Tienen un estampado de un oso en la parte trasera y en la etiqueta de la lengüeta. Traen un llavero metálico redondo con el mismo diseño del oso y cordones color vinotinto.',
    colors: ['Blanco/Vino Tinto'],
    sizes: [35, 36, 37, 38, 39],
    isNew: true,
    gender: 'Dama'
  },
  {
    id: 'campus-bad-cafe',
    name: "Campus Bad Bunny",
    brand: 'Adidas',
    price: 190000,
    rating: 4.8,
    image: '/productos/hombre/campus_bad_cafe.jpg',
    category: 'Urbano',
    description: 'Este par destaca por su exterior de gamuza el diseño de doble lengüeta el cuello acolchado grueso y la etiqueta con el logo del artista.',
    colors: ['Café'],
    sizes: [40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Caballero'
  },
  {
    id: 'nike-zoom',
    name: 'Nike Zoom Vomero Plus',
    brand: 'Nike',
    price: 180000,
    rating: 4.9,
    image: '/productos/mujer/nike_zoom.jpg',
    category: 'Deportivo',
    description: 'Estas zapatillas para mujer tienen una cubierta textil tejida en color blanco con el logo lateral magenta. Destacan por una entresuela muy gruesa de espuma ZoomX con un borde exterior rosado y translúcido.',
    colors: ['Blanco con Rosa'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },
  {
    id: 'adidas-samba',
    name: 'Adidas Samba OG',
    brand: 'Adidas',
    price: 180000,
    rating: 4.7,
    image: '/productos/mujer/adidas_sambas_cafe.jpg',
    category: 'Urbano',
    description: 'Esta variante presenta un exterior café con el nombre del modelo impreso y las tres franjas laterales en blanco Trae la suela de goma plana que identifica a esta referencia.',
    colors: ['Café'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },
  {
    id: 'adidas-badbo-hombre',
    name: 'Adidas BadBo 1.0',
    brand: 'Adidas',
    price: 200000,
    rating: 4.6,
    image: '/productos/hombre/adidas_badbo_1.0_blancasl.jpg',
    images: [
      '/productos/hombre/adidas_badbo_1.0_blancas.jpg'
    ],
    category: 'Urbano',
    description: 'Estas zapatillas combinan paneles de gamuza con recortes triangulares y detalles bordados en azul en el talón. Tienen cordones gruesos y doble lengüeta.',
    colors: ['Gris'],
    sizes: [40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Caballero'
  },
  {
    id: 'puma-fenty',
    name: 'Puma Fenty',
    brand: 'Puma',
    price: 180000,
    rating: 4.9,
    image: '/productos/mujer/puma_fenty.jpg',
    category: 'Urbano',
    description: 'Calzado urbano que resalta por su diseño clásico en gamuza negra con la franja lateral blanca en contraste. Su principal característica es la suela gruesa de plataforma en goma estriada que eleva tu silueta. Es una opción versátil para tus looks casuales.',
    colors: ['Rojo Chicago', 'Azul Royal', 'Negro/Oro Premium'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },

  {
    id: 'new-balance-9060',
    name: 'New Balance 9060',
    brand: 'New Balance',
    price: 195000,
    rating: 4.7,
    // 1. Esta es la foto principal que se muestra por defecto:
    image: '/productos/unisex/new_balance_9060_beige.jpg',
    // 2. Aquí agregas todas las fotos del carrusel (incluyendo la principal y las secundarias):
    images: [
      '/productos/unisex/new_balance_9060_negras.jpg',
    ],
    category: 'Urbano',
    description: 'Este calzado resalta por su estructura robusta y su entresuela ondulada con tecnología de amortiguación ABZORB. Tienes dos opciones disponibles. La primera tiene una base de malla transpirable con gamuza beige y detalles grises. La segunda ofrece un diseño oscuro que mezcla malla y gamuza negra con el logo lateral gris.',
    colors: ['Gris Nube', 'Negro'],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    isNew: true,
    gender: 'Unisex'
  },

  {
    id: 'asics-turquesa',
    name: 'Asics Superblast 2',
    brand: 'Asics',
    price: 195000,
    rating: 4.9,
    image: '/productos/mujer/asics_dama_azulverde.png',
    category: 'Deportivo',
    description: 'Luce el diseño running más codiciado del momento con el máximo confort. Esta versión importada de alta calidad replica fielmente los acabados y el llamativo color Wave Teal. Cuenta con una entresuela de excelente amortiguación ideal para tus caminatas, entrenamientos ligeros o looks urbanos diarios. Estilo de alta gama y comodidad superior en cada paso.',
    colors: ['Turquesa'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },

  {
    id: 'asics-morado',
    name: 'Asics Superblast 2',
    brand: 'Asics',
    price: 195000,
    rating: 4.9,
    image: '/productos/mujer/asics_dama_morado_fuscia.png',
    category: 'Deportivo',
    description: 'Atrévete a destacar con el colorway más enérgico e impactante de la temporada. Esta versión importada de alta calidad replica detalladamente el electrizante contraste entre magenta, rosa glo y el acento verde menta de los nuevos Superblast 2. Su entresuela de máximo volumen te brinda una amortiguación ultra suave en tus actividades diarias, entrenamientos o caminatas. El balance perfecto entre estilo urbano atrevido y confort superior.',
    colors: ['Bold Magenta'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  },

  {
    id: 'jordan-hombre-retro',
    name: 'Jordan 1 Mid "Come Fly With Me"',
    brand: 'Jordan',
    price: 180000,
    rating: 4.9,
    image: '/productos/hombre/jordan_retro_hombre.png',
    category: 'Urbano',
    description: 'Eleva tu estilo urbano con esta edición especial. Destaca por su base negra mate, llamativas costuras rojas en contraste y el icónico Swoosh brillante en relieve.',
    colors: ['Negros'],
    sizes: [40, 41, 42, 43, 44],
    isHot: true,
    gender: 'Caballero'
  },

  {
    id: 'adidas-samba-og',
    name: 'Asics Samba OG Brown',
    brand: 'Adidas',
    price: 180000,
    rating: 4.9,
    image: '/productos/mujer/samba_dama_og_cafe.png',
    category: 'Deportivo',
    description: 'Eleva tu estilo urbano con esta edición especial. Destaca por su base en tono crema suave, llamativas tres franjas en contraste marrón moca y su icónica suela de goma retro.',
    colors: ['Turquesa'],
    sizes: [36, 37, 38, 39],
    isHot: true,
    gender: 'Dama'
  }
];

export const CATEGORIES = ['Todos', 'Urbano', 'Deportivo'];
export const BRANDS = ['Todas', 'Nike', 'Adidas', 'Jordan', 'OnCloud', 'New Balance', 'Puma', 'Asics'];
