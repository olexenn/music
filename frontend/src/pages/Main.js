import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  });

  return(
    <div>
    <Footer />
    </div>
  )
}
