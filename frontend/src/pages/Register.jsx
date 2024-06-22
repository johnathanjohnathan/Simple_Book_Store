import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(
        e.target.name.value,
        e.target.email.value,
        password
      );
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  const boxBackground = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const errorColor = 'red.500';

  return (
    <Box w="75%" py={4} px={24} mx="auto" mt={8} bg={boxBackground} rounded="md">
    <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
      Register
    </Text>

    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Box color={errorColor} mb={4}>
            {error}
          </Box>
        )}

        <FormControl isRequired>
          <FormLabel htmlFor="name" color={textColor}>Name</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            bg={boxBackground}
            color={textColor}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor="email" color={textColor}>Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            bg={boxBackground}
            color={textColor}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor="password" color={textColor}>Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg={boxBackground}
            color={textColor}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor="confirmPassword" color={textColor}>Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg={boxBackground}
            color={textColor}
          />
          {password !== confirmPassword && (
            <Text fontSize="xs" color={errorColor}>
              The password does not match
            </Text>
          )}
        </FormControl>

        <Button mt={6} colorScheme="teal" type="submit">
          Register
        </Button>
      </form>
    </Box>
  </Box>
  );
};

export default Register;
