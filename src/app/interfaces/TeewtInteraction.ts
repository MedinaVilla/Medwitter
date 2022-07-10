import { ITweet } from "./Tweet"


export interface ITweetInteraction {
  tweets: ITweet[],
  retweet: [{
    username: string,
    idTweet: number
  }], 
  liked: [{
    username: string,
    idTweet: number
  }]
}