import React from "react";

export default function ControlPanel({
  xSelection,
  ySelection,
  colorSelection,
  options,
  onChange,
}: {
  xSelection: string;
  ySelection: string;
  colorSelection?: string;
  options: { inputs: string[]; outputs: string[] };
  onChange: (
    changes: Partial<{ x: string; y: string; color?: string }>
  ) => void;
}) {
  const allOptions = [
    ...options.inputs.map((k) => ({ label: `Input: ${k}`, value: `i:${k}` })),
    ...options.outputs.map((k) => ({ label: `Output: ${k}`, value: `o:${k}` })),
  ];

  return (
    <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-md w-full">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex flex-col">
          <label className="text-sm text-slate-700">X axis</label>
          <select
            value={xSelection}
            onChange={(e) => onChange({ x: e.target.value })}
            className="p-2 rounded border"
          >
            <option value="">Select X</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-slate-700">Y axis</label>
          <select
            value={ySelection}
            onChange={(e) => onChange({ y: e.target.value })}
            className="p-2 rounded border"
          >
            <option value="">Select Y</option>
            {allOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-slate-700">Color by (optional)</label>
          <select
            value={colorSelection ?? ""}
            onChange={(e) => onChange({ color: e.target.value })}
            className="p-2 rounded border"
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
          Points:{" "}
          <span className="font-medium" id="point-count">
            {" "}
          </span>
        </div>
      </div>
    </div>
  );
}
