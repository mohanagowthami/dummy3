import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { colors } from "../../lib/colors"

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color={colors.darkBlack} size="large" />
    </View>
  )
}

export default Loader

export const styles = StyleSheet.create({
  loaderContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
