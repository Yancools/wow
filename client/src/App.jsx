import React, {useContext, useEffect} from "react";
import Auth from "./view/Auth/Auth";
import Profile, { ProfileLoader } from "./view/Profile/Profile";
import Registration from "./view/Registration/Registration";
import { Navigate, createBrowserRouter, RouterProvider} from 'react-router-dom'
import { observer } from "mobx-react";
import { checkAuth, userData } from "./http/userAPI";
import { UserContext } from "./providers/UserProvider";
import { jwtDecode } from "jwt-decode"
import Header from "../src/components/Header/Header"
import Settings from "./view/Settings/Settings";
import RequireAuth from "./hoc/RequireAuth";
import WithoutAuth from "./hoc/WithoutAuth";
import Error from "./view/Error/Error";
import { AUTHORIZATION_ROUTE, DEFAULT_ROUTE, EDITPROFILE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE } from "./utils/consts";
import EditProfile from "./view/editProfile/editProfile";

const App = observer( () => {
  const {userStore} = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem("Token")){
      try {
        checkAuth().then(responce => {
          const decode = jwtDecode(responce.data)
          userData(decode.nickname).then(data => {
            userStore.setUserData(data)
            userStore.setProfileUrl(data.nickname)
          })
        })
      } catch (error) {
        localStorage.removeItem('Token')
      }
      
    }
    return(
      userStore.setUserData({}),
      userStore.setProfileUrl({})
    )
  }, [userStore])
  const router = createBrowserRouter([
    {
      path: DEFAULT_ROUTE,
      errorElement: <Error/>,
      element:  
      <RequireAuth>
        <Navigate to={userStore.profileUrl}/>
      </RequireAuth>
    },
    {
      path: PROFILE_ROUTE,
      errorElement: <Error/>,
      loader: ProfileLoader,
      element: 
      <RequireAuth>
        <Header/>
        <Profile/>
      </RequireAuth>
    },
    {
      path: EDITPROFILE_ROUTE,
      errorElement: <Error/>,
      element:  
      <RequireAuth>
        <Header/>
        <EditProfile/>
      </RequireAuth>
    },
    {
      path: SETTINGS_ROUTE,
      errorElement: <Error/>,
      element:  
      <RequireAuth>
        <Header/>
        <Settings/>
      </RequireAuth>
    },
    {
      path: AUTHORIZATION_ROUTE,
      errorElement: <Error/>,
      element:  
      <WithoutAuth>
        <Header/>
        <Auth/>
      </WithoutAuth>
    },
    {
      path: REGISTRATION_ROUTE,
      errorElement: <Error/>,
      element:  
      <WithoutAuth>
        <Header/>
        <Registration/> 
      </WithoutAuth>
    }
  ]);
  return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
  );
})

export default App;