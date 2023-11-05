import { View, Text,SafeAreaView,ScrollView,Button} from 'react-native'
import React, {Component, useEffect, useState } from "react"
import HeaderTabs from '../components/HeaderTabs'
import SearchBar from '../components/SearchBar'
import CurrentPosition from '../components/CurrentPosition'
import { TouchableOpacity } from 'react-native-gesture-handler'



export default function Home({navigation}) {
 const [cityLocations,SetCity] =useState({})
 const [flag,Setflag] =useState(0)
 const [activeTab,SetActiveTab] = useState("Gezilecek Yerler");
 const [TabFlag,SetTabFlag] = useState();
 
 
 

 
 


  return (
    
    <SafeAreaView style ={{backgroundColor:"#eee",flex:1}}>
    <View style={{backgroundColor:"white",padding:5}}>
  <HeaderTabs activeTab={activeTab} SetActiveTab={SetActiveTab}></HeaderTabs>
  <SearchBar cityhandler={SetCity} flaghandler={Setflag} ></SearchBar>
  <TouchableOpacity style ={{
    backgroundColor:"green",
    paddingVertical:6,
    paddingHorizontal:16,
    borderRadius:30,
    borderWidth:2,
    marginTop:8,
		top: 2,
		right: 3,
		zIndex: 2}} 
    onPress = {()=>{
      navigation.navigate('Favorilerim')
    }}>
      <Text style = {{fontSize:15,fontWeight:"900"}}> Favorilerim</Text>  
      </TouchableOpacity>
  </View>
  <View style ={{flex:1}}>
    
    <CurrentPosition cityLocations={cityLocations} flag={flag} activeTab={activeTab} ></CurrentPosition>
  </View>
</SafeAreaView>
    
  )
}