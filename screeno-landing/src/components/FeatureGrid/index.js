import React from "react";

import {
  ChartLine,
  DesktopTower,
  UploadSimple,
  VideoCamera,
  Question,
} from "phosphor-react";
import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import FeatureCell from "./FeatureCell";

const features = [
  {
    icon: <UploadSimple />,
    heading: "Upload forms",
    text: "Upload forms, either through templates or manually.",
  },
  {
    icon: <Question />,
    heading: "Questions",
    text: "Customize your feedback forms through variety of questionaries",
  },
  {
    icon: <ChartLine />,
    heading: "Analytics",
    text: "Know what your student likes & how your teaching scheme is performing.",
  },
  {
    icon: <DesktopTower />,
    heading: "For all devices",
    text: "Get feedbacks on all devices",
  },
];

function FeatureGrid() {
  return (
    <Container
      maxW={{ base: "container.sm", xl: "container.xl" }}
      py={{ base: "3rem", md: "6.5rem" }}
    >
      <VStack spacing={{ base: "3rem", md: "7.5rem" }}>
        {/* Heading */}
        <VStack
          spacing="1rem"
          alignItems={{ base: "start", md: "center" }}
          textAlign={{ base: "start", md: "center" }}
        >
          <Heading as="h1" size="h1">
            All-in-one platform
          </Heading>
          <Text lineHeight="1.5">
            Analyze feedbacks and improve the education pattern
          </Text>
        </VStack>
        {/* Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 2 }}
          spacing={{ base: "3rem", md: "5rem", xl: "7.5rem" }}
          maxW="57rem"
        >
          {features.map((feature, index) => (
            <FeatureCell key={`feature-${index}`} {...feature} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default FeatureGrid;
