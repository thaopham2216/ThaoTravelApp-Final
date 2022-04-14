import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
//import { Tile } from 'react-native-elements';
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
                /*
                <Tile
                    title={<Text style={styles.label}>{item.name}</Text>}
                    contentContainerStyle={{ height: 40 }}
                    featured
                    onPress={() => navigate('DestinationInfo', { destinationId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                />
*/
                <View style={styles.container}>
                    <ImageBackground source={{ uri: baseUrl + item.image }} resizeMode="stretch" style={styles.image}>
                        <Text
                            onPress={() => navigate('DestinationInfo', { destinationId: item.id })}
                            style={styles.text}>{item.name}
                        </Text>
                    </ImageBackground>
                </View>

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
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: 'auto',
        height: 200
    },
    text: {
        color: 'white',
        fontSize: 25,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 160

    }

});

export default connect(mapStateToProps)(Home);
