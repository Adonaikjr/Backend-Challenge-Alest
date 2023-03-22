import { db } from "../firebase/index.js";

export class user_repositories {
  async createPost({ name, email, password }) {
    try {
      const response = db.collection("users").doc();
      const FindByEmail = await db.collection("users").get();
      let users = []
      FindByEmail.docs.map((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      //verificando se o email do usuario esta tentando cadastrar ja esta em uso
      const checkEmail = users.find(item => item.email === email)
      if(checkEmail){
        throw new Error({email:'este email ja esta em uso'})
      }
      await response.set({
        name,
        email,
        password,
      });
      return response;
    } catch (error) {
      throw new Error('Erro ao fazer chamada para o banco de dados',error);
    }
  }
  async showGet() {
    try {
      const response = await db.collection("users").get();
      return response;
    } catch (error) {
      console.log("erro ao fazer chamada", error);
      throw new Error("Erro ao fazer chamada para o banco de dados", error);
    }
  }

}
