import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    background: string;
    text: string;
    textSecondary: string;
    primary: string;
    itemBackground: string;
    inputBackground: string;
  }
}
