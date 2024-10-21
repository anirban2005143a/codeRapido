import React from 'react'

const Result = (props) => {
  return (
    <div id='result'>
        <h1 className=' text-3xl font-bold text-center'>Game Over</h1>
        <p className=' text-center font-semibold'>🥳🥳 player {props.winner} Wins 🥳🥳</p>
    </div>
  )
}

export default Result