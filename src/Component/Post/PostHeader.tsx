function PostHeader({
  avatar,
  username,
  lastname,
  handleNavigateToUserId,
  author_id,
  created_at,
}: {
  avatar: string;
  username: string;
  lastname: string;
  handleNavigateToUserId: (userId: string) => void;
  author_id: string;
  created_at: string;
}) {
  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <header className="flex items-center gap-3 p-4">
      <img
        src={avatar}
        alt={`${username}'s profile`}
        className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-100 shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span
          key={author_id}
          onClick={() => handleNavigateToUserId(author_id)}
          className="font-semibold text-sm text-gray-900 cursor-pointer hover:underline truncate"
        >
          {username} {lastname}
        </span>
        <p className="text-xs text-gray-400 font-medium">{formattedDate}</p>
      </div>
    </header>
  );
}

export default PostHeader;
