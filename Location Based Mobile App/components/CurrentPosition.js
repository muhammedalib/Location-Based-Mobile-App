
import React, {Component, useEffect, useState } from "react"
import {StyleSheet, View, Text,Button} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker } from "react-native-maps"
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
//import Geolocation from 'react-native-geolocation-service';
navigator.geolocation = require('@react-native-community/geolocation');
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import {API_ENDPOINT,API_KEY} from '../constants';
import Places from './Places/Places';
import MapViewDirections from "react-native-maps-directions";
import {newRegion} from './Places/PlacesItem'


export default class CurrentPosition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: 39.7983,
				longitude: 32.8058,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			region2: {
				latitude: 39.7983,
				longitude: 32.8058,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			CurrentRegion:{
			latitude:39.7083,
			longitude:32.8558,
			latitudeDelta:0.0922,
			longitudeDelta:0.0421,
			},
			DestinationLocation:{
				latitude:39.7083,
				longitude:32.8558,
				latitudeDelta:0.0922,
				longitudeDelta:0.0421,

			},
			places: [],
			fetching: false,
			flag:0,
			marker: 
				{
						latitude: 39.7983,
						longitude: 32.8058,
					}
					,
					radius:5000,
                    activeTab:'tourist_attraction',
					tabflag:0
				
		};
		
	  }
	  

	 PermissionPosition = () => {
		const handleLocationPermission = async () => {
		  let permissionCheck = ""
		  if (Platform.OS === "ios") {
			permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
	  
			if (permissionCheck === RESULTS.DENIED) {
			  const permissionRequest = await request(
				PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
			  )
			  permissionRequest === RESULTS.GRANTED
				? console.warn("Location permission granted.")
				: console.warn("Location perrmission denied.")
			}
		  }
	  
		  if (Platform.OS === "android") {
			permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
	  
			if (permissionCheck === RESULTS.DENIED) {
			  const permissionRequest = await request(
				PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
			  )
			  permissionRequest === RESULTS.GRANTED
				? console.warn("Location permission granted.")
				: console.warn("Location perrmission denied.")
			}
		  }
		}
	}
	
	async componentDidMount(){
		try {
			
			console.log("didmount")
			console.log(this.props.flag)
			console.log(this.props.cityLocations)
			this.PermissionPosition();
			const {coords: {latitude, longitude}} = await this.getCurrentPosition();
			
			const type = this.state.activeTab
			const radius = this.state.radius
				this.setState({
					region: {
						...this.state.region,
						latitude,
						longitude
					},
					region2: {
						...this.state.region2,
						latitude,
						longitude
					},
					CurrentRegion:{
						...this.state.CurrentRegion,
						latitude,
						longitude
					},
					DestinationLocation:{
						...this.state.DestinationLocation,
						latitude,
						longitude
					},
					fetching: true,
				});
				const {data: {results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${API_KEY}`)
				
				this.setState({
					...this.state.places,
					places: results,
					fetching: false
				});
				
			
				
			
			//console.log(this.state.places);
		} catch (e) {
			this.setState({
				fetching: false
			});
			alert('Konum alınamadı!')
		}
	}

	async componentDidUpdate(prevProps) {
		if(this.props.activeTab !== prevProps.activeTab){
			try {
			
				console.log("didmount")
				console.log("props",this.props)
				console.log("prevprops",prevProps)
				console.log(this.props.flag)
				console.log(this.props.cityLocations)
				this.PermissionPosition();
				const {coords: {latitude, longitude}} = await this.getCurrentPosition();
				let type = this.state.activeTab
				const radius = this.state.radius
				this.setState({
					region: {
						...this.state.region,
						latitude,
						longitude
					},
					DestinationLocation:{
						...this.state.DestinationLocation,
						latitude:this.state.CurrentRegion.latitude,
						longitude:this.state.CurrentRegion.longitude
					},
					fetching: true,
				});
				if(this.state.tabflag === 1)
				{
				const latitude =this.props.cityLocations.lat
				const longitude = this.props.cityLocations.lng
				this.setState({
					region: {
						...this.state.region,
						latitude,
						longitude
					}});
					console.log("bu iş bitiş")
					console.log(this.state.region)
					
				}
					if(prevProps.activeTab =="Gezilecek Yerler")
					{
						type = 'restaurant'
						console.log("activetabRestorant",type)
					}
					this.setState({
						marker:{
							...this.state.marker,
							latitude:this.state.region.latitude,
							longitude:this.state.region.longitude
						}
					})
					//console.log("didmount type",activeTab)
					const {data: {results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=${radius}&type=${type}&key=${API_KEY}`)
					
					this.setState({
						...this.state.places,
						places: results,
						fetching: false,
						
					});
					
					
					
				
				//console.log(this.state.places);
			} catch (e) {
				this.setState({
					fetching: false
				});
				alert('Konum alınamadı!')
			}
		}
		
		if (this.props.flag !== prevProps.flag) {
				//getDerivedStateFromProps();
                console.log("prevprops",prevProps)
                console.log("props",this.props)
				console.log("didmountUpdate")
				console.log("thisstateflag",this.state.flag)
				console.log("thispropscityloc",this.props.cityLocations)
				//this.PermissionPosition();
				//const {coords: {latitude, longitude}} = await this.getCurrentPosition();
				let type = 'tourist_attraction'
				const radius =this.state.radius
				const latitude =this.props.cityLocations.lat
				const longitude = this.props.cityLocations.lng
					this.setState({
						region: {
							...this.state.region,
							latitude,
							longitude,
							
						},
						DestinationLocation:{
							...this.state.DestinationLocation,
							latitude:this.state.CurrentRegion.latitude,
							longitude:this.state.CurrentRegion.longitude
						},
						tabflag:1,
						fetching: true,
						marker:{
							...this.state.marker,
							latitude,
							longitude
						}
					});
					if(prevProps.activeTab =="Restorantlar")
					{
						type = 'restaurant'
						console.log("activetabRestorant",type)
						console.log("tabflagggg",this.state.tabflag)
					}
					if(prevProps.activeTab =="Gezilecek Yerler")
					{
						type ='tourist_attraction'
						console.log("activetabgezilecek",type)
					}
					
							//console.log("didupdate type",type)
							
							const {data: {results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${API_KEY}`)
							
							this.setState({
								...this.state.places,
								places: results,
								fetching: false,
								
							});
                        if(this.props.HeaderTabsFlag !== prevProps.HeaderTabsFlag)
						{

							
							console.log("didupdate type",activeTab)
							const {data: {results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${activeTab}&key=${API_KEY}`)
							this.setState({
								...this.state.places,
								places: results,
								fetching: false,
								
							});
						}
			}
			
            
}

		getCurrentPosition=()=>{
			return new Promise((resolve, reject) => {
				Geolocation.getCurrentPosition(
					position => resolve(position), // success
					() => reject(), // fail
					{
						timeout: 5000,
						maximumAge: 1000,
						enableHighAccuracy: true
					}
				)
			})
		}
		
		OnpressMarker = locations => () =>
	{
			alert("Rota Çizildi!")
			console.log("öncekiaşama",locations.lat,locations.lng)
		
		this.setState({
			DestinationLocation:{
				...this.state.DestinationLocation,
				latitude:locations.lat,
				longitude:locations.lng
		}},
		() => console.log(this.state.DestinationLocation))
		console.log("sonaşama",this.state.DestinationLocation)
	
		
		
	}
	
	

		render() {
			
			return (
				
				<View style={styles.container}>
					 
      				
        
					<MapView
						
						showsMyLocationButton={true}
						//showsTraffic={true}
						showsBuildings={true}
						style={styles.map}
						showsUserLocation={true}
						region={this.state.region}
						ref={ref => this.map = ref}
						
					>
						
							
							
								<MapViewDirections
								origin ={this.state.CurrentRegion}
								destination={this.state.DestinationLocation}
								apikey={API_KEY}
								strokeWidth={3}
								strokeColor={"black"}
							/>
							
						
							
							
					
						
							<Marker
			
								coordinate={this.state.marker}
								title={"Burası arattığın merkez"}
								pinColor={'blue'}
							>
							</Marker>
						
					

						
						{
						this.state.places.map(place => {
							const {geometry: {location: {lat, lng}}} = place;
							//console.log("markera giden place",place);
							return (
								<Marker
									key={place.place_id}
									coordinate={{
										latitude: lat,
										longitude: lng
									}}
									title={place.name}
									onPress={this.OnpressMarker(place.geometry.location)}
									
								/>
								
							)
						})
					}
					</MapView>
					<View style={styles.placesContainer}>
					{
						//<Places></Places>
						this.state.fetching ? <Text style={styles.loading}>Loading nearby places...</Text> :
							<Places map={this.map} places={this.state.places} CurrentLocation={this.state.region2}/>
					}
				</View>
					
				</View>
			);
		}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	map: {
		flex: 1
	},
	placesContainer: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100%',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loading: {
		padding: 10,
		backgroundColor: '#f1f1f1',
		fontSize: 13,
		color: '#333'
	}
});