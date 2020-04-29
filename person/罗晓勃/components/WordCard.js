import React, { Component } from 'react'
import { Text, View, StyleSheet ,TouchableOpacity,Dimensions,TextInput, Alert, ScrollView} from 'react-native'
import { Actions, Scene } from 'react-native-router-flux';
// import { Icon } from '@ant-design/react-native';
import { Button, Icon } from '@ant-design/react-native';
import Sound from 'react-native-sound';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;

// let musciPath='https://v.ylapi.cn/img/api/api_reciteword_word_list/492850dde8ca9392.mp3';
// var music=new Sound(musciPath,null,(err)=>{
//     if(err){
//         Alert.alert('播放失败');
//     }
// })
export default class WordCard extends Component {
    constructor(){
        super();
        this.state={
            course:1,
            data:[],
            name:[]
        }
    }
    componentDidMount(){
        fetch('http://129.211.62.80:8080/word/show')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res.content,
            })
        })
    }
    componentWillUpdate(){
        fetch('http://129.211.62.80:8080/word/show')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res.content
            })
        })
    }
    next=()=>{
        var course1=this.state.course+1
        this.setState({
            course:course1,
            
        })

        console.log(20)
        const post ={
            id:this.state.course,
            // name:
        }
        fetch('http://129.211.62.80:8080/word/add',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(post),
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(res=>{
            console.log(res);
            console.log(res.id)
        }).catch((err)=>{
            console.error(err);
        })
    }
    donot=()=>{
        console.log('不认识')
        Actions.detail();
    }
    play=(name)=>{
        console.log(100)
        let musciPath='http://dict.youdao.com/dictvoice?audio='+'opponent';
        var music=new Sound(musciPath,null,(err)=>{
            if(err){
                console.log(1)
            }
        })
        music.play();
    }
    render() {
        return (
            <View style={{backgroundColor:'#fff',width:'100%',height:800}}>
                <View style={{height:55,width:'100%',backgroundColor:'#8a8a8a',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Icon name='left' style={{marginLeft:15}}  color="#fff" onPress={()=>{Actions.pop()}} />
                    <Text style={{color:'#fff',fontSize:23}}>单词</Text>
                    <Icon name='ellipsis' size={35} color="#fff" style={{marginRight:15}}/>
                </View>
                <ScrollView>
                <View style={styles.content}>
                    {
                        this.state.data.map((item)=>{
                            return (
                                <View style={styles.main}>
                                    <Text style={styles.word} >{item.name}</Text>
                                    <View style={{flexDirection:'row',width:'100%',marginTop:30,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.play()}>
                                        <Icon name='sound' style={styles.icon} color="#8a8a8a" size={25}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:20,color:'#8a8a8a',marginLeft:5}}>{item.symbol}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.footer}>
                    <Button style={styles.button} onPress={this.next}>
                        <Text style={styles.text}>我认识</Text>
                    </Button>
                    <Button style={styles.button1} onPress={this.donot}>
                        <Text style={styles.text}>不认识</Text>
                    </Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    header:{
        width:width,
        height: 70*s,
        // borderBottomColor: 'red',
        backgroundColor:'#fff',
        borderBottomWidth: 1/3,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    search:{
        width: 525*s,
        height: 50*s,
        // backgroundColor: '#fbb8b8',
        borderRadius:25*s,
        borderWidth:1,
        borderColor:'gray',
        flexDirection: 'row',
        alignItems: 'center'
    },
    back:{
        // width:20*s,
        // height:70*s,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    content:{
        width:'100%',
        height:150,
        overflow:'hidden',
        backgroundColor:'#fff',
        marginTop:50
    },
    main:{
        width:'100%',
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    word:{
        fontSize:40
    },
    footer:{
        width:'100%',
        height:120,
        marginTop:400*s,
        backgroundColor:'#fff',
        alignItems:'center',
    },
    button:{
        width:'80%',
        height:50,
        borderRadius:20,
        backgroundColor:'#8a8a8a'
    },
    button1:{
        width:'80%',
        height:50,
        marginTop:10,
        borderRadius:20,
        backgroundColor:'red'
    },
    text:{
        color:'#fff'
    }
})