import React, { useEffect, useState, useCallback } from "react";
import { CardContent } from "@/components/ui/card";
import CommentInput from "./CreateComment";
import CommentItem from "./ViewComment"; // Assuming this component exists and handles displaying a single comment
import api from "../../lib/axios";
import { toast } from "react-hot-toast";


const CommentSection = ({ product }) => {
  const [comments, setComments] = useState([]);

  // Memoize fetchComments to prevent unnecessary re-renders
  const fetchComments = useCallback(async () => {
    try {
      // Ensure product._id is available before making the API call
      if (!product?._id) {
        console.warn("Product ID is undefined, cannot fetch comments.");
        return;
      }
      const res = await api.get(`/api/v1/comment/get-comment/${product._id}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      toast.error("Failed to load comments");
    }
  }, [product?._id]); // Add product?._id to dependency array

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Dependency array includes memoized fetchComments

  const handleCommentSubmit = async () => {
    // After a new comment is submitted, refetch comments to update the list
    await fetchComments();
  };

  const handleReply = async () => {
    // After a reply is submitted, refetch comments to update the list
    await fetchComments();
  };

  const handleEdit = async (commentId, newContent) => {
    try {
      await api.patch(`/api/v1/comment/edit-comment/${commentId}`, { content: newContent }); // Added API prefix
      toast.success("Comment updated successfully!");
      fetchComments(); // Refetch comments after successful edit
    } catch (err) {
      console.error("Error editing comment:", err);
      toast.error(err.response?.data?.error || "Failed to edit comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/api/v1/comment/delete-comment/${commentId}`); 
      toast.success("Comment deleted successfully!");
      fetchComments(); 
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error(err.response?.data?.error || "Failed to delete comment");
    }
  };

  return (
    <CardContent className="space-y-4">
      <h2 className="text-xl font-bold">💬 What do you think?</h2>
      <CommentInput productId={product._id} onCommentSubmit={handleCommentSubmit} />

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              currentUserId={product.currentUserId} // Pass current user ID if needed for edit/delete permissions in CommentItem
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No comments yet. Be the first!</p>
      )}
    </CardContent>
  );
};

export default CommentSection;