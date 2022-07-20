
export interface IList {
    _id: any,
    public: boolean,
    name: string,
    description: string,
    image: string,
    creator: {
        name: string,
        username: string,
        image: string
    },
    fixed?:boolean
  }