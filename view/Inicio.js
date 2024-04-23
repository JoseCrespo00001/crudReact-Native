import React,{useEffect, useState} from 'react'
import { Text, View , FlatList, StyleSheet} from 'react-native'
import axios from 'axios'
import { List,Headline , Button, FAB} from 'react-native-paper'
import Global from '../styles/Global'
import { useNavigation } from '@react-navigation/native'; 



const Inicio = () => {

  const [clientes, guardarClientes] = useState("")
  const [consultarApi, guardarConsultarApi] = useState(true)
  const navigation = useNavigation();

  
  const obtenerClientesApi = async () => {
    try {
      const resultado = await axios.get('http://localhost:3000/clientes')
      guardarClientes(resultado.data)
      
    } catch (error) {
      console.log("ERROR")
    }
  }
  obtenerClientesApi()

  // // Consultar la API cada 30 segundos (30000 milisegundos)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     obtenerClientesApi();
  //   }, 30000); // Consultar cada 30 segundos

  //   return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  
  //   if(consultarApi){
  //     obtenerClientesApi()
      
  //   }
  // }, [consultarApi]);





  return (
    <View style = {Global.contenedor}>
      <Headline
      style ={Global.titulo}>{ clientes.length > 0 ? "Clientes" : "No hay Clientes"}</Headline>
      <FlatList
        data={clientes}
        keyExtractor={cliente => cliente.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            left={(props) => (
              <List.Icon {...props} icon="account" />
            )}
            right={(props) => (
              <View style={styles.rightContainer}>
                <List.Icon {...props} icon="email" />
                <List.Icon {...props} icon="phone" />
              </View>
            )}
            onPress={() => navigation.navigate("DetallesCliente",{item})}
            style={styles.item}
          />
        )}
      />
      <FAB
        icon ="plus"
        style = {styles.fab}
        onPress ={ () => navigation.navigate("NuevoCliente",{ cliente: null })}
      />

    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  fab:{
    position:"absolute",
    margin:20,
    right:30,
    bottom:40,
    backgroundColor: "#A2D5C9", // Verde claro
    borderRadius: 30, // O cualquier otro valor para ajustar la forma del botón flotante
    elevation: 4, // Para darle una sombra sutil
  }
});

export default Inicio
