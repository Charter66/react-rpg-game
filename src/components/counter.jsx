import React, { Component } from "react";

const MAXIMUM = 15;

class Counter extends Component {
  state = {
    strength: 0,
    speed: 0,
    health: 0,
    magic: 0,
  };

  attributeSum = () => {
    var sum = 0;

    sum += this.state.strength;
    sum += this.state.speed;
    sum += this.state.health;
    sum += this.state.magic;

    return sum;
  };

  handleIncrement = (attribute) => {
    const stateObject = { ...this.state };
    stateObject[attribute] = this.state[attribute] + 1;

    this.setState(stateObject);
  };

  handleDecrement = (attribute) => {
    const stateObject = { ...this.state };
    stateObject[attribute] = this.state[attribute] - 1;

    this.setState(stateObject);
  };

  renderAttribute(attribute) {
    const capitalizedAttribute =
      attribute[0].toUpperCase() + attribute.substr(1);

    return (
      <div>
        <div>
          {capitalizedAttribute} :
          <span className={this.getBadgeClasses(attribute)}>
            {this.formatCount(attribute)}
          </span>
          <button
            disabled={this.attributeSum() >= MAXIMUM}
            onClick={() => this.handleIncrement(attribute)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            disabled={this.state[attribute] === 0}
            onClick={() => this.handleDecrement(attribute)}
            className="btn btn-secondary btn-sm"
          >
            -
          </button>
        </div>
      </div>
    );
  }

  resetPoints() {
    this.setState({ strength: 0, speed: 0, health: 0, magic: 0 });
  }

  calculateHP() {
    const { strength, health } = this.state;

    return 100 + 20 * health + 30 * strength;
  }

  calculateMP() {
    const { magic, health } = this.state;

    return 50 + 25 * magic + 5 * health;
  }

  calculateAttackPower() {
    const { strength } = this.state;
    return 20 + 100 * strength;
  }

  calculateMovementSpeed() {
    const { speed } = this.state;
    return 50 + 60 * speed;
  }

  render() {
    const strengthElement = this.renderAttribute("strength");
    const speedElement = this.renderAttribute("speed");
    const magicElement = this.renderAttribute("magic");
    const healthElement = this.renderAttribute("health");

    return (
      <div>
        {healthElement}
        {magicElement}
        {strengthElement}
        {speedElement}
        Available points: {MAXIMUM - this.attributeSum()}
        <button
          onClick={() => this.resetPoints()}
          className="btn btn-secondary btn-sm"
        >
          Reset points
        </button>
        <div>HP: {this.calculateHP()}</div>
        <div>MP: {this.calculateMP()}</div>
        <div>Attack power: {this.calculateAttackPower()}</div>
        <div>Movement speed: {this.calculateMovementSpeed()}</div>
      </div>
    );
  }

  getBadgeClasses(attribute) {
    let classes = "badge m-2 bg-";

    const localCount = this.state[attribute];

    if (localCount === 0) {
      classes += "warning";
    } else {
      if (localCount > 0) {
        classes += "primary";
      } else {
        classes += "danger";
      }
    }

    return classes;
  }

  formatCount(attribute) {
    return this.state[attribute];
  }
}
export default Counter;
