import { useState } from 'react';

interface Persona {
  id: number;
  nombre: string;
}

const personas: Persona[] = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana Gómez' },
  { id: 3, nombre: 'Carlos Ruiz' },
];

const BusquedaPersona = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<Persona[]>([]);

  const handleBuscar = () => {
    const filtrados = personas.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(filtrados);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-900 ">Buscar Persona</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 text-blue-900  rounded px-3 py-2 w-full"
          placeholder="Nombre de la persona..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {resultados.length > 0 ? (
        <ul className="list-disc pl-5 text-blue-900">
          {resultados.map((p) => (
            <li key={p.id}>{p.nombre}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay resultados</p>
      )}
    </div>
  );
};

export default BusquedaPersona;
