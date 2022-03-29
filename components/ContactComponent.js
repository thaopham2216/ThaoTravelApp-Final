import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['wanderlustravel@travel.com'],
            subject: 'Inquiry',
            body: 'Hello,'
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card
                        featuredTitle='Contact Information'
                        wrapperStyle={{ margin: 20 }}>
                        <Text
                            style={{ marginBottom: 10 }}>
                            WanderLust Travel Company {'\n'}
                            1 World Street {'\n'}
                            Seattle, WA 98001 {'\n'}
                            U.S.A. {'\n'}
                            {'\n'}
                            Phone: 1-777-555-7777 {'\n'}
                            {'\n'}
                            Email: 'wanderlustravel@travel.com'
                        </Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: '#008080', margin: 40 }}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact;