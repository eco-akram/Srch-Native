import { router } from 'expo-router';
import { ArrowLeft, Download, List, Mail } from 'lucide-react-native';
import React, { useContext, useState } from 'react';
import { StatusBar, Image, View, Linking, Alert } from 'react-native';
import { TranslationContext } from '../../contexts/TranslationContext';
import { useAnswerStore } from '../../store/useAnswerStore';
import { useHistoryStore } from '../../store/useHistoryStore';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { generatePDF } from '../../utils/pdfRezult';

const ResultScreen = () => {
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';

  const { recommendedProduct, clearAnswers, lastQuestionId } = useAnswerStore(
    (state) => ({
      recommendedProduct: state.recommendedProduct,
      clearAnswers: state.clearAnswers,
      lastQuestionId: state.lastQuestionId,
    })
  );

  const [isNavigating, setIsNavigating] = useState(false);

  if (!recommendedProduct) {
    console.log('No recommended product found');
    return (
      <Box className="flex-1 justify-center items-center">
        <Text className="font-bold text-xl color-black">
          No Recommendation Available
        </Text>
      </Box>
    );
  }

  const handleDownloadPDF = async () => {
    try {
      console.log('Attempting to generate PDF...');
      if (recommendedProduct) {
        await generatePDF(recommendedProduct.name, recommendedProduct.description);
        console.log('PDF generated successfully');
      } else {
        Alert.alert('Error', 'No recommended product available for PDF generation.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };

  const repeatQuestionnaire = () => {
    router.replace('/questionnaire/categories');
  };

  const handleContactSupplier = () => {
    console.log('Opening supplier contact page...');
    Linking.openURL('https://www.jung.de/lt/kontaktai').catch((err) =>
      console.error('Failed to open link: ', err)
    );
  };

  const handleGoBackToLastQuestion = async () => {
    try {
      if (!isNavigating && lastQuestionId) {
        console.log(`Navigating back to question ID: ${lastQuestionId}`);
        setIsNavigating(true);
        await router.replace(`/questionnaire/${lastQuestionId}`);
        setIsNavigating(false);
      } else {
        Alert.alert('Error', 'No previous question found.');
      }
    } catch (error) {
      console.error('Error navigating to the last question:', error);
      setIsNavigating(false);
    }
  };

const handleGoBackToHome = async () => {
  const { addHistoryRecord } = useHistoryStore.getState();
  const { answers, recommendedProduct, clearAnswers } = useAnswerStore.getState();

  if (!recommendedProduct) {
    console.error('❌ Nėra rekomenduoto produkto');
    return;
  }

  await addHistoryRecord({
    answers,
    recommendedProduct: {
      id: recommendedProduct.productId.toString(), // arba .id jei turi
      productName: recommendedProduct.name,
    },
    timestamp: Date.now(),
  });

  clearAnswers();
  router.replace('/');
};

  return (
    <Box className="align-center flex-1 justify-center p-4" style={{ backgroundColor: '#F8F8F8' }}>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={handleGoBackToLastQuestion}>
            <Icon as={ArrowLeft} size="xl" color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>

      <Box className="align-center justify-center p-4">
        <View
          style={{
            width: '100%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/jung-enet-smart-home.jpg')}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'contain',
            }}
          />
        </View>

        <Text className="text-center color-black font-bold text-3xl mb-4">
          {recommendedProduct.name}
        </Text>
        <Text className="text-center color-[#666666] font-medium text-lg mb-10">
          {recommendedProduct.description}
        </Text>

        <Button
          className="bg-[#18181B] rounded-xl mb-4"
          variant="outline"
          size="xl"
          onPress={handleDownloadPDF}
        >
          <Download size={24} color="white" />
          <Text className="color-white font-semibold text-xl ml-2">
            {translate('pdf')}
          </Text>
        </Button>

        <Button
          className="bg-white rounded-xl mb-4 border border-[#EAEAEA]"
          variant="outline"
          size="xl"
          onPress={repeatQuestionnaire}
        >
          <List size={24} color="black" />
          <Text className="color-black font-semibold text-xl ml-2">
            {translate('config')}
          </Text>
        </Button>

        <Text className="text-center color-[#666666] font-medium text-lg mb-4">
          {translate('contactInfo')}
        </Text>

        <Button
          className="bg-[#18181B] rounded-xl mb-4"
          variant="outline"
          size="xl"
          onPress={handleContactSupplier}
        >
          <Mail size={24} color="white" />
          <Text className="color-white font-semibold text-xl ml-2">
            {translate('contactSupplier')}
          </Text>
        </Button>

        <Button
          className="bg-[#18181B] rounded-xl"
          variant="outline"
          size="xl"
          onPress={handleGoBackToHome}
        >
          <Text className="color-white font-semibold text-xl">
            {translate('backToMain')}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ResultScreen;
