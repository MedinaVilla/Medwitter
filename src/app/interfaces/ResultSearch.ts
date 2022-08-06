export interface IResultSearch  {
    search?: string,
    name: string,
    type: string,
    user?: {
      image: string,
      name: string,
      username: string,
      description: string
    }
  }