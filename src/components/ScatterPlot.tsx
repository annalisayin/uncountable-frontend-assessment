import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Experiment } from "../utils/parseDataset";

function safeGet(ex: Experiment, prefixedKey: string): number | null {
  // prefixedKey format: 'i:Polymer 1' or 'o:Viscosity'
  if (!prefixedKey) return null;
  const [t, key] = prefixedKey.split(":");
  if (t === "i") return ex.inputs[key] ?? null;
  return ex.outputs[key] ?? null;
}

export default function ScatterPlot({
  data,
  xKey,
  yKey,
}: {
  data: Experiment[];
  xKey: string;
  yKey: string;
}) {
  const points = useMemo(
    () =>
      data
        .map((d) => ({
          id: d.id,
          x: safeGet(d, xKey),
          y: safeGet(d, yKey),
          inputs: d.inputs,
          outputs: d.outputs,
        }))
        .filter((p) => p.x !== null && p.y !== null),
    [data, xKey, yKey]
  );

  return (
  <div className="bg-white p-4 rounded-xl shadow h-[520px] border">
      {!xKey || !yKey ? (
        <div className="flex h-full items-center justify-center text-slate-500">
          Select X and Y to begin
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name={xKey}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yKey}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }: any) => {
                if (!active || !payload || !payload.length) return null;
                const p = payload[0].payload;
                return (
                  <div className="bg-white shadow rounded p-3 text-sm">
                    <div className="font-medium">{p.id}</div>
                    <div>X: {p.x}</div>
                    <div>Y: {p.y}</div>
                    {p.color !== undefined && <div>Color: {p.color}</div>}
                    <div className="mt-2 font-semibold">Inputs</div>
                    <div className="max-h-28 overflow-auto text-xs">
                      {Object.entries(p.inputs).map(([k, v]) => (
                        <div key={k}>
                          {k}: {String(v)}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 font-semibold">Outputs</div>
                    <div className="text-xs">
                      {Object.entries(p.outputs).map(([k, v]) => (
                        <div key={k}>
                          {k}: {String(v)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
            />

            <Scatter
              name="Experiments"
              data={points}
              line={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
