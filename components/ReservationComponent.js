import React, { Component } from 'react';
import {
    Text, View, ScrollView, StyleSheet,
    Picker, Switch, Button, Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            travelers: 1,
            hotel: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Reserve a Tour'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Confirm Reservation',
            'Number of Travelers: ' + this.state.travelers + "\n" +
            'Hotel Accommodation? ' + this.state.hotel + "\n" +
            'Date: ' + this.state.date.toLocaleDateString("en-US"),
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'));
                        this.resetForm();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    async presentLocalNotification(date) {
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Vacation Tour reminder',
                    body: `Tour date is ${date}.`
                },
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }
    resetForm() {
        this.setState({
            travelers: 1,
            hotel: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='First Name'
                    >
                    </TextInput>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Last Name'
                    >
                    </TextInput>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Travelers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.travelers}
                        onValueChange={itemValue => this.setState({ travelers: itemValue })}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6 +' value='6' />

                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hotel Accommodation?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.hotel}
                        trackColor={{ true: '#008080', false: null }}
                        onValueChange={value => this.setState({ hotel: value })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button
                        onPress={() =>
                            this.setState({ showCalendar: !this.state.showCalendar })
                        }
                        title={this.state.date.toLocaleDateString('en-US')}
                        color='#008080'
                        accessibilityLabel='Tap me to select a tour date'
                    />
                </View>
                {this.state.showCalendar && (
                    <DateTimePicker
                        value={this.state.date}
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({ date: selectedDate, showCalendar: false });
                        }}
                        style={styles.formItem}
                    />
                )}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Reserve'
                        color='#008080'
                        accessibilityLabel='Tap me to book a tours'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
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
    input: {
        fontSize: 18,
        flex: 2,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default Reservation;