import React from "react";
import "./Timer.css";
import Button from "../Button/Button";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: {
        h: 0,
        m: 0,
        s: 0,
      },
      seconds: 0,
    };

    this.timer = 0;
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let minutes = Math.floor((secs % (60 * 60)) / 60);
    let seconds = Math.ceil((secs % (60 * 60)) % 60);

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  incTimer = () => {
    if (this.state.seconds >= 0) {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds + 60,
          time: this.secondsToTime(prevState.seconds + 60),
        };
      });
    }
  };

  decTimer = () => {
    if (this.state.seconds >= 0) {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds - 60,
          time: this.secondsToTime(prevState.seconds - 60),
        };
      });
    }
  };

  startTimer = () => {
    if (this.state.seconds > 0 && this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    let sec = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(sec),
      seconds: sec,
    });

    if (sec === 0) {
      clearInterval(this.timer);
      this.setState({
        time: {
          h: 0,
          m: 0,
          s: 0,
        },
        seconds: 0,
      });
    }
  };

  stopTimer = () => {
    if (this.state.seconds !== 0 && this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  };

  resetTimer = () => {
    this.setState({
      time: {
        h: 0,
        m: 0,
        s: 0,
      },
      seconds: 0,
    });

    if (this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  };

  timeFormatter = (time) => {
    let { h, m, s } = time;

    if (h.toString().length < 2) {
      h = `0${h}`;
    }
    if (m.toString().length < 2) {
      m = `0${m}`;
    }
    if (s.toString().length < 2) {
      s = `0${s}`;
    }
    return { h, m, s };
  };

  render() {
    let { h, m, s } = this.timeFormatter(this.state.time);

    return (
      <React.Fragment>
        <span className="timer">
          {h}:{m}:{s}
        </span>
        <div>
          <Button clicked={this.incTimer}>+</Button>
          <Button clicked={this.startTimer}>Start</Button>
          <Button clicked={this.stopTimer}>Stop</Button>
          <Button clicked={this.resetTimer}>Reset</Button>
          <Button clicked={this.decTimer}>-</Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Timer;
