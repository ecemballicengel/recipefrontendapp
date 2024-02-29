import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import postService from "../services/PostService";
import { useParams } from "react-router";
import putService from "../services/PutService";
import deleteService from "../services/DeleteService";
import Cookies from "js-cookie";

function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const{id}=useParams();
   
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const fetchedComment = await getData(`Comment/recipeComment/${id}`);
        setComments(fetchedComment);
      } catch (error) {
        console.error("Yorumlar alinamadi:", error);
      }
    };
      fetchComment();
    }, [id]);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
        if (editingCommentId) {
          const updatedComment = {
            id: editingCommentId,
            comment: newComment,
            recipeId: id,
          };
          await putService("Comment", updatedComment);
          setEditingCommentId(null);
        } else {

          const comment = {
            comment: newComment,
            recipeId: id,
          };
          const result = await postService("Comment", comment);
          setComments([...comments, result]);
        }
  
        setNewComment("");
      } catch (error) {
        console.error("Yorum eklenemedi:", error);
      }

  };
  const handleCommentEdit = (text, commentId) => {
    setNewComment(text);
    setEditingCommentId(commentId);
  };
  const handleCommentDelete = async (commentId) => {
    try {
      await deleteService(`Comment/${commentId}`);
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error("Yorum silinemedi:", error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2 style={{ color: "#8f1367" }}>Yorumlar</h2>
        <div className="row">
          <div className="col">
            <ul className="list-group">
              {comments && comments.map((comment) => (
                <li
                  key={comment.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                    <div className="col-2">
                  <img
                    src={comment.userImage}
                    alt=""
                    style={{
                      maxWidth: "5rem",
                      maxHeight: "4rem",
                      borderRadius: "100px",
                    }}
                  />
                  <h4>{comment.userName}</h4>
                  <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                  </div>
                  <div className="col-8">
                  <p className="align-items-left">{comment.comment}</p>
                  </div>
                  {
                    Cookies.get("userId") == comment.userId
                    ?
                    <><button
                      onClick={() => handleCommentEdit(comment.comment,comment.id)}
                      className="btn btn-lg ms-auto"
                      >
                    <span className="bi bi-pencil"></span>
                  </button>
                  <button
                  onClick={() => handleCommentDelete(comment.id)}
                  className="btn btn-lg "
                  >
                    <span className="bi bi-x"></span>
                  </button> </>:<></>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
        {
            Cookies.get("token") == undefined ?
            <></>:<form onSubmit={handleCommentSubmit} className="mb-3">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Yorumunuzu buraya yazın"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Yorum Yap
            </button>
          </form>
        }
        
      </div>
    </div>
  );
}

export default Comment;
