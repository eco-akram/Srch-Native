import { router } from 'expo-router';
import { ArrowLeft, Download, Settings, Mail } from 'lucide-react-native';
import React from 'react';
import { StatusBar, Image, View, Linking, Dimensions } from 'react-native';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const ResultScreen = () => {
  // Pavyzdinė pasirinktos sistemos informacija
  const selectedSystem = {
    name: 'JUNG eNet Smart Home',
    image: require('../../assets/jung-enet-smart-home.jpg'), // Pakeiskite į savo nuotrauką
    description: 'JUNG eNet Smart Home sistema leidžia valdyti apšvietimą, šildymą ir kitas namų sistemas per išmanųjį įrenginį arba mobiliąją programėlę.',
    contactPage: 'https://www.jung.de/lt/kontaktai', // Pakeiskite į tinkamą nuorodą
  };

  // Ekrano plotis
  const screenWidth = Dimensions.get('window').width;

  // Funkcija PDF parsisiuntimui
  const handleDownloadPDF = () => {
    // Čia galite pridėti PDF generavimo ir parsisiuntimo logiką
    alert('Rezultatai sėkmingai parsisiųsti PDF formatu!');
  };

  // Funkcija sistemos konfigūracijai
  const handleSystemConfiguration = () => {
    router.push('/'); // Nukreipimas į sistemos konfigūracijos puslapį
  };

  // Funkcija susisiekti su tiekėju
  const handleContactSupplier = () => {
    Linking.openURL(selectedSystem.contactPage).catch((err) =>
      console.error('Nepavyko atidaryti nuorodos: ', err),
    );
  };

  // Funkcija grįžti į pagrindinį puslapį
  const handleGoBackToHome = () => {
    router.push('/'); // Nukreipimas į pagrindinį puslapį
  };

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
        {/* Pasirinktos sistemos nuotrauka */}
        <View
          style={{
            width: '100%', // Plotis be kraštų
            marginBottom: 20,
            justifyContent: 'center', // Centruoja nuotrauką vertikaliai
            alignItems: 'center', // Centruoja nuotrauką horizontaliai
          }}
        >
          <Image
            source={selectedSystem.image}
            style={{
              width: '100%',
              height: 200, // Fiksuotas aukštis
              resizeMode: 'contain', // Nuotrauka bus pilnai matoma
            }}
          />
        </View>

        {/* Pasirinktos sistemos pavadinimas ir aprašymas */}
        <Text className="text-center color-black font-bold text-3xl mb-4">
          {selectedSystem.name}
        </Text>
        <Text className="text-center color-[#666666] font-medium text-lg mb-10">
          {selectedSystem.description}
        </Text>

        {/* Mygtukas "Parsisiųsti rezultatus PDF formatu" */}
        <Button
          className="bg-[#18181B] rounded-xl mb-4"
          variant="outline"
          size="xl"
          onPress={handleDownloadPDF}
        >
          <Download size={24} color="white" />
          <Text className="color-white font-semibold text-xl ml-2">
            Parsisiųsti rezultatus PDF
          </Text>
        </Button>

        {/* Mygtukas "Sistemos konfigūracija" */}
        <Button
          className="bg-white rounded-xl mb-4 border border-[#EAEAEA]"
          variant="outline"
          size="xl"
          onPress={handleSystemConfiguration}
        >
          <Settings size={24} color="black" />
          <Text className="color-black font-semibold text-xl ml-2">
            Sistemos konfigūracija
          </Text>
        </Button>

        {/* Tekstas su nuoroda į tiekėjo kontaktų puslapį */}
        <Text className="text-center color-[#666666] font-medium text-lg mb-4">
          Paspaudę mygtuką žemiau, būsite nukreipti(-a) į puslapį su tiekėjo kontaktinėmis informacijomis.
        </Text>

        {/* Mygtukas "Susisiekti" */}
        <Button
          className="bg-[#18181B] rounded-xl mb-4"
          variant="outline"
          size="xl"
          onPress={handleContactSupplier}
        >
          <Mail size={24} color="white" />
          <Text className="color-white font-semibold text-xl ml-2">
            Susisiekti
          </Text>
        </Button>

        {/* Mygtukas "Grįžti atgal į pagrindinį" */}
        <Button
          className="bg-[#18181B] rounded-xl"
          variant="outline"
          size="xl"
          onPress={handleGoBackToHome}
        >
          <Text className="color-white font-semibold text-xl">
            Grįžti atgal į pagrindinį
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ResultScreen;