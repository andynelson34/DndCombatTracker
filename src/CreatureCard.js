import React from 'react';
import ReactDOM from 'react-dom';

// Component for displaying creature's info as an editable/deletable "card" in the list
class CreatureCard extends React.Component {

  constructor(props) {
    super(props);
    this.getHighlightClass = this.getHighlightClass.bind(this);
    this.handleStatChange = this.handleStatChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // Determines whether this card should be highlighted or unhighlighted (is it this creature's turn or not?)
  getHighlightClass() {
    if (this.props.isCurrent) {
      return "current-creature";
    }
    else {
      return "inactive-creature";
    }
  }

  // Calls callback for changing this creature's stats
  handleStatChange(event) {
    this.props.changeStat(this.props.name, event.target.className, event.target.value);
  }

  // Calls callback for deleting this creature
  handleDelete(event) {
    this.props.delete(this.props.name);
  }

  render() {
    let highlightClass = this.getHighlightClass();

    return (
      <div className={"creature-card " + highlightClass}>
        <span className="creature-name-label">{this.props.name}</span>
        <div className="creature-data-fields">
          <label className="stat-label">Init:
            <input className="init" onChange={this.handleStatChange} defaultValue={this.props.init}></input>
          </label>
          <label className="stat-label">Hp:
            <input className="hp" onChange={this.handleStatChange} defaultValue={this.props.hp}></input>
          </label>
          <button onClick={this.handleDelete}>X</button>
        </div>
      </div>
    );
  }
}

export default CreatureCard;