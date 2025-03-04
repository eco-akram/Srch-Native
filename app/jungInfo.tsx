import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useContext } from 'react';
import { StatusBar, Image, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Perėjimo efektui

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { TranslationContext } from '../contexts/TranslationContext';

const jungInfoScreen = () => {
   const translationContext = useContext(TranslationContext);
    const translate = translationContext ? translationContext.translate : () => '';
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: '#F8F8F8' }} // Fono spalva
    >
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

      {/* Viršutinė dalis su atgal mygtuku */}
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

        {/* Logotipas */}
        <Image
          source={require('../assets/JUNG.png')}
          style={{
            width: 148,
            height: 37,
            marginBottom: 20, // Tarpas po logotipu
            alignSelf: 'center',
          }}
        />

        {/* Antraštė ir paantraštė */}
        <Box className="align-center justify-center p-4 mb-10">
          <Text className="text-center color-black font-bold text-3xl mb-2">
          {translate('programInfo')}
          </Text>
          <Text className="text-center color-[#666666] font-medium text-lg">
          {translate('infoAbout')}
          </Text>
        </Box>

        {/* Turinio kortelė */}
        <Box className="justify-center rounded-xl bg-white p-6 shadow-md">
          <Text className="mb-4 text-center color-black font-semibold text-2xl">
          {translate('about')}
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: '#EAEAEA',
              width: '100%',
              marginBottom: 16,
            }}
          />

          {/* Slenkamas turinys su perėjimo efektu */}
          <View style={{ position: 'relative', maxHeight: 200 }}>
            <ScrollView
              style={{ maxHeight: 200 }}
              showsVerticalScrollIndicator={true} // Rodyti slinkties indikatorių
            >
              <Box className="justify-center rounded-xl bg-[#F8F8F8] p-6 shadow-sm">
                <Text className="text-center color-[#666666] font-medium text-lg">
                {translate('appInfo')}
                </Text>
              </Box>
            </ScrollView>

            {/* Perėjimo efektas apačioje */}
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

          {/* Pastaba apie slinkimą */}
          <Text className="text-center color-[#666666] font-medium text-sm mt-2">
          {translate('scroll')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default jungInfoScreen;