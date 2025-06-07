import EstudianteForm from "../components/EstudianteForm";
import { div } from "framer-motion/client";

const Formularios = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-4 w-11/12 mt-14 flex flex-col gap-6 border">
        {/* Formulario de Estudiante */}
        <div className="bg-gray-400/10 shadow-blue-900 p-4 rounded w-full">
          <EstudianteForm />
        </div>
      </div>
    </div>
  );
};