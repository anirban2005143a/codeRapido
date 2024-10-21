import { useState, useEffect, useRef } from 'react'
import Result from './result'

function game() {


  const [records, setrecords] = useState({
    player1: 0,
    player2: 0,
  })

  const [isGameOver, setisGameOver] = useState(false)
  const [winner, setwinner] = useState(0)

  const audioRef = useRef()

  const checkScore = (obj) => {

    (obj.player1 + obj.player2) !== 25 ? (() => {
      if (obj.player1 >= 15) {
        setwinner(1)
        setisGameOver(true)
        console.log("player1 Wins")
      }

      if (obj.player2 >= 15) {
        setwinner(2)
        setisGameOver(true)
        console.log("player2 wins")
      }
    }) :
      (() => {
        obj.player1 > obj.player2 ? (() => {
          console.log("player 2 wins")
          setwinner(1)
          setisGameOver(true)
        })() : (() => {
          setwinner(1)
          setisGameOver(true)
          console.log("player 2 wins")
        })()
      })()
  }

  const changeRecords = (owner, change) => {
    const obj = records
    change === "plus" ?
      owner === "1" ? obj.player1++ : obj.player2++ :
      owner === "1" ? obj.player1-- : obj.player2--
    console.log(obj)
    setrecords(obj)
    checkScore(obj)
  }

  const playAudio = () => {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  const startGame = () => {
    playAudio()

    localStorage.setItem("player", "true")

    const promt = document.querySelector(".promts")

    promt.innerHTML = "now Player 1 turn"

  }

  const togglePlayer = () => {
    let player = localStorage.getItem("player")

    if (player === "true") {
      localStorage.setItem("player", "false")
    }
    if (player === "false" || player === "null") {
      localStorage.setItem("player", "true")
    }
  }

  const selectDiv = () => {
    // let player = localStorage.getItem("player")

    const gridArr = Array.from(document.querySelectorAll(".col"))
    gridArr.forEach((grid) => {
      grid.addEventListener("click", () => {
        const row = grid.id.split("")[0]
        const col = grid.id.split("")[1]

        const obj = {
          row, col
        }

        // console.log(obj)
        playAudio()

        inputHandel(row, col)

        return obj
      })
    })
  }

  const footnewala = (r, c) => {

    const row = Number(r)
    const col = Number(c)

    console.log("Come in the case where we have more than 4 ");
    const curr = document.getElementById(`${row}${col}`)


    let prevowner = curr.getAttribute("owner");
    // let prevparticle = Number(curr.getAttribute("particle"));

    curr.setAttribute("particle", "0")
    curr.setAttribute("owner", "null")
    displayParticle(row, col, "0", null)

    changeRecords(`${prevowner}`, "minus")

    row + 1 <= 4 ? addNumber(prevowner, row + 1, col) : ""
    row - 1 >= 0 ? addNumber(prevowner, row - 1, col) : ""
    col + 1 <= 4 ? addNumber(prevowner, row, col + 1) : ""
    col - 1 >= 0 ? addNumber(prevowner, row, col - 1) : ""
  };

  const addNumber = (prevowner, row, col) => {
    const grid = document.getElementById(`${row}${col}`);

    let particle = Number(grid.getAttribute("particle"))

    if (particle !== 0) {
      particle++
      particle < 4 ? grid.setAttribute("particle", particle) : footnewala(`${row}`, `${col}`)

      let owner = grid.getAttribute("owner");

      owner === "1" ? displayParticle(row, col, grid.getAttribute("particle"), "1") : ""
      owner === "2" ? displayParticle(row, col, grid.getAttribute("particle"), "2") : ""

    } else {
      changeRecords(`${prevowner}`, "plus")

      grid.setAttribute("owner", `${prevowner}`)
      grid.setAttribute("particle", "1")
      displayParticle(row, col, 1, prevowner)
    }
  }

  const inputHandel = (row, col) => {

    let player = localStorage.getItem("player")

    const grid = document.getElementById(`${row}${col}`)

    const promt = document.querySelector(".promts")

    let owner = grid.getAttribute("owner")
    let particle = Number(grid.getAttribute("particle"))

    // console.log(player)

    if (player === "true" && (owner === "null" || owner === "1") && particle < 4) {
      // console.log("Player 2")
      grid.setAttribute("owner", `${1}`)
      particle++;
      if (particle >= 4) {
        footnewala(row, col)
      } else {
        grid.setAttribute("particle", `${particle}`)
        displayParticle(row, col, particle, grid.getAttribute("owner"))
      }
      promt.innerHTML = "now Player 2 turn"

      owner === "null" ? changeRecords("1", "plus") : ""

      togglePlayer()

    }

    if (player === "false" && (owner === "null" || owner === "2") && particle < 4) {
      // console.log("Player 2")
      grid.setAttribute("owner", `${2}`)
      particle++;
      if (particle >= 4) {
        footnewala(row, col, player)
      } else {
        grid.setAttribute("particle", `${particle}`)
        displayParticle(row, col, particle, grid.getAttribute("owner"))
      }
      promt.innerHTML = "now Player 1 turn"

      owner === "null" ? changeRecords("2", "plus") : ""

      togglePlayer()

    }
  }


  const displayParticle = (row, col, value, owner) => {
    const grid = document.getElementById(`${row}${col}`)
    if (value > 0 && value <= 3) {
      if (owner === "1") {
        grid.innerHTML = `<div>${value}R</div>`
      } else if (owner === "2") {
        grid.innerHTML = `<div>${value}B</div>`
      }
    } else {
      grid.innerHTML = "<div></div>"
    }

  }

  useEffect(() => {

    localStorage.setItem("player", "null")

    selectDiv()

  }, [])

  console.log(records)

  return (
    <>

      <audio ref={audioRef}>
        <source src="/sound.mp3" type="audio/mp3" />
      </audio>

      <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex flex-col items-center justify-center">
        <div className="promts text-black text-3xl py-2 px-1 m-2 font-semibold text-center">
          Enter the Start button Below
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg cursor-default">
          <div>
            <div className="row flex justify-center items-center" id="0">
              <div id="00" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center  max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-red-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="01" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center  max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-yellow-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="02" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center  max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-green-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="03" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center  max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-blue-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="04" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center  max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-purple-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
            </div>
            <div className="row flex justify-center items-center" id="1">
              <div id="10" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-orange-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="11" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-pink-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="12" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-indigo-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="13" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-teal-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="14" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-lime-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
            </div>
            <div className="row flex justify-center items-center" id="2">
              <div id="20" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-red-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="21" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-yellow-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="22" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-green-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="23" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-blue-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="24" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-purple-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
            </div>
            <div className="row flex justify-center items-center" id="3">
              <div id="30" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-orange-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="31" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-pink-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="32" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-indigo-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="33" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-teal-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="34" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-lime-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
            </div>
            <div className="row flex justify-center items-center" id="4">
              <div id="40" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-red-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="41" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-yellow-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="42" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-green-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="43" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-blue-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
              <div id="44" owner="null" particle={0} className='col text-3xl font-semibold flex justify-center items-center max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] bg-purple-300 border-2 border-blue-700 transition-transform transform hover:scale-105'></div>
            </div>

            {/* start button */}
            <div className='flex justify-center'>
              <button className='my-4 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l text-white text-2xl font-bold rounded-lg transition-all duration-200' onClick={(e) => {
                e.preventDefault();
                startGame();
              }}>
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {isGameOver && winner!==0 && <Result winner={winner}/>}

    </>
  )
}

export default game