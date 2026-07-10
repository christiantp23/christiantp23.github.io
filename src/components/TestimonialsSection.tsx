import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Heart, Star, CheckCheck, Smile, Paperclip, Camera, Mic,
    Phone, Video, MoreVertical, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';

// =========================================================================
// 6. SECCIÓN DE TESTIMONIOS INTERACTIVA CON CARRUSEL (TestimonialsSection)
// =========================================================================
// Hemos transformado esta sección en un Carrusel Horizontal Interactivo.
//
// Conceptos clave de React & Vite que aprenderás aquí:
// 1. **Estado del Carrusel (`currentIndex`)**: Usamos un `useState` para recordar qué testimonio
//    se está mostrando actualmente en la pantalla.
// 2. **Cálculo de Desplazamiento Dinámico (Translación)**: Calculamos un porcentaje de desplazamiento
//    (por ejemplo, `currentIndex * -100%` en móvil) y lo aplicamos al contenedor usando CSS.
//    ¡React reaccionará al instante moviendo las tarjetas de forma súper fluida!
// 3. **Mapeo de Puntos de Navegación (Pagination Dots)**: Dibujamos pequeños botones circulares
//    en la parte inferior. Al hacer clic en un punto, actualizamos el `currentIndex` al índice correspondiente.
// 4. **Framer Motion para Animaciones**: Usamos `motion.div` para animar la transición del carrusel
//    y hacer que se sienta sumamente profesional, como una app nativa de celular.

interface ChatTestimonial {
    id: string;
    clientName: string;
    phoneColor: string; // Color para personalizar los botones físicos del celular mockup
    chatScreenshot: string; // Captura de pantalla real del chat de WhatsApp
}

