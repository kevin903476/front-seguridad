import { useEffect, useState } from "react";
import accesoService from "../service/accesoService";

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export interface GraficoData {
  name: string;
  visitas: number;
}

export function useGraficoSemana() {
  const [data, setData] = useState<GraficoData[]>([]);

  useEffect(() => {
    const getWeekAccess = async () => {
      try {
        const response = await accesoService.getWeekAccess();
        const accesos = Array.isArray(response) ? response : response.data;

        const conteo: Record<string, number> = {
          Domingo: 0, Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0, Viernes: 0, Sábado: 0
        };

        accesos.forEach((a: { fecha_hora_acceso: string }) => {
          if (a.fecha_hora_acceso) {
            const dia = DIAS[new Date(a.fecha_hora_acceso).getDay()];
            conteo[dia]++;
          }
        });

        const datos = DIAS.map(dia => ({
          name: dia,
          visitas: conteo[dia]
        }));

        setData(datos);
      } catch (err) {
        console.error("Error al obtener accesos de la semana:", err);
      }
    };

    getWeekAccess();
  }, []);

  return data;
}