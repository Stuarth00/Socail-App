import { useContext } from "react";
import { differenceInYears } from "date-fns";
import { AppContext } from "../../Context/GlobalState";
import Authorization from "../Authorization/Authorization";

function ProfilePage() {
  const { state, dispatch } = useContext(AppContext);

  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      {state.currentUser ? (
        <div>
          <div>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          {/* {(() => {
            const age = differenceInYears(new Date(), new Date(state.currentUser.DateOfBirth));
            return <p>Age: {age}</p>;
          })()} */}
          <h1>
            {state.currentUser.first_name} {state.currentUser.last_name}'s
            Profile
          </h1>
          <p>Email: {state.currentUser.email}</p>
          <p>
            Age:{" "}
            {differenceInYears(
              new Date(),
              new Date(state.currentUser.DateOfBirth),
            )}
          </p>
          {/* Add more profile details here */}
        </div>
      ) : (
        <Authorization />
      )}
    </div>
  );
}

export default ProfilePage;
