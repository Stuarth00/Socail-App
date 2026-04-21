function PostHeader({
  username,
  lastname,
}: {
  username: string;
  lastname: string;
}) {
  return (
    <header className="flex items-center gap-3 p-4">
      <img
        // src={avatar}
        alt="UserProfile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="font-semibold text-sm">
        {username} {lastname}
      </p>
    </header>
  );
}

export default PostHeader;
