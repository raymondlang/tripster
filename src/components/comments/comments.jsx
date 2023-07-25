import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComments,
  deleteComment,
  createComment,
} from "../../slices/commentSlice";
import CreateComment from "./CreateComment";
import { useParams } from "react-router-dom";

const Comments = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => Object.values(state.comments));

  const mRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllComments(tripId)).catch((error) => {
      console.error("Error fetching comments:", error);
    });
  }, [dispatch, tripId]);

  useEffect(() => {
    // Scroll to the bottom whenever the comments change
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    if (mRef.current) {
      mRef.current.scrollIntoView({ block: "end" });
    }
  };

  console.log("Comments array:", comments);

  // const handleCreateComment = (newComment) => {
  //   // Dispatch the createComment action here directly in the Comments component
  //   dispatch(createComment(newComment));
  // };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  // if (!areCommentsFetched) {
  //   return <p>Loading comments...</p>;
  // }

  const commentsList = comments.map((comment, idx) => {
    // Check if comment or comment.author is undefined or null before accessing properties
    if (!comment || !comment.author) {
      return null; // Return null for invalid comments
    }

    return (
      <li
        className={idx % 2 === 0 ? "message-bubble-1" : "message-bubble-2"}
        key={`comment-${comment._id}`}
      >
        <section>
          <div className="comment-text-user">
            {comment.author?.username}
            <br />
          </div>
          <div className="comment-test-date">
            {new Date(comment.date).toDateString()}
            <br />
          </div>
          <div className="comment-test-time">
            {new Date(comment.date).toLocaleTimeString()}
            <br />
          </div>
          <div className="comment-text-body">
            <p>{comment.comment}</p>
          </div>
        </section>

        <div>
          <br />
          {comment.author._id === currentUser.id && (
            <button
              className="comment-delete-btn"
              onClick={() => handleDeleteComment(comment._id)}
            >
              Delete Comment
            </button>
          )}
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="comments-wrapper">
        <ul className="comments-subcontainer">
          {commentsList}
          <div ref={mRef}></div>
          <br />
        </ul>
      </div>
      <div className="comments-subcontainer-anchor"></div>

      <div className="create-comment-container">
        <CreateComment createComment={createComment} />
      </div>
    </div>
  );
};

export default Comments;
