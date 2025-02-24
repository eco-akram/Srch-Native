import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { StatusBar, Image, View } from "react-native";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

// Import the logo image

const SysInfoScreen = () => {
  return (
    <Box
      className="flex-1 justify-center align-center p-4"
      style={{ backgroundColor: "#F1EBE5" }}
    >
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />
      <Box className="absolute top-2 left-2 right-0 p-4">
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
      <Box className="justify-center align-center p-4">
        {/* Logo */}
        <Image
          source={require("../../assets/JUNG.png")}
          style={{
            width: 148,
            height: 37,
            marginBottom: 125,
            alignSelf: "center",
          }}
        />

        {/* Card with Buttons */}
        <Box className="justify-center p-6 bg-[#D3D3D3] rounded-2xl shadow-md">
          <VStack className="justify-center" space="md">
            <Button
              className="bg-white rounded-3xl mt-3"
              variant="outline"
              size="lg"
              onPress={() => router.push("/sysInfoCategories/lb-Manage")}
            >
              <Text className="color-black" size="3xl">
                LB-Management
              </Text>
            </Button>
            <Button
              className="bg-white rounded-3xl mt-3"
              variant="outline"
              size="lg"
              onPress={() => router.push("/sysInfoCategories/eNET")}
            >
              <Text className="color-black" size="3xl">
                eNet Smart Home
              </Text>
            </Button>
            <Button
              className="bg-white rounded-3xl mt-3"
              variant="outline"
              size="lg"
              onPress={() => router.push("/sysInfoCategories/jung")}
            >
              <Text className="color-black" size="3xl">
                JUNG
              </Text>
            </Button>
            <Button
              className="bg-white rounded-3xl mt-3"
              variant="outline"
              size="lg"
              onPress={() => router.push("/sysInfoCategories/knx")}
            >
              <Text className="color-black" size="3xl">
                KNX Valdymo sistema
              </Text>
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default SysInfoScreen;
