// src/components/CommentInput.jsx

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "../../lib/axios";

const CommentInput = ({ productId, parentCommentId = null, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Please login to post a comment.");
        return;
      }

      const endpoint = parentCommentId
        ? `/api/v1/comment/reply-comment/${parentCommentId}`
        : `/api/v1/comment/create-comment`;

      const payload = {
        content: comment,
        productId,
        ...(parentCommentId && { parentCommentId }),
      };

      await api.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComment("");
      setSuccessMsg("Comment posted!");
      if (onSubmit) onSubmit(comment);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Failed to post comment.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(""), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="💬 What do you think?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[80px]"
      />
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}
      <Button
        className="bg-amber-400 hover:bg-amber-500 transition-all"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Posting..." : "Comment"}
      </Button>
    </div>
  );
};

export default CommentInput;
