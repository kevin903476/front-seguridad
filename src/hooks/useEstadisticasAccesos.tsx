import { useEffect, useState } from 'react';
import accesoService from '../service/accesoService';

interface DatosAcceso {
  fecha: string;
  estudiantes: number;
  funcionarios: number;
}

export const useEstadisticasAccesos = (fecha?: string) => {
  const [datos, setDatos] = useState<DatosAcceso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setCargando(true);
        setError(null);

        let response;
        
        if (fecha) {
          const data = await accesoService.getAccessByDate(fecha);
          response = data ? [data] : [];
        } else {
          response = await accesoService.getWeekAccess();
        }

        if (!controller.signal.aborted) {
          setDatos(Array.isArray(response) ? response : []);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Error cargando datos');
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    };

    fetchData();
    
    return () => controller.abort();
  }, [fecha]);

  return { datos, cargando, error };
};