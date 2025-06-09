import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEstadisticasAccesos } from '../hooks/useEstadisticasAccesos';

const GraficoBarrasAccesos = ({ fecha }: { fecha?: string }) => {
  const { datos, cargando, error } = useEstadisticasAccesos(fecha);

  if (cargando) return <div className="text-center py-4">Cargando datos...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  if (datos.length === 0) return <div className="text-center py-4">No hay datos disponibles</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datos}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="estudiantes" fill="#36a2eb" name="Estudiantes" />
          <Bar dataKey="funcionarios" fill="#ff6384" name="Funcionarios" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarrasAccesos;