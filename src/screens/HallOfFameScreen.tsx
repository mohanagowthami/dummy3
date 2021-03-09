// react-native-gesture-handler
import { FlatList, ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Image, Pressable } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

// colors
import { colors } from "../lib/colors"
import RestaurantService from "../services/restaurants.service"
import TravelService from "../services/travel.service"
import ShoppingMallService from "../services/shoppingmall.service"
import { SafeAreaView } from "react-native-safe-area-context"
import Loader from "../components/elements/Loader"

interface IProps {
  navigation: any
  route: any
  hallOfFameList: any
}

// state - data
interface Istate {
  hallOfFameList: any
  isLoaded: boolean
  currentPage: number
}

const colorsList = [
  "#FFEA75",
  "#FFE8E7",
  "#C3F4FF",
  "#E2F0FF",
  "#FFE2F5",
  "#E1E2FF",
  "#FFE5B2",
]

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class HallOfFame extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      hallOfFameList: [],
      isLoaded: false,
      currentPage: 1,
    }
  }

  fetchData = () => {
    const { category } = this.props.route.params
    const { currentPage } = this.state
    let service
    if (category === "food") service = restaurantService
    else if (category === "travel") service = travelService
    else if (category === "shopping") service = shoppingService

    service
      ?.getHallOfFame(currentPage)
      .then((response: any) => {
        if (response["results"]) {
          this.setState({
            ...this.state,
            isLoaded: true,
            hallOfFameList: [...this.state.hallOfFameList, ...response.results],
          })
        }
      })
      .catch((error: any) => {
        this.setState({ ...this.state, isLoaded: true })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  renderHeader = () => {
    return <Text style={styles.frappyText}>Hall Of Fame</Text>
  }

  flatListItem = ({ item }: any) => {
    return (
      <Pressable
        onPress={() =>
          this.props.navigation.navigate("fullImage", {
            imageUrl: item,
          })
        }
        style={styles.imageWrapper}
      >
        <Image
          style={styles.hallOfFameImage}
          source={{
            uri: item,
          }}
          resizeMode="cover"
        />
      </Pressable>
    )
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData()
    }
  }

  onEndReached = () => {
    this.setState({ ...this.state, currentPage: this.state.currentPage + 1 })
  }

  getHallOfFameImages = () => {
    let list: any = []
    const { hallOfFameList } = this.state
    hallOfFameList.map((ele: any, index: number) => {
      const { review_images } = ele
      review_images.map((item: any, index: any) => {
        const { image } = item
        list = [...list, image]
      })
    })
    return list
  }
  render() {
    const { hallOfFameList, isLoaded } = this.state

    const hallOfFameImagesList = this.getHallOfFameImages()

    return (
      <>
        {isLoaded ? (
          <SafeAreaView style={styles.safeAreaViewStyle}>
            <FlatList
              contentContainerStyle={{ marginBottom: wp("8%") }}
              numColumns={3}
              horizontal={false}
              data={hallOfFameImagesList}
              renderItem={this.flatListItem}
              keyExtractor={(item: any) => item}
              ListHeaderComponent={this.renderHeader}
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false
              }}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        ) : (
          <Loader />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: wp("28%"),
    height: wp("28%"),
    marginTop: wp("5%"),
    borderRadius: wp("6%"),
    marginRight: wp("3%"),
  },

  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: colors.white,
    padding: wp("5%"),
  },

  hallOfFameWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: wp("15%"),
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("5%"),
  },
  frappyText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
  },
  mainContainer: {
    display: "flex",
    padding: wp("5%"),
    backgroundColor: colors.white,
  },
  heading: {
    display: "flex",
    paddingTop: hp("2%"),
    paddingBottom: hp("2.10%"),
    paddingLeft: wp("7.46%"),
    paddingRight: wp("5.33%"),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "cyan",
  },
  backicon: {
    paddingTop: hp("1.2%"),
  },
  title: {
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
  },
  recapImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  recapItemContaineer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: wp("5%"),
  },
  recapCardText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.8%"),
    color: colors.lightGreyThree,
  },
  hallOfFameImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp("5%"),
  },
})

export default HallOfFame
