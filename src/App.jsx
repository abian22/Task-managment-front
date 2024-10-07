import router from "./router/Router";
import "./App.css";
import Header from "./components/Header/Header";
import { RouterProvider } from "react-router";

const App = () => {
  return (
    <>
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
