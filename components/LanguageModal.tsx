import React, { useState } from 'react';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Globe } from 'lucide-react-native';
import { Image, Text } from 'react-native';
import { useLanguageStore } from '@/store/languageStore'; // Import Zustand store
import { useTranslation } from '../contexts/TranslationContext'; // Keep for translations

function LanguageModal() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const { language, setLanguage } = useLanguageStore(); // Use Zustand store
  const { translate } = useTranslation(); // Keep for translations

  const handleClose = () => setShowActionsheet(false);

  type Language = 'lt' | 'en' | 'de' | "ru"; // Define supported languages

  const languages: { id: Language; title: string; flag: any }[] = [
    {
      id: 'lt',
      title: translate('lithuanian'),
      flag: require('../assets/lithuania.png'),
    },
    {
      id: 'en',
      title: translate('english'),
      flag: require('../assets/uk.png'),
    },
    {
      id: 'de',
      title: translate('german'),
      flag: require('../assets/german.png'),
    },
    {
      id: 'ru',
      title: translate('russian'),
      flag: require('../assets/russia.png'),
    }, // Corrected flag for German
  ];

  const handleLanguageSelect = (languageId: Language) => {
    setLanguage(languageId); // Update Zustand state and save to AsyncStorage
    handleClose();
  };

  // Function to get the current language text for the button
  const getCurrentLanguageText = () => {
    switch (language) {
      case 'lt':
        return translate('lithuanian');
      case 'en':
        return translate('english');
      case 'de':
        return translate('german');
        case 'ru':
        return translate('russian');
      default:
        return translate('english');
    }
  };

  return (
    <>
      <Button onPress={() => setShowActionsheet(true)}>
        <Icon as={Globe} size={'md'} color="white" style={{ marginRight: 4 }} />
        <ButtonText>{getCurrentLanguageText()}</ButtonText>
      </Button>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          style={{ paddingVertical: 20, paddingHorizontal: 16 }}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {/* Header Text Fix */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 16,
            }}
          >
            {translate('chooseLanguage')}
          </Text>

          {languages.map((lang) => (
            <ActionsheetItem
              key={lang.id}
              onPress={() => handleLanguageSelect(lang.id)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                marginVertical: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={lang.flag}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <ActionsheetItemText
                style={{
                  fontWeight: 'bold',
                  paddingVertical: 12,
                  fontSize: 16,
                }}
              >
                {lang.title}
              </ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}

export default LanguageModal;
