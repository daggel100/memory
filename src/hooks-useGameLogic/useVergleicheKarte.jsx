
export function useVergleicheKarten() {
  function istPaar(karten, aufgedeckt) {
    if (aufgedeckt.length === 2) {
      return karten[aufgedeckt[0]].name === karten[aufgedeckt[1]].name
    }
    return false
  }
  return { istPaar }
}