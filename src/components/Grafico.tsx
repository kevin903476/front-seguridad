import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import accesoService from '../service/accesoService';

const COLORS = [
  '#8884d8', // Domingo
  '#82ca9d', // Lunes
  '#ffb347', // Martes
  '#36a2eb', // Miércoles
  '#00C49F', // Jueves
  '#e74c3c', // Viernes
  '#f39c12', // Sábado
];
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

interface Acceso {
  fecha_hora_acceso: string;
}

interface GraficoData {
  name: string;
  visitas: number;
}

const Grafico = () => {
  const [data, setData] = useState<GraficoData[]>([]);

  useEffect(() => {
    const getWeekAccess = async () => {
      try {
        const response = await accesoService.getWeekAccess();
        const accesos: Acceso[] = Array.isArray(response) ? response : response.data;

        // Contar accesos por día de la semana
        const conteo: Record<string, number> = {
          Domingo: 0, Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0, Viernes: 0, Sábado: 0
        };

        accesos.forEach(a => {
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

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Visitas Semanales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="visitas"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
