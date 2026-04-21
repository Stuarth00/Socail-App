import { useContext } from "react";
import { AppContext } from "../../Context/GlobalState";

function PostProfile() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h1>Your posts</h1>
      <ul>
        {state.posts.map(
          (post) =>
            post.authorId === state.currentUser?.id && (
              <li key={post.id}>
                <img src={post.contentUrl} alt={post.description} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default PostProfile;
