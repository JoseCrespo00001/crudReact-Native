import React from 'react';
import { View, StyleSheet , Alert} from 'react-native';
import { Headline, Text, IconButton,List } from 'react-native-paper';
import Global from '../styles/Global';
import axios from 'axios';

const DetallesCliente = ({ route, navigation }) => {
  // Obtén los datos del cliente de la ruta
  const { nombre, telefono, correo, empresa, id } = route.params.item;

    // Función para manejar la edición del cliente
  const handleEditarCliente = () => {
    // Navegar a la pantalla de edición con los datos del cliente
    navigation.navigate('NuevoCliente', { cliente: route.params.item });
  };

  // Función para manejar la eliminación del cliente
  const handleEliminarCliente = () => {
    Alert.alert(
      "Eliminar",
      `¿Está seguro que desea eliminar al cliente ${nombre}?`,
      [{ text: "Cancelar" }, 
      // Eliminar el cliente en la base de datos y volver a cargar la lista de clientes
      {text: "Aceptar", onPress:() => borrarCliente()}]
    )
  };

  const borrarCliente = async () =>{
    const url = `http://localhost:3000/clientes/${id}`;
    try {
      await axios.delete(url)
      
    } catch (error) {
      console.log("ERROR")
    }
    navigation.goBack();
    
  }

  return (
    <View style={Global.contenedor}>
      <View style={styles.iconoPerfil}>
        <IconButton
          icon="account-circle"
          color="#c8c8c8"
          size={160} // Tamaño del icono
          onPress={() => console.log('Icono de perfil presionado')}
        />
      </View>
      <Headline style={Global.titulo}>{nombre}</Headline>
      <View style = {styles.datos}>
        <Text style={styles.detalle}>Empresa: {empresa}</Text>
        <Text style={styles.detalle}>Teléfono: {telefono}</Text>
        <Text style={styles.detalle}>Correo: {correo}</Text>
      </View>

      {/* Botones de Edición y Eliminación */}
      <View style={styles.botonesContainer}>
        <IconButton
          icon="pencil"
          color="#007bff" // Color para el botón de edición
          onPress={handleEditarCliente}
        />
        <IconButton
          icon="delete"
          color="#dc3545" // Color para el botón de eliminación
          onPress={handleEliminarCliente}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detalle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign:"center"
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    
  },
  datos:{
    marginTop:50
  },
  iconoPerfil:{
    alignItems: 'center',
    marginTop: 50,
    
    
    
    
  }
});

export default DetallesCliente;
