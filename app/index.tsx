import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Menu } from "lucide-react-native";

const HomeScreen = () => {
  return (
    <Box className="flex-1 justify-center align-center p-4" >
      <Box className="absolute top-0 left-0 right-0 p-4" >
        <HStack space="lg" reversed={true} >
          <Pressable>
            <Icon as={Menu} size={'xl'} color="black" />
          </Pressable>
        </HStack>
      </Box>

      <Box className=" justify-center align-center p-4 " >

        {/* Logo */}
        <Text className=" text-center mb-4 " size={"3xl"} >
          JUNG
        </Text>

        {/* Card with Buttons */}
        <Box className="justify-center p-4 bg-[#C2C2C2] rounded-2xl shadow-md ">
          <Text className="color-black text-center mb-2" size={"lg"}>
            Išmanu. Saug. Lankstu
          </Text>
          
          <VStack className="justify-center" space="md">
            <Button className="bg-white rounded-2xl" variant="outline" size="lg">
              <Text className="color-black" size={"2xl"}>Sistemų informacija</Text>
            </Button>
            <Button className="bg-white rounded-2xl" variant="outline" size="lg">
              <Text className="color-black" size={"2xl"}>Atraskite sprendimą</Text>
            </Button>
            <Button className="bg-white rounded-2xl" variant="outline" size="lg">
              <Text className="color-black" size={"2xl"}>Informacija</Text>
            </Button>
          </VStack>
        </Box>

      </Box>
    </Box>
  );
};

export default HomeScreen;
