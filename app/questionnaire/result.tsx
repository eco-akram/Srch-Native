import { router } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { CircleArrowRight } from 'lucide-react-native';

const ResultPage = () => {
  return (
    <Box
      className="flex-1 align-center justify-center p-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <Box className="align-center justify-center p-4">
        <Image
          source={require('assets/JUNG.png')}
          style={{
            width: 148,
            height: 37,
            marginBottom: 10,
            alignSelf: 'center',
          }}
        />

        <Box className="align-center justify-center p-4 mb-28">
          <Text className="text-center color-black font-bold text-3xl">
            Rezultatai
          </Text>
          <Text className="mb-2 text-center color-secondary font-medium text-lg">
            Atraskite savo sprendimą žemiau
          </Text>
        </Box>

        <Box className="justify-center rounded-xl bg-[#EAEAEA] p-6">
          <VStack className="justify-center" space="md">
            <Button
              className="bg-[#18181B] rounded-xl mt-3"
              variant="outline"
              size="xl"
              onPress={() => router.push('/questionnaire/categories')}
            >
              <CircleArrowRight size={24} color="white" />
              <Text className="color-white font-semibold text-xl">
                Grįžti į klausimyną
              </Text>
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultPage;
