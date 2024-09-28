import { Container, Flex, Text, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import { useColorMode } from '@chakra-ui/react';
import CreateUserModal from './CreateUserModal';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "g.700")}>
                <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
                    {/* Left Flex */}
                    <Flex alignItems={"center"} justifyContent={"center"}
                        gap={3} display={{ base: "none", sm: "flex" }}>
                        <img src="/react.png" alt="React image" width={50} height={50} />
                        <Text fontSize={"40px"}> + </Text>
                        <img src="/python.png" alt="Python image" width={50} height={40} />
                        <Text fontSize={"40px"}> = </Text>
                        <img src="/explode.png" alt="Explode image" width={45} height={45} />
                    </Flex>
                    {/* Right flex */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                        <Text fontSize={"20px"} fontStyle={"bold"}>Usool 📚</Text>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                        <CreateUserModal />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar