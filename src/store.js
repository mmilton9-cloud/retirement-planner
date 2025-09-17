import { create } from "zustand";
import { initialInputs } from "./initialData";
import CalculationEngine from "./calculationEngine";

const useStore = create((set, get) => ({
  inputs: initialInputs,
  projection: [],
  scenarios: JSON.parse(localStorage.getItem("scenarios")) || {},
  activeScenario: null,

  setInputs: (newInputs) => {
    set({ inputs: newInputs });
    get().runProjection();
  },

  runProjection: () => {
    const inputs = get().inputs;
    const projection = CalculationEngine.calculate(inputs);
    set({ projection });
  },

  saveScenario: (name) => {
    const { inputs, scenarios } = get();
    const newScenarios = {
      ...scenarios,
      [name]: JSON.parse(JSON.stringify(inputs)),
    };
    localStorage.setItem("scenarios", JSON.stringify(newScenarios));
    set({ scenarios: newScenarios, activeScenario: name });
  },

  loadScenario: (name) => {
    const { scenarios } = get();
    if (scenarios[name]) {
      set({ inputs: scenarios[name], activeScenario: name });
      get().runProjection();
    }
  },

  deleteScenario: (name) => {
    const { scenarios } = get();
    const newScenarios = { ...scenarios };
    delete newScenarios[name];
    localStorage.setItem("scenarios", JSON.stringify(newScenarios));
    set({ scenarios: newScenarios, activeScenario: null });
    get().setInputs(initialInputs); // Reset to default
  },

  // Initialize projection on load
  init: () => {
    get().runProjection();
  },
}));

// Initial calculation run
useStore.getState().init();

export default useStore;
