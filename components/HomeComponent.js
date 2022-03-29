import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        destinations: state.destinations
    };
};
class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({ item }) => {
            return (
                <Tile
                    title={<Text style={styles.label}>{item.name}</Text>}
                    contentContainerStyle={{ height: 40 }}
                    featured
                    onPress={() => navigate('DestinationInfo', { destinationId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                />
            );
        };

        if (this.props.destinations.isLoading) {
            return <Loading />;
        }
        if (this.props.destinations.errMess) {
            return (
                <View>
                    <Text>{this.props.destinations.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.destinations.destinations}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}
const styles = StyleSheet.create({

    label: {
        color: "white",
        fontSize: 30,
        lineHeight: 50,
        fontWeight: "bold",
        padding: 10,
        backgroundColor: '#808080',
        opacity: 0.7

    }

});

export default connect(mapStateToProps)(Home);
