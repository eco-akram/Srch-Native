import React from "react";
import { StatusBar, Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import LanguageModal from "@/components/LanguageModal";

// Import the logo image
 // Ensure this path is correct

const HomeScreen = () => {

  return (
    <Box className="flex-1 justify-center align-center p-4" style={{ backgroundColor: '#F1EBE5' }}>
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />
      <Box className="absolute top-2 left-0 right-2 p-4">
        <HStack space="lg" reversed={true}>
          <LanguageModal />
        </HStack>
      </Box>

      <Box className="justify-center align-center p-4">
        {/* Logo */}
        <Image source={require("../assets/JUNG.png")} style={{ width: 148, height: 37, marginBottom: 125, alignSelf: 'center' }} />
        

        {/* Card with Buttons */}
        <Box className="justify-center p-6 bg-[#D3D3D3] rounded-2xl shadow-md">
          <Text className="color-black text-center mb-2" size={"4xl"}>
            Išmanu. Saugu. Lankstu
          </Text>

          <View style={{ height: 1, backgroundColor: '#AAA9A9', width: '100%', marginBottom: 16 }} />

          <VStack className="justify-center" space="md">
            <Button className="bg-white rounded-3xl mt-3" variant="outline" size="lg" onPress={() => router.push('/sysInfoCategories/sysInfo')}>
              <Text className="color-black" size={"3xl"}>Sistemų informacija</Text>
            </Button>
            <Button className="bg-white rounded-3xl mt-3" variant="outline" size="lg" onPress={() => router.push('/questionnaire/categories')}>
              <Text className="color-black" size={"3xl"}>Atraskite sprendimą</Text>
            </Button>
            <Button className="bg-white rounded-3xl mt-3" variant="outline" size="lg" onPress={() => router.push('/jungInfo')}>
              <Text className="color-black" size={"3xl"}>Informacija</Text>
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;