import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "@/slices/commentSlice";
import PropTypes from "prop-types";

const CommentDetails = (props) => {
  const [mounted, setMounted] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const deleteButton =
    props.comment.author._id === currentUser.id ? (
      <button
        className="comment-delete-btn"
        onClick={() => dispatch(deleteComment(props.comment._id))}
      >
        Delete Comment
      </button>
    ) : null;

  const messageClass =
    props.idx % 2 === 0 ? "message-bubble-1" : "message-bubble-2";

  return (
    <div className="comment-list">
      <li className={messageClass}>
        <section>
          <div className="comment-text-user">
            {props.comment.author.username}
            <br />
          </div>
          <div className="comment-test-date">
            {new Date(props.comment.date).toDateString()}
            <br />
          </div>
          <div className="comment-test-time">
            {new Date(props.comment.date).toLocaleTimeString()}
            <br />
          </div>
          <div className="comment-text-body">
            <p>{props.comment.comment}</p>
          </div>
        </section>

        <div>
          <br />
          {deleteButton}
        </div>
      </li>
      <br />
    </div>
  );
};

CommentDetails.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default CommentDetails;
