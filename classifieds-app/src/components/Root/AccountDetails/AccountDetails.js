import React, { useState } from "react";
import { useSelector } from "react-redux";

import Account from "./Account";
import Login from "./Login";
import SignUp from "./SignUp";

const AccountDetails = () => {
  const [showLogin, setShowLogin] = useState(true);
  const session = useSelector(state => state.session);
  if (session) return <Account />;

  return showLogin ? (
    <Login onShowSignUp={() => setShowLogin(false)} />
  ) : (
    <SignUp onShowLogin={() => setShowLogin(true)} />
  );
};

export default AccountDetails;
