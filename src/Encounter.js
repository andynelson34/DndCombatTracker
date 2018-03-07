import React from 'react';
import ReactDOM from 'react-dom';
import CreatureList from './CreatureList';
import TimeTracker from './TimeTracker';

// Highest-level component for the combat encounter
class Encounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creatures: [],
      time: 0
    };
    this.addCreature = this.addCreature.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.changeCreatureStat = this.changeCreatureStat.bind(this);
    this.deleteCreature = this.deleteCreature.bind(this);
    this.advanceTurn = this.advanceTurn.bind(this);
    
  }

  // Adds a new creature to the combat list
  addCreature(event) {
    var creatureArr = this.state.creatures;
    var addName = this._nameInput.value;
    var addInit = this._initInput.value;

    if (this.checkInputs(addName, addInit, creatureArr)) {
      creatureArr.push({
        name: addName,
        init: addInit,
        hp: this._hpInput.value,
        isCurrent: false
      });
   
      this.setState({
        creatures: creatureArr
      });
   
      this._nameInput.value = "";
      this._initInput.value = "";
      this._hpInput.value = "";

      this._nameInput.focus();
    }
    
    event.preventDefault();
  }

  // Performs various error checks on input fields for a new creature; returns whether or not inputs are good
  checkInputs(addName, addInit, creatureArr) {

    // Ensure that we have a name
    if (addName === "") {
      alert("Please enter a name for this creature");
      this._nameInput.focus();
    }

    // Ensure that we have a numerical init
    else if (addInit === "" || isNaN(addInit)) {
      alert("Please enter a numerical initiative");
      this._initInput.focus();
    }

    // Prevent duplicate names, since that's the unique key
    else if (creatureArr.find(function (creature) { return creature.name === addName; })) {
      alert("A creature with this name already exists");
      this._nameInput.focus();
    }

    // Prevent duplicate inits, since it can't be two creatures' turns at the same time
    else if (creatureArr.find(function (creature) { return creature.init === addInit; })) {
      alert("A creature with this initiative already exists");
      this._initInput.focus();
    }

    else {
      // All checks passed, we're good
      return true;
    }

    return false;
  }

  // Updates a creature's initiative or hp value
  changeCreatureStat(name, stat, value) {
    var creatureArr = this.state.creatures;
    var toBeChanged = creatureArr.find(function (creature) { return creature.name === name; });
    var index = creatureArr.indexOf(toBeChanged);
    
    toBeChanged[stat] = value;
    creatureArr[index] = toBeChanged;
    this.setState({
      creatures: creatureArr
    });
  }

  // Removes a creature from the combat list
  deleteCreature(name) {
    var creatureArr = this.state.creatures;
    var toBeDeleted = creatureArr.find(function (creature) { return creature.name === name; });
    
    // Move turn to next creature if it's the deleted one's turn right now
    if (toBeDeleted.isCurrent && creatureArr.length > 1) {
      this.advanceTurn();
    }

    creatureArr.splice(creatureArr.indexOf(toBeDeleted), 1);
    this.setState({
      creatures: creatureArr
    });
  }

  // Moves the turn indicator to the next creature
  advanceTurn() {
    var creatureArr = this.state.creatures;

    if (creatureArr.length == 0) {
      // Display error message if there are no creatures on the list
      alert("Please add at least one creature before you advance the turn");
      this._nameInput.focus();
      return;
    }

    var tempTime = this.state.time;
    var curName;
    var curIdx;

    // In general use name (unique key), not idx, when determining current player, to account for mid-turn initiative changes

    if (typeof this.curPlayer === 'undefined') {
      // "advance turn" has just been clicked for the first time
      this.curPlayer = creatureArr[0].name;
      curIdx = 0;
    }
    else {
      curName = this.curPlayer;
      curIdx = creatureArr.indexOf(creatureArr.find(function (creature) { return creature.name === curName; }));
      creatureArr[curIdx].isCurrent = false;
      curIdx = (curIdx + 1) % this.state.creatures.length;
      if (curIdx == 0) {
        // Increment round count if we're back to the top of the order
        tempTime++;
      }
      this.curPlayer = creatureArr[curIdx].name;
    }
    creatureArr[curIdx].isCurrent = true;
    
    this.setState({
      creatures: creatureArr,
      time: tempTime
    });

    this._advanceButton.focus();
  }

  render() {
    return (
      <div className="encounter">
        <form onSubmit={this.addCreature}>
          <input ref={(a) => this._nameInput = a} placeholder="enter name"/>
          <br/>
          <input ref={(a) => this._initInput = a} placeholder="enter init"/>
          <br/>
          <input ref={(a) => this._hpInput = a} placeholder="enter hp"/>
          <button type="submit">add</button>
        </form>
        <CreatureList creatures={this.state.creatures} changeStat={this.changeCreatureStat} delete={this.deleteCreature}/>
        <button ref={(a) => this._advanceButton = a} onClick={this.advanceTurn}>advance turn</button>
        <br/>
        <br/>
        <TimeTracker time={this.state.time}/>
      </div>
    );
  }
}

export default Encounter;