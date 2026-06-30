/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Truck, TrendingUp, Filter, Heart, ArrowUpRight, CheckCircle, Percent, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { SNEAKER_PRODUCTS, CATEGORIES, BRANDS } from './data';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import CheckoutModal from './components/CheckoutModal';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import InfoModals from './components/InfoModals';

export default function App() {
  // ==========================================
  // 1. PERSISTENCIA LOCAL DEL CARRITO (localStorage)
  // ==========================================
  // En React, "useState" es un Hook que define un estado (una variable que React vigila).
  // Cuando este estado cambia, React automáticamente redibuja (re-renderiza) la pantalla para mostrar los datos actualizados.
  //
  // Aquí usamos "Lazy Initialization" (inicialización diferida): en lugar de pasar un valor por defecto como [],
  // le pasamos una función callback () => { ... }. Esto hace que el código dentro se ejecute UNA SOLA VEZ
  // cuando el componente se monta por primera vez, evitando leer el disco (localStorage) innecesariamente en cada render.
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      // Intentamos recuperar la información guardada en el almacenamiento del navegador bajo la clave 'trespa_cart'
      const saved = localStorage.getItem('trespa_cart');

      // localStorage solo guarda cadenas de texto plano (string). Por eso:
      // - Si hay datos ("saved"), usamos "JSON.parse(saved)" para convertir esa cadena de texto de vuelta a un arreglo de objetos de JavaScript.
      // - Si no hay datos guardados previamente, retornamos un arreglo vacío [] por defecto.
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      // Si por alguna razón ocurre un error (por ejemplo, datos corruptos en el navegador), devolvemos un arreglo vacío
      return [];
    }
  });

  // ==========================================
  // 2. PERSISTENCIA LOCAL DE FAVORITOS (Wishlist)
  // ==========================================
  // Creamos un estado "favoriteIds" que guardará un arreglo de strings, donde cada string es el ID
  // de un producto marcado como favorito.
  // También usamos "Lazy Initialization" para leer el localStorage al iniciar la aplicación.
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trespa_wishlist');
      // Si existen favoritos guardados, convertimos el string JSON de vuelta a un arreglo de IDs.
      // Si no existe nada, inicializamos con un arreglo vacío [].
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false); // Nuevo: Estado para abrir/cerrar favoritos (Wishlist)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState<'tallas' | 'politicas' | 'pagos' | 'transportes'>('tallas');

  const openInfoModal = (tab: 'tallas' | 'politicas' | 'pagos' | 'transportes') => {
    setInfoModalTab(tab);
    setInfoModalOpen(true);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedGender, setSelectedGender] = useState<'Todos' | 'Dama' | 'Caballero' | 'Unisex'>('Todos');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');

  // ==========================================
  // SINCROIZACIÓN DEL CARRITO (useEffect)
  // ==========================================
  // El Hook "useEffect" sirve para ejecutar "efectos secundarios" (acciones de sincronización externa o llamadas a APIs).
  // Recibe dos cosas:
  // 1. Una función con el código que queremos ejecutar.
  // 2. Un "arreglo de dependencias" al final: [cartItems].
  // Esto significa: "Ejecuta esta función cada vez que la variable 'cartItems' cambie de valor".
  useEffect(() => {
    // Como localStorage solo admite texto plano, usamos "JSON.stringify" para convertir
    // nuestro arreglo de objetos 'cartItems' en un string con formato JSON de forma segura.
    localStorage.setItem('trespa_cart', JSON.stringify(cartItems));
  }, [cartItems]); // <-- Dependencia: reacciona ante cualquier cambio de elementos en el carrito

  // ==========================================
  // SINCROIZACIÓN DE FAVORITOS (useEffect)
  // ==========================================
  // Ejecutamos este efecto cada vez que el arreglo 'favoriteIds' cambie,
  // para guardar la lista actualizada de favoritos en el almacenamiento del navegador (localStorage).
  useEffect(() => {
    localStorage.setItem('trespa_wishlist', JSON.stringify(favoriteIds));
  }, [favoriteIds]); // <-- Dependencia: se ejecuta cada vez que el usuario agregue/quite un favorito

  // ==========================================
  // ACCIÓN DE AGREGAR/QUITAR FAVORITO (handleToggleFavorite)
  // ==========================================
  // Esta función se pasa como propiedad (prop) a las tarjetas de producto.
  // - Si el ID del producto ya existe en la lista, lo filtramos para removerlo (quitar de favoritos).
  // - Si no está, creamos un nuevo arreglo añadiendo el nuevo ID al final de los anteriores.
  const handleToggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
  // Cart operations
  const handleAddToCart = (product: Product, size: number, color: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
  };

  const handleIncrement = (index: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  const handleDecrement = (index: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
        return updated;
      }
      return updated;
    });
  };

  const handleRemove = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  // Filter products based on search, category, brand and gender
  const filteredProducts = SNEAKER_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory;

    const matchesBrand =
      selectedBrand === 'Todas' || product.brand === selectedBrand;

    const matchesGender =
      selectedGender === 'Todos' || product.gender === selectedGender;

    return matchesSearch && matchesCategory && matchesBrand && matchesGender;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default sorting
  });

  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Clear all active filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedBrand('Todas');
    setSelectedGender('Todos');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-brand-sky/30 selection:text-brand-blue">
      {/* Navbar component */}
      <Navbar
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenInfo={openInfoModal}
        wishlistItemsCount={favoriteIds.length} // Nuevo: pasamos la cantidad de productos favoritos actuales
        onWishlistOpen={() => setIsWishlistOpen(true)} // Nuevo: función para abrir la barra lateral de favoritos
      />

      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="relative bg-slate-950 rounded-[40px] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Ambient graphic rings */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-12 w-72 h-72 bg-brand-sky/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Call to action details */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-semibold tracking-wider uppercase"
              >
                <Truck className="w-3.5 h-3.5" />
                ENVÍO GRATIS A TODA COLOMBIA 🇨🇴
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]"
              >
                ESTILO EN CADA<span className="text-brand-yellow"> PASO</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Descubre nuestra selección de tenis deportivos y urbanos. 100% garantizados, con la comodidad que tus pies exigen y el estilo que impone tendencias.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <a
                  href="#catalog-section"
                  className="px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30 transition-all text-xs tracking-widest uppercase flex items-center gap-2 group"
                >
                  Ver Catálogo
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="https://wa.me/573008165725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold rounded-2xl transition-all text-xs tracking-widest uppercase"
                >
                  Soporte WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Immersive side image container */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full aspect-square max-w-[360px] mx-auto rounded-[32px] overflow-hidden border-4 border-white/10 shadow-2xl"
              >
                <img
                  src="/lema.png"
                  alt="Como el 23"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-brand-sky uppercase tracking-widest">EL CODIGO TRESPA</span>
                      <p className="font-display font-bold text-sm text-white">Encuentra tu par ideal</p>
                    </div>
                    <span className="text-xs font-bold text-white bg-brand-blue px-2.5 py-1 rounded-lg">🔥</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Title and stats summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Catálogo de <span className="text-brand-blue">Modelos</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mostrando {sortedProducts.length} de {SNEAKER_PRODUCTS.length} referencias de primera calidad
            </p>
          </div>

          {/* Sorting Dropdown selector */}
          <div className="flex items-center gap-2.5 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-xs shrink-0 self-start md:self-auto">
            <span className="text-xs text-slate-400 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="default">Recomendados</option>
              <option value="price_asc">Menor precio</option>
              <option value="price_desc">Mayor precio</option>
              <option value="rating">Calificación de clientes</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-slate-100 rounded-[30px] p-6 mb-10 shadow-xs space-y-6">
          {/* Brand Row */}
          <div>
            <div className="flex items-center gap-1.5 mb-3.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtrar por Marca</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-xs px-4 py-2.5 rounded-2xl border transition-all ${selectedBrand === brand
                    ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-md shadow-slate-300'
                    : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal category line */}
          <div className="h-px bg-slate-100" />

          {/* Category Selector Tab */}
          <div>
            <div className="flex items-center gap-1.5 mb-3.5">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categoría / Estilo</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs px-4 py-2.5 rounded-2xl border transition-all ${selectedCategory === category
                    ? 'bg-brand-blue border-brand-blue text-white font-bold shadow-md shadow-brand-blue/20'
                    : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal gender line */}
          <div className="h-px bg-slate-100" />

          {/* Gender Selector Tab */}
          <div>
            <div className="flex items-center gap-1.5 mb-3.5">
              <span className="text-sm">👥</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Colección por Género</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedGender('Todos')}
                className={`text-xs px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${selectedGender === 'Todos'
                  ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-md shadow-slate-300'
                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
              >
                Todos los Tenis
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('Dama')}
                className={`text-xs px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${selectedGender === 'Dama'
                  ? 'bg-pink-500 border-pink-500 text-white font-bold shadow-md shadow-pink-100'
                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
              >
                🌸 Dama
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('Caballero')}
                className={`text-xs px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${selectedGender === 'Caballero'
                  ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-md shadow-slate-300'
                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
              >
                ⚡ Caballero
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('Unisex')}
                className={`text-xs px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${selectedGender === 'Unisex'
                  ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md shadow-indigo-100'
                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
              >
                👥 Unisex
              </button>
            </div>
          </div>
        </div>

        {/* Products Display Grid */}
        <AnimatePresence mode="popLayout">
          {sortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20 px-4 bg-white border border-slate-100 rounded-[32px] shadow-xs max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-4 border border-dashed border-slate-200">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
                No encontramos coincidencias
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6 leading-relaxed">
                No hay productos que cumplan con los filtros de búsqueda aplicados. Intenta restablecer los filtros para ver todo el inventario.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="py-3 px-6 rounded-2xl bg-slate-950 hover:bg-brand-blue text-white text-xs font-bold tracking-wider uppercase transition-colors"
              >
                Mostrar Todos los Tenis
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOpenSizeGuide={() => openInfoModal('tallas')}
                  isFavorite={favoriteIds.includes(product.id)} // Nuevo: enviamos si este producto está marcado como favorito
                  onToggleFavorite={handleToggleFavorite} // Nuevo: enviamos la acción para añadir o quitar de favoritos  
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Feature Value Props Section */}
      <section className="bg-white border-t border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Box 1 */}
            <div className="flex gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 flex items-center justify-center text-brand-blue shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 uppercase">Calidad Garantizada</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Ofrecemos zapatillas importadas con un alto nivel de detalle, comodidad y excelente relación calidad-precio.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 flex items-center justify-center text-brand-blue shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 uppercase">Envío Gratis</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Llegamos a cada rincón de Colombia sin costo adicional. Despachos rápidos con rastreo garantizado.
                </p>
              </div>
            </div>

            {/* {/* Box 3 *
            <div className="flex gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 flex items-center justify-center text-brand-blue shrink-0">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 uppercase">Cambio sin Costo</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  ¿La talla no te quedó? No te preocupes. Realizamos el primer cambio de talla completamente gratis.
                </p>
              </div>
            </div> */}

            {/* Box 4 */}
            <div className="flex gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 flex items-center justify-center text-brand-blue shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 uppercase">Atención Humana</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Nada de bots aburridos. Chatea directamente con asesores apasionados por los tenis deportivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Col 1 */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="TRESPA STORE" 
                  className="h-12 sm:h-14 md:h-48 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
                En Trespa Store creemos que unas buenas zapatillas hablan por ti. Por eso ofrecemos referencias importadas con gran nivel de detalle, pensadas para quienes valoran el estilo.
              </p>
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://instagram.com/trespastore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
                  title="Síguenos en Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/trespastore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
                  title="Síguenos en Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@trespastore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
                  title="Síguenos en TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.17 1.98.11 2.97-.16v3.83c-.94.13-1.89.11-2.83-.07-.46-.09-.9-.25-1.31-.48-.68-.39-1.22-.96-1.58-1.66v6.86c.01 1.93-.65 3.86-1.88 5.29-1.46 1.71-3.69 2.68-5.91 2.5-2.5-.18-4.78-1.87-5.56-4.24-.96-2.87.5-6.14 3.32-7.14.73-.26 1.51-.36 2.28-.3v3.74c-.4-.11-.84-.11-1.25-.03-1.12.21-2.02 1.13-2.18 2.26-.25 1.63.85 3.2 2.47 3.44 1.25.19 2.52-.45 2.96-1.63.15-.39.2-.82.19-1.24V.02z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-sky">Colecciones & Guías</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button type="button" onClick={() => { setSelectedCategory('Urbano'); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Tenis Urbanos</button></li>
                <li><button type="button" onClick={() => { setSelectedCategory('Deportivo'); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Deportivos / Running</button></li>
                <li><button type="button" onClick={() => { setSelectedCategory('Colección'); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Ediciones Especiales</button></li>
                <li className="pt-2 border-t border-slate-900"><button type="button" onClick={() => openInfoModal('tallas')} className="text-brand-sky hover:text-white transition-colors cursor-pointer flex items-center gap-1">📏 Guía de Tallas</button></li>
                <li><button type="button" onClick={() => openInfoModal('politicas')} className="text-brand-sky hover:text-white transition-colors cursor-pointer flex items-center gap-1">🛡️ Políticas 2026</button></li>
                <li><button type="button" onClick={() => openInfoModal('pagos')} className="text-brand-sky hover:text-white transition-colors cursor-pointer flex items-center gap-1">💳 Medios de Pago</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-sky">Contacto & Horarios</h4>
              <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
                <p>
                  Soporte nacional en: <br />
                  <a href="tel:+573008165725" className="text-white hover:underline font-semibold">+57 300 816 5725</a>
                </p>
                <div className="pt-2 border-t border-slate-900/60 space-y-1">
                  <p className="text-slate-300 font-medium text-[11px] uppercase tracking-wider">🕒 Horario de atención:</p>
                  <p>Lunes a Viernes: <span className="text-white font-medium">10:00 AM a 6:00 PM</span></p>
                  <p>Sábados: <span className="text-white font-medium">9:00 AM a 2:00 PM</span></p>
                  <p className="text-rose-400 font-medium text-[11px] pt-0.5">Domingos y Festivos: No hay servicio</p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/573008165725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                  Asesor de Turno Conectado en WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-900" />

          {/* Copyright, terms */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
            <p>© 2026 Trespa Store. Todos los derechos reservados. Desarrollado por Christian</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300">Términos y condiciones</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Tratamiento de datos personales</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar panel drawer overlay */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* =========================================================================
        MENU LATERAL DE LISTA DE DESEOS (WishlistSidebar overlay)
        =========================================================================
        - Renderizamos el WishlistSidebar pasándole las siguientes propiedades (props):
        - isOpen: indica si debe estar visible (controlado por el estado isWishlistOpen).
        - onClose: función callback que cambia el estado isWishlistOpen a false para cerrarlo.
        - wishlistItems: filtramos el arreglo completo "SNEAKER_PRODUCTS" para pasarle únicamente
          los objetos de tenis cuyos IDs coincidan con los que el usuario tiene guardados en "favoriteIds".
        - onRemove: reusamos la función "handleToggleFavorite" para que, al dar clic en quitar,
          se elimine de la lista de deseos de forma reactiva.
      */}
      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={SNEAKER_PRODUCTS.filter((product) => favoriteIds.includes(product.id))}
        onRemove={handleToggleFavorite}
      />

      {/* Checkout Modal Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Info Modals (Tallas, Políticas, Pagos) */}
      <InfoModals
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        initialTab={infoModalTab}
      />

      {/* Floating breathing WhatsApp Support button */}
      <FloatingWhatsapp />
    </div>
  );
}
