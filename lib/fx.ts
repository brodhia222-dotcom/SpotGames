const FX_KEY = "fx";

export type FxState = "on" | "off";

export function getFxState(): FxState {
  if (typeof window === "undefined") return "off";
  return (localStorage.getItem(FX_KEY) as FxState) ?? "off";
}

export function setFxState(state: FxState): void {
  localStorage.setItem(FX_KEY, state);
  window.dispatchEvent(new CustomEvent("fx-change", { detail: { state } }));
}

export function toggleFxState(): FxState {
  const current = getFxState();
  const next: FxState = current === "on" ? "off" : "on";
  setFxState(next);
  return next;
}

export function isFxEnabled(): boolean {
  return getFxState() === "on";
}
