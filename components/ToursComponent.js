import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

function Mission() {
    return (
        <Card title="Overview">
            <Text style={{ margin: 10 }}>
                Proudly operates more than 1,000 itineraries, multi-day adventures across the world. These tours are popular among young adults who have recently graduated from high school or college and are looking for an eye-opening experience visiting new places and meeting like-minded people.
            </Text>
        </Card>
    )
}
class Tour extends Component {

    static navigationOptions = {
        title: 'Tours'
    }

    render() {
        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        };

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title="Tour Packages">
                        <Loading />
                    </Card>
                </ScrollView>
            )
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title="Tour Packages">
                        <Text>
                            {this.props.partners.errMess}
                        </Text>
                    </Card>
                </ScrollView>
            );
        }

        return (
            <ScrollView>
                <Mission />
                <Card title="Tour Packages">
                    <FlatList
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }

}

export default connect(mapStateToProps)(Tour); 