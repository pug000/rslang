import React from 'react'
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  conditionValue: boolean | null,
  children: JSX.Element,
}

const Protected = ({ conditionValue, children }: ProtectedProps) => {
  if (!conditionValue) return <p>Вам необходимо зайти под вашей учетной записью или зарегистрироваться</p>
  return children;
}

export default Protected
