import { Box, Container } from "@chakra-ui/react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import React from "react";

interface PagelayoutProps {
  children: React.ReactNode;
}

const Pagelayout: React.FC<PagelayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box minH="100vh" py="40px">
        <Container maxW={{ md: "1360px" }} px="0">
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Pagelayout;
