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
        date: {
            day: string,
            time: string
        },
        interest?: {
            name: string
        }
    },
    replies?: ITweet[]
}