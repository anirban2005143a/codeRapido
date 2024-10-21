import { useState, useEffect } from 'react'
import Form from './form'
import Game from './game'
import LandingPage from './landing'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const [user, setuser] = useState([])
  // console.log(user)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/form",
      element: <Form setuser={setuser} />,
    },
    {
      path: "/game",
      element: <Game user={user} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
