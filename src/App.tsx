import React, { useEffect, useMemo, useState } from "react";
import datasetRaw from "./data/dataset.json";
import { parseDataset, listNumericKeys } from "./utils/parseDataset";
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

  // Filtering controls
  const [filterKey, setFilterKey] = useState<string | undefined>(undefined);
  const [filterMin, setFilterMin] = useState<string | undefined>(undefined);
  const [filterMax, setFilterMax] = useState<string | undefined>(undefined);
  const [pointCount, setPointCount] = useState<number>(0);

  // helper to read a prefixed key from an experiment
  function safeGet(ex: any, prefixedKey?: string): number | null {
    if (!prefixedKey) return null;
    const [t, key] = prefixedKey.split(":");
    if (t === "i") return ex.inputs[key] ?? null;
    return ex.outputs[key] ?? null;
  }

  // compute filtered dataset (applies optional measurement filter) and visible point count
  const filteredData = useMemo(() => {
    let fd = data.slice();
    if (filterKey) {
      const min =
        filterMin !== undefined && filterMin !== ""
          ? Number(filterMin)
          : undefined;
      const max =
        filterMax !== undefined && filterMax !== ""
          ? Number(filterMax)
          : undefined;
      fd = fd.filter((d) => {
        const v = safeGet(d, filterKey);
        if (v === null || v === undefined) return false;
        if (min !== undefined && !Number.isNaN(min) && v < min) return false;
        if (max !== undefined && !Number.isNaN(max) && v > max) return false;
        return true;
      });
    }
    return fd;
  }, [data, filterKey, filterMin, filterMax]);

  useEffect(() => {
    // compute how many points will actually appear on the scatter (x and y present)
    const count = filteredData
      .map((d) => ({
        x: safeGet(d, xSelection),
        y: safeGet(d, ySelection),
      }))
      .filter((p) => p.x !== null && p.y !== null).length;
    setPointCount(count);
  }, [filteredData, xSelection, ySelection]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-8">
        <header className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Uncountable — Data Explorer
            </h1>
            <p className="text-sm text-gray-600">
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
              filterKey={filterKey}
              filterMin={filterMin}
              filterMax={filterMax}
              pointCount={pointCount}
              options={{ inputs: inputKeys, outputs: outputKeys }}
              onChange={(c) => {
                if (c.x !== undefined) setXSelection(c.x || "");
                if (c.y !== undefined) setYSelection(c.y || "");
                if (c.filterKey !== undefined)
                  setFilterKey(c.filterKey || undefined);
                if (c.filterMin !== undefined)
                  setFilterMin(c.filterMin || undefined);
                if (c.filterMax !== undefined)
                  setFilterMax(c.filterMax || undefined);
              }}
            />

            <div className="mt-4 bg-white p-4 rounded-xl shadow">
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
                Filter key:{" "}
                <span className="font-medium">
                  {filterKey ? prettyLabel(filterKey) : "—"}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-white p-4 rounded-xl shadow text-sm text-gray-600">
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

          <div className="md:col-span-3">
            <ScatterPlot
              data={filteredData}
              xKey={xSelection}
              yKey={ySelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
