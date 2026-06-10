import { useState } from 'react';
import clsx from 'clsx';
import { Star, Hash } from 'lucide-react';

type MultiplicationTableProps = {
  number: number;
  upTo: number;
};

type TableRow = {
  multiplier: number;
  multiplicand: number;
  product: number;
};

export default function MultiplicationTable({ number, upTo }: MultiplicationTableProps) {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  const rows: TableRow[] = Array.from({ length: upTo }, (_, i) => ({
    multiplier: number,
    multiplicand: i + 1,
    product: number * (i + 1),
  }));

  const isSpecial = (product: number) => product % 10 === 0 || product % 7 === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Hash className="text-indigo-400" size={20} />
          <span className="text-slate-300 font-medium">{upTo} entries</span>
        </div>
        <button
          onClick={() => setShowGrid((v) => !v)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
            showGrid
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          )}
        >
          <Star size={16} />
          {showGrid ? 'List View' : 'Grid View'}
        </button>
      </div>

      {showGrid ? (
        <GridView rows={rows} highlightedRow={highlightedRow} setHighlightedRow={setHighlightedRow} isSpecial={isSpecial} />
      ) : (
        <ListView rows={rows} highlightedRow={highlightedRow} setHighlightedRow={setHighlightedRow} isSpecial={isSpecial} />
      )}

      {/* Fun fact */}
      <div className="mt-2 p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 text-center">
        <span className="text-indigo-300 text-sm">
          💡 <strong>Fun fact:</strong> 7 is a prime number and appears in many natural patterns — days of the week, musical notes, rainbow colors!
        </span>
      </div>
    </div>
  );
}

type ViewProps = {
  rows: TableRow[];
  highlightedRow: number | null;
  setHighlightedRow: (v: number | null) => void;
  isSpecial: (product: number) => boolean;
};

function ListView({ rows, highlightedRow, setHighlightedRow, isSpecial }: ViewProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
      {/* Table header */}
      <div className="grid grid-cols-4 bg-indigo-600/20 border-b border-slate-700/50 text-slate-400 text-xs font-bold uppercase tracking-widest px-6 py-3">
        <span>#</span>
        <span className="text-center">Multiplier</span>
        <span className="text-center">×</span>
        <span className="text-right">Product</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.multiplicand}
          onMouseEnter={() => setHighlightedRow(row.multiplicand)}
          onMouseLeave={() => setHighlightedRow(null)}
          className={clsx(
            'grid grid-cols-4 items-center px-6 py-3.5 transition-all duration-150 cursor-pointer border-b border-slate-800/50 last:border-0',
            highlightedRow === row.multiplicand
              ? 'bg-indigo-600/25 scale-[1.005]'
              : row.multiplicand % 2 === 0
              ? 'bg-slate-900/60'
              : 'bg-slate-900/30',
            isSpecial(row.product) && highlightedRow !== row.multiplicand && 'border-l-2 border-l-amber-500/60'
          )}
        >
          <span className="text-slate-500 text-sm font-mono">{row.multiplicand}</span>
          <span
            className={clsx(
              'text-center text-xl font-bold',
              highlightedRow === row.multiplicand ? 'text-indigo-300' : 'text-slate-200'
            )}
          >
            {row.multiplier} × {row.multiplicand}
          </span>
          <span className="text-center text-slate-400 text-sm">=</span>
          <span
            className={clsx(
              'text-right text-2xl font-extrabold font-mono',
              isSpecial(row.product)
                ? 'text-amber-400'
                : highlightedRow === row.multiplicand
                ? 'text-white'
                : 'text-indigo-300'
            )}
          >
            {row.product}
            {isSpecial(row.product) && (
              <span className="ml-1 text-xs align-super text-amber-500">★</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function GridView({ rows, highlightedRow, setHighlightedRow, isSpecial }: ViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {rows.map((row) => (
        <div
          key={row.multiplicand}
          onMouseEnter={() => setHighlightedRow(row.multiplicand)}
          onMouseLeave={() => setHighlightedRow(null)}
          className={clsx(
            'relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer group',
            highlightedRow === row.multiplicand
              ? 'bg-indigo-600/30 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105'
              : isSpecial(row.product)
              ? 'bg-amber-900/20 border-amber-700/40 hover:border-amber-500/60'
              : 'bg-slate-800/60 border-slate-700/50 hover:border-slate-500/60'
          )}
        >
          <span className="text-slate-500 text-xs mb-1">7 × {row.multiplicand}</span>
          <span
            className={clsx(
              'text-3xl font-black font-mono',
              isSpecial(row.product)
                ? 'text-amber-400'
                : highlightedRow === row.multiplicand
                ? 'text-white'
                : 'text-indigo-300'
            )}
          >
            {row.product}
          </span>
          {isSpecial(row.product) && (
            <span className="absolute top-2 right-2 text-amber-400 text-xs">★</span>
          )}
        </div>
      ))}
    </div>
  );
}
