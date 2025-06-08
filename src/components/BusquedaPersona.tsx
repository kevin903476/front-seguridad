import { useBusquedaPersonaHoy } from "../hooks/useBusquedaPersonaHoy";

const BusquedaPersona = () => {
  const { busqueda, setBusqueda, resultados } = useBusquedaPersonaHoy();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-900 ">Buscar Persona</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 text-blue-900 rounded px-3 py-2 w-full"
          placeholder="Nombre de la persona..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {resultados.length > 0 ? (
        <ul className="list-disc pl-5 text-blue-900">
          {resultados.map((a, idx) => (
            <li key={idx}>
              {a.nombre_completo} - {a.dni_escaneado} - {a.tipo_persona}
            </li>
          ))}
        </ul>
      ) : (
        busqueda.trim() !== "" ? (
          <p className="text-gray-500">No hay datos de esa persona hoy</p>
        ) : (
          <p className="text-gray-500">Haz una búsqueda</p>
        )
      )}
    </div>
  );
};

export default BusquedaPersona;
