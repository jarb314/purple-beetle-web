import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div className={`col-${this.props.cols}`}>
        <button
          id={this.props.buttonId}
          className={"calc-button " + this.props.type}
          onClick={this.props.action}
          value={this.props.symbol}
        >
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

export default Button;
