// Some common utility scripts

/*
Abreviates a number passed into it
1000 becomes 1k

*/
export function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 !== 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}


/*
  Travels down a comment section and returns that comments replies
  or returns null
*/

export function getCommentReplies(comment) {
  // Check that we have replies
  if (!comment.replies) return null;

  // Loop through each reply generating an object and sending that
  let replies = [];

  replies = [...replies,comment.replies.data.children.map(reply => {
      return {
      author: reply.data.author,
      body: reply.data.body,
      ups: reply.data.ups,
      replies: getCommentReplies(reply.data),
    }
  })];

  return replies;

}
