interface AvatarProps {
  type: "avatar";
  avatar: string;
  onClose: () => void;
}

function Avatar({ avatar }: AvatarProps) {
  return (
    <div>
      <img
        src={avatar || "/default-avatar.png"}
        alt={`${"User"}'s profile picture`}
        className="h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}
export default Avatar;
