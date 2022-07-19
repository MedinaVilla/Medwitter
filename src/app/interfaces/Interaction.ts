
export interface IInteraction {
    retweet: [{
        username: string,
        idTweet: number
    }],
    liked: [{
        username: string,
        idTweet: number
    }],
}