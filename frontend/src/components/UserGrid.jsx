import { Flex, Grid, Spinner, Text } from "@chakra-ui/react"
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASEURL } from "../App";

const UserGrid = ({ users, setUsers }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(BASEURL);
                const data = await result.json();

                if (!result.ok) {
                    throw new Error(data.error);
                }
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [setUsers]);

    return (
        <>
            <Grid gap={4} templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
            }}>
                {users.map(user => (
                    <UserCard key={user.id} user={user} setUsers={setUsers} />
                ))}
            </Grid>
            {isLoading &&
                <Flex>
                    <Spinner
                        thickness='5px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.700'
                        size='2xl'
                    />
                </Flex>
            }
            {!isLoading && users.length === 0 &&
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                            Poor you 😥😪😌
                        </Text>
                        No friends.
                    </Text>

                </Flex>
            }
        </>
    )
}

export default UserGrid