import React from 'react';
import { ScrollView } from 'react-native';
import {SafeAreaView, Image, StyleSheet, View, Text,StatusBar, Dimensions , TouchableHighlight} from 'react-native';
import { Button } from 'react-native-paper';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../Search';
import { Left } from 'native-base';
const { width, height } = Dimensions.get("window");




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



export default class Post1 extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          liked: false,
          bookmark:false
        }
    
    }
    moveToAdd() {
        this.state.liked == false ? this.setState({name:'heart', liked:true}) : this.setState({name:'heart-o', liked:false})

      }
      moveToAddbookmark() {
        this.state.bookmark == false ? this.setState({name:'bookmark', bookmark:true}) : this.setState({name:'bookmark-o', bookmark:false})

      }
    render() {
        const { liked, bookmark } = this.state

    return (
        <SafeAreaView style={styles.post}>
        <Search />
            <ScrollView 
            style={{backgroundColor: 'transparent'}}
            >
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
                    
                            <Icon
                            name="heart-o"
                            color="rgba(54, 181, 165, 1)"
                            size={30}
                            liked="false"
                            onPress={() => this.moveToAdd()}
                            ></Icon>
                           
                            <Text>{info.like}</Text>
                        </View>
                        <View style={styles.like}>
                       
                            <Icon
                            name="commenting-o"
                            color="rgba(54, 181, 165, 1)"
                            size={30}
                            
                            // onPress={() => this.moveToAdd()}
                            ></Icon>
                    
                            <Text>{info.comment}</Text>
                        </View>
                        <View style={styles.like}>
                        
                            <Icon
                            name="bookmark-o"
                            color="rgba(54, 181, 165, 1)"
                            size={30}
                            bookmark='false'
                            onPress={() =>this.moveToAddbookmark()}
                            ></Icon>
                    
                            <Text>{info.bookmark}</Text>
                        </View>
                        <View style={styles.like}>
                      
                            <Icon
                            name="share-square-o"
                            color="rgba(54, 181, 165, 1)"
                            size={30}
                         
                            // onPress={() => this.moveToAdd()}
                            ></Icon>
                         
                            <Text>{info.share}</Text>
                        </View>
                    </View>
                </Card>
)
            })}
            <View>
                <Icon
                 name="bookmark"
                ></Icon>
            </View>
            </ScrollView>
            <View style={styles.bottom}>
            <View style={styles.bottomimages}>
                <View style={styles.container1}>
                <TouchableHighlight onPress={() => this.moveToAdd1()}>
                <Image style={styles.msg} source={require("../../assets/path262.png")}></Image>
                </TouchableHighlight>
                </View>
                <View style={styles.container2}>
                <TouchableHighlight onPress={() => this.moveToAdd2()}>
                <Image style={styles.plus} source={require("../../assets/plus.png")}></Image>
                </TouchableHighlight>
                </View>
                <View style={styles.container3}>
                <TouchableHighlight onPress={() => this.moveToAdd3()}>
                <Image style={styles.message}source={require("../../assets/path262.png")}></Image>
                </TouchableHighlight>
                </View>
            </View>
        </View>
            
        </SafeAreaView>
        
    )
}}


const styles = StyleSheet.create({
    box:{
        width:width,
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
        width:width,
        padding:5,
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 5,
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
        // backgroundColor:'blue',
        position:'relative',
        // paddingBottom:30,
    },
    bottomimages:{
       
    },
    plus:{
        height:90,
        width:90,
      
    },
    msg:{
      
    },

    message:{
    },
    container1:{
        width: 70,
        height:70,
        padding:10,
        margin:10,
        // borderRadius:40,
        position:'absolute',
        left:10,
        bottom:5,
        borderRadius: 35,
        backgroundColor:'white'
    },
    container2:{
        height:90,
        width:90,
        borderRadius: 45,
        backgroundColor:'white',
        position:'absolute',
        right:width/2-45,
        bottom:55,
        paddingBottom:40,
    },
    container3:{
        width: 70,
        height:70,
        padding:10,
        margin:10,
        // borderRadius:40,
        position:'absolute',
        right:10,
        bottom:5,
        borderRadius: 35,
        backgroundColor:'white'
    },

})