import React from "react";

export default function ControlPanel({
  xSelection,
  ySelection,
  colorSelection,
  options,
  filterKey,
  filterMin,
  filterMax,
  pointCount,
  onChange,
}: {
  xSelection: string;
  ySelection: string;
  colorSelection?: string;
  filterKey?: string;
  filterMin?: string;
  filterMax?: string;
  pointCount?: number;
  options: { inputs: string[]; outputs: string[] };
  onChange: (
    changes: Partial<{
      x: string;
      y: string;
      color?: string;
      filterKey?: string;
      filterMin?: string;
      filterMax?: string;
    }>
  ) => void;
}) {
  const allOptions = [
    ...options.inputs.map((k) => ({ label: `Input: ${k}`, value: `i:${k}` })),
    ...options.outputs.map((k) => ({ label: `Output: ${k}`, value: `o:${k}` })),
  ];

  return (
    <div className="bg-white/90 dark:bg-slate-800/70 backdrop-blur p-4 rounded-2xl shadow-md border border-transparent dark:border-slate-700 w-full">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex flex-col min-w-0">
          <label className="text-sm text-slate-700">X axis</label>
          <select
            value={xSelection}
            onChange={(e) => onChange({ x: e.target.value })}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full max-w-xs bg-white dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Select X</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-0">
          <label className="text-sm text-slate-700">Y axis</label>
          <select
            value={ySelection}
            onChange={(e) => onChange({ y: e.target.value })}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full max-w-xs bg-white dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Select Y</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-0">
          <label className="text-sm text-slate-700">Color by (optional)</label>
          <select
            value={colorSelection ?? ""}
            onChange={(e) => onChange({ color: e.target.value })}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full max-w-xs bg-white dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">None</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-sm text-slate-500">
          Points: <span className="font-medium">{pointCount ?? "—"}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <label className="text-sm text-slate-700">Filter key</label>
          <select
            aria-label="Filter key"
            value={filterKey ?? ""}
            onChange={(e) => onChange({ filterKey: e.target.value || undefined })}
            className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 w-full bg-white dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">(no filter)</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-slate-700">Min</label>
            <input
              aria-label="Filter minimum"
              type="number"
              value={filterMin ?? ""}
              onChange={(e) => onChange({ filterMin: e.target.value })}
              className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 w-full bg-white dark:bg-slate-800 dark:text-slate-100"
              placeholder="min"
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Max</label>
            <input
              aria-label="Filter maximum"
              type="number"
              value={filterMax ?? ""}
              onChange={(e) => onChange({ filterMax: e.target.value })}
              className="mt-1 p-2 rounded-md border border-slate-200 dark:border-slate-700 w-full bg-white dark:bg-slate-800 dark:text-slate-100"
              placeholder="max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
