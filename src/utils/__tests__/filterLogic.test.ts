import { describe, it, expect } from 'vitest';
import { parseDataset } from '../parseDataset';

const raw = {
  exp1: { inputs: { A: 1, B: 2 }, outputs: { X: 10, Y: 20 } },
  exp2: { inputs: { A: 3, B: 4 }, outputs: { X: 30, Y: 40 } },
  exp3: { inputs: { A: 5, B: 6 }, outputs: { X: 50, Y: 60 } },
};

function safeGet(ex: { id?: string; inputs: any; outputs: any; }, prefixedKey: string) {
  if (!prefixedKey) return null;
  const [t, key] = prefixedKey.split(':');
  if (t === 'i') return ex.inputs[key] ?? null;
  return ex.outputs[key] ?? null;
}

describe('filtering logic', () => {
  const data = parseDataset(raw);

  it('filters by input key and min/max', () => {
    const filterKey = 'i:A';
    const min = 2;
    const max = 5;
    const filtered = data.filter((d) => {
      const v = safeGet(d, filterKey);
      if (v === null || v === undefined) return false;
      if (min !== undefined && v < min) return false;
      if (max !== undefined && v > max) return false;
      return true;
    });
    expect(filtered.map((d) => d.id)).toEqual(['exp2', 'exp3']);
  });

  it('filters by output key and min only', () => {
    const filterKey = 'o:X';
    const min = 20;
    const filtered = data.filter((d) => {
      const v = safeGet(d, filterKey);
      if (v === null || v === undefined) return false;
      if (min !== undefined && v < min) return false;
      return true;
    });
    expect(filtered.map((d) => d.id)).toEqual(['exp2', 'exp3']);
  });

  it('returns all if no filter', () => {
    const filtered = data.filter(() => true);
    expect(filtered.length).toBe(3);
  });
});
