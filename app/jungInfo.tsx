import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { StatusBar, Image, View } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

// Import the logo image

const jungInfoScreen = () => {
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: "#F1EBE5" }}
    >
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg" reversed={false}>
          <Pressable onPress={() => router.back()}>
            <Icon
              as={ArrowLeft}
              size="xl"
              color="black"
              style={{ width: 35, height: 35 }}
            />
          </Pressable>
        </HStack>
      </Box>
      <Box className="align-center justify-center p-4">
        {/* Logo */}
        <Image
          source={require("../assets/JUNG.png")}
          style={{
            width: 148,
            height: 37,
            marginBottom: 25,
            alignSelf: "center",
          }}
        />

        {/* Card with Buttons */}
        <Box className="justify-center rounded-2xl bg-[#D3D3D3] p-6 shadow-md">
          <Text className="mb-2 text-center color-black" size="4xl">
            Programeles informacija
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: "#AAA9A9",
              width: "100%",
              marginBottom: 16,
            }}
          />
          <Box className="justify-center rounded-2xl bg-[#f0f0f0] p-6 shadow-md">
            <Text className="p-2 text-center color-black" size="xl">
              Ši programėlė yra klausimynas, kuris padeda vartotojams pasirinkti
              išmaniųjų namų tiekėjus pagal jų norus ir poreikius. Atsakydami į
              klausimus, vartotojai gali gauti rekomendacijas, kurios geriausiai
              atitinka jų pageidavimus ir gyvenimo būdą.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default jungInfoScreen;
