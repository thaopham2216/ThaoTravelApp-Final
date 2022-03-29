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
        const RenderItemEdit = ({ item }) => {
            return (
                <ScrollView>
                    <Card
                        title={item.name}
                        image={{ uri: baseUrl + item.image }}
                    >
                        <Text>
                            {item.description}
                            {item.price}
                        </Text>
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

export default connect(mapStateToProps)(DirectoryEdit);
