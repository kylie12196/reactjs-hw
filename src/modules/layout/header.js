import React from 'react';

const firstDate = new Date();
class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds:0
    }
  }

  time() {
    let delta = Math.abs(firstDate - new Date()) / 1000;

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let seconds = Math.round(delta % 60);  // in the

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.time(),
      1000
    );
  }

  render() {
    return (
      <div className='app__header header'>
        <div className='header__logo'>
          <h1 className='title'>Header</h1>
        </div>
        <div className='header__time timme' id='time'>
          <div className='time__clock'>
            <span className='hours'>{ this.state.hours }</span>:
            <span className='minutes'>{ this.state.minutes }</span>:
            <span className='seconds'>{ this.state.seconds }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;