import Layout from "../Component/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/GlobalState";
import { type User } from "../Types/Interafaces";

function Search() {
  const { state, handleNavigateToUserId, getAllUsers } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: User[] = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <h1>Search Page</h1>
        <h3>People you may know</h3>
        <div>
          {users.map((user) => (
            <span
              key={user.user_id}
              onClick={() => handleNavigateToUserId(user.user_id)}
              style={{
                cursor: "pointer",
                display: "block",
                marginBottom: "5px",
              }}
            >
              {user.first_name} {user.last_name}
            </span>
          ))}
        </div>
        <ul>
          {state.currentUser ? (
            <li>
              Current User: {state.currentUser.first_name}{" "}
              {state.currentUser.last_name}
            </li>
          ) : null}
        </ul>
      </Layout>
    </div>
  );
}
export default Search;
