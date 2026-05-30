import { Heart, MessageCircle, Forward, Smile } from "lucide-react";
import "../../index.css";
import type { Media, Like, PostComment } from "../../Types/Interafaces";

function CommentList({
  likesCount,
  isLiked,
  post,
}: {
  likesCount: number;
  isLiked: boolean;
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
}) {
  return (
    // Backdrop overlay
    <div>
      {/* Main Modal Container */}
      <div className="w-full max-w-5xl h-[85vh] max-h-[700px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* ================= LEFT SIDE: MEDIA CONTENT ================= */}
        <div className="w-full md:w-[55%] h-1/2 md:h-full bg-black flex items-center justify-center relative select-none border-b md:border-b-0 md:border-r border-gray-100">
          <img
            src={
              post.media && post.media.length > 0
                ? post.media[0].content_url
                : ""
            }
            alt="Post content"
            className="w-full h-full object-contain"
          />
        </div>

        {/* ================= RIGHT SIDE: INTERACTION SIDEBAR ================= */}
        <div className="w-full md:w-[45%] h-1/2 md:h-full flex flex-col bg-white">
          {/* 1. Header (Sticky Top) */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            {/* Reuse your <PostHeader /> here */}
            <div className="flex items-center gap-3">
              <img
                src={post.author_avatar}
                className="w-9 h-9 rounded-full object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900">
                  {post.author_first_name} {post.author_last_name}
                </span>
                <span className="text-xs text-gray-400">Original Poster</span>
              </div>
            </div>
          </div>

          {/* 2. Scrollable Comments Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {/* Post Description (Acts as the very first "comment") */}
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <img
                src={post.author_avatar}
                className="w-8 h-8 rounded-full object-cover shrink-0"
                alt=""
              />
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong className="font-semibold mr-1.5">
                  {post.author_first_name}
                </strong>
                {post.description}
              </p>
            </div>

            {/* Simulated List of Comments */}
            <div className="space-y-4">
              {/* Individual Comment Example */}
              <div className="flex items-start gap-3 group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  alt=""
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <strong className="font-semibold mr-1.5">sarah_k</strong>
                    This layout implementation looks absolutely incredible! 🚀
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>2h</span>
                    <button className="font-semibold hover:text-gray-600">
                      Reply
                    </button>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Repeat your map() array over actual comments here */}
            </div>
          </div>

          {/* 3. Replicated Action Bar (Sticky Bottom Area) */}
          <div className="border-t border-gray-100 p-4 bg-white shrink-0">
            {/* Reuse your <PostActions /> or embed the horizontal bar here */}
            <div className="flex items-center gap-5 mb-2">
              <button className="hover:scale-110 transition-transform">
                <Heart
                  className={
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                  }
                />
              </button>
              <button className="hover:scale-110 transition-transform">
                <MessageCircle className="text-gray-700" />
              </button>
              <button className="hover:scale-110 transition-transform">
                <Forward className="text-gray-700" />
              </button>
            </div>

            {/* Likes Display */}
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {likesCount} likes
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
              May 29, 2026
            </p>
          </div>

          {/* 4. Input Comment Form (Sticky Bottom Boundary) */}
          <div className="border-t border-gray-100 px-4 py-3 bg-white shrink-0">
            <form className="flex items-center gap-3">
              {/* Emoji Picker Trigger (UX Bonus) */}
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors hidden sm:block"
              >
                <Smile className="w-6 h-6" />
              </button>

              <textarea
                // rows="1"
                className="flex-1 text-sm text-gray-800 focus:outline-none resize-none max-h-20 py-1"
                placeholder="Add a comment..."
                style={{ height: "auto" }}
              />

              <button
                type="submit"
                className="text-sm font-semibold text-blue-500 hover:text-blue-700 disabled:opacity-40 transition-colors whitespace-nowrap"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
