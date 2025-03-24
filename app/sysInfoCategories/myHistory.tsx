import React, { useEffect, useState } from 'react';
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
import { useHistoryStore } from '../../store/useHistoryStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generatePDF } from '../../utils/pdfRezult';
import { translateStandalone as translate } from '@/contexts/TranslationContext';
const MyHistory: React.FC = () => {
    const navigation = useNavigation();
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const historyRecords = useHistoryStore((state) => state.historyRecords);
    const loadHistory = useHistoryStore((state) => state.loadHistory);
    const setHistoryRecords = useHistoryStore.setState;

    useEffect(() => {
        loadHistory();
    }, []);

    const toggleItemSelection = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === historyRecords.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(historyRecords.map((item) => item.id));
        }
    };

    const confirmDelete = () => {
        if (selectedItems.length === 0) return;

        Alert.alert(
            'Patvirtinti',
            'Ar tikrai norite ištrinti pasirinktus įrašus?',
            [
                { text: 'Ne', style: 'cancel' },
                {
                    text: 'Taip',
                    onPress: async () => {
                        const remaining = historyRecords.filter(
                            (record) => !selectedItems.includes(record.id)
                        );

                        setHistoryRecords({ historyRecords: remaining });
                        await AsyncStorage.setItem('historyRecords', JSON.stringify(remaining));

                        setSelectedItems([]);
                        setSelectionMode(false);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleDownloadPDF = async (item: typeof historyRecords[number]) => {
        try {
            await generatePDF(
                item.recommendedProduct.productName,
                '',
                item.answers
            );
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 20,
                        paddingTop: 32,
                        paddingBottom: selectionMode && selectedItems.length > 0 ? 100 : 32, // extra space if delete button is shown
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Box className="flex-row justify-between mb-8">
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
 
                        {!selectionMode && historyRecords.length > 0 && (
                            <TouchableOpacity onPress={() => setSelectionMode(true)}>
                                <Icon name="delete" size={35} color="black" />
                            </TouchableOpacity>
                        )}
                    </Box>
 
                    <Text className="text-3xl font-bold text-center mb-4">
                        {translate('myHistory')}
                    </Text>
 
                    {historyRecords.length === 0 ? (
                        <Text className="text-lg text-center text-gray-500 mt-10">
                            {translate('emptyHistory')}
                        </Text>
                    ) : (
                        <>
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
                                                selectedItems.length === historyRecords.length ? '#333' : 'transparent',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 8,
                                        }}
                                    >
                                        {selectedItems.length === historyRecords.length && (
                                            <Icon name="check" size={16} color="white" />
                                        )}
                                    </View>
                                    <Text className="text-base font-medium text-black">
                                        {translate('markAll')}
                                    </Text>
                                </TouchableOpacity>
                            )}
 
                            {historyRecords.map((item) => {
                                const isSelected = selectedItems.includes(item.id);
                                let formattedDate = 'Nežinoma data';
 
                                try {
                                    const date = new Date(item.timestamp);
                                    if (!isNaN(date.getTime())) {
                                        const pad = (n: number) => n.toString().padStart(2, '0');
                                        const yyyy = date.getFullYear();
                                        const mm = pad(date.getMonth() + 1);
                                        const dd = pad(date.getDate());
                                        const hh = pad(date.getHours());
                                        const min = pad(date.getMinutes());
                                        formattedDate = `${yyyy}/${mm}/${dd} ${hh}:${min}`;
                                    }
                                } catch (e) {
                                    console.warn(`Invalid date format for record ID ${item.id}`);
                                }
 
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => toggleItemSelection(item.id)}
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
                                            <Box
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                }}
                                            >
                                                {selectionMode && (
                                                    <TouchableOpacity
                                                        onPress={() => toggleItemSelection(item.id)}
                                                        style={{
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
                                                <Text className="text-lg font-medium text-left">{formattedDate}</Text>
                                            </Box>
 
                                            <TouchableOpacity
                                                onPress={() => handleDownloadPDF(item)}
                                                activeOpacity={selectionMode ? 1 : 0.8}
                                                className="px-6 py-3 rounded-full"
                                                disabled={selectionMode}
                                                style={{
                                                    backgroundColor: selectionMode ? '#555555' : '#333333',
                                                }}
                                            >
                                                <Text className="text-white text-base font-medium">
                                                    {translate('historyPDF')}
                                                </Text>
                                            </TouchableOpacity>
                                        </Box>
                                    </TouchableOpacity>
                                );
                            })}
                        </>
                    )}
                </ScrollView>
 
                {/* Delete Button Outside ScrollView */}
                {selectionMode && selectedItems.length > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'white', // This makes the area opaque white
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderColor: '#ccc',
                        }}
                    >
                        <TouchableOpacity
                            onPress={confirmDelete}
                            activeOpacity={0.85}
                            style={{
                                backgroundColor: '#18181B',
                                borderRadius: 12,
                                paddingVertical: 12,
                                alignItems: 'center',
                              }}
                        >
                            <Text className="text-white text-center text-base font-semibold">
                                {translate('deleteSelectedRecords')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
 
            </View>
        </SafeAreaView>
    );
};

export default MyHistory;
