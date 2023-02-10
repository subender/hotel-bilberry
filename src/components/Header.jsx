import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase.config";

import logo from "../img/logo.png";
import avatar from "../img/avatar.png";

import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { json, Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const onLoginHandler = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(providerData[0]);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  return (
    <header className=" fixed z-40 w-screen p-6 px-16">
      {/* Desktop & Tabs*/}
      <nav className="hidden md:flex h-full items-center justify-between">
        <Link to="/" className=" flex items-center gap-2 ">
          <img className=" w-8 object-cover" src={logo} alt="BilBerry's logo" />
          <p className=" text-headingColor font-bold text-xl">Bil-Berry</p>
        </Link>
        <div className=" flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className=" text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Service
            </li>
          </ul>
          <motion.div
            whileTap={{ scale: 1.2 }}
            className=" flex justify-center items-center relative"
          >
            <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out" />
            <div className=" absolute -top-2 -right-2 h-5 w-5 bg-cartNumBg rounded-full flex items-center justify-center">
              <p className=" text-xs text-white font-semibold">2</p>
            </div>
          </motion.div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              src={user ? user.photoURL : avatar}
              alt="user avatar"
              onClick={onLoginHandler}
            />
          </div>
        </div>
      </nav>
      {/* Mobile*/}
      <div className=" flex md:hidden h-full ">Mobile</div>
    </header>
  );
};

export default Header;
