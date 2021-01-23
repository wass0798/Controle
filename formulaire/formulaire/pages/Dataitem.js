
import React from "react";
import { FlatList,View,Image,TextInput, TouchableOpacity,StyleSheet, Alert } from "react-native";
import {Text,ListItem,Left, Body, Icon, Right,Title,thumbnail,Thumbnail,Button } from "native-base";
import Dialog, { SlideAnimation, DialogContent ,DialogTitle, DialogButton} from 'react-native-popup-dialog';
import Mesdemande from './mesdemande';
import axios from 'axios';
import Validations from './Validations';
 
export default class DataItem extends React.Component {
  constructor(){
    super();
    this.state={
        listData:[],
        error:'',
        Article:'',
        prix: '',
        quantité:'',
       
    
    }
  }

  
  getList=()=>{
   axios({
   method: 'get',
   url:'https://extendsclass.com/mock/rest/db2b4a9a08a2d052dbfca9fa0815d89a/article',//url backend service
   headers:{"Content-type":"application/json"}
   })
   .then( (response) => {
     console.log(response)
     console.log(response.status)
     console.log(response.data.data)
    this.setState({listData:response.data.data})
   })
   .catch((error)=> {
     Alert.alert('erreur')
     console.log("error",error);
   });
  }

 
renderFlatListItem(item){
 
 return(
  
         <ListItem thumbnail>
          
          <Left>
            
          <Thumbnail square source={require("./images/zara.jpg")}/>
         </Left>
         
         <Body>
            <Text numberOfLines={2}>{item.item.Article}</Text>
          
            <Text note numberOfLines={2} >Prix :{item.item.prix} DH</Text>
            <Text note numberOfLines={2} >Quantité:{item.item. quantité} </Text>
          </Body>
          <Right>
          <TouchableOpacity  style={[styles.buttonStyle, { flex: 1, flexDirection: 'row', marginTop: 40, marginLeft: 0 }]} onPress={()=>this.deleteItem(item.item.id)}><Text style={{color:'white'}}>Delet</Text></TouchableOpacity>
                 
         </Right>
        </ListItem>
        
    
    )
}

deleteItem(id){ 
 var listData=this.state.listData.slice();
 let newListdata=listData.filter(item => item.id !== id);
 this.setState({listData:newListdata})
   }

addItem(){
    const { Article,prix,quantité} = this.state;
    
    var listData=this.state.listData.slice();
    console.log({id:listData.length+1, Article: Article, prix:prix,quantité:quantité})
    axios({
      method: 'post',
      url:' https://extendsclass.com/mock/rest/db2b4a9a08a2d052dbfca9fa0815d89a/articlepost',
      headers:{"Content-type":"application/json"},
      data:{id:listData.length+1, Article: Article, prix:prix,quantité:quantité }
      })
      .then( (response) => {
        console.log(response)
        console.log(response.status)
       this.setState({listData:response.data.data})
      })
      .catch((error)=> {
        Alert.alert('erreur post')
        console.log("error",error);
      });
    
    
    
    listData.push({id:listData.length+1, Article: Article, prix:prix,quantité:quantité });
    this.setState({listData:listData})
    
}

onArticle=(value)=>{
this.setState({Article:value})
}

onPrix=(value)=>{
  this.setState({prix:value})
  }

  onQuantite=(value)=>{
    this.setState({quantité:value})
    }

 render (){
     const {listData}=this.state;
     console.log('rendering', listData)
   return(
         <React.Fragment >
          
             <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={{flex:1}}>Article:</Text>
            <TextInput style={{flex:2.5}} placeholder="Article" value={this.state.Article} underlineColorAndroid='grey'
            onChangeText={(value)=>this.onArticle(value)}></TextInput>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={{flex:1}}>Prix:</Text>
             <TextInput style={{flex:2.5}} placeholder="prix" value={this.state.prix} underlineColorAndroid='grey'
            onChangeText={(value)=>this.onPrix(value)}></TextInput>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={{flex:1}}>Quantité:</Text>
             <TextInput style={{flex:2.5}} placeholder="Quantité" value={this.state.quantité} underlineColorAndroid='grey'
            onChangeText={(value)=>this.onQuantite(value)}></TextInput>
            </View>
           
          
           <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.getList()}><Text style={{color:'white'}}>Consulter</Text></TouchableOpacity>
           <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.addItem()}><Text style={{color:'white'}}>Ajouter</Text></TouchableOpacity>
         <FlatList data={this.state.listData}
         extraData={this.state} 
         renderItem={(item)=>this.renderFlatListItem(item)}
         keyExtractor={(item,index)=>  {console.log("item:",item, index);item.id.toString();}}/>
         </React.Fragment>
   )
   }
 }

 const styles= StyleSheet.create({
   buttonStyle:{
   alignSelf: 'center',
   width:100,
   marginBottom:10,
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'green',
   height:30,
   borderWidth: 0.5,
   borderRadius: 4,
   borderColor: 'green'}
 }
 )




