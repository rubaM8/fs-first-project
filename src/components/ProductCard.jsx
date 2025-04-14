import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box , ModalFooter, Button, Image,useDisclosure , Heading, ModalOverlay, ModalContent, VStack , Input, Text, IconButton, Modal,HStack ,useToast , useColorModeValue, ModalHeader, ModalCloseButton, ModalBody} from "@chakra-ui/react";
import { useProductStore } from "../store/Product";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

function ProductCard({ product }) {
    const {isLoggedIn} = useContext(AppContext);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const [updatedProduct, setUpdatedProduct] = useState(product)
    const handleUpdateProduct = async(pid, updatedProd)=>{
        const {success, message}=await updateProduct(pid, updatedProd)
        onClose();
        if(!success){
            toast({
                title:"Error",
                description:"something wrondg happened!",
                status:"error",
                duration:2000,
                isClosable:true,
            })}
            else{
                toast({
                    title:"Success",
                    description:"product updated successfully!",
                    status:"success",
                    duration:2000,
                    isClosable:true,
                })
                onClose();
            }
    }

    return (
        <Box
            bg={bg}
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={'cover'} />
            <Box p={4}>
                <Heading as={"h3"} size={'md'} mb={2}>{product.name}</Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>🌟{product.price}</Text>

              {isLoggedIn && (<HStack spacing={2}>
                    <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue"></IconButton>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"></IconButton>
                </HStack>)
                }
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="name"
                                name="name" 
                                value={updatedProduct.name}
                                onChange={(e)=>(setUpdatedProduct({ ...updatedProduct, name: e.target.value }))}
                                />

                            <Input
                                placeholder="rating"
                                name="price"
                                type="number" 
                                value={updatedProduct.price}
                                onChange={(e)=>(setUpdatedProduct({ ...updatedProduct, price: e.target.value }))}
                                
                                />

                            <Input
                                placeholder="image"
                                name="image" 
                                value={updatedProduct.image}
                                onChange={(e)=>(setUpdatedProduct({ ...updatedProduct, image: e.target.value }))}
                                />

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={'blue'} mr={3} onClick={()=>handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Box>
    );
}

export default ProductCard;