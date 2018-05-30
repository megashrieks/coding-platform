import React, { Component } from 'react';
import './Timer.css';
class Timer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            once:true,
            timeRemaining: this.props.timer
        };
        this.timer = 0;
    }
    decrementTimer = () => {
        let time = this.state.timeRemaining;
        let flag = false;
        let x = { ...time };
        time[3]--;
        if (time[0] < 1 && time[1] < 1 && time[2] < 1 && time[3] < 1) {
            clearInterval(this.timer);
            flag = true;
        }
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
            time[0] = time[1] = time[2] = time[3] = x[3];
        }
        this.setState({
            ...this.state,
            once: false,
            timeRemaining: time
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        let timingDetails = {
            days: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[0] > 0,
            hours: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[1] > 0,
            minutes: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[2] > 0,
            seconds: this.state.timeRemaining !== undefined &&
                this.state.timeRemaining[3] > 0
        }
        let notStarted = (this.state.timeRemaining[0] === -1 &&
            this.state.timeRemaining[1] === -1 &&
            this.state.timeRemaining[2] === -1 &&
            this.state.timeRemaining[3] === -1) ?
            <b>Contest has not yet started</b> : <b>contest has ended</b>;
        this.state.once &&
            this.state.timeRemaining !== undefined &&
            (this.timer = setInterval(() => {
                this.decrementTimer()
            }, 1000));
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