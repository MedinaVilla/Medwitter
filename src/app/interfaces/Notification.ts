import { ITweet } from "./Tweet"

export interface INotification {
    type: number,
    idTweet: number,
    content?: {
        text: string,
        replies: number,
        retweets: number,
        likes: number,
        date: Date
    },
    userInteraction: {
        profile: string,
        username: string
    }
    newFollow?: [
        {
            user: {
                profile: string,
                name: string
            }
        }]
    response?: {
        idTweet: number,
        tweetResponse: number,
        tweet:ITweet,
        tweetR: ITweet
    }
}