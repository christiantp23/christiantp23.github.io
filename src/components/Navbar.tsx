/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

// =========================================================================
// INTERFAZ DE PROPIEDADES DE NAVBAR (NavbarProps)
// =========================================================================
// Añadimos dos nuevas propiedades para que el menú de navegación conozca favoritos:
// - wishlistItemsCount: Indica el número de productos guardados en favoritos.
// - onWishlistOpen: Función que se ejecuta al hacer clic en el corazón del navbar
//   para abrir la barra lateral de favoritos.
interface NavbarProps {
  cartItemsCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenInfo?: (tab: 'tallas' | 'politicas' | 'pagos' | 'transportes') => void;
  wishlistItemsCount: number; // Nuevo: contador de favoritos
  onWishlistOpen: () => void; // Nuevo: acción para abrir favoritos
}

export default function Navbar({
  cartItemsCount,
  onCartOpen,
  searchQuery,
  onSearchChange,
  onOpenInfo,
  wishlistItemsCount, // Recibimos el contador
  onWishlistOpen,     // Recibimos la función de apertura
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
          <a href="/" className="flex items-baseline gap-1.5 group">
            <img 
              src="/logo.png" 
              alt="TRESPA STORE"
              loading="lazy" // Carga diferida para optimizar la lista del carrito 
              className="h-16 sm:h-32 md:h-48 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
          {/* Search Box */}
          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar tenis..."
                className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-100 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10 outline-none rounded-2xl transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

           {/* Informational Links (Desktop Only) */}
          {onOpenInfo && (
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 shrink-0">
              <button
                type="button"
                onClick={() => onOpenInfo('politicas')}
                className="hover:text-brand-blue hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5 text-slate-800 font-extrabold bg-slate-50 hover:bg-slate-100/80 px-4 py-2 rounded-xl border border-slate-100"
              >
                👥 Nosotros
              </button>
            </div>
          )}

          {/* Utility Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Toggle for Mobile */}
            <div className="md:hidden relative max-w-[150px] sm:max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-100 outline-none rounded-xl focus:border-brand-blue focus:bg-white"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Nosotros button for Mobile/Tablet */}
            {onOpenInfo && (
              <button
                type="button"
                onClick={() => onOpenInfo('politicas')}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                👥 Nosotros
              </button>
            )}

{/* =========================================================================
               BOTÓN DISPARADOR DE LISTA DE DESEOS / FAVORITOS (Wishlist Trigger)
               =========================================================================
               - Botón con forma de corazón en la barra de navegación.
               - Al hacer clic abre la barra lateral de favoritos (onWishlistOpen).
               - Muestra un distintivo circular (Badge) rojo con la cantidad de favoritos
                 guardados (wishlistItemsCount) si es mayor a cero.
            */}
            <motion.button
              id="wishlist-trigger-btn"
              type="button"
              onClick={onWishlistOpen}
              whileTap={{ scale: 0.95 }}
              className="relative w-12 h-12 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-rose-500 transition-all shadow-xs cursor-pointer"
              title="Ver favoritos"
            >
              <Heart className={`w-5 h-5 ${wishlistItemsCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              
              {/* Distintivo de cantidad de favoritos */}
              {wishlistItemsCount > 0 && (
                <motion.span
                  key={wishlistItemsCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {wishlistItemsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Shopping Cart Trigger */}
            <motion.button
              id="cart-trigger-btn"
              type="button"
              onClick={onCartOpen}
              whileTap={{ scale: 0.95 }}
              className="relative w-12 h-12 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-brand-blue transition-all shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              
              {/* Cart Count Badge */}
              {cartItemsCount > 0 && (
                <motion.span
                  key={cartItemsCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-brand-blue text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>
          </div>

        </div>
      </div>
    </header>
  );
}
