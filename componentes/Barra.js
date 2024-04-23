import React from 'react'
import { Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';


const Barra = ({navigation,route}) => {

    const handlePress = () =>{
        navigation.navigate("NuevoCliente",{ cliente: null })
    }

  return (
    <Button
    icon={() => <Ionicons name="add-circle-outline" size={30} color="white" />}
   
    onPress={() => handlePress()}
    >

    </Button>
  )
}

export default Barra
