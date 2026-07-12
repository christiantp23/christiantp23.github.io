/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
  onClearAll: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onClearAll,
}: CartSidebarProps) {
  
  // Format currency helper
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900 z-50 cursor-pointer"
          />

          {/* Cart Sidebar Panel */}
          <motion.div
            id="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-blue">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">Tu Carrito</h2>
                  <p className="text-xs text-slate-400">
                    {cartItems.length} {cartItems.length === 1 ? 'modelo seleccionado' : 'modelos seleccionados'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border border-dashed border-slate-200">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-1">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-400 max-w-xs mb-6">
                    Explora nuestra colección premium de tenis deportivos y agrega tus favoritos.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-brand-blue text-white text-xs font-bold transition-all duration-200 uppercase tracking-wider"
                  >
                    Ver Colección
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-end pb-1 border-b border-slate-100/50">
                    <button
                      type="button"
                      onClick={onClearAll}
                      className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50/70 transition-all duration-200 flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Vaciar Carrito
                    </button>
                  </div>
                  {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-100 shrink-0 relative">
                      <img
                        src={item.selectedColorImage || item.product.image}
                        alt={item.product.name}
                        loading="lazy" // Carga diferida para optimizar la lista del carrito
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-slate-900 text-sm truncate pr-4">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors absolute top-3 right-3"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Marca: {item.product.brand} | Talla: <span className="text-brand-blue font-bold">{item.selectedSize}</span> | Color: {item.selectedColor}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Selector de cantidad */}
                        <div className="flex items-center bg-white rounded-lg border border-slate-200/80 p-0.5">
                          <button
                            type="button"
                            onClick={() => onDecrement(index)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(index)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Precio total */}
                        <span className="text-sm font-bold text-slate-900 font-display">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout button */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Envío</span>
                    <span className="text-emerald-600 font-medium">¡Gratis a nivel nacional!</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2" />
                  <div className="flex justify-between text-base font-bold text-slate-900 font-display">
                    <span>Total Estimado</span>
                    <span className="text-brand-blue">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  id="checkout-trigger-btn"
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  Proceder al Checkout
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Completa tus datos en el siguiente paso para enviar tu orden por WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
