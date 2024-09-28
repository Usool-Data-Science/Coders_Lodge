import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, Textarea, RadioGroup, Radio } from '@chakra-ui/react'
import { BiAddToQueue } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react'

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Add New Coder </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Flex alignItems={'center'} gap={4}>
                            {/* Left Input */}
                            <FormControl>
                                <FormLabel> Full Name</FormLabel>
                                <Input placeholder='John Doe' />
                            </FormControl>
                            {/* Right Input */}
                            <FormControl>
                                <FormLabel> Role</FormLabel>
                                <Input placeholder='Software Engineer' />
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel> Description </FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder='He is the best coder i have ever seen'
                            />
                        </FormControl>

                        <RadioGroup mt={4} defaultValue='male'>
                            <Flex gap={6}>
                                <Radio value='male'> Male </Radio>
                                <Radio value='female'> Female </Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}> Add </Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateUserModal