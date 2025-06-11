import { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import EstudianteForm from "../components/EstudianteForm";
import FuncionarioForm from "../components/FuncionarioForm";

const Formularios = () => {
  const [flipped, setFlipped] = useState(false);

  const { transform } = useSpring({
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="flex flex-col items-center justify-center mt-14 mb-14">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-bold border transition duration-300 ${
            !flipped
              ? "bg-blue-800 text-neutral-100 cursor-not-allowed"
              : "bg-blue-900 text-neutral-400 hover:bg-blue-900/90"
          }`}
          disabled={!flipped}
          onClick={() => setFlipped(false)}
        >
          Formulario Estudiante
        </button>
        <button
          className={`px-4 py-2 rounded font-bold border transition duration-300 ${
            flipped
              ? "bg-blue-800 text-neutral-100 cursor-not-allowed"
              : "bg-blue-900 text-neutral-400 hover:bg-blue-900/90"
          }`}
          disabled={flipped}
          onClick={() => setFlipped(true)}
        >
          Formulario Funcionario
        </button>
      </div>

      <div className="relative w-[400px] h-[600px]">
        <a.div
          className="w-full h-full relative"
          style={{
            transform,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cara frontal */}
          <div
            className="absolute w-full h-full rounded-xl flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <EstudianteForm />
          </div>

          {/* Cara trasera */}
          <div
            className="absolute w-full h-full rounded-xl flex items-center justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <FuncionarioForm />
          </div>
        </a.div>
      </div>
    </div>
  );
};

export default Formularios;