export default function TestimonialsSection() {
    // 1. ESTADO DEL CARRUSEL: Almacena el índice de la tarjeta activa actual (0, 1, 2, etc.)
    const [currentIndex, setCurrentIndex] = useState(0);

    // Datos reales de los testimonios de WhatsApp. 
    // Nota: Puedes subir tus capturas de pantalla reales de WhatsApp a /public/images/ y cambiar estas rutas.
    const testimonials: ChatTestimonial[] = [
        {
            id: 'testimonial-1',
            clientName: 'Daniela Torres',
            phoneColor: 'bg-amber-400', // Botón amarillo
            chatScreenshot: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 'testimonial-2',
            clientName: 'Andrés Felipe (Bogotá)',
            phoneColor: 'bg-rose-500', // Botón rojo metálico
            chatScreenshot: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 'testimonial-3',
            clientName: 'Camilo Castrillón',
            phoneColor: 'bg-sky-500', // Botón azul metálico
            chatScreenshot: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
        }
    ];

    // 3. FUNCIONES DE NAVEGACIÓN DEL CARRUSEL
    // - handlePrev: Retrocede una posición. Si está en la primera (0), da la vuelta al final.
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    // - handleNext: Avanza una posición. Si está en la última, regresa al principio (0).
    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="testimonials-section" className="py-24 bg-slate-150 border-t border-slate-200 relative overflow-hidden">

            {/* Fondo decorativo con luces difuminadas (Glows) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Encabezado Principal */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-brand-blue font-mono text-xs font-black tracking-widest uppercase bg-blue-50 py-2 px-5 rounded-full border border-blue-100 shadow-xs">
                        📸 Evidencia Real y Transparente
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight mt-5">
                        ESTILO EN CADA PASO
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed max-w-2xl mx-auto">
                        ¡La prueba reina! Así se ven los chats de nuestros clientes cuando reciben sus zapatillas.
                        Desliza hacia la izquierda o derecha para ver las capturas de pantalla reales de WhatsApp.
                    </p>
                </div>

                {/* =========================================================================
           CONTENEDOR DE CARRUSEL CON BOTONES DE NAVEGACIÓN
           =========================================================================
           - Colocamos flechas absolutas a los lados en pantallas grandes para deslizar.
           - El contenedor principal tiene un ancho fijo centrado y desborde oculto (overflow-hidden)
             para que las tarjetas que estén a los lados no sean visibles.
        */}
                <div className="relative max-w-lg mx-auto px-4 sm:px-10 py-6">

                    {/* Botón de Retroceso (Izquierda) */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-[-15px] sm:left-[-35px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-blue border border-slate-200 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Anterior testimonio"
                    >
                        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Botón de Avance (Derecha) */}
                    <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-[-15px] sm:right-[-35px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-blue border border-slate-200 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Siguiente testimonio"
                    >
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Ventana de visualización del Carrusel */}
                    <div className="overflow-hidden rounded-[36px] p-2">
                        {/* 
              Contenedor Deslizable de Framer Motion.
              - Animamos la propiedad `x` (eje horizontal) basada en el `currentIndex`.
              - El valor se calcula dinámicamente multiplicando el índice por -100%.
              - Usamos una transición tipo "spring" (resorte) para que tenga un rebote físico ultra suave y natural.
            */}
                        <motion.div
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                            className="flex w-full"
                        >
                            {testimonials.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="w-full shrink-0 flex justify-center px-2"
                                >
                                    {/* =========================================================================
                     MOCKUP DE CELULAR REALISTA (Para el Carrusel)
                     ========================================================================= */}
                                    <div className="relative w-full max-w-[315px] transition-all duration-300">

                                        {/* Botones Físicos Izquierdos (Volumen) */}
                                        <div className="absolute top-28 -left-2.5 w-1 h-12 bg-slate-800 rounded-l-md z-10" />
                                        <div className="absolute top-44 -left-2.5 w-1 h-12 bg-slate-800 rounded-l-md z-10" />

                                        {/* Botón Físico Derecho (Encendido / Botón Amarillo Personalizado) */}
                                        <div className={`absolute top-32 -right-2.5 w-1 h-16 ${chat.phoneColor} rounded-r-md z-10 shadow-sm transition-colors`} />

                                        {/* Chasis Exterior del Celular */}
                                        <div className="relative rounded-[48px] border-[10px] border-slate-900 bg-slate-950 p-1 shadow-2xl ring-1 ring-slate-900/10 overflow-hidden">

                                            {/* Cámara Frontal / Notch Dinámico */}
                                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-slate-950 rounded-full z-40 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800/40 mr-1.5 flex items-center justify-center">
                                                    <div className="w-1 h-1 rounded-full bg-blue-900/50" />
                                                </div>
                                                <div className="w-8 h-0.5 bg-slate-800 rounded-full" />
                                            </div>

                                            {/* Pantalla del Celular */}
                                            <div className="relative rounded-[38px] overflow-hidden bg-slate-950 h-[520px]">

                                                {/* Brillo de Cristal Reflejado */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30" />

                                                {/* Imagen del Chat Real */}
                                                <img
                                                    src={chat.chatScreenshot}
                                                    alt={`Chat de ${chat.clientName}`}
                                                    className="w-full h-full object-cover select-none"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* =========================================================================
           PUNTOS INDICADORES DE NAVEGACIÓN (Pagination Dots)
           =========================================================================
           - Mostramos un círculo por cada testimonio.
           - El punto correspondiente al currentIndex activo se verá más ancho y azul
             para dar feedback visual inmediato al usuario de en qué página se encuentra.
        */}
                <div className="flex justify-center items-center gap-2.5 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === index
                                    ? 'w-7 bg-brand-blue shadow-xs shadow-blue-500/20'
                                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Ir al testimonio ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Letras gigantes decorativas en la parte inferior */}
                <div className="text-center mt-12 select-none pointer-events-none opacity-15">
                    <h3 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-widest text-brand-yellow">
                        TRESPA STORE
                    </h3>
                </div>

                {/* Footer interior de testimonios */}
                <div className="text-center mt-8">
                    <p className="text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                        <span>Únete a los más de</span>
                        <span className="text-slate-900 bg-white border border-slate-150 py-0.5 px-2 rounded-md shadow-xs font-bold">1,500+ clientes</span>
                        <span>satisfechos en toda Colombia 🇨🇴</span>
                    </p>
                </div>
            </div>
        </section>
    );
}