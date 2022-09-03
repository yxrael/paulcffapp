import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

// interface Props extends StackScreenProps<any, any> {}


export const LoginScreen = ( { navigation }: any) => {

    const { signIn, errorMessage, removeError } = useContext( AuthContext );

     const {email, password, onChange }= useForm({
        email: '',
        password: ''
     });

     useEffect(() => {
       const usuarioRegistrado = getData();

       console.log('from storage');
       console.log( usuarioRegistrado );
     }, [])
     

     useEffect(() => {
       if(errorMessage.length === 0) return;

        // onChange( '', 'email');
        // onChange( '', 'password');

       Alert.alert(
        'Login incorrecto', 
        errorMessage,
        [
            {
                text: 'Ok',
                onPress: removeError
            }
        ] 
        );

     }, [errorMessage]);    

     const onLogin = () => {
        Keyboard.dismiss();
        signIn({ correo: email, password });
     }

     
    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@usuario')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        // if(jsonValue !== null) {
        //     // value previously stored
        //     return jsonValue
        //   }
        } catch(e) {
        // error reading value
        console.log(e);
        }
    }
  

    return (
        <>
            {/* Background */}
            <Background />

            {/* <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            > */}

                <View style={ loginStyles.formContainer }>
                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Login</Text>

                    <Text style={ loginStyles.label }>Email</Text>
                    <TextInput 
                        placeholder='Introduce tu email'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='black'
                        style={[
                            loginStyles.inputField,
                            ( Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        
                        onChangeText={ (value) => onChange( value, 'email')}
                        value={ email }
                        onSubmitEditing={ onLogin }

                        autoCapitalize='none'
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Contraseña</Text>
                    <TextInput 
                        placeholder='*****'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        underlineColorAndroid='black'
                        secureTextEntry
                        style={[
                            loginStyles.inputField,
                            ( Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        
                        onChangeText={ (value) => onChange( value, 'password')}
                        value={ password }
                        onSubmitEditing={ onLogin }

                        autoCapitalize='none'
                        autoCorrect={ false }
                    />

                   

                    {/* Botón login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onLogin }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}
                    {/* <View style={ loginStyles.newUserContainer}>
                        <TouchableOpacity 
                            activeOpacity={ 0.8}
                            onPress={ () => navigation.replace('RegisterScreen')}
                        >
                            <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>

                        </TouchableOpacity>

                    </View> */}




                </View>

            {/* </KeyboardAvoidingView> */}
            

        </>
    );
}

