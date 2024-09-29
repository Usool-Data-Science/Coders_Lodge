import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { BASEURL } from "../App";
import { useState } from "react";

function EditModal({ user, setUsers }) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
    })

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASEURL + user.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)))
            toast({
                status: "success",
                title: "Yayy! 🎉",
                description: "Friend updated successfully.",
                duration: 2000,
                position: "top-center",
            });
            onClose();
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: ""
            });
        } catch (error) {
            toast({
                status: "error",
                title: "An Error Occurred 😌😪",
                description: error.message,
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <IconButton
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                aria-label='See menu'
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEdit}>
                    <ModalContent>
                        <ModalHeader>My new BFF 😍</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input placeholder='John Doe'
                                        value={inputs.name}
                                        onChange={e => setInputs(prevUsers => (
                                            { ...prevUsers, name: e.target.value }
                                        ))}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input placeholder='Software Engineer'
                                        value={inputs.role}
                                        onChange={e => setInputs((prevUsers) => ({ ...prevUsers, role: e.target.value }))} />
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="He's a software engineer who loves to code and build things."
                                    value={inputs.description}
                                    onChange={e => setInputs((prevUsers) => ({ ...prevUsers, description: e.target.value }))}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit"
                                isLoading={isLoading}>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default EditModal;