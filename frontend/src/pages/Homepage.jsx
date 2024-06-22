import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
import { px } from "framer-motion";
 


export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <HStack w="100%">
      {books?.books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </HStack>
  );
}
