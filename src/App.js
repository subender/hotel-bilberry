import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import RootLayout from "./components/pages/Root";
import CreateContainer from "./components/CreateContainer";
import { AnimatePresence } from "framer-motion";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainContainer /> },
      { path: "createItem", element: <CreateContainer /> },
    ],
  },
]);
function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimatePresence>
        <RouterProvider router={router}></RouterProvider>;
      </AnimatePresence>
    </StateProvider>
  );
}

export default App;
