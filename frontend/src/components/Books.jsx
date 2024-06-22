import { VStack, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Flex
        bgColor={"whiteAlpha.800"}
        direction={{ base: "column", md: "row" }} // vertikal di layar kecil, horizontal di layar besar
        maxW="full"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="base"
        mb={4}
        p={4}
        cursor="pointer"
        mr={4}
        ml={4}
      >
        <VStack
          align={{ base: "center"}}
          spacing={4}
          flex="2"
        >
          <Image
            boxSize={"80%"} // ukuran gambar responsif
            objectFit="cover"
            src={`http://localhost:8000/${image}`}
            alt={`${title} book cover`}
          />

          <Heading size="md" textAlign={{ base: "center"}}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Text textAlign={"center"}>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Flex>
    </Link>
  );
}
