import React, { useState, useEffect , useRef } from 'react'
import io from "socket.io-client";

const form = (props) => {

    const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL
    const socketref = useRef()

    const [isloading, setisloading] = useState(false)

    useEffect(() => {

        const socket = io(`${backendUrl}`);
        socketref.current = socket

        socket.on("userjoin", (data) => {
            console.log(data)
            setisloading(false)
            localStorage.setItem("isJoined" , 'true')
            props.setuser(data.participants) 
        })
    }, [])

    const joinGame = () => {
        const roomno = document.querySelectorAll('input')[0].value
        const name = document.querySelectorAll('input')[1].value

        socketref.current.emit("joinGame", {
            roomno,
            name
        })

    }

    return (

        <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex flex-col items-center justify-center">

            <div className="w-80 rounded-2xl bg-slate-900">
                <div className="flex flex-col gap-2 px-3 py-5">
                    <p className="text-center text-3xl text-gray-300 mb-4">Enter Game</p>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setisloading(true)
                        joinGame()
                    }} className=' flex flex-col items-center gap-3'>
                        <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" placeholder="Room No" />
                        <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" placeholder="Your Name" />
                        <button type='submit' className="cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">
                            {!isloading && <div>Enter</div>}
                            {isloading && <div className=' flex justify-center items-center gap-2'>
                                <div className="spinner-border w-[25px] h-[25px]" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className=' text-sm'>Entering</p>
                            </div>}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default form