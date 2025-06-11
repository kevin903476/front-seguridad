import React, { useState } from "react";
import useEstudiante from "../hooks/useEstudiante";
import Modal from "./Modal";

const EstudianteForm = () => {
  const { registerStudent } = useEstudiante();
  const [formData, setFormData] = useState({
    dni: "",
    nombre_completo: "",
    estado: "1",
    carrera_id: "",
    foto: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, foto: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      // Separar nombre y apellido del campo nombre_completo
      const [nombre, ...apellidos] = formData.nombre_completo.trim().split(" ");
      const apellido = apellidos.join(" ");
      // Preparar datos para enviar (FormData para incluir archivo)
      const data = new FormData();
      data.append("dni", formData.dni);
      data.append("nombre_completo", formData.nombre_completo);
      data.append("nombre", nombre);
      data.append("apellido", apellido);
      data.append("estado", formData.estado);
      data.append("carrera_id", formData.carrera_id);
      if (formData.foto) data.append("foto", formData.foto);

      await registerStudent(data as any);
      setMensaje("Ingresado correctamente");
      setFormData({
        dni: "",
        nombre_completo: "",
        estado: "1",
        carrera_id: "",
        foto: null,
      });
    } catch (error) {
      setMensaje("Hubo un error al ingresar");
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <>
      <form
        id="registroForm"
        encType="multipart/form-data"
        className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 mt-8"
        style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Registro de Estudiante</h2>

        <label className="block text-blue-900 font-semibold mb-1">DNI:</label>
        <input
          type="text"
          name="dni"
          required
          value={formData.dni}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <label className="block text-blue-900 font-semibold mb-1">Nombre completo:</label>
        <input
          type="text"
          name="nombre_completo"
          required
          value={formData.nombre_completo}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <label className="block text-blue-900 font-semibold mb-1">Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
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
          value={formData.carrera_id}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <label className="block text-blue-900 font-semibold mb-1">Foto:</label>
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border border-blue-200 rounded bg-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white-600 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded border border-red-700 shadow-lg transition duration-200"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
        {mensaje && (
          <div className="mt-4 text-center text-blue-700 font-semibold">{mensaje}</div>
        )}
      </form>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={mensaje}
      />
    </>
  );
};

export default EstudianteForm;