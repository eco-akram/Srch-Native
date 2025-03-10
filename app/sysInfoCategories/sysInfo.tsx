import { router } from "expo-router";
import { ArrowLeft, Settings, Home, Grid, Cpu } from "lucide-react-native";
import React, { useContext } from "react";
import { StatusBar, Image } from "react-native";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { TranslationContext } from '../../contexts/TranslationContext';


const SysInfoScreen = () => {
  const translationContext = useContext(TranslationContext);
         const translate = translationContext ? translationContext.translate : () => '';
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: "#F8F8F8" }} // Light grey background for a softer look
    >
      
      
      {/* Header with Back Button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
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
          source={require("../../assets/JUNG.png")}
          style={{
            width: 148,
            height: 37,
            marginBottom: 20, // Increased margin for better spacing
            alignSelf: "center",
          }}
        />

        {/* Title and Subtitle */}
        <Box className="align-center justify-center p-4 mb-10">
          <Text className="text-center color-black font-bold text-3xl mb-2">
            {translate("systemInfo")}
          </Text>
          <Text className="text-center color-[#666666] font-medium text-lg">
            {translate("category")}
          </Text>
        </Box>

        {/* Card with Buttons */}
        <Box className="justify-center rounded-xl bg-white p-6 shadow-md">
          <VStack className="justify-center" space="md">
            <Button
              className="bg-[#18181B] rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push("/sysInfoCategories/lb-Manage")}
            >
              <HStack space="sm">
                <Cpu size={24} color="white" />
                <Text className="color-white font-semibold text-xl">
                  LB-Management
                </Text>
              </HStack>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3 border border-[#EAEAEA]"
              variant="outline"
              size="xl"
              onPress={() => router.push("/sysInfoCategories/eNET")}
            >
              <HStack space="sm">
                <Home size={24} color="black" />
                <Text className="color-black font-semibold text-xl">
                eNet SMART HOME
                </Text>
              </HStack>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3 border border-[#EAEAEA]"
              variant="outline"
              size="xl"
              onPress={() => router.push("/sysInfoCategories/jung")}
            >
              <HStack space="sm">
                <Grid size={24} color="black" />
                <Text className="color-black font-semibold text-xl">
                JUNG HOME
                </Text>
              </HStack>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3 border border-[#EAEAEA]"
              variant="outline"
              size="xl"
              onPress={() => router.push("/sysInfoCategories/knx")}
            >
              <HStack space="sm">
                <Settings size={24} color="black" />
                <Text className="color-black font-semibold text-xl">
                KNX valdymo sistema
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default SysInfoScreen;