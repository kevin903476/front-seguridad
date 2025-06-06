import { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Lunes', visitas: 400 },
  { name: 'Martes', visitas: 300 },
  { name: 'Miércoles', visitas: 500 },
  { name: 'Jueves', visitas: 200 },
  { name: 'Viernes', visitas: 278 },
  { name: 'Sábado', visitas: 189 },
  { name: 'Domingo', visitas: 239 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28', '#FF8042'];

const Grafico = () => {
  const [tipo, setTipo] = useState('barras'); // barras o pastel

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900 ">Visitas Semanales</h2>
        <div>
          <button
            className={`px-3 py-1 rounded-l ${tipo === 'barras' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTipo('barras')}
          >
            Barras
          </button>
          <button
            className={`px-3 py-1 rounded-r ${tipo === 'pastel' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTipo('pastel')}
          >
            Pastel
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {tipo === 'barras' ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitas" fill="#8884d8" />
          </BarChart>
        ) : (
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
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
