import bcryptjs from "bcryptjs";
import { user_repositories } from "../repositories/user_repositories.js";
import { user_service } from "../services/user_service.js";

export class user_controller {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userRepositories = new user_repositories();
    const userService = new user_service(userRepositories);
    // bcryptjs para gerar um hash de 8 digitos, para a senha do usuario nao ficar exposta
    const hashPassword = await bcryptjs.hash(password, 8);
    try {
      await userService.executeCreate({
        name,
        email,
        password: hashPassword,
      });
      return res.json({ user: email, password });
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ Error: "email já esta em uso" });
    }
  }

  async show(req, res) {
    const userRepositories = new user_repositories();
    const userService = new user_service(userRepositories);

    try {
      const response = await userService.executeShow();
      res.json(response);
    } catch (error) {
      console.log("erro ao fazer chamada", error);
      return res.status(500).json({ Error: "Erro ao conectar com o serviço" });
    }
  }
}
