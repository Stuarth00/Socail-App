import { Forward, Heart, MessageCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/GlobalState";
import Modal from "../Authorization/Modal";
import LikeList from "../ActionUser/LikeList";
import CommentList from "../ActionUser/CommentList";
import SharePost from "../ActionUser/SharePost";

interface LikeUser {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

function PostAction({
  description,
  likes,
  post_id,
}: {
  description: string | undefined;
  likes: { user_id: string }[] | undefined;
  post_id: string;
}) {
  const [likesCount, setLikesCount] = useState(likes?.length || 0);
  const { toggleLike, state, getLikesByPostId } = useContext(AppContext);
  const currentUserId = state.currentUser?.user_id;
  const [isLiked, setIsLiked] = useState(
    likes?.some((like) => like.user_id === currentUserId) || false,
  );
  const [actionClicked, setActionClicked] = useState<
    "like" | "comment" | "share" | null
  >(null);

  const [likesList, setLikesList] = useState<LikeUser[]>([]);

  useEffect(() => {
    if (!currentUserId) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLiked(likes?.some((like) => like.user_id === currentUserId) || false);
  }, [likes, currentUserId]);

  const handleClick = async () => {
    const previousIsLiked = isLiked;
    const previousLikeCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount((prev) => (previousIsLiked ? prev - 1 : prev + 1));

    try {
      const result = await toggleLike(post_id);

      setIsLiked(result.is_liked);
      setLikesCount(result.likesCount);
    } catch (err) {
      console.error("Backend failed, rolling back UI", err);
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikeCount);
    }
  };

  const fetchLikesList = async () => {
    try {
      const data: LikeUser[] = await getLikesByPostId(post_id);
      setLikesList(data);
    } catch (err) {
      console.error("Failed to fetch likes list", err);
    }
  };

  const modalAction = () => {
    switch (actionClicked) {
      case "like":
        return <LikeList data={likesList} />;

      case "comment":
        return <CommentList />;

      case "share":
        return <SharePost />;
    }
  };

  return (
    <div>
      <div className="max-w-md p-4 border border-gray-100 rounded-xl shadow-sm bg-white">
        <div className="mb-3">
          <p className="text-gray-800 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-gray-50">
          <div
            className="flex items-center gap-1.5 group cursor-pointer"
            onClick={async () => {
              await fetchLikesList();
              setActionClicked("like");
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="p-1.5 rounded-full hover:bg-red-50 transition-colors duration-200"
              aria-label="Like post"
            >
              <Heart
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${isLiked ? "fill-red-500 stroke-red-500" : "text-gray-600"}`}
              />
            </button>
            <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900">
              {likesCount}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 group cursor-pointer"
            onClick={() => setActionClicked("comment")}
          >
            <button
              className="p-1.5 rounded-full hover:bg-blue-50 transition-colors duration-200"
              aria-label="View comments"
            >
              <MessageCircle className="w-5 h-5 text-gray-600 transition-transform group-hover:scale-110" />
            </button>
            <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900">
              2
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 group cursor-pointer"
            onClick={() => setActionClicked("share")}
          >
            <button
              className="p-1.5 rounded-full hover:bg-green-50 transition-colors duration-200"
              aria-label="Share post"
            >
              <Forward className="w-5 h-5 text-gray-600 transition-transform group-hover:scale-110" />
            </button>
            <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900">
              5
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          <button
            onClick={() => setActionClicked("comment")}
            className="text-xs font-medium text-gray-400 hover:underline mb-1 block"
          >
            View all 2 comments
          </button>
          <p className="text-xs text-gray-700">
            <strong className="font-semibold mr-1">alex_dev</strong> Much better
            in horizontal! 👑
          </p>
        </div>
      </div>

      {actionClicked && (
        <Modal onClose={() => setActionClicked(null)}>
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            onClick={() => setActionClicked(null)}
          >
            {" "}
            X{" "}
          </button>
          {modalAction()}
        </Modal>
      )}
    </div>
  );
}

export default PostAction;
