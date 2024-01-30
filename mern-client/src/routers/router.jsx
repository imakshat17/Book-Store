import {
    createBrowserRouter,
    RouterProvider,
    useLoaderData,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import OneBook from "../shop/OneBook";
import DashboardLayout from "../dashBoard/DashboardLayout";
import Dashboard from "../dashBoard/Dashboard";
import UploadBook from "../dashBoard/UploadBook";
import Manage from "../dashBoard/Manage";
import Edit from "../dashBoard/Edit";
import Signup from "../components/SignUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";


 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },{
            path:"/shop",
            element:<Shop/>
        },
        {
            path:"/about",
            element:<About/>
        },
        {
            path:"/blog",
            element:<Blog/>
        },
        {
            path:"/books/:id",
            element:<OneBook/>,
            loader:({params})=>fetch(`http://localhost:3000/books/${params.id}`)
        },
        
        
       
        
      ]
    },
    {
        path:"/admin/dashboard",
        element:<DashboardLayout/>,
        children:[
              {
                path:"/admin/dashboard",
                element:<PrivateRoute><Dashboard/></PrivateRoute>
              },
              {
                path:"/admin/dashboard/upload",
                element:<UploadBook/>
              },
              {
               path:"/admin/dashboard/manage",
               element:<Manage/>
              },
              {
                path:"/admin/dashboard/edit-book/:id",
                element:<Edit/>,
                loader:({params})=>fetch(`http://localhost:3000/books/${params.id}`)
              }
        ]
    },
    {
      path:"sign-up",
      element:<SignUp/>
    },{
      path:"login",
      element:<Login/>
    },
    {
      path:"logout",
      element:<Logout/>
    }
    
  ]);
  
  export default router