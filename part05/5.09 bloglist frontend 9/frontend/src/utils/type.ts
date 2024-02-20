interface User {
  id: string,
  username: string,
  name: string,
}

export interface BlogType {
  id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  user: User,
}

export interface LoginToken {
  name: string,
  token: string,
  username: string,
  userId: string,
}
