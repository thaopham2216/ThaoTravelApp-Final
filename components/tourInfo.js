import React, { Component } from 'react';
import {
    Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share
} from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        destinations: state.destinations,
        partners: state.partners,
        promotions: state.promotions,
    };
};

class TourInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            travelers: 1,
            hotel: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        }
    }
    static navigationOptions = {
        title: 'Destination Information'
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
}


const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    label: {
        color: "white",
        fontSize: 30,
        lineHeight: 50,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,

    }

});
export default connect(mapStateToProps)(TourInfo);