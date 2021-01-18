import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default function Search() {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Icon name='ios-menu' size={34} color='#36b5a5'/>
                <TextInput style={{width: '100%', marginLeft: 10, fontSize: 20}} placeholder="Search"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar:{
        height: 55,
        width: '95%',
        borderWidth: 0,
        marginTop: 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#36b5a5",
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 80,
        },
        shadowRadius: 6,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    searchContainer:{
        alignItems: 'center',
        height: 60,
    }
})