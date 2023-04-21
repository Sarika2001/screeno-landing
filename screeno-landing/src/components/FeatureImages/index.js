import React from "react";

import { EnvelopeSimple } from "phosphor-react";
import { Box, Circle, Container, Heading, VStack } from "@chakra-ui/react";

import DonateOverlay from "./DonateOverlay";
import Feature from "./Feature";
import HoverBadge from "components/HoverBadge";
import Parallax from "components/Parallax";

function FeatureImages() {
  return (
    <Box bg="gray.900">
      <Container
        maxW={{ base: "container.sm", xl: "container.xl" }}
        py={{ base: "3rem", md: "6.5rem" }}
      >
        <Heading
          as="h1"
          size="h1"
          color="white"
          pb={{ base: "3rem", md: "6.5rem" }}
          textAlign={{ base: "start", md: "center" }}
        >
          We help you grow, learn and analyze
        </Heading>
        <VStack spacing={{ base: "3rem", md: "6.5rem" }}>
          <Feature
            heading="Dynamic feedbacks"
            text="Dynamic feedback analysis will help you to curate your teaching content more precisely and to understand the student's point of view for studying the subject. "
            imageSrc="assets/images/features/feature-image-1.png"
            imageAlt="Feature Image 1"
            to="/"
          >
            <Parallax position="absolute" top="-1rem" left="-1rem">
              <DonateOverlay />
            </Parallax>
          </Feature>
          <Feature
            heading="Less storage, more secure"
            text="With the help of leading block chain technology & smart contracts your information is secured and not stored anywhere"
            imageSrc="assets/images/features/feature-image-2.png"
            imageAlt="Feature Image 2"
            reverse={true}
            to="/"
          >
            <HoverBadge
              borderRadius="0.75rem"
              p="1rem"
              fontSize="32px"
              position="absolute"
              top="-1rem"
              right="-1rem"
            >
              <EnvelopeSimple />
              <Circle
                size="0.75rem"
                bg="blue.400"
                position="absolute"
                top="1rem"
                right="0.85rem"
                border="2px"
                borderColor="white"
              />
            </HoverBadge>
          </Feature>
        </VStack>
      </Container>
    </Box>
  );
}

export default FeatureImages;
