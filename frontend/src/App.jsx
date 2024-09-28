// updated this after recording. Make sure you do the same so that it can work in production

import { Container, Stack, Text } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"

function App() {
  return (
    <>
      <Stack>
        <Navbar />
        <Container maxW={"1200px"} my={4}>
          <Text
            fontSize={{ base: "3xl", md: "50" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            letterSpacing={"2px"}
            textAlign={"center"}
            mb={8}>
            💻
            <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}> Coders Lodge </Text>
            😎
          </Text>

          <UserGrid />
        </Container>
      </Stack>
    </>
  )
}

export default App
