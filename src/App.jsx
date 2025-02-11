import React, { useEffect } from 'react'
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

//Generate an array of dices with 10 random numbers
function generateAllNewDice(){
  console.log("Gen all called")
  return new Array(10)
  .fill(0)
  .map(()=> ({
    value : Math.ceil(Math.random() * 6), 
    holdIt: false,
    id: nanoid()
  }))
}

export default function () {
  // Store the set of dices in a state to update it later
  const [diceData, setDiceData] = React.useState(generateAllNewDice())

  // Hold green dices and roll new dices
  function newRoll(){
    setDiceData(prevData => prevData.map
      (die => die.holdIt ? die
         :{...die, value: Math.ceil(Math.random() * 6)}
      )
    )
  }

  // Map state data to Die component and store it in constant dices
  const dices = diceData.map((dice) => 
    <Die key={dice.id} value={dice.value} holdIt={dice.holdIt} hold={hold} id={dice.id}/>
  )

  //Function to update state when clicked
  function hold(id){
    let newData;
    setDiceData(prevData =>{
      newData = prevData.map((dice)=> 
      dice.id === id ? {...dice, holdIt: !dice.holdIt} : dice
    ); 
    return newData
    })  
  }

  //Win function
  let gameWon = false

  if (diceData.every(die => die.holdIt) && 
    diceData.every(die=> die.value === diceData[0].value)
    ){
    gameWon = true
  }

  return (
    <main>
          {gameWon && <ReactConfetti />}
          <div className='front'>
            <h1>Tenzies</h1>
            <p className='rules'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice'>
              {dices}
            </div>
            <button className='roll' onClick={() => newRoll()}>{gameWon ? "New Game": "Roll"}</button>
          </div>
    </main>
  )
}


