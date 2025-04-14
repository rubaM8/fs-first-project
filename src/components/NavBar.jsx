import { LockIcon, PlusSquareIcon, UnlockIcon } from "@chakra-ui/icons";
import { Container, Flex, Text, HStack, Button,useToast, toastStore, useColorMode } from "@chakra-ui/react";
import { Link,useNavigate } from "react-router-dom";
import { useContext} from "react";
import { AppContext } from "../context/appContext";


function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isLoggedIn } = useContext(AppContext);
    const {backendUrl, setIsLoggedIn} = useContext(AppContext);
    const toast = useToast();
    const navigate = useNavigate();

    const logoutofAccount= async(e) => {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (data.success) {
            setIsLoggedIn(false);
            toast({
                title: 'Logout successful',
                description: "You have been logged out",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            navigate('/login');
        } else {
            toast({
                title: 'Logout failed',
                description: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

    }

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                flexDir={{ base: "column", sm: "row" }}
                justifyContent={"space-between"}
            >

                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight='bold'
                    textTransform={"uppercase"}
                    textAlign={"center"}
                >
                    <Link to={'/'}>My Bookish World</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    {

                        (!isLoggedIn) && (
                            <Link to={'/login'}>
                                <Button>
                                    <UnlockIcon fontSize={20} />
                                </Button>
                            </Link>)}
                    {

                        isLoggedIn && (<Link to={'/create'}>
                            <Button>
                                <PlusSquareIcon fontSize={20} />
                            </Button>
                        </Link>)
                    }

                    {

                        isLoggedIn && (<Link to={'/logout'}>
                            <Button onClick={logoutofAccount}>
                                <LockIcon fontSize={20} />
                            </Button>
                        </Link>)
                    }

                    <Button onClick={toggleColorMode}>
                        {
                            colorMode === "light" ? (
                                <Text fontSize={20}>🌙</Text>
                            ) : (
                                <Text fontSize={20}>☀️</Text>
                            )
                        }
                    </Button>

                </HStack>

            </Flex>
        </Container>
    );
}

export default NavBar;