import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useContext } from 'react';
import { StatusBar, Image, View, Linking, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For fade effect

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { TouchableOpacity } from 'react-native';
import { TranslationContext } from '../../contexts/TranslationContext';

const eNETScreen = () => {
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';
  const handleMoreInfoPress = () => {
    const url =
      'https://www.jung.de/lt/9444/produktai/technologijos/jung-enet-smart-home/';

    // Open the URL using the device's default browser picker
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL: ', err),
    );
  };

  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: '#F8F8F8' }} // Match the background color
    >
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

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
          source={require('../../assets/JUNG.png')}
          style={{
            width: 148,
            height: 37,
            marginBottom: 20, // Match the margin
            alignSelf: 'center',
          }}
        />

        {/* Title and Subtitle */}
        <Box className="align-center justify-center p-4 mb-10">
          <Text className="text-center color-black font-bold text-3xl mb-2">
            {translate('eNetInfoHeader')}
          </Text>
          <Text className="text-center color-[#666666] font-medium text-lg">
            {translate('sysInfoSub')}
          </Text>
        </Box>

        {/* Card with Content */}
        <Box className="justify-center rounded-xl bg-white p-6 shadow-md">
          <Text className="mb-4 text-center color-black font-semibold text-2xl">
            {translate('abouteNet')}
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: '#EAEAEA',
              width: '100%',
              marginBottom: 16,
            }}
          />

          {/* Scrollable Content with Fade Effect */}
          <View style={{ position: 'relative', maxHeight: 200 }}>
            <ScrollView
              style={{ maxHeight: 200 }}
              showsVerticalScrollIndicator={true} // Show scroll indicator
            >
              <Box className="justify-center rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
                <Text className="text-center color-[#666666] font-medium text-lg">
                  {translate('eNetInfo')}
                </Text>
              </Box>
            </ScrollView>

            {/* Fade Effect at the Bottom */}
            <LinearGradient
              colors={['transparent', '#F8F8F8']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
              }}
            />
          </View>

          {/* Scroll Hint */}
          <Text className="text-center color-[#666666] font-medium text-sm mt-2">
            {translate('scroll')}
          </Text>

          {/* "Daugiau informacijos" Button */}
          <TouchableOpacity
            onPress={handleMoreInfoPress}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#18181B',
              borderRadius: 12,
              paddingVertical: 9,
              alignItems: 'center',
              marginTop: 24, // equivalent to Tailwind's mt-6
            }}
          >
            <Text className="color-white font-semibold text-xl">
              {translate('moreInfo')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default eNETScreen;
