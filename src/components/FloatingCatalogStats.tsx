import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, X, BarChart2, Check, AlertTriangle, Layers, Award, Sparkles, Plus, RefreshCw, Eye } from 'lucide-react';
import { SNEAKER_PRODUCTS } from '../data';

export default function FloatingCatalogStats() {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Calcular estadísticas generales del catálogo
    const totalProducts = SNEAKER_PRODUCTS.length;
    const activeProducts = SNEAKER_PRODUCTS.filter((p) => !p.isOutOfStock).length;
    const outOfStockProducts = SNEAKER_PRODUCTS.filter((p) => p.isOutOfStock).length;

    // 2. Distribución por Géneros (Dama, Hombre, Unisex)
    const countDama = SNEAKER_PRODUCTS.filter((p) => p.gender === 'Dama').length;
    const countCaballero = SNEAKER_PRODUCTS.filter((p) => p.gender === 'Caballero').length;
    const countUnisex = SNEAKER_PRODUCTS.filter((p) => p.gender === 'Unisex').length;

    const percentDama = totalProducts > 0 ? Math.round((countDama / totalProducts) * 100) : 0;
    const percentCaballero = totalProducts > 0 ? Math.round((countCaballero / totalProducts) * 100) : 0;
    const percentUnisex = totalProducts > 0 ? Math.round((countUnisex / totalProducts) * 100) : 0;

    // 3. Distribución por Marcas y Género
    const brandStats: Record<string, { total: number; dama: number; caballero: number; unisex: number }> = {};
    SNEAKER_PRODUCTS.forEach((p) => {
        if (p.brand) {
            if (!brandStats[p.brand]) {
                brandStats[p.brand] = { total: 0, dama: 0, caballero: 0, unisex: 0 };
            }
            brandStats[p.brand].total += 1;
            if (p.gender === 'Dama') {
                brandStats[p.brand].dama += 1;
            } else if (p.gender === 'Caballero') {
                brandStats[p.brand].caballero += 1;
            } else if (p.gender === 'Unisex') {
                brandStats[p.brand].unisex += 1;
            }
        }
    });

    // Ordenar marcas de mayor a menor total
    const sortedBrandStats = Object.entries(brandStats).sort((a, b) => b[1].total - a[1].total);

    // 4. Diagnóstico de Equilibrio y Recomendaciones Matemáticas
    const totalGenderBound = countDama + countCaballero;
    const ratioDama = totalGenderBound > 0 ? countDama / totalGenderBound : 0.5;
    const isBalanced = ratioDama >= 0.4 && ratioDama <= 0.6;
    const diff = Math.abs(countDama - countCaballero);

    let balanceMessage = '';
    let balanceType: 'success' | 'warning' | 'info' = 'success';
    let recommendationAction = '';

    if (totalProducts === 0) {
        balanceMessage = 'El catálogo está vacío actualmente.';
        balanceType = 'warning';
        recommendationAction = 'Carga tus primeros tenis en data.ts para comenzar el análisis.';
    } else if (isBalanced) {
        balanceMessage = '¡Catálogo perfectamente balanceado! Proporción saludable (40% - 60%) entre modelos de Dama y Caballero.';
        balanceType = 'success';
        recommendationAction = '¡Listo para publicar! No se requieren modificaciones de inventario.';
    } else if (countDama > countCaballero) {
        balanceMessage = `Desbalance de género detectado: Hay más modelos de Dama que de Caballero.`;
        balanceType = 'warning';
        recommendationAction = `Sugerencia: Añade al menos ${diff} modelo(s) de Caballero para equilibrar la oferta y aumentar ventas masculinas.`;
    } else {
        balanceMessage = `Desbalance de género detectado: Hay más modelos de Caballero que de Dama.`;
        balanceType = 'warning';
        recommendationAction = `Sugerencia: Añade al menos ${diff} modelo(s) de Dama para equilibrar la oferta y captar el público femenino.`;
    }

    return (
        <div className="fixed bottom-6 left-6 z-45 flex flex-col items-start font-sans">
            {/* Botón flotante */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 ${isOpen
                        ? 'bg-slate-950 text-white focus:ring-slate-800 border border-slate-800'
                        : isBalanced
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-100'
                        }`}
                    title="Ver balanceador del catálogo"
                    id="btn-floating-stats"
                >
                    {isOpen ? (
                        <X className="w-5 h-5 transition-transform duration-300" />
                    ) : (
                        <>
                            {/* Anillo pulsante de advertencia o éxito */}
                            <span className={`absolute inset-0 rounded-full opacity-30 animate-ping group-hover:animate-none pointer-events-none ${isBalanced ? 'bg-emerald-500' : 'bg-indigo-500'
                                }`} />
                            <Scale className="w-5 h-5 relative z-10 animate-pulse" />
                        </>
                    )}
                </button>

                {/* Notificación flotante miniatura */}
                {!isOpen && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-bold py-2 px-3.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none border border-slate-800">
                        <span className={`w-2.5 h-2.5 rounded-full ${isBalanced ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                        <span>Balanceador de Stock</span>
                        <span className="bg-indigo-500/25 text-indigo-300 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-black">Temp</span>
                    </div>
                )}
            </div>

            {/* Panel desplegable con estadísticas de balance */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.93 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="absolute bottom-20 left-0 w-[335px] sm:w-[380px] bg-slate-950 text-slate-100 border border-slate-800/80 rounded-[28px] p-5 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden"
                    >
                        {/* Cabecera del panel */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <BarChart2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                                            Auditor de Catálogo
                                        </h4>
                                        <span className="bg-indigo-500/20 text-indigo-300 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider border border-indigo-500/10">
                                            Temporal
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Equilibrio antes de producción</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[385px] overflow-y-auto pr-1 scrollbar-thin">
                            {/* Sección 1: Tarjetas de Resumen Rápido */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-2xl text-center">
                                    <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Totales</span>
                                    <span className="text-xl font-black text-white mt-1 block">{totalProducts}</span>
                                    <span className="block text-[8px] text-slate-400 font-medium mt-0.5">Diseños</span>
                                </div>
                                <div className="bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded-2xl text-center">
                                    <span className="block text-[9px] font-black text-emerald-400 uppercase tracking-widest">Disponibles</span>
                                    <span className="text-xl font-black text-emerald-300 mt-1 block">{activeProducts}</span>
                                    <span className="block text-[8px] text-emerald-500/80 font-medium mt-0.5">En Stock</span>
                                </div>
                                <div className="bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-2xl text-center">
                                    <span className="block text-[9px] font-black text-rose-400 uppercase tracking-widest">Agotados</span>
                                    <span className="text-xl font-black text-rose-300 mt-1 block">{outOfStockProducts}</span>
                                    <span className="block text-[8px] text-rose-500/80 font-medium mt-0.5">Ocultos</span>
                                </div>
                            </div>

                            {/* Sección 2: Distribución de Géneros */}
                            <div className="space-y-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
                                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> Distribución de Líneas (Género)
                                </span>

                                {/* Dama */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-300 font-bold flex items-center gap-1.5">🌸 Dama</span>
                                        <span className="text-slate-200 font-black">{countDama} <span className="text-slate-500 font-medium">({percentDama}%)</span></span>
                                    </div>
                                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/40">
                                        <div className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full transition-all duration-500" style={{ width: `${percentDama}%` }} />
                                    </div>
                                </div>

                                {/* Caballero */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-300 font-bold flex items-center gap-1.5">⚡ Caballero</span>
                                        <span className="text-slate-200 font-black">{countCaballero} <span className="text-slate-500 font-medium">({percentCaballero}%)</span></span>
                                    </div>
                                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/40">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full transition-all duration-500" style={{ width: `${percentCaballero}%` }} />
                                    </div>
                                </div>

                                {/* Unisex */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-300 font-bold flex items-center gap-1.5">🌍 Unisex</span>
                                        <span className="text-slate-200 font-black">{countUnisex} <span className="text-slate-500 font-medium">({percentUnisex}%)</span></span>
                                    </div>
                                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/40">
                                        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500" style={{ width: `${percentUnisex}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Sección 3: Distribución de Marcas */}
                            <div className="space-y-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
                                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Award className="w-3.5 h-3.5 text-indigo-400" /> Presencia de Marcas por Género
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                    {sortedBrandStats.map(([brand, stats]) => {
                                        const pct = Math.round((stats.total / totalProducts) * 100);
                                        return (
                                            <div key={brand} className="bg-slate-900/80 border border-slate-800/60 p-2.5 rounded-xl flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-200">{brand}</span>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs font-black text-white">{stats.total}</span>
                                                        <span className="text-[9px] text-slate-500 font-semibold">({pct}%)</span>
                                                    </div>
                                                </div>

                                                {/* Pequeños contadores por género */}
                                                <div className="flex items-center gap-2 text-[10px] font-extrabold border-t border-slate-800/40 pt-1.5 mt-0.5">
                                                    {stats.dama > 0 && (
                                                        <span className="text-pink-400 flex items-center gap-0.5" title={`${stats.dama} de Dama`}>
                                                            <span className="text-[9px]">🌸</span> {stats.dama}
                                                        </span>
                                                    )}
                                                    {stats.caballero > 0 && (
                                                        <span className="text-blue-400 flex items-center gap-0.5" title={`${stats.caballero} de Caballero`}>
                                                            <span className="text-[9px]">⚡</span> {stats.caballero}
                                                        </span>
                                                    )}
                                                    {stats.unisex > 0 && (
                                                        <span className="text-amber-400 flex items-center gap-0.5" title={`${stats.unisex} Unisex`}>
                                                            <span className="text-[9px]">🌍</span> {stats.unisex}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sección 4: Reporte de Auditoría y Consejo Inteligente */}
                            <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex flex-col gap-2 ${balanceType === 'success'
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                                : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                                }`}>
                                <div className="flex items-start gap-2.5">
                                    {balanceType === 'success' ? (
                                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertTriangle className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                                    )}
                                    <div className="space-y-1">
                                        <span className="font-extrabold uppercase text-[10px] tracking-widest block">Diagnóstico</span>
                                        <p className="font-medium text-[11px] text-slate-200">{balanceMessage}</p>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-slate-800/40 my-1" />

                                <div className="flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                    <div className="space-y-0.5">
                                        <span className="font-extrabold uppercase text-[10px] tracking-widest block text-indigo-400">Plan de Acción</span>
                                        <p className="text-[11px] font-semibold text-slate-300">{recommendationAction}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer con recordatorio temporal */}
                        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                            <span>Trespa Store Audit Tool</span>
                            <span className="text-slate-600">v1.0.4</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

