import { Forward, Heart, MessageCircle } from "lucide-react";
// {
//   likes,
//   comments,
// }: {
//   likes: number;
//   comments: string[];
// }

function PostAction({
  description,
  likes,
}: {
  description: string | undefined;
  likes: number;
}) {
  return (
    <div>
      <div>
        <button>
          <Heart />
          <span>{likes}</span>
        </button>
        <button>
          <MessageCircle />
        </button>
        <button>
          <Forward />
        </button>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PostAction;
