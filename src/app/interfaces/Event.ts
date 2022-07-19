
export interface IEvent {
    _id: any,
    title: string,
    media?: {
      principalContent: string,
      extra?: string[],
      thumbnail?: string
    },
    categorie: string,
    type: number,
    trends?:[],
    description: string,
    tweets?:string
  }