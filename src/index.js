import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const createList = num => Array.from(Array(num).keys());

const min = 0;
const max = (totalNumberOfCards, numberOfDisplayedCards) =>
  -((totalNumberOfCards / numberOfDisplayedCards) * 648) + 648;
const totalNumberOfCards = 12;

class App extends Component {
  state = {
    offset: 0,
    min,
    max: max(createList(totalNumberOfCards).length, 3)
  };

  moveCarousel = offset => {
    this.carousel.style.transform = `translateX(${offset}px)`;
  };

  handleCarouselMotion = distance => {
    this.setState(
      prevState => ({ offset: prevState.offset + distance }),
      () => {
        this.moveCarousel(this.state.offset);
      }
    );
  };

  handleClick = direction => {
    switch (direction) {
      case "left":
        if (Number(this.state.offset) === this.state.min) return;
        return this.handleCarouselMotion(648);
      case "right":
        if (Number(this.state.offset) === this.state.max) return;
        return this.handleCarouselMotion(-648);
      default:
        return;
    }
  };

  render() {
    return (
      <div className="wrapper">
        <ul className="carousel" ref={value => (this.carousel = value)}>
          {createList(totalNumberOfCards).map((_, i) => (
            <li key={i} className="card">
              {i + 1}
            </li>
          ))}
        </ul>
        <div className="button-wrapper">
          <button className="button" onClick={() => this.handleClick("left")}>
            L
          </button>
          <button className="button" onClick={() => this.handleClick("right")}>
            R
          </button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
