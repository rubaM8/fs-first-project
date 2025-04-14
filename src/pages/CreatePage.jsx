import React, { useState } from "react";
import { Container, Heading, useToast, VStack, Box, Input, Button, useColorModeValue, toastStore } from "@chakra-ui/react";
import { useProductStore } from "../store/Product";


function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const { createProduct } = useProductStore()
    const toast = useToast();
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);

        if (!success) {
            toast({
                title: "error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
        setNewProduct({
            name: "",
            price: "",
            image: "",
        })
    }
    return (
        <>
            <Container maxW="container.sm">
                <VStack
                    spacing={8}>
                    <Heading as={"h1"} size={"2xl"} mb={8} textAlign={"center"}>
                        Add New Book
                    </Heading>
                    <Box
                        w={"full"}
                        bg={useColorModeValue("white", "gray.800")}
                        p={8}
                        rounded={"lg"}
                        shadow={"md"}>

                        <VStack spacing={4}>
                            <Input type="text" placeholder="Book name" value={newProduct.name} name="name" onChange={(e) => { setNewProduct({ ...newProduct, name: e.target.value }) }} />
                            <Input type="text" placeholder="Book rating" value={newProduct.price} name="price" onChange={(e) => { setNewProduct({ ...newProduct, price: e.target.value }) }} />
                            <Input type="text" placeholder="Book image" value={newProduct.image} name="image" onChange={(e) => { setNewProduct({ ...newProduct, image: e.target.value }) }} />
                            <Button colorScheme='blue' onClick={handleAddProduct}>Add a Book</Button>
                        </VStack>

                    </Box>
                </VStack>
            </Container>
        </>
    );
}

export default CreatePage;