import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const boxBackground = useColorModeValue('gray.100', 'gray.700');
  const headingColor = useColorModeValue('gray.800', 'gray.200');
  const textColor = useColorModeValue('gray.800', 'gray.400');

  return (
    <Box bg={boxBackground} p={6} rounded="lg">
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex my="6">
          <Box w="300px">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
              rounded="md"
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg" color={headingColor}>
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color={textColor} mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem('token') && (
        <HStack mt={4}>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader color={headingColor}>Confirmation!</PopoverHeader>
              <PopoverBody color={textColor}>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Button as="a" href={`/editbook/${id}`} colorScheme="blue">
            Edit
          </Button>
        </HStack>
      )}
    </Box>
  );
}
