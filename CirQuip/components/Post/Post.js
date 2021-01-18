import React from 'react';
import { ScrollView } from 'react-native';
import {SafeAreaView, Image, StyleSheet, View, Text,StatusBar , TouchableHighlight} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/AntDesign';
import Search from '../Search';




const info =[
{
    name:'Aniket Jha',
    about:'student at college of engineering , Pune',
    infos:'Hello guy, I am sharing one of my recent project in CTIS (Central Tyre Inflation System) I am designed the rotary Union and need someone with knowledge of electronics and controller. I need t program the the pressure signal in such a way that thepump...see more',
    dp:require("../../assets/ellipse1adfd341c.png"),
    postimg:require("../../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png"),
    time:'05:49 pm ',
    date:'15 Jan 2019',
    like:'58',
    comment:'30',
    bookmark:'2',
    share:'2'
},
{
    name:'Smrita Bhatt',
    about:'student at college of engineering , Pune',
    infos:'Hello guy, I am sharing one of my recent project in CTIS (Central Tyre Inflation System) I am designed the rotary Union and need someone with knowledge of electronics and controller. I need t program the the pressure signal in such a way that thepump...see more',
    dp:require("../../assets/ellipse1adfd341c.png"),
    postimg:require("../../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png"),
    time:'05:49 pm ',
    date:'15 Jan 2019',
    like:'58',
    comment:'30',
    bookmark:'2',
    share:'2'
},
{
    name:'Aniket Jha',
    about:'student at college of engineering , Pune',
    infos:'Hello guy, I am sharing one of my recent project in CTIS (Central Tyre Inflation System) I am designed the rotary Union and need someone with knowledge of electronics and controller. I need t program the the pressure signal in such a way that thepump...see more',
    dp:require("../../assets/ellipse1adfd341c.png"),
    postimg:require("../../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png"),
    time:'05:49 pm ',
    date:'15 Jan 2019',
    like:'58',
    comment:'30',
    bookmark:'2',
    share:'2'
},
{
    name:'Aniket Jha',
    about:'student at college of engineering , Pune',
    infos:'Hello guy, I am sharing one of my recent project in CTIS (Central Tyre Inflation System) I am designed the rotary Union and need someone with knowledge of electronics and controller. I need t program the the pressure signal in such a way that thepump...see more',
    dp:require("../../assets/ellipse1adfd341c.png"),
    postimg:require("../../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png"),
    time:'05:49 pm ',
    date:'15 Jan 2019',
    like:'58',
    comment:'30',
    bookmark:'2',
    share:'2'
},
]



export default function Post1() {

    

    return (
        <SafeAreaView style={styles.post}>
        <Search />
            <ScrollView>
            {info.map((info, key) => {

            return (
                <Card style={styles.box} 
                    scrollEnabled={true}
                >
                
                    <View style = {styles.container}>
                        <Image source={info.dp}></Image>
                        <View style={styles.about}>
                        <Text style={styles.name}>{info.name}</Text>
                        <Text>{info.about}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text> {info.infos}</Text>
                    </View>
                    <View style={styles.postimage}>
                        <Image style={styles.img} source={info.postimg}></Image>
                    </View>
                    <View style={styles.datetime}>
                    <Text style={styles.time}>{info.time}</Text>
                    <Image styel={styles.dot} source={require("../../assets/path261.png")}></Image>
                    <Text style={styles.date}>{info.date}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
                    </View>
                    <View style={styles.response}>
                        <View style={styles.like}>
                        <TouchableHighlight onPress={() => this.moveToAdd()}>
                            <Image style={styles.likeimg} source={require("../../assets/path243.png")}></Image>
                            </TouchableHighlight>
                            <Text>{info.like}</Text>
                        </View>
                        <View style={styles.like}>
                        <TouchableHighlight onPress={() => this.moveToAdd()}>
                            <Image source={require("../../assets/path227dcc55359.png")}></Image>
                            </TouchableHighlight>
                            <Text>{info.comment}</Text>
                        </View>
                        <View style={styles.like}>
                        <TouchableHighlight onPress={() => this.moveToAdd()}>
                            <Image source={require("../../assets/path216f57cb052.png")}></Image>
                            </TouchableHighlight>
                            <Text>{info.bookmark}</Text>
                        </View>
                        <View style={styles.like}>
                        <TouchableHighlight onPress={() => this.moveToAdd()}>
                            <Image source={require("../../assets/path2385c2774f6.png")}></Image>
                            </TouchableHighlight>
                            <Text>{info.share}</Text>
                        </View>
                    </View>
                </Card>
)
            })}
            </ScrollView>
            <View style={styles.bottom}>
            <View style={styles.bottomimages}>
            <TouchableHighlight onPress={() => this.moveToAdd1()}>
                <Image style={styles.msg} source={require("../../assets/path262.png")}></Image>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.moveToAdd2()}>
                <Image style={styles.plus} source={require("../../assets/plus.png")}></Image>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.moveToAdd3()}>
                <Image style={styles.message}source={require("../../assets/path262.png")}></Image>
                </TouchableHighlight>
            </View>
        </View>
        </SafeAreaView>
        
    )
}


const styles = StyleSheet.create({
    box:{
        width:'98%',
        alignContent:'center',
        // height:700,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        padding:10,
        backgroundColor:'transparent',


    },

    container : {
        height: 90,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        backgroundColor: 'transparent'
        // backgroundColor: 'yellow',
    },

    name:{
        color: 'black',
        fontSize: 20,
    },
    about : {
        margin:10,
        backgroundColor: 'white',
    },
    info:{
        padding:5,
    },
    postimage : {
        marginTop:10,
        width: '100%',
        overflow: 'hidden',
   
    },
    img : {
        height: 350,
        width: 380,
        borderRadius:20,
    },
    datetime:{
        flexDirection:'row',
        margin:15,
        
    },
    time:{
        marginRight:10,
    },
    dot:{
        marginTop:10,
        marginBottom:10,
        padding:10,
        height:10,
        width:10,
    },
    date:{
        marginLeft:10,
    },
    response:{
        margin:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        
    },
    like:{
        width:'25%',
        flexDirection: 'row',
        justifyContent:'space-around',
        
    },
    // likeimg:{
    //     width:25,
    //     height:25,
    // }

    post:{
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor:'transparent',
    },

    bottom:{
        backgroundColor:'transparent',
    },
    bottomimages:{
        flexDirection:'row',
        justifyContent:'space-around',
        // opacity:1,
        // backgroundColor:'black',
        
        

    },
    plus:{
        height:70,
        width:70,
        borderRadius: 70/2,
        backgroundColor:'transparent',
       
        // marginBottom:50,
    },
    msg:{
        // height:70,
        // width:70,
    
        borderRadius: 5,
        backgroundColor:'transparent'
    },

    message:{
        backgroundColor:'transparent'
    }

})