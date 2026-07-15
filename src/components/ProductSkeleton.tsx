import { motion } from 'motion/react';

export default function ProductSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 p-4 shadow-sm flex flex-col h-full animate-pulse space-y-4"
        >
            {/* Contenedor de Imagen de Producto */}
            <div className="relative aspect-square w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />

                {/* Placeholder de Tenis icon o silueta */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="w-16 h-16 text-slate-200"
                >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>

                {/* Badges falsos */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="h-5 w-14 bg-slate-200 rounded-full" />
                </div>
                <div className="absolute top-3 right-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                </div>
            </div>

            {/* Cuerpo del Producto */}
            <div className="flex-1 space-y-3 px-1">
                {/* Fila superior: Marca y Estrellas */}
                <div className="flex items-center justify-between">
                    <div className="h-4 w-16 bg-slate-200 rounded-md" />
                    <div className="h-3 w-12 bg-slate-100 rounded-md" />
                </div>

                {/* Título de Referencia */}
                <div className="space-y-1.5">
                    <div className="h-5 w-4/5 bg-slate-200 rounded-md" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
                </div>

                {/* Tallas disponibles de muestra */}
                <div className="pt-1 flex items-center gap-1">
                    <div className="h-3 w-8 bg-slate-100 rounded-md" />
                    <div className="h-4 w-20 bg-slate-200 rounded-md" />
                </div>

                {/* Precio y Precios Originales */}
                <div className="pt-2 flex items-baseline gap-2">
                    <div className="h-6 w-24 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-12 bg-slate-100 rounded-md" />
                </div>
            </div>

            {/* Botones de acción en pie de tarjeta */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-50">
                <div className="col-span-4 h-10 bg-slate-200 rounded-xl" />
                <div className="col-span-1 h-10 bg-slate-100 rounded-xl" />
            </div>
        </motion.div>
    );
}