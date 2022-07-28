export async function xd(tweet) {
    if(!tweet.replies){
        return tweet;
    }
    
    await Promise.all(
        tweet.replies.map(async (replie, j) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": replie.username
                })
                let replyTweet = docs.tweets.myTweets.find(doc => doc.idTweet === replie.idTweet);
                tweet.replies[j] = replyTweet;
                resolve();
                xd(replyTweet)
            })
        })
    )
}