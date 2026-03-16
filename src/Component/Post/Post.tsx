import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
// import mockPost from "../../Data/mockPosts";

interface PostContent {
  id: number;
  user: string;
  content: string;
  likes: number;
  comments: [];
}

function Post() {
  return (
    <article className="border p-8">
      <PostHeader />
      <PostContent />
      <PostActions />
    </article>
  );
}

export default Post;
