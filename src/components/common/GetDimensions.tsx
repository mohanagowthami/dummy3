import React, { Component } from "react"


import { View,Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

interface Props
{
  render:(value:any)=>{} 
    
}

interface State{
    dimensions: {
      window:any
      screen:any
    }
}

class GetDimensions extends Component<Props,State>{
  state = {
    dimensions: {
      window,
      screen
    }
  };

  onChange = ({ window, screen }:any) => {
    this.setState({ dimensions: { window, screen } });
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  }

  render() {
    const { dimensions } = this.state;

    return (
      <View>
        {this.props.render(dimensions)}
      </View>
    );
  }
}



export default GetDimensions