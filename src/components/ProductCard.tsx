/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Star, ShoppingBag, Check, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onOpenSizeGuide?: () => void;
}

export default function ProductCard({ product, onAddToCart, onOpenSizeGuide }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Fallback images map
  const fallbackImages: Record<string, string> = {
    'adidas-forum-low-strap-white': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=800',
    'adidas-forum-low-strap-black': 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800',
    'adidas-forum-low-strap-blue': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
    'nike-dunk-low-brown-sail': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
    'on-cloudrunner-lavender-storm': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
    'on-cloudrunner-beige-sunset': 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800',
    'adidas-superstar-maroon-teddy': 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
    'nike-air-force-1': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800',
    'nike-air-max-270': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
    'adidas-ultraboot-light': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
    'new-balance-550': 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
    'air-jordan-1-retro': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
    'puma-deviate-nitro': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800',
    'new-balance-9060': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800'
  };

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const currentImage = imageError 
    ? (fallbackImages[product.id] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800') 
    : (allImages[activeImgIndex] || product.image);

  const handleAdd = () => {
    if (!isOptionsOpen) {
      setIsOptionsOpen(true);
      return;
    }
    
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsOptionsOpen(false);
    }, 1500);
  };

  // Format currency helper
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.gender && (
          <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-full shadow-sm flex items-center gap-1 ${
            product.gender === 'Dama' ? 'bg-pink-500' :
            product.gender === 'Caballero' ? 'bg-slate-800' :
            'bg-indigo-600'
          }`}>
            {product.gender} {product.gender === 'Dama' ? '🌸' : product.gender === 'Caballero' ? '⚡' : '👥'}
          </span>
        )}
        {product.isNew && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 rounded-full shadow-sm">
            Nuevo
          </span>
        )}
        {product.isHot && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-amber-500 rounded-full shadow-sm">
            Top Ventas
          </span>
        )}
        {product.originalPrice && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-emerald-500 rounded-full shadow-sm">
            Oferta
          </span>
        )}
      </div>

      {/* Image Gallery Container */}
      <div 
        onClick={() => setIsZoomOpen(true)}
        className="relative overflow-hidden bg-slate-50 pt-[100%] cursor-zoom-in group/img"
      >
        <img
          src={currentImage}
          alt={product.name}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Hover zoom overlay indicator */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transform scale-95 group-hover/img:scale-100 transition-all duration-300">
            <ZoomIn className="w-4 h-4 text-blue-600" />
            <span>Ver en Grande</span>
          </div>
        </div>

        {/* Gallery Navigation Controls */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-lg opacity-0 group-hover/img:opacity-100 hover:scale-110 active:scale-95 transition-all duration-250 cursor-pointer z-20 border border-slate-100 flex items-center justify-center"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-lg opacity-0 group-hover/img:opacity-100 hover:scale-110 active:scale-95 transition-all duration-250 cursor-pointer z-20 border border-slate-100 flex items-center justify-center"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-4 h-4 text-slate-700 stroke-[2.5]" />
            </button>

            {/* Gallery Indicator Dots */}
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-20 bg-black/25 backdrop-blur-xs px-2 py-1 rounded-full">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    i === activeImgIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick Brand tag */}
        <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md z-20">
          {product.brand}
        </span>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500 ml-1">
              {product.rating}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Prices & Purchase button */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold text-slate-950 font-display">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Expandable Options Selector */}
          <AnimatePresence initial={false}>
            {isOptionsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-slate-100 pt-3 mb-3"
              >
                {/* Colors Choice */}
                <div className="mb-3">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Color: {selectedColor}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes Choice */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Talla COP (EUR): {selectedSize}
                    </span>
                    {onOpenSizeGuide && (
                      <button
                        type="button"
                        onClick={onOpenSizeGuide}
                        className="text-[10px] text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                      >
                        📏 Guía de Tallas
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs rounded-lg border flex items-center justify-center transition-all ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2">
            {isOptionsOpen && (
              <button
                type="button"
                onClick={() => setIsOptionsOpen(false)}
                className="px-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all text-xs font-semibold"
              >
                Atrás
              </button>
            )}
            <button
              id={`add-to-cart-btn-${product.id}`}
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-200'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  {isOptionsOpen ? 'Confirmar Talla' : 'Comprar / Tallas'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setIsZoomOpen(false)}
          >
            {/* Close button in top-right */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomOpen(false);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 cursor-pointer z-50 shadow-lg backdrop-blur-xs border border-white/10"
              aria-label="Cerrar vista grande"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Inner Content Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Product Image Panel with nice soft glow */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[70vh] flex items-center justify-center p-2">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[66vh] max-w-full rounded-2xl object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                  style={{ minWidth: '280px' }}
                />

                {/* Left/Right Zoom Navigation Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full shadow-xl transition-all duration-200 cursor-pointer z-30 border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full shadow-xl transition-all duration-200 cursor-pointer z-30 border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95"
                      aria-label="Siguiente foto"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Miniature Thumbnail Selector Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 z-30">
                      {allImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex(idx);
                          }}
                          className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === activeImgIndex ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                {/* Brand Logo floating element inside image */}
                <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl border border-white/10 z-20">
                  {product.brand}
                </span>

                {product.gender && (
                  <span className={`absolute top-4 right-4 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-md border border-white/10 flex items-center gap-1 z-20 ${
                    product.gender === 'Dama' ? 'bg-pink-500' :
                    product.gender === 'Caballero' ? 'bg-slate-800' :
                    'bg-indigo-600'
                  }`}>
                    {product.gender} {product.gender === 'Dama' ? '🌸' : product.gender === 'Caballero' ? '⚡' : '👥'}
                  </span>
                )}
              </div>

              {/* Bottom detail card */}
              <div className="mt-4 text-center bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/10 text-white max-w-md shadow-xl">
                <h4 className="font-display text-base font-bold tracking-tight">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Categoría: <span className="font-semibold text-white">{product.category}</span> &bull; 
                  Tallas: <span className="font-semibold text-white">{product.sizes.join(', ')}</span>
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm font-bold text-blue-300">
                    ${product.price.toLocaleString('es-CO')} COP
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ${product.originalPrice.toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
