import Layout from "../Component/Layout";
import Post from "../Component/Post/Post";
// import mockPost from "../Types/mockPosts";
import { useContext } from "react";
import { AppContext } from "../Context/GlobalState";

function HomeFeed() {
  const { state } = useContext(AppContext);

  return (
    <div className="mt-4">
      <Layout>
        <h1>Home Feed</h1>
        {state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Layout>
    </div>
  );
}

export default HomeFeed;
