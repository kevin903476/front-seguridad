import { useState } from "react";
import EstudianteForm from "../components/EstudianteForm";
import FuncionarioForm from "../components/FuncionarioForm";

const Formularios = () => {
  const [form, setForm] = useState<"estudiante" | "funcionario">("estudiante");

  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-bold border transition duration-300 ${
            form === "estudiante"
              ? "bg-blue-700 text-white border-blue-700 cursor-not-allowed"
              : "bg-white text-blue-700 border-blue-700 hover:bg-blue-100"
          }`}
          disabled={form === "estudiante"}
          onClick={() => setForm("estudiante")}
        >
          Formulario Estudiante
        </button>
        <button
          className={`px-4 py-2 rounded font-bold border transition duration-300 ${
            form === "funcionario"
              ? "bg-blue-700 text-white border-blue-700 cursor-not-allowed"
              : "bg-white text-blue-700 border-blue-700 hover:bg-blue-100"
          }`}
          disabled={form === "funcionario"}
          onClick={() => setForm("funcionario")}
        >
          Formulario Funcionario
        </button>
      </div>
      <div
        className="w-full flex justify-center transition-all duration-500"
        key={form}
        style={{ minHeight: 500 }}
      >
        {form === "estudiante" ? (
          <div className="animate-fade-in">
            <EstudianteForm />
          </div>
        ) : (
          <div className="animate-fade-in">
            <FuncionarioForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Formularios;

// Agrega esta animación en tu CSS global o tailwind.config.js
// .animate-fade-in { animation: fadeIn 0.4s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }