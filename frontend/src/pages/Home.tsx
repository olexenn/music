import React from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";

const Home = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <Button
        type="button"
        title="LogOut"
        onClick={() => {
          localStorage.removeItem("user");
          history.push("/login");
        }}
      />
    </React.Fragment>
  );
};

export default Home;
