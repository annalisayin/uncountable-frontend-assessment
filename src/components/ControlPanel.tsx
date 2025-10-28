import React from "react";

export default function ControlPanel({
  xSelection,
  ySelection,
  options,
  filterKey,
  filterMin,
  filterMax,
  pointCount,
  onChange,
}: {
  xSelection: string;
  ySelection: string;
  filterKey?: string;
  filterMin?: string;
  filterMax?: string;
  pointCount?: number;
  options: { inputs: string[]; outputs: string[] };
  onChange: (
    changes: Partial<{
      x: string;
      y: string;
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
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow w-full">
  <div className="flex gap-4 flex-wrap items-center">
        <div className="flex flex-col min-w-0">
          <label className="text-sm">X axis</label>
          <select
            value={xSelection}
            onChange={(e) => onChange({ x: e.target.value })}
            className="p-2 rounded border w-full max-w-xs"
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
          <label className="text-sm">Y axis</label>
          <select
            value={ySelection}
            onChange={(e) => onChange({ y: e.target.value })}
            className="p-2 rounded border w-full max-w-xs"
          >
            <option value="">Select Y</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-500">
          Points: <span className="font-medium">{pointCount ?? "—"}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <label className="text-sm">Filter key</label>
          <select
            aria-label="Filter key"
            value={filterKey ?? ""}
            onChange={(e) => onChange({ filterKey: e.target.value || undefined })}
            className="p-2 rounded border w-full max-w-xs"
          >
            <option value="">(no filter)</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Min</label>
            <input
              aria-label="Filter minimum"
              type="number"
              value={filterMin ?? ""}
              onChange={(e) => onChange({ filterMin: e.target.value })}
              className="p-2 rounded border w-full max-w-xs"
              placeholder="min"
            />
          </div>
          <div>
            <label className="text-sm">Max</label>
            <input
              aria-label="Filter maximum"
              type="number"
              value={filterMax ?? ""}
              onChange={(e) => onChange({ filterMax: e.target.value })}
              className="p-2 rounded border w-full max-w-xs"
              placeholder="max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
