import Layout from "../Component/Layout";
import { useContext } from "react";
import { AppContext } from "../Context/GlobalState";

function Search() {
  const { state } = useContext(AppContext);
  console.log(state.users);
  console.log("current user in search page", state.currentUser);
  return (
    <div>
      <Layout>
        <h1>Search Page</h1>
        <h3>People you may know</h3>
        <ul>
          {state.users.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
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
