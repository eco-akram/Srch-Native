import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
  } from "@/components/ui/actionsheet";
  import { Button, ButtonText } from "@/components/ui/button";
  import React from "react";
  import { Icon } from "@/components/ui/icon";
  import { Globe } from "lucide-react-native";
  import { Image } from "react-native"; // Import Image from react-native
  
  function LanguageModal() {
    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState("Lithuanian");
  
    const handleClose = () => setShowActionsheet(false);
  
    const languages = [
      { id: "lt", title: "Lithuanian", flag: require('../assets/lithuania.png') },
      { id: "en", title: "English", flag: require('../assets/uk.png') },
    ];
  
    const handleLanguageSelect = (language: { id: string; title: string }) => {
      setSelectedLanguage(language.title);
      handleClose();
    };
  
    return (
      <>
        <Button onPress={() => setShowActionsheet(true)}>
          <Icon as={Globe} size={'md'} color="white" style={{ marginRight: 4 }} />
          <ButtonText>{selectedLanguage}</ButtonText>
        </Button>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItemText style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16, paddingVertical: 20 }}>
              Pasirinkite Kalbą
            </ActionsheetItemText>
            {languages.map((language) => (
              <ActionsheetItem key={language.id} onPress={() => handleLanguageSelect(language)} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginVertical: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={language.flag} style={{ width: 24, height: 24, marginRight: 8 }} />
                <ActionsheetItemText style={{ fontWeight: 'bold', paddingVertical: 12, fontSize: 16 }}>{language.title}</ActionsheetItemText>
              </ActionsheetItem>
            ))}
          </ActionsheetContent>
        </Actionsheet>
      </>
    );
  }
  
  export default LanguageModal;