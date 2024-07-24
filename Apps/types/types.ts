// types.ts (or any appropriate file for type definitions)

export type RootStackParamList = {
    Home: undefined;
    'Item-List': { category: string; id: string };
    'ProductScreen': { subcategoryId: string, subcategoryName: string}; 
  };
  