import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { StatusBar, Image, View, Linking, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For fade effect

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const knxScreen = () => {
  // Function to handle the button press and open the URL
  const handleMoreInfoPress = () => {
    const url =
      'https://www.jung.de/lt/820/produktai/technologijos/knx-sistema/?gad_source=1&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfSg2PoYQ_Xh2ds_s1IURYSoicPQo9oR4Ut8gqc8CdDV_5oQ6QCflMQMaAjUOEALw_wcB';

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
            KNX
          </Text>
          <Text className="text-center color-[#666666] font-medium text-lg">
            Elektroniniai sprendimai naujiems pastatams ir modernizavimui
          </Text>
        </Box>

        {/* Card with Content */}
        <Box className="justify-center rounded-xl bg-white p-6 shadow-md">
          <Text className="mb-4 text-center color-black font-semibold text-2xl">
            Apie KNX
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
                  KNX - tai pažangi išmaniųjų pastatų valdymo sistema,
                  užtikrinanti efektyvų apšvietimo, šildymo, vėdinimo, žaliuzių
                  ir kitų inžinerinių sistemų automatizavimą. KNX standartas
                  leidžia skirtingiems įrenginiams sklandžiai komunikuoti
                  tarpusavyje, suteikiant maksimalų lankstumą ir pritaikymo
                  galimybes tiek gyvenamuosiuose, tiek komerciniuose pastatuose.
                  KNX sprendimai išsiskiria aukšta kokybe, intuityviu
                  valdymu bei galimybe integruoti nuotolinį valdymą per
                  mobiliąsias programėles ar balsu valdomas sistemas. Tai puikus
                  pasirinkimas siekiantiems didesnio komforto, saugumo ir
                  energijos efektyvumo savo erdvėse.
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
            Slinkite žemyn, kad pamatytumėte daugiau
          </Text>

          {/* "Daugiau informacijos" Button */}
          <Button
            className="bg-[#18181B] rounded-xl mt-6"
            variant="outline"
            size="xl"
            onPress={handleMoreInfoPress}
          >
            <Text className="color-white font-semibold text-xl">
              Daugiau informacijos
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default knxScreen;
