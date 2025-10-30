import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CreateDiscussionModal from "./components/CreateDiscussionModal";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ProfileModal from "./components/ProfileModal";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  const createDiscussionModalOpen = useSelector(
    (state: RootState) => state.modal.createDiscussionModalOpen
  );

  const profileModalOpen = useSelector(
    (state: RootState) => state.modal.profileModalOpen
  );

  return (
    <Router>
      <Nav />
      {createDiscussionModalOpen && <CreateDiscussionModal />}
      {profileModalOpen && <ProfileModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
