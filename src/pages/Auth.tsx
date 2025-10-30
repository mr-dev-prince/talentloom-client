import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { loginUser, registerUser } from "../redux/feature/user/userThunk";

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    bio: "",
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    } else {
      dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          bio: formData.bio,
        })
      );
    }
  };

  return (
    <div className="flex justify-center items-center  h-fit py-24 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border p-2 rounded"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                className="border p-2 rounded"
                value={formData.dob}
                onChange={handleChange}
              />
              <textarea
                name="bio"
                placeholder="Short Bio"
                className="border p-2 rounded"
                value={formData.bio}
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <p className="text-sm text-gray-600 text-center mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
