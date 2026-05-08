import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
// import { useContext } from "react";
// import { AppContext } from "../../Context/GlobalState";
import type { Like, Media, PostComment } from "../../Types/Interafaces";
// import PostActions from "./PostActions";

interface PostProps {
  post: {
    post_id?: string;
    author_id?: string;
    author_first_name?: string;
    author_last_name?: string;
    description?: string;
    content_url?: Media[]; // Now an array of Media objects
    likes?: Like[]; // Now an array of Like objects
    comments?: PostComment[]; // Your existing Comment interface
    created_at?: string;
  };
}

function PostFeed({ post }: PostProps) {
  // const { state } = useContext(AppContext);
  const firstMediaUrl = post.content_url?.[0]?.content_url ?? "";

  return (
    <article className="border rounded-lg mb-16">
      <PostHeader
        username={post.author_first_name || "Unknown"}
        lastname={post.author_last_name || "Unknown"}
      />
      <PostContent content_url={firstMediaUrl} description={post.description} />
      {/* <PostActions likes={post.likes} comments={post.comments} /> */}
    </article>
  );
}

export default PostFeed;
