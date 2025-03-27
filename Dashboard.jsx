import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0); // To skip posts for pagination
  const limit = 5; // Show 5 posts per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}&select=title,body,reactions,userId`
      );
      setPosts(response.data.posts);
    } catch (err) {
      setError("Failed to load posts!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [skip]);

  return (
    <div className="dashboard">
      <h2>Users Posts</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>

            {/* ✅ Fetch Comments for each post */}
            <Comments postId={post.id} />
          </div>
        ))}
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="pagination">
        <button onClick={() => setSkip(skip - limit)} disabled={skip === 0}>
          Previous
        </button>
        <button onClick={() => setSkip(skip + limit)}>Next</button>
      </div>
    </div>
  );
};


const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/comments/post/${postId}`)
      .then((res) => setComments(res.data.comments))
      .catch(() => setComments([]));
  }, [postId]);

  return (
    <div className="comments">
      <h4>Comments:</h4>
      {comments.length > 0 ? (
        comments.map((comment) => <p key={comment.id}>- {comment.body}</p>)
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default Dashboard;
