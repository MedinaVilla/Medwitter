import { ITweet } from "./Tweet"

export interface IUser {
    name: string,
    username: string,
    description: string,
    verified: boolean,
    image: string,
    banner: string,
    date_registered: string,
    followers: string[],
    follows: string[],
    tweets: {
        myTweets: ITweet[],
        retweet: [{
            username: string,
            idTweet: number
        }],
        liked:  [{
            username: string,
            idTweet: number
        }],
    },
    friendsFollowing?: string[],
}