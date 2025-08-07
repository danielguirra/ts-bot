import { translate } from '@vitalets/google-translate-api';

export const translateText = async (text: string, language?: string) => {
   if (!language) {
      language = 'pt';
   }

   const result = await translate(text, { to: language });
   return result;
};
