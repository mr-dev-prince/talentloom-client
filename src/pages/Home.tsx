import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionBox from "../components/QuestionBox";
import OptionsBar from "../components/OptionsBar";
import type { RootState } from "../redux/store";

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && !token) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div className="p-10 px-16 flex justify-center items-start gap-4">
      <div className="w-[80%] p-1 h-fit">
        <QuestionBox />
      </div>
      <div className="w-[20%] p-3 h-[80vh]">
        <OptionsBar />
      </div>
    </div>
  );
};

export default Home;
