import React, { useContext, useEffect} from "react";
import  Home  from "../view/Home/Home"
import Auth from "../view/Auth/Auth";
import Registration from "../view/Registration/Registration";
import '../css/reset.css';
import './App.css'
import Layout from "../components/Layout/Layout";
import "../components/Layout/Layout.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { observer } from "mobx-react-lite";
import { checkAuth, userData} from "../http/userAPI";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Auth/>
  },
  {
    path: "/registration",
    element: <Registration/>
  }
]);


const App = observer( () => {
  const {userStore} = useContext(UserContext)

  useEffect(() => {
    if(localStorage.getItem("Token")) {
      checkAuth().then(() =>{
        localStorage.setItem('userAuth', true)
      })
    }
  })
  useEffect(() => {
    if(localStorage.getItem("userAuth")) {
      userData().then(data => userStore.setUser(data))
    }
  })
  return (
    <Layout>
      <div className="App">
        <RouterProvider router={router} />
      </div>   
    </Layout>
  );
})

export default App;