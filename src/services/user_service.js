
export class user_service {
  constructor(userRepositories) {
    this.userRepositories = userRepositories;
  }
  async executeCreate({ name, email, password }) {
    if (!email || !password) {
      throw new Error("Preencha todos os campos");
    }

    const userCreate = await this.userRepositories.createPost({
      name,
      email,
      password,
    });
    return userCreate;
  }
  async executeShow() {
    let users = [];
    const response = await this.userRepositories.showGet();
    response.docs.map((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return users;
  }
}
