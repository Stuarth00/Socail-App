import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
// import { useContext } from "react";
// import { AppContext } from "../../Context/GlobalState";
import type { Like, Media, PostComment } from "../../Types/Interafaces";
import PostActions from "./PostActions";

interface PostProps {
  post: {
    post_id?: string;
    author_id?: string;
    author_avatar?: string;
    author_first_name?: string;
    author_last_name?: string;
    description?: string;
    media?: Media[];
    likes?: Like[];
    comments?: PostComment[];
    created_at?: string;
  };
  handleNavigateToUserId: (userId: string) => void;
}

function PostFeed({ post, handleNavigateToUserId }: PostProps) {
  // const { state } = useContext(AppContext);
  const first_media_url =
    post.media && post.media.length > 0 ? post.media[0].content_url : null;

  return (
    <article className="border rounded-lg mb-16">
      <PostHeader
        avatar={post.author_avatar || "Unknown"}
        username={post.author_first_name || "Unknown"}
        lastname={post.author_last_name || "Unknown"}
        handleNavigateToUserId={handleNavigateToUserId}
        author_id={post.author_id || ""}
        created_at={post.created_at || ""}
      />
      <div className="border-b border-t">
        <PostContent content_url={first_media_url!} />
      </div>
      <PostActions
        description={post.description}
        likes={post.likes?.length || 0}
      />
    </article>
  );
}

export default PostFeed;
