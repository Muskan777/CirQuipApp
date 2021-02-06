import React from 'react';
import {SafeAreaView, Image, StyleSheet, View, Text, Dimensions} from 'react-native'

export default function SignUp1() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/asset1.png")}></Image>
                <Text style={styles.title}>CirQuip</Text>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // height: Dimensions.get('window').height,
        // flexDirection: 'column',
        marginTop : 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 200,
    },
    title: {
        color: "rgba(54, 181, 165, 1)",
        fontSize: 34,
        fontWeight: "400",
        // fontFamily: "Baskerville Old Face",
        marginBottom: 30,
    }
})