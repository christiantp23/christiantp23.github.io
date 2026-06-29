/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, User, Phone, MapPin, CreditCard, Sparkles, CheckCircle, Building, FileText, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CheckoutData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    cedula: '',
    observaciones: '',
    paymentMethod: 'bold_tarjeta',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format currency helper
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method: 'bold_tarjeta' | 'transferencia') => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.cedula) {
      return;
    }

    setIsSubmitting(true);

    // Format payment method text
    const paymentMethodText =
      formData.paymentMethod === 'bold_tarjeta'
        ? 'Tarjeta de Crédito/Débito (Pasarela Segura Bold)'
        : 'Transferencia Bancaria (Bancolombia, Nequi, Daviplata, Nu o Lulo)';

    // Compile WhatsApp message
    let message = `👟 *¡NUEVO PEDIDO - TRESPA STORE!* 👟\n\n`;
    message += `Hola *Trespa Store*, acabo de realizar un pedido desde la tienda online. Aquí están mis detalles:\n\n`;
    
    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• *Nombre:* ${formData.fullName.trim()}\n`;
    message += `• *Cédula:* ${formData.cedula.trim()}\n`;
    message += `• *Celular:* ${formData.phone.trim()}\n`;
    message += `• *Ciudad:* ${formData.city.trim()}\n`;
    message += `• *Dirección:* ${formData.address.trim()}\n`;
    message += `• *Método de Pago:* ${paymentMethodText}\n`;
    if (formData.observaciones?.trim()) {
      message += `• *Observaciones:* ${formData.observaciones.trim()}\n`;
    }
    message += `\n`;

    message += `📦 *PRODUCTOS SOLICITADOS:*\n`;
    cartItems.forEach((item) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `• *${item.quantity}x* ${item.product.name}\n`;
      message += `   - Talla: ${item.selectedSize}\n`;
      message += `   - Color: ${item.selectedColor}\n`;
      message += `   - Precio unitario: ${formatPrice(item.product.price)}\n`;
      message += `   - Subtotal: ${formatPrice(itemSubtotal)}\n\n`;
    });

    message += `💵 *RESUMEN DE COMPRA:*\n`;
    message += `• *Subtotal:* ${formatPrice(total)}\n`;
    message += `• *Envío:* ¡GRATIS! 🇨🇴\n`;
    message += `• *TOTAL A PAGAR:* ${formatPrice(total)}\n\n`;

    message += `💬 _Quedo atento(a) a la confirmación de mi pedido para iniciar el despacho. ¡Muchas gracias!_`;

    // Target Phone: 573008165725
    const waUrl = `https://wa.me/573008165725?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      // Open in a new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleFinish = () => {
    onOrderSuccess();
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={isSuccess ? undefined : onClose}
            className="fixed inset-0 bg-slate-900 z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              id="checkout-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100 flex flex-col relative"
            >
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-sky/10 flex items-center justify-center text-brand-blue">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900">
                        Finalizar Pedido
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Nombre Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Camilo Torres"
                        className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Cédula and Celular Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Cédula */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          Cédula de Ciudadanía <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleChange}
                          required
                          placeholder="Ej: 10203040"
                          className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          Número de Celular <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Ej: 3001234567"
                          className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Ciudad and Dirección Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Ciudad */}
                      <div className="sm:col-span-1 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          Ciudad / Municipio <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Medellín"
                          className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>

                      {/* Address */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Dirección de Entrega <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Calle 45 #12-34, Apto 301"
                          className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Observaciones (Opcional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        Observaciones / Notas (Opcional)
                      </label>
                      <textarea
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Ej: Dejar en portería, color de cordones adicional, etc."
                        className="w-full text-sm px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        Método de Pago <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handlePaymentMethodChange('bold_tarjeta')}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                            formData.paymentMethod === 'bold_tarjeta'
                              ? 'border-brand-blue bg-brand-sky/10 text-slate-900 ring-2 ring-brand-sky/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                          }`}
                        >
                          <span className="text-xs font-bold font-display flex items-center gap-1.5">
                            💳 Pago con Tarjeta (Bold)
                          </span>
                          <span className="text-[10px] text-slate-500 leading-tight">
                            Paga de forma 100% segura con tu tarjeta débito/crédito vía link de Bold.
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePaymentMethodChange('transferencia')}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                            formData.paymentMethod === 'transferencia'
                              ? 'border-brand-blue bg-brand-sky/10 text-slate-900 ring-2 ring-brand-sky/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                          }`}
                        >
                          <span className="text-xs font-bold font-display flex items-center gap-1.5">
                            🏦 Transferencia Directa
                          </span>
                          <span className="text-[10px] text-slate-500 leading-tight">
                            Bancolombia, Nequi, Daviplata, Nu o Lulo. Envías el comprobante.
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Order summary small banner */}
                    <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Total a pagar
                        </span>
                        <p className="text-lg font-bold font-display text-slate-900">
                          {formatPrice(total)}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                        Envío Gratis Incluido
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue/95 disabled:bg-brand-blue/50 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-brand-blue/10 hover:shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Confirmar y Enviar a WhatsApp'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success View */
                <div className="p-8 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                    ¡Orden Enviada Exitosamente!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                    Hemos abierto tu chat de WhatsApp con los detalles del pedido pre-cargados para que termines tu compra con nuestro agente. Si no abrió automáticamente, por favor revisa las pestañas de tu navegador.
                  </p>

                  <button
                    type="button"
                    onClick={handleFinish}
                    className="w-full max-w-xs py-3 rounded-2xl bg-slate-900 hover:bg-brand-blue text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    Entendido, Volver a la Tienda
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
