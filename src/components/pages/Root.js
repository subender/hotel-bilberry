import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useStateValue } from "../../context/StateProvider";
import { useEffect } from "react";
import { actionType } from "../../context/reducer";
import { getFoodItems } from "../../Utils/firebasefunctions";

const RootLayout = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
