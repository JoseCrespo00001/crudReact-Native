import React,{useState, useEffect} from 'react'
import {Text, View, StyleSheet} from "react-native"
import {TextInput,Headline,Button} from "react-native-paper"
import Global from '../styles/Global'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';



const NuevoCliente = ({navigation,route}) => {

   

    //campos de formularios y los use state
    const [nombre,setNombre] = useState("")
    const [empresa, setEmpresa] = useState("") 
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")


    // dectectamos si estamos editando un cliente o si guardando
    useEffect(() => {
        //tambien se podia hacer de esta manera con ditruction
        

        if(route.params.cliente){
            const {nombre,telefono,correo,empresa} = route.params.cliente
            setNombre(nombre)
            setEmpresa(empresa)
            setCorreo(correo)
            setTelefono(telefono)
        }
    },[])


    
// almacenamos el cliente en la base de datos
    const guardarCliente = async () => {
        //validar
        if(nombre === ""  || empresa === ""){
            alert ("Faltan campos por llenar");
            return;
        }
        //generar cliente

        const cliente = {
            nombre,telefono,correo,empresa
        }

        // vamos a ver si estamos editando o guardando
        if(route.params.cliente){
            const {id} = route.params.cliente;
            cliente.id = id;
            const url = `http://localhost:3000/clientes/${id}`
            try {
                await axios.put(url, cliente)
            } catch (error) {
                console.log("ERROR")
            }
        }else{
            //guardar cliente en la API
            await axios.post('http://localhost:3000/clientes',cliente)
        }
        
        //redireccionar
        navigation.navigate('Inicio');


        //limpiar el form
        setNombre("");
        setCorreo("");
        setEmpresa("");
        setTelefono("")
    }


  return (
    <View style = {Global.contenedor}>
        <Headline style = {Global.titulo}> Añadir Nuevo cliente</Headline>

        <TextInput
            label = "Nombre"
            placeholder='Jose'
            onChangeText={(texto) => setNombre(texto)}
            value={nombre}
            style = {styles.input}
        />

        <TextInput
            label = "Telefono"
            placeholder='351333333'
            onChangeText={(texto) => setTelefono(texto)}
            value={telefono}
            style = {styles.input}
        />
        <TextInput
            label = "Correo"
            placeholder='@gmail.com'
            onChangeText={(texto) => setCorreo(texto)}
            value={correo}
            style = {styles.input}
        />
        <TextInput
            label = "Empresa"
            placeholder=''
            onChangeText={(texto) => setEmpresa(texto)}
            value= {empresa}
            style = {styles.input}
        />

        <Button
        icon={() => <Ionicons name="checkmark-circle-outline" size={30} color={"#1F9683"} />}
        mode='contained'
        onPress={() => guardarCliente()}
        style ={styles.btn}
        >
            Guardar Cliente
        </Button>
        

    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:30,
        backgroundColor:"transparent",
        marginHorizontal:40
    },
    btn:{
        padding:5,
        marginHorizontal:40,
        marginTop:50
    }
})

export default NuevoCliente
