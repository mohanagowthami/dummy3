import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

interface CarouselItem {
  title: string;
  text: string;
}

interface State {
  activeIndex: number;
  carouselItems: Array<CarouselItem>;
}
class OnboardingScreens extends React.Component<{}, State> {
  carousel: any;
  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ],
    };
  }

  _renderItem({ item, index }: any) {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  get pagination() {
    const { activeIndex, carouselItems } = this.state;

    return (
      <View style={{ position: "absolute", bottom: 0 }}>
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "blue",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 15,
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
          }}
        >
          <Text>
            {activeIndex + 1}/{carouselItems.length}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const currentObject = this;
    return (
      <SafeAreaView>
        <View>
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => {
              console.log(index, "onSnapToItem");
              currentObject.setState({
                ...currentObject.state,
                activeIndex: index,
              });
            }}
          />
        </View>
        {this.pagination}
      </SafeAreaView>
    );
  }
}

export default OnboardingScreens;
