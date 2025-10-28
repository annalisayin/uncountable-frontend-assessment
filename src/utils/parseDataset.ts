export type Experiment = {
  id: string;
  inputs: Record<string, number>;
  outputs: Record<string, number>;
};

export function parseDataset(raw: Record<string, any>): Experiment[] {
  return Object.entries(raw).map(([id, payload]) => ({
    id,
    inputs: payload.inputs || {},
    outputs: payload.outputs || {},
  }));
}

export function listNumericKeys(data: Experiment[]) {
  const inputKeys = new Set<string>();
  const outputKeys = new Set<string>();
  data.forEach((d) => {
    Object.entries(d.inputs).forEach(([k, v]) => {
      if (typeof v === "number" && !Number.isNaN(v)) inputKeys.add(k);
    });
    Object.entries(d.outputs).forEach(([k, v]) => {
      if (typeof v === "number" && !Number.isNaN(v)) outputKeys.add(k);
    });
  });
  return {
    inputKeys: Array.from(inputKeys).sort(),
    outputKeys: Array.from(outputKeys).sort(),
  };
}
