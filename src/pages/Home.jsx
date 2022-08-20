import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Çıkış yap</button>
    </div>
  );
};
