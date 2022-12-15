import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Flex,
  IconButton,
  HStack,
  Button,
  Text,
  Stack,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user } = auth;

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };
  const Links: any = {
    home: {
      displayName: "Home",
      url: "/",
    },
    works: {
      displayName: "Doctor",
      url: "/doctor",
    },
    about: {
      displayName: "Admin",
      url: "/admin",
    },
  };

  const NavLink = (props: any) => {
    const { displayName, url } = props?.data;
    const { pathname } = location;
    return (
      <Box
        px="10px"
        py="2px"
        rounded={"md"}
        className={
          pathname === url
            ? "bg-white text-black font-semibold"
            : "text-white font-medium"
        }
        _hover={{
          textDecoration: "underline",
        }}
      >
        <Link className="text-16" to={url}>
          {displayName}
        </Link>
      </Box>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg={useColorModeValue("brand.100", "brand.900")}
      sx={{
        zIndex: "1",
        position: "sticky",
        top: "0",
      }}
    >
      <Container maxW={{ md: "1360px" }} className="px-20 md:px-0">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Object.keys(Links).map((key) => (
                <NavLink data={Links[key]} key={key} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap="20px">
            {!user ? (
              <>
                <Text className="hidden md:block font-medium text-white text-16">
                  Already a user ?
                </Text>
                <Button
                  h="40px"
                  bg="green.500"
                  fontSize="16px"
                  textColor="white"
                  className="border-2 font-medium"
                  _hover={{
                    textDecoration: "none",
                    bg: "white",
                    textColor: "black",
                  }}
                  onClick={() =>
                    navigate("/login", { state: location, replace: true })
                  }
                >
                  Sign in
                </Button>
              </>
            ) : (
              <Button
                h="40px"
                bg="red.500"
                fontSize="16px"
                textColor="white"
                className="border-2 font-medium"
                _hover={{
                  textDecoration: "none",
                  bg: "white",
                  textColor: "black",
                }}
                onClick={logout}
              >
                Sign out
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Object.keys(Links).map((key) => (
                <NavLink data={Links[key]} key={key} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};
export default Navbar;
