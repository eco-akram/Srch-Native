import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import LanguageModal from '@/components/LanguageModal';
import { Text } from '@/components/ui/text';
import { TranslationContext } from '../contexts/TranslationContext';
import { TouchableOpacity } from 'react-native';
import { Settings, Info, CircleArrowRight, History } from 'lucide-react-native';

// Import the logo image
// Ensure this path is correct

const HomeScreen = () => {
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';
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
            marginBottom: 10,
            alignSelf: 'center',
          }}
        />

        <Box className="align-center justify-center p-4 mb-28">
          <Text className="text-center color-black font-bold text-3xl">
            {translate('welcome')}
          </Text>
          <Text className="mb-2 text-center color-secondary font-medium text-lg">
            {translate('tagline')}
          </Text>
        </Box>

        {/* Card with Buttons */}
        <Box className="justify-center rounded-xl bg-[#EAEAEA] p-6">

          <VStack className="justify-center" space="md">

            <TouchableOpacity
              onPress={() => router.push('/questionnaire/categories')}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#18181B',
                borderRadius: 12,
                paddingVertical: 9,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 12,
              }}
            >
              <CircleArrowRight size={24} color="white" />
              <Text className="color-white font-semibold text-xl ml-2">
                {translate('discoverSolution')}
              </Text>
            </TouchableOpacity>

            <Button
              className="bg-white rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/sysInfoCategories/sysInfo')}
            >
              <Settings size={24} color="black" />
              <Text className="color-black font-semibold text-xl">
                {translate('systemInfo')}
              </Text>
            </Button>
            <Button
              className="bg-white rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/jungInfo')}
            >
              <Info size={24} color="black" />
              <Text className="color-black font-semibold text-xl">
                {translate('info')}
              </Text>
            </Button>

            <Button
              className="bg-white rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/sysInfoCategories/myHistory')}
            >
              <History size={24} color="black" />
              <Text className="color-black font-semibold text-xl">
                {translate('myHistory')}
              </Text>
            </Button>

          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
