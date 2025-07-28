import postsData from "@/services/mockData/posts.json";

class PostService {
  constructor() {
    this.posts = [...postsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await this.delay(200);
    const post = this.posts.find(p => p.Id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return { ...post };
  }

  async create(postData) {
    await this.delay(500);
    const newPost = {
      ...postData,
      Id: Math.max(...this.posts.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    this.posts.unshift(newPost);
    return { ...newPost };
  }

  async update(id, updateData) {
    await this.delay(300);
    const index = this.posts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    this.posts[index] = { ...this.posts[index], ...updateData };
    return { ...this.posts[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.posts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    this.posts.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const postService = new PostService();