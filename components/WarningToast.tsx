import React from 'react';
import { Text } from 'react-native';
import { useToast, Toast } from '@/components/ui/toast';
import { AlertTriangle } from 'lucide-react-native';

interface WarningToastProps {
  message: string; // The warning message to display
}

export const WarningToast = ({ message }: WarningToastProps) => {
  return (
    <Toast className="bg-gray-900 border border-white rounded-xl mt-5 px-5 py-6 shadow-lg flex-row items-center">
      <AlertTriangle size={20} color="white" className="mr-2" />
      <Text className="text-white font-semibold text-base">{message}</Text>
    </Toast>
  );
};