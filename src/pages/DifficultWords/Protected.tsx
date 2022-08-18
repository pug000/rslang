import React from 'react'
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isLoggedIn: boolean | null,
  children: JSX.Element,
}

const Protected = ({ isLoggedIn, children }: ProtectedProps) => {
  if (!isLoggedIn) {
    <p>Вам необходимо зайти под вашей учетной записью или зарегистрироваться</p>
    // return <Navigate to="/" replace />;

  }
  return children;
}

export default Protected
