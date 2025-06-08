import ListaAccesoDiaria from "../components/ListaAccesoDiaria";
import Grafico from "../components/Grafico";
import BusquedaPersona from "../components/BusquedaPersona";
import { div } from "framer-motion/client";

const Inicio = () => {
  return (
<div className="flex items-center justify-center">
  <div className="p-4 w-11/12 mt-14 flex flex-row justify-between gap-6">
    {/* Lista lateral */}
    <div className="bg-gray-400/10 shadow-blue-900 p-4 rounded w-1/3">
      <ListaAccesoDiaria />
    </div>

    <div className="flex flex-col gap-4 w-2/3">
      {/* Búsqueda */}
      <div className="flex justify-center items-center">
        <div className="bg-gray-400/10 shadow-sm p-4 rounded w-full">
          <BusquedaPersona />
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-gray-400/10 bordershadow-sm p-4 rounded w-full">
        <Grafico /> 
      </div>
    </div>
  </div>
</div>

  );
};

export default Inicio;
