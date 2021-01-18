import React from 'react'
import { SafeAreaView, Dimensions, Platform, StatusBar, View, StyleSheet, Text, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import SignUp1 from './SignUp1'

export default function SignUp3() {
    return (
        <SafeAreaView style={styles.begin}>
            <ScrollView>
            <View style={styles.container}>
                <SignUp1/>
            </View>
            <View style={styles.welcomeText}>
                <Text style={styles.text}>Welcome to CirQuip</Text>
                <Text style={styles.text}>Community</Text>
            </View>
            <View style={styles.drops}>
                <DropDownPicker
                    items={[
                        {label: 'COEP', value: 'coep'},
                        {label: 'VIT', value: 'vit'},
                        {label: 'MIT', value: 'mit'},
                    ]}
                    defaultNull
                    placeholder='Select College'
                    dropDownMaxHeight={130}
                    containerStyle={styles.dropContainer}
                    placeholderStyle={styles.placeholder}
                    dropDownStyle={styles.dropDown}
                    activeLabelStyle={styles.activeLabel}
                    activeItemStyle={styles.activeItem}
                    style={styles.picker}
                    labelStyle={styles.label}
                    arrowColor='white'
                    arrowSize={30}
                    onChangeItem={item=> console.log(item.label, item.value)}
                />
                <DropDownPicker
                    items={[
                        {label: 'Student', value: 'student'},
                        {label: 'Professor', value: 'professor'},
                    ]}
                    defaultNull
                    placeholder='Category'
                    dropDownMaxHeight={130}
                    containerStyle={styles.dropContainer}
                    placeholderStyle={styles.placeholder}
                    dropDownStyle={styles.dropDown}
                    activeItemStyle={styles.activeItem}
                    activeLabelStyle={styles.activeLabel}
                    style={styles.picker}
                    labelStyle={styles.label}
                    arrowColor='white'
                    arrowSize={30}
                    onChangeItem={item=> console.log(item.label, item.value)}
                />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    activeItem:{
        fontWeight: 'bold',
        backgroundColor: 'rgba(54, 181, 165, 1)',
    },
    activeLabel:{
        color: '#fff'
    },
    begin: {
       paddingTop: Platform.OS === "android" ?  StatusBar.currentHeight : 0,
    },
    container: {
        marginTop: 20,
        height: Dimensions.get('screen').height / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropContainer:{
        marginHorizontal: 65,
        height: 50,
        marginBottom: 150,
        alignItems: 'center'
    }, 
    dropDown:{
        width: 275,
    },
    drops: {
        marginTop: 20,
    },
    label: {
        color: 'rgba(44, 101, 109, 1)',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'Segoe UI',
        lineHeight: 18,
    },
    picker: {
        backgroundColor: "rgba(44, 101, 109, 0.9)",
    },
    placeholder: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 28,
    },
    text:{
        marginTop: 10,
        fontSize: 23,
        fontWeight: '400',
        fontFamily: 'Segoe UI',
        color: 'rgba(44, 101, 109, 1)',
    },
    welcomeText:{
        width: '100%',
        alignItems: 'center',
        marginBottom: 70
    }
})