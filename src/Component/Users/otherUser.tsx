import Layout from ".././Layout";
import ProfilePage from "../ProfilePage/profilePage";
import FirstAttempt from "./firstAttempt";
function OtherUser() {
  return (
    <div>
      <Layout>
        <ProfilePage>
          <FirstAttempt />
        </ProfilePage>
      </Layout>
    </div>
  );
}
export default OtherUser;
