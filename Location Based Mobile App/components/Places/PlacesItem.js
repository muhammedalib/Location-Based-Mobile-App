import React, {Component,useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {API_KEY, API_ENDPOINT} from '../../constants';
import { getDistance } from 'geolib';
import firebase from '@react-native-firebase/app'

export default class PlacesItem extends Component {
	onPress = () => {
		const { lat, lng } = this.props.item.geometry.location;
		console.log("gidiş yeri",this.props.item.geometry.location)
		const newRegion = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 0.002,
			longitudeDelta: 0.002,
		};
		
		this.props.map.animateToRegion(newRegion, 1000)
	};
	onLongPress = () => {
		
		let distance =getDistance(this.props.coords,{
			latitude:this.props.item.geometry.location.lat,
			longitude:this.props.item.geometry.location.lng
		})
		distance = distance/1000
		const db = firebase.firestore();
		let source;
		const {photos} = this.props.item;
		if (photos) {
			source = `${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}`
			
		}
		
		
		db.collection("places")
		.get()
  	.then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
	let totaluser =querySnapshot.size
    querySnapshot.forEach(documentSnapshot => {
		if(this.props.item.name !== documentSnapshot.data().name){
			totaluser = totaluser -1
			this.setState({totaluser2:totaluser})
		}
		
      
    });
	if(totaluser=== 0 )
	{	
		db.collection("places").add({
			name:this.props.item.name,
			rating:this.props.item.rating,
			distance:distance,
			source :source,
			types:this.props.item.types,
			createdAt:firebase.firestore.FieldValue.serverTimestamp()
		}).then((querySnapshot) => {
			
		}) ;
				alert("Favorilere Eklendi")	
	}
	else
	{
				alert("Zaten favorilere ekli")
	}
	
  });	
		
	}

	

	render() {
		
		const {photos} = this.props.item;
		let source;
		if (photos) {
			source = {uri: `${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}`}
		} else {
			source = require('../../assets/no-image.jpg')
		}
		let distance =getDistance(this.props.coords,{
			latitude:this.props.item.geometry.location.lat,
			longitude:this.props.item.geometry.location.lng
		})
		distance = distance/1000
		
		

		return (
			
			<TouchableOpacity
				onPress={this.onPress}
				onLongPress={this.onLongPress}
			>
				<View style={styles.itemContainer}>
					<Text
						numberOfLines={1}
						style={styles.text}>{this.props.item.name}</Text>
						<Text style ={styles.rating} >
						Rating:{this.props.item.rating}
						</Text>
						<Text style ={styles.distance} >
						{distance} km
						</Text>

					<Image
						style={styles.photo}
						source={source}
					/>
				</View>
			</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({
	itemContainer: {
		width: 240,
		height: 120,
		backgroundColor: '#fff',
	},
	text: {
		padding: 5,
		backgroundColor: '#fff',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2
	},
	photo: {
		width: '100%',
		height: 120,
		position: 'absolute',
		left: 0,
		top: 0
	},
	rating:{
		padding: 5,
		backgroundColor: 'grey',
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 2
	},
	distance:{
		padding: 5,
		backgroundColor: '#fff',
		position: 'absolute',
		bottom: 0,
		right: 0,
		zIndex: 2
	}
});

