import { describe, expect, it } from "vitest";
import { createEmptyOperationalState } from "../../src/domain/operational-state/create-empty-operational-state.js";

describe("VS-01 — estado operativo vacío", () => {
  it("crea un estado operativo vacío y válido", () => {
    const state = createEmptyOperationalState();

    expect(state).toEqual({
      schemaVersion: 1,
      clients: [],
      debts: [],
      payments: [],
      reversals: [],
    });
  });
});
