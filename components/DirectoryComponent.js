// onPress={() => props.onPress(item.id)}
import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
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
        title: 'Tours Information'
    };

    render() {
        const { navigate } = this.props.navigation;

        const RenderItemEdit = ({ item }) => {
            return (
                <ScrollView style={styles.container}>
                    <Card
                        title={item.name}
                        image={{ uri: baseUrl + item.image }}
                    >
                        <Text>
                            {item.description} {'\n'} {'\n'}
                            The tour total cost of {item.price}. {'\n'}
                        </Text>
                        <Pressable style={styles.button}
                            accessibilityLabel="Click here to book this tour"
                            onPress={() => navigate('Reservation')}
                        >
                            <Text style={styles.text}>Reserve</Text>
                        </Pressable>
                        
                    </Card>
                    {/*
                    <Card
                        title={item.name}
                        image={{ uri: baseUrl + item.image }}
                        onPress={() => navigate('TourInfo', { tourId: item.id })}
                    >
                        <Text>{item.description}</Text>
                        <Text style={styles.text}>{item.price}</Text>
                        <Pressable style={styles.button}
                            accessibilityLabel="Click here to book this tour"
                            onPress={() => navigate('Reservation')}
                        >
                            <Text style={styles.text}>Book this tour</Text>
                        </Pressable>
                    </Card>

                    
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
    container: {
        backgroundColor:'#add8e6'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 25,
      marginRight: 120,
      marginLeft: 120,
      borderRadius: 7,
      elevation: 3,
      backgroundColor: '#2f4f4f',
    },
    text: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      textAlign: 'justify',
      color: 'white',
    },
  });

export default connect(mapStateToProps)(DirectoryEdit);
