import Layout from "../Component/Layout";
import { useContext } from "react";
import { AppContext } from "../Context/GlobalState";

function Search() {
  const { state, handleNavigateToUserId } = useContext(AppContext);
  console.log(state.users);
  console.log("current user in search page", state.currentUser);
  return (
    <div>
      <Layout>
        <h1>Search Page</h1>
        <h3>People you may know</h3>
        <div>
          {state.users.map((user) => (
            <span
              key={user.id}
              onClick={() => handleNavigateToUserId(user.id)}
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
