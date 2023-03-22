import { session_service } from "../services/session_service.js";
import { session_repositories } from "../repositories/session_repositories.js";

export class session_controller {
  async consult(req, res) {
    const { email, password } = req.body;

    const sessionRepositories = new session_repositories();
    const sessionService = new session_service(sessionRepositories);
    try {
      const response = await sessionService.executeSession({
        email,
        password,
      });
      return res.json(response)
    } catch (error) {
      return res.status(500).json({ Error: "Erro na execução do serviço" });
    }
  }
}
