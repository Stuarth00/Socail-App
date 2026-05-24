import { useContext, useEffect, useState } from "react";
import type { User } from "../../Types/Interafaces";
import { AppContext } from "../../Context/GlobalState";
import "../../index.css";

interface FollowListProps {
  type: "followers" | "following";
  user_id: string;
  onClose: () => void;
}

function FollowList({ type, user_id, onClose }: FollowListProps) {
  const { getFollowersList, getFollowingList, handleNavigateToUserId } =
    useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);

  const handleClick = (userId: string) => {
    handleNavigateToUserId(userId);
    onClose();
  };

  useEffect(() => {
    const fetchList = async () => {
      if (type === "followers") {
        const data = await getFollowersList(user_id, type);
        setUsers(data);
      }
      if (type === "following") {
        const data = await getFollowingList(user_id, type);
        setUsers(data);
      }
    };
    fetchList();
  }, [user_id, type]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {type === "followers" ? "Followers" : "Following"}
      </h2>

      <div className="modal-list-container">
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No {type === "followers" ? "followers" : "following"} yet.</p>
          </div>
        ) : (
          users.map((user) => (
            <span
              key={user.user_id}
              className="user-row"
              onClick={() => handleClick(user.user_id)}
              style={{
                cursor: "pointer",
                display: "block",
                marginBottom: "5px",
              }}
            >
              {user.first_name} {user.last_name}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default FollowList;
