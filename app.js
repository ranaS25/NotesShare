import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './src/components/Header';
import Main from './src/components/Main';

import About  from './src/components/About';
import Login from './src/components/Login';
import Register  from './src/components/Register';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';







const ParentContainer = ()=>{
    return (  
    <>
    <Header/>
    <Outlet/>
    </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'))



const appRouter = createBrowserRouter([
    {
    path: '/',
    element: <ParentContainer />,
    children: [
        {
            path: '/',
            element: <Main />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/about',
            element: <About />,
        }
    ]
    
},

]);

root.render(<RouterProvider router={appRouter}/>)

