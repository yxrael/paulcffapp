import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const WhiteLogo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
                source={ require('../../assets/logoChava.png')}
                style={{
                    width: 300,
                    height: 106
                }}
            />
        </View>
    );
}