import './App.css';
import { useEffect, useState } from 'react';

function App() {

  function getDays(year, month) {
    let numberOfDays = new Date(year, month + 1, 0).getDate()
    let tempDays = []
    for(let i = 1; i <= numberOfDays; i++){
      tempDays.push(new Date(year, month, i))
    }
    setDays(tempDays)
    if(tempDays.length > 0) {
      setFrontOffset(tempDays[0].getDay())
      setEndOffset(6 - tempDays[numberOfDays - 1].getDay())
    }
  }


  let [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  let [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  let [frontOffset, setFrontOffset] = useState(0)
  let [endOffset, setEndOffset] = useState(0)
  let [days, setDays] = useState([])
  let [selectedDate, setSelectedDate] = useState(null)

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  let headerArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


  useEffect(() => {
    getDays(currentYear, currentMonth)
  }, [currentMonth, currentYear])

  useEffect(() => {
    let date = new Date()
    setCurrentYear(date.getFullYear())
    setCurrentMonth(date.getMonth())
  }, [])

  function decrementMonth(){
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedDate("")
  }

  function incrementMonth(){
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedDate("")
  }


  return (
    
    <div className="App">
      {currentMonth !== 0 ? <span className='link' onClick={()=>{decrementMonth()}}>&lt;{months[currentMonth - 1]}    </span>:<span className='link' onClick={()=>{decrementMonth()}}>&lt;{months[11]}    </span>}
      <span>    {months[currentMonth]}    </span>
      {currentMonth !== 11 ? <span className='link' onClick={()=>{incrementMonth()}}>    {months[currentMonth + 1]}&gt;</span>:<span className='link' onClick={()=>{incrementMonth()}}>    {months[0]}&gt;</span>}
      <div className='calendar-header'>
        <span>Calendar for {months[currentMonth]} {currentYear}</span>
      </div>
      <div className='calendar'>
        {headerArr.map((day, i) => {
          return <div className='calendar-cell' key = {i}>{day}</div>
        })}
        {Array(frontOffset).fill().map((date, i) => {
          return <div className='calendar-cell' key = {i}></div>
        })}
        {days.map((date, i) => {
          if (date === selectedDate) {
            return <div onClick={() => {setSelectedDate(date)}} className='calendar-cell__selected' key = {frontOffset + i}>{date.getDate()}</div>
          } else {
            return <div onClick={() => {setSelectedDate(date)}} className='calendar-cell' key = {frontOffset + i}>{date.getDate()}</div>
          }
        })}
        {Array(endOffset).fill().map((date, i) => {
          return <div className='calendar-cell' key = {i}></div>
        })}
      </div>
      {selectedDate ? <span>Selected date: {selectedDate.toDateString()}</span>:null}
    </div>
  );
}

export default App;
