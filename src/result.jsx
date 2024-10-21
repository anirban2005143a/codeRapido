import React from 'react'

const Result = (props) => {
  return (
    <div id='result'>
        <h1 className=' text-6xl font-bold text-center'>Game Over</h1>
        <p className=' text-center font-semibold text-3xl my-2'>🥳🥳 player {props.winner} Wins 🥳🥳</p>
    </div>
  )
}

export default Result