import { router } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import LanguageModal from '@/components/LanguageModal';
import { Text } from '@/components/ui/text';

// Import the logo image
// Ensure this path is correct

const HomeScreen = () => {
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <Box className="absolute left-0 right-2 top-2 p-4">
        <HStack space="lg" reversed>
          <LanguageModal />
        </HStack>
      </Box>

      <Box className="align-center justify-center p-4">
        {/* Logo */}
        <Image
          source={require('../assets/JUNG.png')}
          style={{
            width: 148,
            height: 37,
            marginBottom: 125,
            alignSelf: 'center',
          }}
        />

        {/* Card with Buttons */}
        <Box className="justify-center rounded-xl bg-[#EAEAEA] p-6">
          <Text className="mb-2 text-center color-black font-bold text-3xl">
            Išmanu. Saugu. Lankstu
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: '#AAA9A9',
              width: '100%',
              marginBottom: 16,
            }}
          />

          <VStack className="justify-center" space="md">
            <Button
              className="bg-[#18181B] rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/questionnaire/categories')}
            >
              <Text className="color-white font-semibold text-xl">
                Atraskite sprendimą
              </Text>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/sysInfoCategories/sysInfo')}
            >
              <Text className="color-black font-semibold text-xl">
                Sistemų informacija
              </Text>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/jungInfo')}
            >
              <Text className="color-black font-semibold text-xl">
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
