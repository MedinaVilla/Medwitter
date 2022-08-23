 function findHashtags(searchText) {
    let regexp = /#[\w]+(?=\s|$)/g
    let result = searchText.match(regexp);
    if(!result){
        return [];
    }
    return result;
  }
module.exports = {
    findHashtags
}