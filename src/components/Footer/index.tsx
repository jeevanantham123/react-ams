import { Box, Center, Container, Grid, GridItem } from "@chakra-ui/react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Box bgGradient="linear(to-b, brand.100, brand.900)" w="full">
      <Container maxW={{ md: "1360px" }}>
        <>
          <Grid
            templateRows={{ base: "repeat(2, 1fr)", md: "" }}
            templateColumns={{ base: "", md: "repeat(5, 1fr)" }}
            gap={6}
            p={10}
          >
            <GridItem w="100%" h="50px" bg="blue.500" />
            <GridItem w="100%" h="50px" bg="blue.500" />
            <GridItem w="100%" h="50px" bg="blue.500" />
            <GridItem w="100%" h="50px" bg="blue.500" />
            <GridItem w="100%" h="50px" bg="blue.500" />
          </Grid>
        </>
      </Container>
    </Box>
  );
};

export default Footer;
