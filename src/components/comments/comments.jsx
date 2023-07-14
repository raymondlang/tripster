import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, deleteComment } from "../../slices/commentSlice";
import CreateComment from "./CreateComment";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const currentUser = useSelector((state) => state.session.user);
  const mRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    mRef.current.scrollIntoView({ block: "end" });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const commentsList = comments.map((comment, idx) => (
    <li
      className={idx % 2 === 0 ? "message-bubble-1" : "message-bubble-2"}
      key={`comment-${comment._id}`}
    >
      <section>
        <div className="comment-text-user">
          {comment.author.username}
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
  ));

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
        <CreateComment />
      </div>
    </div>
  );
};

export default Comments;
