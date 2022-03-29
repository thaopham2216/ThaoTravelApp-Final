import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        destinations: state.destinations
    };
};
class HomeEdit extends Component {

    static navigationOptions = {
        title: 'Home2'
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({ item }) => {
            return (
                <Tile
                    title={item.name}
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

export default connect(mapStateToProps)(HomeEdit);
