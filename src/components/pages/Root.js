import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const RootLayout = () => {
  return (
    <div className=" w-screen h-auto flex flex-col bg-primary">
      <Header />

      <main className=" mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
