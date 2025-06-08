import { useGraficoSemana } from "../hooks/useGraficoSemana";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#8884d8', // Domingo
  '#82ca9d', // Lunes
  '#ffb347', // Martes
  '#36a2eb', // Miércoles
  '#00C49F', // Jueves
  '#e74c3c', // Viernes
  '#f39c12', // Sábado
];

const Grafico = () => {
  const data = useGraficoSemana();

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
