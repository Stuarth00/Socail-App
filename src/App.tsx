import { Routes, Route } from "react-router-dom";
import HomeFeed from "./Pages/HomeFeed";
import AuthorizationPage from "./Pages/Authorization";
import UserProfile from "./Pages/UserProfile";

import "./App.css";
import { AppProvider } from "./Context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
