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
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        if (isMounted) {
          setCargando(true);
          setError(null);
        }

        let result;
        
        if (fecha) {
          const data = await accesoService.getAccessByDate(fecha);
          result = data ? [data] : [];
        } else {
          result = await accesoService.getWeekAccess();
        }

        if (isMounted) {
          setDatos(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error cargando datos');
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    fetchData();
    
    return () => { isMounted = false };
  }, [fecha]);

  return { datos, cargando, error };
};