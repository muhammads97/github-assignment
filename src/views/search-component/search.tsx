import React from "react"
import { Container, SafeAreaView, Screen } from "@github-shared"

import styles from "./search.styles"

export default () => {
  return (
    <Screen preset="fixed">
      <Container style={styles.container}>
        <SafeAreaView />
      </Container>
    </Screen>
  )
}
