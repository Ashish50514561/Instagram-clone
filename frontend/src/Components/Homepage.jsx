import React from "react";
import Story from "./Home/Body/stories/Story";
import Addstory from "./Home/Forms/Addstory";
import Login from "./Home/Forms/Login";
import Signup from "./Home/Forms/Signup";
import Home from "./Home/Home";
import routes from "./Home/Routes/routes";

export default function Homepage() {
  return (
    <div>
      {routes()}
   
    </div>
  );
}
