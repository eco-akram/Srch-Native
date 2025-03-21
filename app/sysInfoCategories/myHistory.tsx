import React, { useState } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';

const MyHistory: React.FC = () => {
    const navigation = useNavigation();
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const historyData = [
        { date: '2025/03/19 21:41' },
        { date: '2025/03/19 23:34' },
        { date: '2025/03/20 08:21' },
        { date: '2025/03/19 23:34' },
        { date: '2025/03/19 23:34' },
        { date: '2025/03/19 21:41' },
        { date: '2025/03/19 23:34' },
        { date: '2025/03/19 21:41' },
    ];

    const toggleItemSelection = (index: number) => {
        setSelectedItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === historyData.length) {
            setSelectedItems([]); // Nužymėti visus
        } else {
            setSelectedItems(historyData.map((_, index) => index)); // Pažymėti visus
        }
    };

    const confirmDelete = () => {
        if (selectedItems.length === 0) return;
        Alert.alert(
            'Patvirtinti',
            'Ar tikrai norite ištrinti pasirinktus įrašus?',
            [
                {
                    text: 'Ne',
                    style: 'cancel',
                },
                {
                    text: 'Taip',
                    onPress: () => {
                        console.log('🗑️ Ištrinti šiuos indeksus:', selectedItems);
                        setSelectedItems([]);
                        setSelectionMode(false);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 32,
                    paddingBottom: 32,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Box className="flex-row justify-between mb-8">
                    {/* Kairys mygtukas */}
                    <TouchableOpacity
                        onPress={() => {
                            if (selectionMode) {
                                setSelectionMode(false);
                                setSelectedItems([]);
                            } else {
                                navigation.goBack();
                            }
                        }}
                    >
                        <Icon
                            name={selectionMode ? 'close' : 'arrow-back'}
                            size={35}
                            color="black"
                        />
                    </TouchableOpacity>

                    {/* Dešinys mygtukas */}
                    <TouchableOpacity
                        onPress={() => {
                            if (!selectionMode) {
                                setSelectionMode(true);
                            } else {
                                confirmDelete();
                            }
                        }}
                    >
                        <Icon
                            name={selectionMode ? 'check' : 'delete'}
                            size={35}
                            color="black"
                        />
                    </TouchableOpacity>
                </Box>

                {/* Title */}
                <Text className="text-3xl font-bold text-center mb-4">Mano Istorija</Text>

                {/* Žymėti visus – checkbox + tekstas */}
                {selectionMode && (
                    <TouchableOpacity
                        onPress={toggleSelectAll}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: '#333',
                                backgroundColor:
                                    selectedItems.length === historyData.length ? '#333' : 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 8,
                            }}
                        >
                            {selectedItems.length === historyData.length && (
                                <Icon name="check" size={16} color="white" />
                            )}
                        </View>
                        <Text className="text-base font-medium text-black">Žymėti visus</Text>
                    </TouchableOpacity>
                )}

                {/* History Records */}
                {historyData.map((item, index) => {
                    const isSelected = selectedItems.includes(index);
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleItemSelection(index)}
                            activeOpacity={1}
                        >
                            <Box
                                className="flex-row justify-between items-center mb-3"
                                style={{
                                    borderWidth: 1,
                                    borderColor: isSelected ? 'black' : 'gray',
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 10,
                                }}
                            >
                                <Text className="text-lg font-medium text-left">{item.date}</Text>

                                <Box className="flex-row items-center space-x-3">
                                    {/* PDF Download button */}
                                    <TouchableOpacity
                                        activeOpacity={selectionMode ? 1 : 0.8}
                                        className="px-6 py-3 rounded-full"
                                        disabled={selectionMode}
                                        style={{
                                            backgroundColor: selectionMode ? '#555555' : '#333333',
                                        }}
                                    >
                                        <Text className="text-white text-base font-medium">
                                            Parsisiųsti PDF
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Round Checkbox */}
                                    {selectionMode && (
                                        <TouchableOpacity
                                            onPress={() => toggleItemSelection(index)}
                                            style={{
                                                marginLeft: 10,
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: '#333',
                                                backgroundColor: isSelected ? '#333' : 'transparent',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {isSelected && (
                                                <Icon name="check" size={16} color="white" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </Box>
                            </Box>
                        </TouchableOpacity>
                    );
                })}

                {/* Patvirtinimo veiksmas */}
                {selectionMode && selectedItems.length > 0 && (
                    <TouchableOpacity
                        onPress={confirmDelete}
                        style={{
                            marginTop: 20,
                            backgroundColor: 'black',
                            paddingVertical: 12,
                            borderRadius: 10,
                        }}
                    >
                        <Text className="text-white text-center text-base font-semibold">
                            Ištrinti pažymėtus įrašus
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyHistory;
