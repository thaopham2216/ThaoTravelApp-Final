//                onPress={() => props.onPress(item.id)}
import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { Card, Tile } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        destinations: state.destinations,
        partners: state.partners,
        promotions: state.promotions,
    };
};

class DirectoryEdit extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Tours Directory'
    };

    render() {
        const RenderItemEdit = ({ item }) => {
            return (

                <ScrollView>
                    <Card
                        title={<Text style={styles.label}>{item.name}</Text>}
                        image={{ uri: baseUrl + item.image }}
                        onPress={() => props.onPress(item.id)}
                    >
                        <Text>{item.description}</Text>
                        <Text style={styles.text}>{item.price}</Text>



                    </Card>

                    {/*
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('DestinationInfo', { destinationId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
            */}
                </ScrollView>
            );
        };

        if (this.props.partners.isLoading) {
            return <Loading />;
        }
        if (this.props.partners.errMess) {
            return (
                <View>
                    <Text>{this.props.partners.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.partners.partners}
                renderItem={RenderItemEdit}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}
const styles = StyleSheet.create({

    text: {
        fontSize: 15,
        fontWeight: "bold",
        flex: 1
    },

    label: {
        color: "black",
        fontSize: 15,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#dcdcdc",
        padding: 10
    }

});

export default connect(mapStateToProps)(DirectoryEdit);
