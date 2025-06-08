import { useEffect, useRef, useState } from "react";
import accesoService from "../service/accesoService";

interface Acceso {
  nombre_completo: string;
  dni_escaneado: string;
  estado_acceso: string;
  foto_url: string;
  tipo_persona: string;
}

export function useAccesosDiariosWS() {
  const [accesos, setAccesos] = useState<Acceso[]>([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const shouldReload = useRef(true);

  useEffect(() => {
    accesoService
      .getTodayAccess()
      .then((data) => setAccesos(data.data))
      .catch((err) => console.error("Error:", err));

    ws.current = new WebSocket(
      "wss://marvellous-muskox-kevin903476-82a785f6.koyeb.app/ws"
    );

    ws.current.onopen = () => setConnected(true);

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
      setConnected(false);
      if (shouldReload.current) {
        window.location.reload();
      }
    };

    return () => {
      shouldReload.current = false;
      if (ws.current) ws.current.close();
    };
  }, []);

  return { accesos, connected };
}