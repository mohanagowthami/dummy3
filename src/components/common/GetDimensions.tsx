import React, { Component } from "react";
import { View, Dimensions } from "react-native";

// assigning window and screen dimensions as objects
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

// Props
interface Props {
  render: (value: any) => {};
}
// State
interface State {
  dimensions: {
    window: any;
    screen: any;
  };
}

// GetDimensions class
class GetDimensions extends Component<Props, State> {
  // state
  state = {
    dimensions: {
      window,
      screen,
    },
  };

  // onChange - either device or change in screen width or screen height
  onChange = ({ window, screen }: any) => {
    this.setState({ dimensions: { window, screen } });
  };

  // Component On Mount
  componentDidMount() {
    // eventlistener
    Dimensions.addEventListener("change", this.onChange);
  }

  // Component on Unmount
  componentWillUnmount() {
    // eventlistener
    Dimensions.removeEventListener("change", this.onChange);
  }

  render() {
    // giving dimensions as prop
    const { dimensions } = this.state;
    // rendering View box with the dimensions
    return <View>{this.props.render(dimensions)}</View>;
  }
}

export default GetDimensions;
