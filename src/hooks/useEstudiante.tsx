import estudianteService from "../service/estudianteService";

const useEstudiante = () => {
  const registerStudent = async (data: any) => {
    try {
      const response = await estudianteService.registerStudent(data); 
      return response;
    } catch (error) {
      console.error("Error registering student:", error);
      throw error;
    }
  };

  const getAllStudents = async () => {
    try {
      const response = await estudianteService.getAllStudents(); 
      return response;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  };

  return { registerStudent, getAllStudents };
};

export default useEstudiante;