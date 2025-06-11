import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useEstadisticasAccesos } from '../hooks/useEstadisticasAccesos';

const GraficoBarrasAccesos = ({ fecha }: { fecha?: string }) => {
  const { datos, cargando, error } = useEstadisticasAccesos(fecha);

  if (cargando) return <div className="text-blue-800 text-center py-4">Cargando datos...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  if (!datos || datos.length === 0) return <div className="text-blue-800 text-center py-4">No hay datos disponibles</div>;

  // Calcular el máximo valor para el eje Y (redondeado al siguiente múltiplo de 5)
  const maxValue = Math.max(
    ...datos.map(item => Math.max(item.estudiantes, item.funcionarios)),
    10 // Valor mínimo por defecto
  );
  const yAxisDomain = [0, Math.ceil(maxValue / 5) * 5];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="fecha" 
            tick={{ fill: '#1e3a8a' }}
            axisLine={{ stroke: '#1e3a8a' }}
          />
          <YAxis 
            domain={yAxisDomain} // Establecer el dominio dinámico
            tick={{ fill: '#1e3a8a' }}
            axisLine={{ stroke: '#1e3a8a' }}
            allowDecimals={false} // Mostrar solo números enteros
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#1e3a8a',
              borderRadius: '0.25rem',
              color: '#1e3a8a'
            }}
            formatter={(value) => [`${value} personas`, value === 1 ? 'Estudiante' : 'Estudiantes']}
          />
          <Legend 
            wrapperStyle={{
              color: '#1e3a8a',
              paddingTop: '20px'
            }}
          />
          <Bar 
            dataKey="estudiantes" 
            fill="#3b82f6" 
            name="Estudiantes" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="funcionarios" 
            fill="#ef4444" 
            name="Funcionarios"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarrasAccesos;