import { db } from "../firebase/index.js";

export class session_repositories {
    async Session() {
    try {
      // buscando os dados no firestore
      const response = await db.collection("users").get();
      // armazenando os dados dentro de users
     
      return response
    } catch (error) {
        throw new Error("Erro ao fazer chamada para o banco de dados", error);
    }
  }
}
