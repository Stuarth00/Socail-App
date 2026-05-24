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
  return (
    <header className="flex items-center gap-3 p-4">
      <img
        src={avatar}
        alt="UserProfile"
        className="w-15 h-15 rounded-full object-cover"
      />
      <span
        key={author_id}
        onClick={() => handleNavigateToUserId(author_id)}
        style={{
          cursor: "pointer",
          display: "block",
          marginBottom: "5px",
        }}
      >
        {username} {lastname}
      </span>
      <p>{created_at}</p>
    </header>
  );
}

export default PostHeader;
