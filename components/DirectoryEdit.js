import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, Pressable } from 'react-native';
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

/*

// navigation 
function DestinationInfoScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Destination Info"
                onPress={() => navigation.push('Details')}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();

//
<NavigationContainer>
<Stack.Navigator>
    <Stack.Screen name='Details' Component={DestinationInfoScreen} />
</Stack.Navigator>
</NavigationContainer>

// navigation end 

*/

class DirectoryEdit extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Directory Edit!!!!!!'
    };

    render() {
        const { navigate } = this.props.navigation;
        const RenderItemEdit = ({ item }) => {
            return (
                <ScrollView>
                    <Card
                        title={item.name}
                        image={{ uri: baseUrl + item.image }}
                    >
                        <Text>
                            `$ {item.description} The tour cost total of {item.price}.`
                        </Text>
                        <Pressable style={styles.button}
                            accessibilityLabel="Click here to book this tour"
                            onPress={() => navigate('Reservation')}
                        >
                            <Text style={styles.text}>Book this tour</Text>
                        </Pressable>
                        
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
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 25,
      marginRight: 80,
      marginLeft: 80,
      borderRadius: 7,
      elevation: 3,
      backgroundColor: '#2f4f4f',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default connect(mapStateToProps)(DirectoryEdit);
