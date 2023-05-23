// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {minCount: 0, secCount: 0, isActive: false, limit: 60}

  updateTimer = () => {
    const {minCount, secCount, limit} = this.state
    const maxCount = secCount === 59 && minCount === 59
    const limitCount = parseInt(limit) === minCount
    console.log(secCount)
    if (secCount === 59 && minCount !== 59) {
      this.setState(prevState => ({
        minCount: prevState.minCount + 1,
        secCount: 0,
      }))
    } else if (maxCount || limitCount) {
      this.resetTimer()
    } else {
      this.setState(prevState => ({secCount: prevState.secCount + 1}))
    }
  }

  stopTimer = () => {
    console.log('stopTimer')
    clearInterval(this.timerCount)
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  resetTimer = () => {
    const {isActive} = this.state
    console.log('restTimer')
    if (isActive) {
      this.stopTimer()
    }
    this.setState({minCount: 0, secCount: 0})
  }

  StartTimer = () => {
    this.timerCount = setInterval(this.updateTimer, 1000)
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  updateLimit = event => {
    this.setState({limit: event.target.value})
  }

  render() {
    const {minCount, secCount, isActive, limit} = this.state
    const minText = minCount > 9 ? minCount : `0${minCount}`
    const SecText = secCount > 9 ? secCount : `0${secCount}`
    return (
      <div className="stopwatch-card">
        <div className="main-card">
          <div className="heading">
            <h1>StopWatch</h1>
          </div>
          <div className="timer-card">
            <div className="timecard-heading">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="stop-watch-logo"
              />
              <p>Timer</p>
            </div>
            <h2>{`${minText}:${SecText}`}</h2>
            <div className="button-container">
              <button
                type="button"
                className="button-element start-btn"
                onClick={this.StartTimer}
                disabled={isActive}
              >
                Start
              </button>
              <button
                type="button"
                className="button-element stop-btn"
                onClick={this.stopTimer}
                disabled={!isActive}
              >
                Stop
              </button>
              <button
                type="button"
                className="button-element reset-btn"
                onClick={this.resetTimer}
              >
                Reset
              </button>
            </div>
            <div className="limit-container">
              <label htmlFor="limitNum">Minutes:</label>
              <input
                id="limitNum"
                type="number"
                value={limit}
                onChange={this.updateLimit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
