import { ScrollView, Text,TouchableOpacity,View,StyleSheet,FlatList,SafeAreaView,Image } from 'react-native'
import React, {Component, useEffect, useState } from "react"
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
export default class Favorilerim extends Component {
	constructor(props) {
		super(props);
		this.state = {
			places: [],

		}
	}
	renderContactsItem = ({item}) => {
		return(
			<View style={styles.itemContainer}>
				<Image
					style={styles.avatar}
					source={{ uri: item.source }} />
				<View style={styles.textContainer}>
					<Text style={styles.name}>İsim:{item.name}</Text>
					<Text>Puan:{item.rating}</Text>
					<Text>Uzaklık:{item.distance} km</Text>
					<TouchableOpacity onLongPress={this.Delete(item.name)}>
					<Text >Delete </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
	async componentDidMount(){
		const db =  firebase.firestore();
		db.collection("places").orderBy("createdAt")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				console.log("dociddd",doc.id)
			})
			this.setState({
				places: places
			})
			
			});
		  
		}

		SortName = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("name","asc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Alfabetik Sıralandı!")
		}
		LongSortName = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("name","desc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Ters Alfabetik Sıralandı!")
		}
		SortRate = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("rating","desc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Azalan Puana Göre Sıralandı!")
		}
		LongSortRate = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("rating","asc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Artan Puana Göre Sıralandı!")
		}
		SortCreatedAt = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("createdAt","asc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("En Son Eklemeye Göre Sıralandı!")
		}
		LongSortCreatedAt = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("createdAt","desc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("İlk Eklemeye Göre Sıralandı!")
		}
		SortDistance = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("distance","asc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Konuma Yakınlığına Göre Sıralandı!")
		}
		LongSortDistance = () => {
			const db =  firebase.firestore();
		db.collection("places").orderBy("distance","desc")
		.onSnapshot(docs => {
			let places = [];
			docs.forEach(doc => {
				
				places.push(doc.data())
				
			})
			this.setState({
				places: places
			})
				
				
				
			});
			alert("Konuma En Uzaktan En Yakına Doğru Sıralandı!")
		}
		
		Delete = id  =>  () => {
			const db =  firebase.firestore();
			db.collection("places")
			.get()
  		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				if(doc.data().name == id){
					doc.ref.delete();
				}
	  			
			});
  		
		});
			
		alert("Favorilerden Silindi!")
		}
		
  render() {
	return (
		  <SafeAreaView>
			  <View style ={{flexDirection:'row'}}>
			  <TouchableOpacity style ={styles.sortstyle} 
		onPress = {()=>{
			this.SortName()
		}}
		onLongPress = {()=>{
			this.LongSortName()
		}}>
		  <Text style = {{fontSize:15,fontWeight:"900"}}> Alfabetik</Text>  
		  </TouchableOpacity>
		  <TouchableOpacity style ={styles.sortstyle} 
		onPress = {()=>{
			this.SortRate()
		}}
		onLongPress = {()=>{
			this.LongSortRate()
		}}>
		  <Text style = {{fontSize:15,fontWeight:"900"}}> Puan</Text>  
		  </TouchableOpacity>
		  <TouchableOpacity style ={styles.sortstyle} 
		onPress = {()=>{
			this.SortDistance()
		}}
		onLongPress = {()=>{
			this.LongSortDistance()
		}}>
		  <Text style = {{fontSize:15,fontWeight:"900"}}> Uzaklık</Text>  
		  </TouchableOpacity>
		  <TouchableOpacity style ={styles.sortstyle} 
		onPress = {()=>{
			this.SortCreatedAt()
		}}
		onLongPress = {()=>{
			this.LongSortCreatedAt()
		}}>
		  <Text style = {{fontSize:15,fontWeight:"900"}}> Eklenme Tarihi</Text>  
		  </TouchableOpacity>
			  </View>
			  
		  <FlatList 
		  renderItem={this.renderContactsItem}
		  data={this.state.places}>
			  
			  
		  </FlatList>
		  </SafeAreaView>
	  );
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 25,
		marginHorizontal: 10
	},
	textContainer: {
		justifyContent: 'space-around'
	},
	name: {
		fontSize: 16
	},
	sortstyle:{
		backgroundColor:"pink",
		borderRadius:30,
		borderWidth:2,
		height:30,
		width:75,
		marginHorizontal: 10,
		
	}
});
