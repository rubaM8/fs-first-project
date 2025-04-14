import {Box, Button, HStack, Text, VStack, Heading,FormControl, FormLabel, Input} from "@chakra-ui/react";
import { useContext, useState, } from "react";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../context/appContext";
import { useToast, toastStore } from "@chakra-ui/react";

function LoginPage() {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('')
    const toast = useToast();

    const {backendUrl, setIsLoggedIn} = useContext(AppContext);

    const navigate = useNavigate();

    const loginToAccount = async(e) => {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (data.success) {
            setIsLoggedIn(true);
            toast({
                title: 'Login successful',
                description: "Welcome back!",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            navigate('/');

        } else {
            toast({
                title: 'Login failed',
                description: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

return(<Box
w={['full','md']}
p={[8,10]}
mt={[20,'10vh']}
mx={'auto'}
border={['none', '1px']}
borderColor={['','gray.600']}
borderRadius={10}>
    <VStack spacing={4} align={'flex-start'} w={'full'}>
        <VStack spacing={1} align={['flex-start', 'center']} w={'full'}>
            <Heading>Login</Heading>
            <Text>Enter your E-mail and password to Login</Text>
        </VStack>

        <FormControl>
            <FormLabel>E-mail address</FormLabel>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} rounded={'none'} borderColor={['gray.400','']} variant='filled'/>
        </FormControl>

        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} rounded={'none'} borderColor={['gray.400','']} variant='filled' type="password"/>
        </FormControl>

        <HStack w={'full'} justifyContent={'space-between'}>
            <Button variant={'link'} onClick={()=>navigate('/resetPassword')} colorScheme="blue">forget password?</Button>
        </HStack>

        <Button onClick={loginToAccount} rounded={'none'} colorScheme={'blue'} alignSelf={'end'} w={['full', 'auto']}>Login</Button>

    </VStack>
</Box>)

}

export default LoginPage;