import React from "react";

const EstudianteForm = () => (
  <form
    id="registroForm"
    encType="multipart/form-data"
    className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 mt-8"
    style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)" }}
  >
    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Registro de Estudiante</h2>

    <label className="block text-blue-900 font-semibold mb-1">DNI:</label>
    <input
      type="text"
      name="dni"
      required
      className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    />

    <label className="block text-blue-900 font-semibold mb-1">Nombre completo:</label>
    <input
      type="text"
      name="nombre_completo"
      required
      className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    />

    <label className="block text-blue-900 font-semibold mb-1">Estado:</label>
    <select
      name="estado"
      className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    >
      <option value="1">Activo</option>
      <option value="0">Inactivo</option>
    </select>

    <label className="block text-blue-900 font-semibold mb-1">Carrera ID:</label>
    <input
      type="number"
      name="carrera_id"
      required
      className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    />

    <label className="block text-blue-900 font-semibold mb-1">Foto:</label>
    <input
      type="file"
      name="foto"
      accept="image/*"
      className="w-full px-4 py-2 mb-6 border border-blue-200 rounded bg-white"
    />

    <button
      type="submit"
      className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-200"
    >
      Registrar
    </button>
  </form>
);

export default EstudianteForm;