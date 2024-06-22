import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const formTextColor = useColorModeValue("gray.800", "gray.200");

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="title" color="white">
            Title
          </FormLabel>
          <Input
            id="title"
            name="title"
            required
            defaultValue={bookData?.title}
            bg={formBackground}
            color={formTextColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="author" color="white">Author</FormLabel>
          <Input
            id="author"
            name="author"
            required
            defaultValue={bookData?.author}
            bg={formBackground}
            color={formTextColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="publisher" color="white">Publisher</FormLabel>
          <Input
            id="publisher"
            name="publisher"
            required
            defaultValue={bookData?.publisher}
            bg={formBackground}
            color={formTextColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="year" color="white">Year</FormLabel>
          <Input
            id="year"
            name="year"
            type="number"
            required
            defaultValue={bookData?.year}
            bg={formBackground}
            color={formTextColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="pages" color="white">Pages</FormLabel>
          <Input
            id="pages"
            name="pages"
            type="number"
            required
            defaultValue={bookData?.pages}
            bg={formBackground}
            color={formTextColor}
          />
        </FormControl>
        {selectedImage && (
          <Image w={64} src={selectedImage} alt="Selected Image" />
        )}
        {!bookData?.image && (
          <FormControl>
            <FormLabel htmlFor="image" color="white">Image</FormLabel>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
              bg={formBackground}
              color={formTextColor}
            />
          </FormControl>
        )}

        <Button type="submit" bg="blue.400" color="white">
          {bookData ? "Edit Book" : "Create Book"}
        </Button>
      </VStack>
    </form>
  );
}
