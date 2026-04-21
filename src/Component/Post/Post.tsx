import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import type { Comment } from "../../Types/Interafaces";
import { useContext } from "react";
import { AppContext } from "../../Context/GlobalState";
// import PostActions from "./PostActions";
// import mockPost from "../../Data/mockPosts";

interface PostProps {
  post: {
    id: number;
    authorId: string;
    contentUrl: string;
    description: string;
    likes: string[];
    createdAt: string;
    comments: Comment[];
  };
}

function Post({ post }: PostProps) {
  const { state } = useContext(AppContext);
  const author = state.users.find((u) => u.id === post.authorId);
  return (
    <article className="border rounded-lg mb-16">
      <PostHeader
        username={author?.first_name || "Unknown"}
        lastname={author?.last_name || "Unknown"}
      />
      <PostContent
        contentUrl={post.contentUrl}
        description={post.description}
      />
      {/* <PostActions likes={post.likes} comments={post.comments} /> */}
    </article>
  );
}

export default Post;
