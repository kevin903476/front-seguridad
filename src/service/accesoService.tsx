import axiosConfig from "../api/axiosConfig";


interface DatosAcceso {
  fecha: string;
  estudiantes: number;
  funcionarios: number;
}

const getAllAccess = async () => {
  const response = await axiosConfig.get("/access/getAllAccess");
  return response.data;
};

const getTodayAccess = async () => {
  const response = await axiosConfig.get("/access/getTodayAccess");
  return response.data;
};
const getWeekAccess = async () => {
  const response = await axiosConfig.get("/access/getWeekAccess");
  return response.data;
};

const getAccessByDni = async (dni: string) => {
  const response = await axiosConfig.post("/access/getAccessByDni", { dni });
  return response.data;
};

const registerAccess = async (dni: string) => {
  const response = await axiosConfig.post("/access/registerAccess", { dni });
  return response.data;
};
const getAccessByDate = async (fecha: string): Promise<DatosAcceso | null> => {
  try {
    const response = await axiosConfig.get(`/access/getAccessByDate?fecha=${fecha}`);
    return response.data.data || null;
  } catch (error) {
    throw new Error('Error al obtener accesos por fecha');
  }
};
export default {
  getAllAccess,
  getTodayAccess,
  getAccessByDni,
  registerAccess,
  getWeekAccess,
  getAccessByDate
};



