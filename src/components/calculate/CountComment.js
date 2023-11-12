export function CountComments(comment) {
    let count = 1; // count the current comment
  
    // recursively count subcomments
    if (comment.subComments) {
      for (let subComment of comment.subComments) {
        count += CountComments(subComment);
      }
    }
  
    return count;
  }