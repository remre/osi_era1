import React, { useState } from "react";
import Button from "../base/Button";
import { useEvent } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";

interface Comment {
  user: string;
  content: string;
  createdAt: string;
}

interface EventCommentsProps {
  eventId: string;
  comments: Comment[];
}

const EventComments: React.FC<EventCommentsProps> = ({ eventId, comments }) => {
  const { addComment } = useEvent();
  const { user } = useAuth();
  const [commentContent, setCommentContent] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleAddComment = async () => {
    if (commentContent.trim() === "") return;

    try {
      await addComment(eventId, {
        user: user?.username || "Anonymous",
        content: commentContent,
      });
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-500 underline"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="mt-2">
          {comments.length > 0 ? (
            <ul className="space-y-2">
              {comments.map((comment, index) => (
                <li key={index} className="p-2 border rounded">
                  <p className="body-input">
                    <span className="font-bold">{comment.user}:</span>{" "}
                    {comment.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}

          <div className="mt-4">
            <textarea
              placeholder="Write a comment..."
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <Button
              onClick={handleAddComment}
              className="!bg-green-500 text-white px-4 py-2"
            >
              Add Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventComments;
