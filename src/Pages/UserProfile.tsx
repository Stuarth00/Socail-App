import Layout from "../Component/Layout";
import PostProfile from "../Component/Post/PostProfile";
import ProfilePage from "../Component/ProfilePage/profilePage";

function UserProfile() {
  return (
    <div>
      <Layout>
        <ProfilePage>
          <PostProfile />
        </ProfilePage>
      </Layout>
    </div>
  );
}

export default UserProfile;
