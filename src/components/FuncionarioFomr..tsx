import React from "react";

const FuncionarioForm = () => (
  <form id="registroForm" encType="multipart/form-data">
    <label>DNI:</label><br />
    <input type="text" name="dni" required /><br /><br />

    <label>Nombre completo:</label><br />
    <input type="text" name="nombre_completo" required /><br /><br />

    <label>Estado:</label><br />
    <select name="estado">
      <option value="1">Activo</option>
      <option value="0">Inactivo</option>
    </select><br /><br />

    <label>Puesto ID:</label><br />
    <input type="number" name="puesto_id" required /><br /><br />

    <label>Foto:</label><br />
    <input type="file" name="foto" accept="image/*" /><br /><br />

    <button type="submit">Registrar</button>
  </form>
);

export default FuncionarioForm;