import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PlacesItem from './PlacesItem';

export default class Places extends Component {
	render() {
		return (
			<View style={styles.container}>
				<FlatList
				    data={this.props.places}
					renderItem={({ item }) => <PlacesItem map={this.props.map} item={item} coords ={this.props.CurrentLocation} />}
					horizontal={true}
					ItemSeparatorComponent={() => <View style={{ marginRight: 10 }} />}
					showsHorizontalScrollIndicator={true}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 140,
		padding: 10,
		backgroundColor:'#f1f1f1'
	}
});