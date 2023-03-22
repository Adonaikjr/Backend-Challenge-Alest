import { disk_storage } from "../providers/disk_storage.js";
import { clothes_repositories } from "../repositories/clothes_repositories.js";
import { clothes_service } from "../services/clothes_service.js";

export class clothes_controller {
  async create(req, res) {
    //pegando informações para cadastro
    const { price, title } = req.body;

    //acessando o arquivo file
    const { filename } = req.file;

    if (!req.file) {
      throw new Error("erro na imagem");
    }
    //transforando o arquivo em string, adicionando um hex e salvando
    const diskStorage = new disk_storage();

    //conectando com db firebase 'instancia'
    const clothesRepositories = new clothes_repositories();

    //enviando reposiório para o service fazer a execução
    const clothesService = new clothes_service(clothesRepositories);

    //salvando o arquivo em tmp/uploads
    const saveBanner = await diskStorage.saveFile(filename);

    //tratando os erros e sucessos com try/catch
    try {
      //executando o service
      await clothesService.executeCreate({
        linkUrl: saveBanner,
        price,
        title,
      });
      return res.json({ linkUrl: saveBanner, price, title });
    } catch (error) {
      //tratando error se acontecer
      console.log(error);
      return res.status(500).json({ Error: "Erro na execução do serviço" });
    }
  }

  async show(req, res) {
    const clothesRepositories = new clothes_repositories();
    const clothesService = new clothes_service(clothesRepositories);

    try {
      const response = await clothesService.executeShow();
      res.json(response);
    } catch (error) {
      return res.status(500).json({ Error: "Erro ao conectar com o serviço" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const clothesRepositories = new clothes_repositories();
    const clothesService = new clothes_service(clothesRepositories);

    try {
      await clothesService.executeDelete(id);
      return res.json({ Sucesso: `Documento deletado com sucesso`, "id:": id });
    } catch (error) {
      throw new Error("Erro ao executar o serviço para deletar", error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { price, title } = req.body;
    const { filename } = req.file;

    //transforando o arquivo em string, adicionando um hex e salvando
    const diskStorage = new disk_storage();
    //conectando com db firebase 'instancia'
    const clothesRepositories = new clothes_repositories();

    //salvando o arquivo em tmp/uploads
    const saveBanner = await diskStorage.saveFile(filename);

    //enviando reposiório para o service fazer a execução
    const clothesService = new clothes_service(clothesRepositories);

    try {
      //executando serviço de update
      await clothesService.executeUpdate({
        id,
        linkUrl: saveBanner,
        price,
        title,
      });
      res.json({ Atualizado: "sucesso" });
    } catch (error) {
      return res.status(500).json({ Error: "Erro na execução do serviço" });
    }
  }
}
