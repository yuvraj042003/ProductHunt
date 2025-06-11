const countTotalComments = (comments) => {
  if (!comments) return 0;

  return comments.reduce((total, comment) => {
    return total + 1 + countTotalComments(comment.replies || []);
  }, 0);
};

export default countTotalComments;