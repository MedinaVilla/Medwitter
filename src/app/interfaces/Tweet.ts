export interface ITweet {
    idTweet: number,
    type: number,
    user:{
        name: string,
        username: string,
        image: string
    }
    content: {
        text: string,
        images?: string[]
        replies: number,
        retweets: number,
        likes: number,
        date: Date,


        liked?:{
            name:string,
            retweetedByMe?: boolean
        },
        retweetted?:{
            name:string,
            retweetedByMe?:boolean
        }
        interest?: {
            name: string
        }
    },
    replies?: ITweet[]
}