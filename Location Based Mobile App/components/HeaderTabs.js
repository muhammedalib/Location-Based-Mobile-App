import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'



export default function HeaderTabs(props) {
  return (
    
    <View style ={{flexDirection:"row",alignSelf:"center"}}>
      <HeaderButton 
      text = "Gezilecek Yerler"
      btnClr ="black" 
      textColor ="white"
      activeTab={props.activeTab}
      SetActiveTab={props.SetActiveTab}
      
        />
      <HeaderButton 
      text = "Restorantlar"
      btnClr ="white" 
      textColor ="black"
      activeTab={props.activeTab}
      SetActiveTab={props.SetActiveTab}
        />
    </View>
  )
}

const HeaderButton = (props) => (

    <TouchableOpacity style={
        {
            backgroundColor: props.activeTab === props.text ? "black" : "white",
            paddingVertical:6,
            paddingHorizontal:16,
            borderRadius:30,
        }}
        onPress={() =>
          {
            props.SetActiveTab(props.text)
            //console.log(props.text)
          } 
          
        }
        >
    <Text style={{color:props.activeTab === props.text? "white" : "black",fontSize:15,fontWeight:"900"}}>{props.text}</Text>
    </TouchableOpacity>




);