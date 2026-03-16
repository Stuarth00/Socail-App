import Layout from "../Component/Layout";
import Post from "../Component/Post/Post";
// import mockPost from "../Data/mockPosts";

function HomeFeed() {
  return (
    <div>
      <Layout>
        <h1>Home Feed</h1>
        <Post />
      </Layout>
    </div>
  );
}

export default HomeFeed;
