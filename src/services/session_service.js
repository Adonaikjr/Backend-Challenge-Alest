import { authTokenJWT } from "../configs/jwt.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export class session_service {
  constructor(sessionRepositories) {
    this.sessionRepositories = sessionRepositories;
  }
  async executeSession({email, password}) {
    try {
      let users = [];
    //   // buscando os dados no firestore
    //   const response = await db.collection("users").get();
    const response = await this.sessionRepositories.Session()

      // armazenando os dados dentro de users
      response.docs.map((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // verficar user e password
      const newDataUser = users.find(
        (user) =>
          user.email === email && bcryptjs.compareSync(password, user.password)
      );
      // se não encontrar um usuário válido, retornar um erro
      if (!newDataUser) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      // adicionando um token JWT ao usuário autenticado
      const { secret, expiresIn } = authTokenJWT.jwt;
      const token = jwt.sign({ userId: newDataUser.id }, secret, {
        expiresIn,
      });
      const SessionData = {...newDataUser, token}
      
      return SessionData
    } catch (error) {
        throw new Error("Erro com a conexão dos repositórios", error);
    }
  }
}
