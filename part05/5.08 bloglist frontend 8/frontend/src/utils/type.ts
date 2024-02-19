export interface BlogType {
  id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  user: string,
}

export interface LoginToken {
  name: string,
  token: string,
  username: string,
  userId: string,
}
