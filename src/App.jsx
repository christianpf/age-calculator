import { useState } from 'react';
import buttonIcon from './assets/icon-arrow.svg'

import dayjs from 'dayjs';

import './App.css'


const FIELD_REQUIRED = "This field is required"

function App() {

  const [errors, setErrors] = useState({
    dateValid: true,
    dayValid: true,
    monthValid: true,
    yearValid: true,
    formErrors: {date: "", day: "", month: "", year: ""}
  })

  const [elapsed, setElapsed] = useState({
    years: "- -",
    months: "- -",
    days: "- -",
  })

  function dateDiff(oldDate, newDate) {
    const years = newDate.diff(oldDate, 'year');
    const months = newDate.diff(oldDate, 'month') - years * 12;
    const days = newDate.diff(oldDate.add(years, 'year').add(months, 'month'), 'day');

    return {years: years, months: months, days: days};
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      dateValid: true,
      dayValid: true,
      monthValid: true,
      yearValid: true,
      formErrors: {date: "", day: "", month: "", year: ""}
    })
    let day = e.target.day.value;
    let month = e.target.month.value;
    let year = e.target.year.value;
    let valid = {date: true, day: true, month: true, year: true}
    let errorsMessages = {date: "", day: "", month: "", year: ""}

    if(day === ""){
      errorsMessages.day = FIELD_REQUIRED
      valid.day = false
    }
    if(month === ""){
      errorsMessages.month = FIELD_REQUIRED
      valid.month = false
    }
    if(year === ""){
      errorsMessages.year = FIELD_REQUIRED
      valid.year = false
    }
    
    if(day < 1 || day > 31) {
      errorsMessages.day = "Must be valid day"
      valid.day = false
    }

    if(month < 1 || month > 12) {
      errorsMessages.month =  "Must be valid month"
      valid.month = false
    }

    if(year > new Date().getFullYear()){
      errorsMessages.year = "Must be in the past"
      valid.year = false
    }

    if(isNaN(Date.parse(`${year}-${month}-${day}`))){
      errorsMessages.date = "Must be a valid date"
      valid.date = false
    }

    if(valid.date && valid.day && valid.month && valid.year){
      let elapsedTime = dateDiff(dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD"), dayjs())
      setElapsed(elapsedTime)
      console.log(elapsed)
      return;
    }

    setErrors({
      dateValid: valid.date,
      dayValid: valid.day,
      monthValid: valid.month,
      yearValid: valid.year,
      formErrors: errorsMessages
    })

    setElapsed({
      years: "- -",
      months: "- -",
      days: "- -",
    })
    
  }

  return (
    <main>
      <div className='calculator'>
        <form className='calculator__form' onSubmit={handleSubmit}>
          <div className='calculator__input'>
            <label htmlFor="day">DAY</label>
            <input type='number' name="day" placeholder="DD" className='calculator__input-input'></input>
            {!errors.dayValid && <p className='error__message'>{errors.formErrors.day}</p>}
          </div>
          <div className='calculator__input'>
            <label>MONTH</label>
            <input type='number' name="month" placeholder='MM' className='calculator__input-input'></input>
            {!errors.monthValid && <p className='error__message'>{errors.formErrors.month}</p>}
          </div>
          <div className='calculator__input'>
            <label>YEAR</label>
            <input type='number' name="year" placeholder="YYYY" className='calculator__input-input'></input>
            {!errors.yearValid && <p className='error__message'>{errors.formErrors.year}</p>}
          </div>
          <button type='submit'><img src={buttonIcon}/></button>
        </form>
        <div className='calculator__result'>
          <h2><span>{elapsed.years}</span>years</h2>
          <h2><span>{elapsed.months}</span>months</h2>
          <h2><span>{elapsed.days}</span>days</h2>
        </div>
      </div>
    </main>
  )
}

export default App
