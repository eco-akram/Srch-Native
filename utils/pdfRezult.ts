import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { Platform, Alert } from 'react-native';
import { useSync } from '../hooks/useSync';
import { useAnswerStore } from '../store/useAnswerStore';
import { showToast } from '../components/Toast/showToast';

export const generatePDF = async (
  name: string,
  description: string,
  userAnswers?: Record<string, any>
) => {
  try {
    const { data } = useSync.getState();
    const categories = data['Categories'] || [];
    const products = data['Products'] || [];
    const productAnswers = data['Product_Answers'] || [];
    const answersFromDb = data['Answers'] || [];
    const questions = data['Questions'] || [];

    const userSelections = userAnswers || useAnswerStore.getState().answers || {};

    const recommendedProduct = products.find(
      (product) => product?.productName === name
    );
    if (!recommendedProduct) {
      console.error(`❌ Recommended product not found: ${name}`);
      return;
    }

    const htmlContent = `
    <html>
      <body>
        <h1 style="text-align: center;">Recommendation For You</h1>
        <table border="1" style="width:100%; border-collapse: collapse; text-align: center; margin-bottom: 50px;">
          <tr>
            <th>Category & Question</th>
            <th>${name}</th>
            <th>User Selection</th>
          </tr>
          ${categories
            .map(
              (category) => `
            <tr>
              <td colspan="3" style="background-color: #ddd; font-weight: bold;">
                ${category?.categoryName || 'Unknown Category'}
              </td>
            </tr>
            ${questions
              .filter((q) => q?.categoryId === category?.id)
              .map(
                (question) => `
              <tr>
                <td colspan="3" style="background-color: #eee; font-style: italic;">
                  ${question?.questionText || 'No Question Text'}
                </td>
              </tr>
              ${answersFromDb
                .filter((ans) => ans?.questionsId === question?.id)
                .map((answer) => {
                  const selectedIds = userSelections[question?.id?.toString()];
                  const isSelected =
                    Array.isArray(selectedIds) &&
                    selectedIds.map(String).includes(answer?.id?.toString());
                  const selectedText = isSelected ? '✔️' : '';

                  const recommendedProductSupports = productAnswers.some(
                    (pa) =>
                      pa.productId === recommendedProduct?.id &&
                      pa.answerId === answer.id
                  )
                    ? '✔️'
                    : '❌';

                  return `
                    <tr>
                      <td>${answer?.answerText || 'No Answer Text'}</td>
                      <td>${recommendedProductSupports}</td>
                      <td>${selectedText}</td>
                    </tr>
                  `;
                })
                .join('')}
            `
              )
              .join('')}
          `
            )
            .join('')}
        </table>

        <h1 style="text-align: center;">Product Comparison Report</h1>
        <table border="1" style="width:100%; border-collapse: collapse; text-align: center;">
          <tr>
            <th>Category & Question</th>
            ${products
              .map(
                (product) => `<th>${product?.productName || 'Unknown Product'}</th>`
              )
              .join('')}
            <th>User Selection</th>
          </tr>
          ${categories
            .map(
              (category) => `
            <tr>
              <td colspan="${products.length + 2}" style="background-color: #ddd; font-weight: bold;">
                ${category?.categoryName || 'Unknown Category'}
              </td>
            </tr>
            ${questions
              .filter((q) => q?.categoryId === category?.id)
              .map(
                (question) => `
              <tr>
                <td colspan="${products.length + 2}" style="background-color: #eee; font-style: italic;">
                  ${question?.questionText || 'No Question Text'}
                </td>
              </tr>
              ${answersFromDb
                .filter((ans) => ans?.questionsId === question?.id)
                .map((answer) => {
                  const selectedIds = userSelections[question?.id?.toString()];
                  const isSelected =
                    Array.isArray(selectedIds) &&
                    selectedIds.map(String).includes(answer?.id?.toString());
                  const selectedText = isSelected ? '✔️' : '';

                  return `
                    <tr>
                      <td>${answer?.answerText || 'No Answer Text'}</td>
                      ${products
                        .map((product) => {
                          const hasFeature = productAnswers.some(
                            (pa) =>
                              pa.productId === product.id &&
                              pa.answerId === answer.id
                          );
                          return `<td>${hasFeature ? '✔️' : '❌'}</td>`;
                        })
                        .join('')}
                      <td>${selectedText}</td>
                    </tr>
                  `;
                })
                .join('')}
            `
              )
              .join('')}
          `
            )
            .join('')}
        </table>
      </body>
    </html>
  `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    if (uri) {
      let fileUri = FileSystem.documentDirectory + 'result.pdf';

      if (Platform.OS === 'android') {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const fileName = 'Junc.pdf';
          const base64Data = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            'application/pdf'
          );

          await FileSystem.writeAsStringAsync(fileUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          showToast('success', 'PDF buvo išsaugotas', 'Failas sėkmingai išsaugotas.');

          return;
        } else {
          showToast('error', 'PDF generavimas nepavyko', 'Nepavyko pasiekti atsisiuntimų aplanko.');
          return;
        }
      }

      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      showToast('success', 'PDF sugeneruotas', 'Failas sėkmingai išsaugotas.');
    } else {
      Alert.alert('Error', 'Failed to generate the PDF file.');
    }
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    Alert.alert('Error', 'An error occurred while generating the PDF.');
  }
};
