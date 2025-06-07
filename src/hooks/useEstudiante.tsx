import estudianteService from "../service/estudianteService";

interface UseEstudiante {
    dni: string;
    nombre_completo: string;
    estado: string;
    foto_url: string;
    carrera_id: string;
}

const useEstudiante = () => {
    const getAllStudents = async () => {
        try {
            const response = await estudianteService.getAllStudents();
            return response;
        } catch (error) {
            console.error("Error fetching students:", error);
            throw error;
        }
    };

    const registerStudent = async (studentData: UseEstudiante) => {
        try {
            const response = await estudianteService.registerStudent(studentData);
            return response;
        } catch (error) {
            console.error("Error registering student:", error);
            throw error;
        }
    };

    return { getAllStudents, registerStudent };
};

export default useEstudiante;