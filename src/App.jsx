import React, { useEffect } from 'react'
import HomePage from './pages/HomePage/HomePage'
import {createBrowserRouter,RouterProvider,Outlet, Link} from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Gigs from './pages/Gigs/Gigs'
import Footer from './Components/Footer/Footer'
import "./App.scss"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Applied from './pages/Applied/AppliedForJobs'
import { ToastContainer } from 'react-toastify'
import MyProfile from './pages/MyProfile/MyProfile'
const App = () => {
  const fetch=async()=>{
  }
  useEffect(() => {
  }, [])
  const queryClient = new QueryClient();
  const Layout=()=>{
    return(
      <div className="app">
        <ToastContainer/>
         <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </QueryClientProvider>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage/>
,
        },
        
        {
          path: "/my-profile/:id",
          element: <MyProfile/>
,
        },
        {
          path: "/jobs",
          element: <Gigs />,
        },
        {
          path: "/applied/:id",
          element: <Applied />,
        },
        
        
        
      ],
    },

  ]);
 
  return <>
  
 <RouterProvider router={router} />

  </>
}

export default App


