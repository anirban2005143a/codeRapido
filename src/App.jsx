import { useState, useEffect } from 'react'
import Form from './form'
import Game from './game'

function App() {

  const [user, setuser] = useState([])

  // console.log(user)

  return (
    <>
      {/* {user.length === 0 && <Form setuser={setuser}/>} */}
      {user.length===0 && <Game user={user} />}
    </>
  )
}

export default App
