import { db } from "../firebase/index.js";

export class clothes_repositories {
  async createPost({ linkUrl, price, title }) {
    try {
      //connect db
      const response = db.collection("clothes").doc();
      //insert info
      await response.set({
        linkUrl,
        price,
        title,
      });
      return response;
    } catch (error) {
      //tratando erro
      throw new Error("Erro ao fazer chamada para o banco de dados", error);
    }
  }
  async showGet() {
    try {
      //connect db
      const response = await db.collection("clothes").get();
      return response;
    } catch (error) {
      console.log("erro ao fazer chamada", error);
      //tratando erro
      throw new Error("Erro ao fazer chamada para o banco de dados", error);
    }
  }
  async deleteDelet(id) {
    try {
      //connect db
      const response = await db.collection("clothes").doc(id).delete();
      return response;
    } catch (error) {
      //tratando erro
      throw new Error("Erro ao deletar", error);
    }
  }
  async updatePut({ id, linkUrl, price, title }) {
    try {
      //conect db
      const response = db.collection("clothes").doc(id);
      //update in db
      return await response.update({ linkUrl, price, title });
    } catch (error) {
      //tratando erro
      throw new Error("Erro ao fazer chamada para o banco de dados ", error);
    }
  }
}
