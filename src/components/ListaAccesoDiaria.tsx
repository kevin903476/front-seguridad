import { useEffect, useState, useRef } from "react";
import accesoService from "../service/accesoService";
import AnimatedList from "../react-bit/AnimatedList/AnimatedList";

interface Acceso {
  nombre_completo: string;
  dni_escaneado: string;
  estado_acceso: string;
}

function ListaAccesoDiaria() {
  const [accesos, setAccesos] = useState<Acceso[]>([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }

    ws.current = new WebSocket(
      "wss://marvellous-muskox-kevin903476-82a785f6.koyeb.app/ws"
    );

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "updateTodayAccess") {
        accesoService
          .getTodayAccess()
          .then((data) => setAccesos(data.data))
          .catch((err) => console.error("Error:", err));
      }
    };

    ws.current.onerror = (e) => console.error("WebSocket error", e);
    ws.current.onclose = () => {
      console.log("WebSocket cerrado");
      setConnected(false);
    };
  };

  useEffect(() => {
    accesoService
      .getTodayAccess()
      .then((data) => setAccesos(data.data))
      .catch((err) => console.error("Error:", err));

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const items = accesos.map((a) => ({
    texto: `${a.nombre_completo} - ${a.dni_escaneado} - ${a.estado_acceso}`,
    estado: a.estado_acceso,
  }));

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2 text-blue-900 text-center">Listado Accesos</h2>
{/*       <p className="mb-4 text-blue-900" >
        Estado WebSocket: {connected ? "✅ Conectado" : "❌ Desconectado"}
      </p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={connectWebSocket}
        disabled={connected}
      >
        {connected ? "Conectado" : "Reconectar WebSocket"}
      </button> */}

      <div className="mt-6">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">No hay registros por el momento.</p>
        ) : (
          <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        )}
      </div>
    </div>
  );
}

export default ListaAccesoDiaria;
