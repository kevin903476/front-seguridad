import funcionarioService from "../service/funcionarioService";

const useFuncionario = () => {
  const registerFuncionario = async (data: any) => {
    try {
      const response = await funcionarioService.registerFuncionario(data);
      return response;
    } catch (error) {
      console.error("Error registering funcionario:", error);
      throw error;
    }
  };

  const getAllFuncionarios = async () => {
    try {
      const response = await funcionarioService.getAllFuncionarios();
      return response;
    } catch (error) {
      console.error("Error fetching funcionarios:", error);
      throw error;
    }
  };

  return { registerFuncionario, getAllFuncionarios };
}

export default useFuncionario;