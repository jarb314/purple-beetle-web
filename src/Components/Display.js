import React from "react";
import { connect } from "react-redux";

class Display extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div id="display-container">
        <h1 id="display">{this.props.currentValue}</h1>
        <p id="equation">
          {this.props.formula !== "" ? this.props.formula : 0}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentValue: state.main.currentValue,
    formula: state.main.formula
  };
};

export default connect(mapStateToProps)(Display);
