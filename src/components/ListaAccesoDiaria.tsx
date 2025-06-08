import { useAccesosDiariosWS } from "../hooks/useAccesosDiariosWS";
import AnimatedList from "../react-bit/AnimatedList/AnimatedList";

function ListaAccesoDiaria() {
  const { accesos } = useAccesosDiariosWS();

  const items = accesos.map((a) => ({
    texto: `${a.nombre_completo} - ${a.dni_escaneado} - ${a.estado_acceso} - ${a.tipo_persona}`,
    estado: a.estado_acceso,
    foto_url: a.foto_url,
  }));

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2 text-blue-900 text-center">
        Listado Accesos
      </h2>
      <div className="mt-6">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">
            No hay registros por el momento.
          </p>
        ) : (
          <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            displayScrollbar={true}
          />
        )}
      </div>
    </div>
  );
}

export default ListaAccesoDiaria;
