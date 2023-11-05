import { View, Text } from 'react-native'
import React, {Component, useEffect, useState } from "react"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {API_ENDPOINT,API_KEY} from '../constants';
export default function SearchBar({cityhandler,flaghandler}) {
  return (
    
    <View style={{marginTop:15,flexDirection:"row"}}>
      <GooglePlacesAutocomplete placeholder="Search"
      query ={{key :API_KEY}}
      fetchDetails
      onPress={(data,details,query = null)=>{
        const CityLocations = details.geometry.location
        var RandomNumber = Math.floor(Math.random() * 10000) + 1
        //console.log(CityLocations);
        cityhandler(CityLocations);
        flaghandler(RandomNumber)
        console.log(RandomNumber)
      }
     
      }
      GooglePlacesDetailsQuery={{
        fields:['formatted_address','geometry']
      }}
        styles={{
          textInput:{
              backgroundColor:'#eee',
              borderRadius:20,
              fontWeight:'700',
              marginTop:7,
            },
            textInputContainer:{
                backgroundColor:'#eee',
                borderRadius:50,
                flexDirection:'row',
                alignItems:'center',
                marginRight:10,
                
            },
              }}
              renderLeftButton={()=> (
              <View style={{marginLeft:10}}>
                  
                  <Ionicons name ="location-sharp" size ={24}></Ionicons>
              </View>)}
              renderRightButton={() =>(
                  <View style={{
                    flexDirection:"row",
                    marginRight:8,
                    backgroundColor:'white',
                    padding:9,
                    borderRadius:30,
                    alignItems:"center"}}>

                    <AntDesign name ="clockcircle" size ={11} style={{marginRight:6}}>

                    </AntDesign>
                    <Text>
                      Search
                    </Text>

                  </View>

              ) }
              >
    
      </GooglePlacesAutocomplete>
    </View>
  )
}