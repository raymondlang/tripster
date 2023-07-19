import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../slices/commentSlice";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const currentUser = useSelector((state) => state.session.user);
  const { tripId } = useParams();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      author: currentUser,
      comment,
      tripId,
    };

    dispatch(createComment(newComment)).then(() => setComment(""));
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-comment-subcontainer">
        <input
          className="comments-input-element"
          type="text"
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment here"
        />
        <br />
        <img
          className="create-comment-submit-btn"
          alt="submit-comment-btn"
          onClick={handleSubmit}
          src="https://i.ibb.co/th9QxJw/comment-submit.png"
        />
      </div>
    </form>
  );
};

export default CreateComment;
