import { ITweet } from "./Tweet"
import { IUser } from "./User"


export interface ISearchP {
 people: IUser[],
 tweets: ITweet[]
}