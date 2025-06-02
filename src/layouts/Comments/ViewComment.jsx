import React, { useState } from 'react';
import CommentInput from './CreateComment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CommentItem = ({ comment, onReply, onEdit, onDelete, productId }) => {
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  return (
    <div className="border rounded p-3 space-y-2">
      <p className="font-medium">{comment.user.name}:</p>
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
          />
          <Button onClick={() => { onEdit(comment._id, editContent); setIsEditing(false); }}>
            Save
          </Button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}

      <div className="flex gap-2 text-sm text-gray-500">
        <Button variant="ghost" onClick={() => setShowReply(!showReply)}>Reply</Button>
        <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
        <Button variant="ghost" onClick={() => onDelete(comment._id)}>Delete</Button>
      </div>

      {showReply && (
        <div className="ml-6">
          <CommentInput
            productId={productId}
            parentCommentId={comment._id}
            onSubmit={onReply}
          />
        </div>
      )}

      {comment.replies && comment.replies.map(reply => (
        <div key={reply._id} className="ml-6 mt-4">
          <CommentItem
            comment={reply}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            productId={productId}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentItem;