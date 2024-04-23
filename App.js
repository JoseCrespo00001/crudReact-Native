import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


//importamo todo lo que necesitamos para react navigation 
import{ NavigationContainer }from '@react-navigation/native'
import  { createStackNavigator } from '@react-navigation/stack'
import Inicio from './view/Inicio';
import NuevoCliente from  './view/NuevoCliente';
import DetallesCliente from  './view/DetallesCliente';
import Barra from   './componentes/Barra'

// importamos de  los frameworks ui paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack =  createStackNavigator();

// definir tema de nuestro diseño
const theme= {
    ...DefaultTheme,
     colors:{
         ...DefaultTheme.Colors,
         primary: '#1F9683', // color del boton y fondo
         accent:'#f4c27d',   //color de la letra del texto
     },
}





export default function App() {
  return (
    
    <>
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle:{
          backgroundColor: theme.colors.primary
        },
        headerTintColor: theme.colors.accent,
        headerTitleStyle:{
          fontWeight: "bold",
          fontSize: 20
        }
      }}
      >
        <Stack.Screen 
          name= "Inicio" 
          component={Inicio}
          options={({navigation,route}) => ({
            headerLeft: (props) => <Barra {...props}
            navigation={navigation}
            route={route}
            />
          })}
        />

        <Stack.Screen 
        name= "NuevoCliente" 
        component={NuevoCliente}
        options={{
          title:"Nuevo Cliente"
        }}
        />

        <Stack.Screen name= "DetallesCliente" component={DetallesCliente}/>

        
      </Stack.Navigator>
    </NavigationContainer>
    
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
