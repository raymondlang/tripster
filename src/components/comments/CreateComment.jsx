import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../slices/commentSlice";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const currentUser = useSelector((state) => state.session.user);
  const { tripId } = useParams();
  const [comment, setComment] = useState("");
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      author: currentUser,
      comment,
      tripId,
    };

    // Set the loading state to true before dispatching the createComment action
    setIsCreatingComment(true);
    dispatch(createComment(newComment))
      .then(() => setComment(""))
      .catch((error) => console.error("Error creating comment:", error))
      .finally(() => setIsCreatingComment(false)); // Set the loading state to false when the createComment action is completed
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
