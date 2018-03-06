import React from 'react';
import ReactDOM from 'react-dom';
import CreatureCard from './CreatureCard';

// Component to display the current list of creatures in the combat encounter
class CreatureList extends React.Component {

  constructor(props) {
    super(props);
    this.cardifyCreature = this.cardifyCreature.bind(this);
    this.compareInit = this.compareInit.bind(this);
    this.changeStat = this.changeStat.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Displays a creature's info as an editable/deletable "card" in the list
  cardifyCreature(creature) {
    return <CreatureCard key={creature.name} init={creature.init} name={creature.name} hp={creature.hp} isCurrent={creature.isCurrent} changeStat={this.changeStat} delete={this.delete}/>;
  }

  // Sort function for descending init order
  compareInit(creature1, creature2) {
    return creature2.init - creature1.init;
  }

  // Calls callback for updating a stat
  changeStat(name, field, value) {
    this.props.changeStat(name, field, value);
  }

  // Calls callback for deleting a creature from the list
  delete(name) {
    this.props.delete(name);
  }

  render() {
    var creatures = this.props.creatures;
    // Sort list by init value
    var sortedCreatures = creatures.sort(this.compareInit);
    var htmlList = sortedCreatures.map(this.cardifyCreature);
    return (
      <div className="creatureList">
        {htmlList}
      </div>
    );
  }
}

export default CreatureList;