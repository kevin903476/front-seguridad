import axiosConfig from "../api/axiosConfig";

interface Funcionario {
  dni: string;
  nombre_completo: string;
  estado: string;
  foto_url: string;
  puesto_id: number;
}

const getAllFuncionarios = async () => {
  const response = await axiosConfig.get("/official/getOfficials");
  return response.data;
};

const registerFuncionario = async (formData: FormData) => {
  const response = await axiosConfig.post(
    "/official/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};



export default {
  getAllFuncionarios,
  registerFuncionario,
};