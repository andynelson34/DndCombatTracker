import React from 'react';
import ReactDOM from 'react-dom';

// Component for displaying how long the combat has lasted (in rounds and also minutes/seconds)
class TimeTracker extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
		var numRounds = this.props.time;
		var numMin = Math.floor(numRounds / 10);
		var numSec = (numRounds % 10) * 6;
		var timeString = numRounds + " rounds (" + numMin + " min " + numSec + " s) have elapsed";

		return (
      <div className="time-tracker">
      	{timeString}
      </div>
    );
	}
}

export default TimeTracker;