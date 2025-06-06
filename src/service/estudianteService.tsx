import axiosConfig from "../api/axiosConfig";

interface StudentData {
  nombre: string;
  apellido: string;
  dni: string;
}

const getAllStudents = async () => {
  const response = await axiosConfig.get("/student/getStudent");
  return response.data;
};

const registerStudent = async (studentData: StudentData) => {
  const response = await axiosConfig.post(
    "/student/registerStudent",
    studentData
  );
  return response.data;
};

export default {
  getAllStudents,
  registerStudent,
};
