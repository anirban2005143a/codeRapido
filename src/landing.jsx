import React from "react";
import vaibhav from "/vaibhav.jpg";
import anirban from "/anirban.jpg";
import kunal from "/kunal.jpg";
import './css/landing.css'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate()

    const startPlaying= ()=>{
        navigate("/form")
    }

    return (
        <div id="landing" className="min-h-screen bg-black from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center text-white pt-6">
            <h1 className="text-6xl font-bold mb-4 tracking-wider animate-bounce m-4 drop-shadow-lg">
                Welcome to the Game of
            </h1>
            <h2 className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500 drop-shadow-xl animate-pulse">
                Grid-based Chain Reaction
            </h2>
            <p className="text-3xl font-semibold italic mb-8 text-gray-200 opacity-90 hover:opacity-100 transition-opacity duration-500 max-w-3xl text-center">
                "Unleash your strategic genius in a world where every move sparks a
                chain reaction. Are you ready to dominate the grid?"
            </p>
            <p className="text-lg text-center max-w-3xl mb-12 leading-relaxed tracking-wide opacity-90 hover:opacity-100 transition-opacity duration-500">
                Welcome to the most thrilling and intellectually challenging game you’ve
                ever encountered. Test your skills, strategize your moves, and watch the
                board come to life as chain reactions take over. Whether you're looking
                for some quick fun or a great time pass with friends, this game is
                designed to keep you on your toes and engaged for hours!
            </p>

            <h3 className="text-2xl font-bold">Created by</h3>
            <div
                className="mt-12"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "1000px",
                }}
            >
                <div className="flex flex-col items-center mt-4">
                    <img
                        src={vaibhav}
                        style={{
                            objectFit: "cover",
                        }}
                        alt="Owner"
                        className="w-32 h-32 rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                    <p className="mt-4 text-2xl">Vaibhav Aryan</p>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <img
                        src={anirban}
                        style={{
                            objectFit: "cover",
                        }}
                        alt="Owner"
                        className="w-32 h-32 rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                    <p className="mt-4 text-2xl">Anirban Das</p>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <img
                        src={kunal}
                        style={{
                            objectFit: "cover",
                        }}
                        alt="Owner"
                        className="w-32 h-32 rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                    <p className="mt-4 text-2xl">Kunal Verma</p>
                </div>
            </div>
            <div className="my-16">
                <button onClick={(e)=>{
                    e.preventDefault()
                    startPlaying()
                }}>
                    P  L  A  Y
                    <div id="clip">
                        <div id="leftTop" class="corner"></div>
                        <div id="rightBottom" class="corner"></div>
                        <div id="rightTop" class="corner"></div>
                        <div id="leftBottom" class="corner"></div>
                    </div>
                    <span id="rightArrow" class="arrow"></span>
                    <span id="leftArrow" class="arrow"></span>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;