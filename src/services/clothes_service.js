export class clothes_service {
  constructor(clothesRepositories) {
    this.clothesRepositories = clothesRepositories;
  }

  async executeCreate({ linkUrl, price, title }) {
    try {
      const clothes = await this.clothesRepositories.createPost({
        linkUrl,
        price,
        title,
      });
      return clothes;
    } catch (error) {
      throw new Error("Erro com a conexão dos repositórios", error);
    }
  }

  async executeShow() {
    let clothes = [];

    const response = await this.clothesRepositories.showGet();

    response.docs.map((doc) => {
      clothes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return clothes;
  }

  async executeDelete(id) {
    try {
      const response = await this.clothesRepositories.deleteDelet(id);
      return response;
    } catch (error) {
      throw new Error("Erro ao conectar com repositório", error);
    }
  }

  async executeUpdate({ id, linkUrl, price, title }) {
    try {
      const response = await this.clothesRepositories.updatePut({
        id,
        linkUrl,
        price,
        title,
      });
      return response;
    } catch (error) {
      throw new Error("Erro ao conectar com repositório", error);
    }
  }
  async executeSearch({ title }) {
    try {
      let clothes = [];
      const response = await this.clothesRepositories.Search();
      response.docs.map((doc) => {
        clothes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const newDataSearchClothes = clothes.find((item) => item.title === title);
      return newDataSearchClothes
    } catch (error) {
      throw new Error("Erro ao conectar com repositório", error);
    }
  }
}
