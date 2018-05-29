import React, { Component } from 'react';
import './Timer.css';
class Timer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            once:true,
            timeRemaining: this.props.timer
        };
        console.log(props)
    }
    decrementTimer = () => {
        let time = this.state.timeRemaining;
        let flag = false;
        time[3]--;
        if (time[0] < 1 && time[1] < 1 && time[2] < 1 && time[3] < 1) { clearInterval(2); flag = true; }
        if (time[3] < 1) {
            time[2]--; time[3] = 60;
            if (time[2] < 0) {
                time[1]--; time[2] = 60;
                if (time[1] < 0) {
                    time[0]--; time[1] = 24;
                    if (time[0] < 0) time[0] = 0;
                }
            }
        }
        if (flag === true) {
            time[0] = time[1] = time[2] = time[3] = 0;
        }
        this.setState({
            ...this.state,
            once: false,
            timeRemaining: time
        })
    }
    render() {
        this.state.once &&
            this.state.timeRemaining !== undefined &&
            setInterval(() => { this.decrementTimer() }, 1000);
        let timingDetails = {
            days: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[0] !== 0,
            hours: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[1] !== 0,
            minutes: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[2] !== 0,
            seconds: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[3] !== 0
        }
        let notStarted = (timingDetails[0] == -1 &&
            timingDetails[1] == -1 &&
            timingDetails[2] == -1 &&
            timingDetails[3] == -1) ?
            <b>Contest has not yet started</b> : <b>contest has ended</b>;
        return <div className="time-remaining">
            {
                (timingDetails.days ||
                    timingDetails.hours ||
                    timingDetails.minutes ||
                    timingDetails.seconds) ? "Contest ends in : " : notStarted
            }
            {
                timingDetails.days &&
                (" " + this.state.timeRemaining[0] + "d")
            }
            {
                timingDetails.hours &&
                (" " + this.state.timeRemaining[1] + "h")
            }
            {
                timingDetails.minutes &&
                (" " + this.state.timeRemaining[2] + "m")
            }
            {
                timingDetails.seconds &&
                (" " + this.state.timeRemaining[3] + "s")
            }
        </div>
    }
}
export default Timer;