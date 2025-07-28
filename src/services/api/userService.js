import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.users];
  }

  async getById(id) {
    await this.delay(200);
    const user = this.users.find(u => u.Id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  }

  async create(userData) {
    await this.delay(400);
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      followers: 0,
      following: 0,
      posts: []
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, updateData) {
    await this.delay(300);
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users[index] = { ...this.users[index], ...updateData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const userService = new UserService();