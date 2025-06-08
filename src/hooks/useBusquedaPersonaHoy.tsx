import { useState, useEffect } from "react";
import { useAccesosDiariosWS } from "./useAccesosDiariosWS";

export function useBusquedaPersonaHoy() {
  const { accesos } = useAccesosDiariosWS(); // <-- ahora dependes del ws
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<typeof accesos>([]);

  useEffect(() => {
    if (busqueda.trim() === "") {
      setResultados([]);
      return;
    }
    const filtrados = accesos.filter(a =>
      a.nombre_completo &&
      a.nombre_completo.toLowerCase().includes(busqueda.toLowerCase())
    );
    // Eliminar duplicados por dni_escaneado
    const unicos = filtrados.filter(
      (item, idx, self) =>
        self.findIndex(a => a.dni_escaneado === item.dni_escaneado) === idx
    );
    setResultados(unicos);
  }, [busqueda, accesos]);

  return {
    busqueda,
    setBusqueda,
    resultados,
  };
}