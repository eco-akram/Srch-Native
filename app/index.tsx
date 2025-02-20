import React from "react";
import { StatusBar, Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Menu } from "lucide-react-native";
import { router } from "expo-router";

// Import the logo image
// Ensure this path is correct

const HomeScreen = () => {
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: "#F1EBE5" }}
    >
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />
      <Box className="absolute left-0 right-2 top-2 p-4">
        <HStack space="lg" reversed={true}>
          <Pressable>
            <Icon
              as={Menu}
              size={"xl"}
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
            marginBottom: 125,
            alignSelf: "center",
          }}
        />

        {/* Card with Buttons */}
        <Box className="justify-center rounded-2xl bg-[#D3D3D3] p-6 shadow-md">
          <Text className="mb-2 text-center color-black" size={"4xl"}>
            Išmanu. Saugu. Lankstu
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: "#AAA9A9",
              width: "100%",
              marginBottom: 16,
            }}
          />

          <VStack className="justify-center" space="md">
            <Button
              className="mt-3 rounded-3xl bg-white"
              variant="outline"
              size="lg"
              onPress={() => router.push("/sysInfo")}
            >
              <Text className="color-black" size={"3xl"}>
                Sistemų informacija
              </Text>
            </Button>
            <Button
              className="mt-3 rounded-3xl bg-white"
              variant="outline"
              size="lg"
            >
              <Text className="color-black" size={"3xl"}>
                Atraskite sprendimą
              </Text>
            </Button>
            <Button
              className="mt-3 rounded-3xl bg-white"
              variant="outline"
              size="lg"
            >
              <Text className="color-black" size={"3xl"}>
                Informacija
              </Text>
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
