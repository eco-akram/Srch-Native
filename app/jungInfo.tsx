import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { StatusBar, Image, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Perėjimo efektui

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

const jungInfoScreen = () => {
  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: '#F8F8F8' }} // Fono spalva
    >
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

      {/* Viršutinė dalis su atgal mygtuku */}
      <Box className="absolute left-0 right-0 top-0 p-4 shadow-sm">
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
            Programėlės informacija
          </Text>
          <Text className="text-center color-[#666666] font-medium text-lg">
            Ši programėlė yra klausimynas, kuris padeda pasirinkti išmaniųjų namų tiekėjus
          </Text>
        </Box>

        {/* Turinio kortelė */}
        <Box className="justify-center rounded-xl bg-white p-6 shadow-md">
          <Text className="mb-4 text-center color-black font-semibold text-2xl">
            Apie programėlę
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
                  Ši programėlė yra klausimynas, kuris padeda vartotojams pasirinkti
                  išmaniųjų namų tiekėjus pagal jų norus ir poreikius. Atsakydami į
                  klausimus, vartotojai gali gauti rekomendacijas, kurios geriausiai
                  atitinka jų pageidavimus ir gyvenimo būdą. Programėlė taip pat
                  suteikia galimybę palyginti skirtingus tiekėjus ir jų pasiūlymus,
                  kad vartotojai galėtų priimti informuotus sprendimus.
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
            Slinkite žemyn, kad pamatytumėte daugiau
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default jungInfoScreen;