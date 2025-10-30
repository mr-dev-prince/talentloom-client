/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionBox from "../components/QuestionBox";
import OptionsBar from "../components/OptionsBar";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchCurrentUser } from "../redux/feature/user/userThunk";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !token) {
      navigate("/auth");
      return;
    }

    if (token && !user) {
      dispatch(fetchCurrentUser(token));
    }
  }, [dispatch, token, navigate]);

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
