import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { InicioScreen } from './src/screens/InicioScreen';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';
import { MyDrawer } from './src/navigators/Drawer';

const AppState = ( {children}: any) => {
  return (
    <AuthProvider>
      <ProductProvider>
        { children }
      </ProductProvider>
    </AuthProvider>
  )
  
}


const App = () => {

  return (
    <NavigationContainer>
      <AppState>
        {/* <InicioScreen /> */}
        <MyDrawer />
      </AppState>
    </NavigationContainer>
  );
}


export default App;