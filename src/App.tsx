import React, { useEffect, useMemo, useState } from "react";
import datasetRaw from "./data/dataset.json";
import {
  parseDataset,
  listNumericKeys,
} from "./utils/parseDataset";
import ControlPanel from "./components/ControlPanel";
import ScatterPlot from "./components/ScatterPlot";

function prettyLabel(prefixed: string) {
  if (!prefixed) return "";
  const [p, k] = prefixed.split(":");
  return p === "i" ? `Input: ${k}` : `Output: ${k}`;
}

function App() {
  const data = useMemo(() => parseDataset(datasetRaw as any), []);
  const { inputKeys, outputKeys } = useMemo(
    () => listNumericKeys(data),
    [data]
  );

  const [xSelection, setXSelection] = useState<string>("i:Polymer 1");
  const [ySelection, setYSelection] = useState<string>("o:Tensile Strength");
  const [colorSelection, setColorSelection] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // Update point count in control panel (simple DOM for clarity)
    const el = document.getElementById("point-count");
    if (!el) return;
    const valid = data.filter((d) => {
      const x =
        xSelection && xSelection.includes(":")
          ? xSelection.startsWith("i:")
            ? d.inputs[xSelection.slice(2)]
            : d.outputs[xSelection.slice(2)]
          : null;
      const y =
        ySelection && ySelection.includes(":")
          ? ySelection.startsWith("i:")
            ? d.inputs[ySelection.slice(2)]
            : d.outputs[ySelection.slice(2)]
          : null;
      return x !== undefined && y !== undefined && x !== null && y !== null;
    });
    el.textContent = String(valid.length);
  }, [data, xSelection, ySelection]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Uncountable — Scatterplot Explorer
            </h1>
            <p className="text-sm text-slate-500">
              Select variables (inputs or outputs) to visualize relationships
              across experiments.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-1">
            <ControlPanel
              xSelection={xSelection}
              ySelection={ySelection}
              colorSelection={colorSelection}
              options={{ inputs: inputKeys, outputs: outputKeys }}
              onChange={(c) => {
                if (c.x !== undefined) setXSelection(c.x || "");
                if (c.y !== undefined) setYSelection(c.y || "");
                if (c.color !== undefined)
                  setColorSelection(c.color || undefined);
              }}
            />

            <div className="mt-4 bg-white/60 p-4 rounded-2xl shadow">
              <h3 className="text-sm font-medium mb-2">Selections</h3>
              <div className="text-sm text-slate-600">
                X:{" "}
                <span className="font-medium">{prettyLabel(xSelection)}</span>
              </div>
              <div className="text-sm text-slate-600">
                Y:{" "}
                <span className="font-medium">{prettyLabel(ySelection)}</span>
              </div>
              <div className="text-sm text-slate-600">
                Color:{" "}
                <span className="font-medium">
                  {colorSelection ? prettyLabel(colorSelection) : "—"}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-white/60 p-4 rounded-2xl shadow text-sm text-slate-600">
              <div className="font-medium mb-2">Dataset stats</div>
              <div>
                Experiments: <span className="font-medium">{data.length}</span>
              </div>
              <div>
                Inputs: <span className="font-medium">{inputKeys.length}</span>
              </div>
              <div>
                Outputs:{" "}
                <span className="font-medium">{outputKeys.length}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ScatterPlot
              data={data}
              xKey={xSelection}
              yKey={ySelection}
              colorKey={colorSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
