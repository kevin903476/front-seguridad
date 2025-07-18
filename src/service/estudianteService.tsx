import axiosConfig from "../api/axiosConfig";

//Asi esta bien, el servicio es primero  luego el hook
// y el hook es el que se usa en el componente
interface StudentData {
  dni: string;
  nombre_completo: string;
  estado: string;
  foto_url: string;
  carrera_id: number;
}

const getAllStudents = async () => {
  const response = await axiosConfig.get("/student/getStudent");
  return response.data;
};

const registerStudent = async (formData: FormData) => {
  const response = await axiosConfig.post(
    "/student/register",
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
  getAllStudents,
  registerStudent,
};
