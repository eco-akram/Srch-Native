import { router } from 'expo-router';
import { ArrowLeft, Download, Settings, Mail } from 'lucide-react-native';
import React, { useContext } from 'react';
import { StatusBar, Image, View, Linking, Alert } from 'react-native';
import { TranslationContext } from '../../contexts/TranslationContext';
import { useAnswerStore } from '../../store/useAnswerStore';
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

  const { recommendedProduct, clearAnswers, lastQuestionId } = useAnswerStore();

  if (!recommendedProduct) {
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
      if (recommendedProduct) {
        await generatePDF(recommendedProduct.name, recommendedProduct.description);
      } else {
        Alert.alert('Error', 'No recommended product available for PDF generation.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };

  const handleSystemConfiguration = () => {
    clearAnswers();
    router.push('/');
  };

  const handleContactSupplier = () => {
    Linking.openURL('https://www.jung.de/lt/kontaktai').catch((err) =>
      console.error('Failed to open link: ', err)
    );
  };

  const handleGoBackToLastQuestion = () => {
    if (lastQuestionId) {
      router.push(`/questionnaire/${lastQuestionId}`);
    } else {
      Alert.alert('Error', 'No previous question found.');
    }
  };

  const handleGoBackToHome = () => {
    clearAnswers(); // Clear all answers and recommended product
    router.push('/');
  };

  return (
    <Box className="align-center flex-1 justify-center p-4" style={{ backgroundColor: '#F8F8F8' }}>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

      {/* Back Arrow to Navigate to the Previous Question */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={handleGoBackToLastQuestion}>
            <Icon as={ArrowLeft} size="xl" color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>

      <Box className="align-center justify-center p-4">
        {/* Product Image */}
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

        {/* Product Information */}
        <Text className="text-center color-black font-bold text-3xl mb-4">
          {recommendedProduct.name}
        </Text>
        <Text className="text-center color-[#666666] font-medium text-lg mb-10">
          {recommendedProduct.description}
        </Text>

        {/* Button to Download PDF */}
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

        {/* Button for System Configuration */}
        <Button
          className="bg-white rounded-xl mb-4 border border-[#EAEAEA]"
          variant="outline"
          size="xl"
          onPress={handleSystemConfiguration}
        >
          <Settings size={24} color="black" />
          <Text className="color-black font-semibold text-xl ml-2">
            {translate('config')}
          </Text>
        </Button>

        {/* Contact Information */}
        <Text className="text-center color-[#666666] font-medium text-lg mb-4">
          {translate('contactInfo')}
        </Text>

        {/* Button to Contact Supplier */}
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

        {/* Button to Go Back to the Home Page */}
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
