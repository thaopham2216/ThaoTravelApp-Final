import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';
import * as ImageManipulator from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library';

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={{ color: tintColor }}
            />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            ).catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username });
                    this.setState({ password: userinfo.password });
                    this.setState({ remember: true })
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageLoginContainer}>
                    <Image
                        source={{ uri: this.state.imageUrl }}
                        loadingIndicatorSource={require('../assets/images/logo.png')}
                        style={styles.imageLogin}
                    />
                </View>
                    
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#008080' }}
                    />
                </View>
                
            </View>
        );
    }
}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{ color: tintColor }}
            />
        )
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
                MediaLibrary.saveToLibraryAsync(capturedImage.uri)
            }
        }
    }
    processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { height: 400, width: 400 } }],
            { format: ImageManipulator.SaveFormat.PNG }
        );
        console.log(processedImage);
        this.setState({ imageUrl: processedImage.uri });

    }
    getImageFromGallery = async () => {
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermissions.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                { username: this.state.username, password: this.state.password }))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('../assets/images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                    <View style={styles.formView}>
                        <Input
                            placeholder='Username'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />
                        <Input
                            placeholder='Password'
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />
                        <Input
                            placeholder='First Name'
                            leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                            onChangeText={firstname => this.setState({ firstname })}
                            value={this.state.firstname}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />
                        <Input
                            placeholder='Last Name'
                            leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                            onChangeText={lastname => this.setState({ lastname })}
                            value={this.state.lastname}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />
                        <Input
                            placeholder='Email'
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            containerStyle={styles.formInput}
                            leftIconContainerStyle={styles.formIcon}
                        />
                    </View>
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{ marginRight: 10 }}
                                />
                            }
                            buttonStyle={{ backgroundColor: '#008080' }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }

}
const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#008080',
            inactiveBackgroundColor: '#add8e6',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: { fontSize: 16 },
            style: {
                position: 'absolute',
                bottom: 40,
                left: 20,
                right: 20,
                height: 60, 
                lineHeight: 20,
            }
        },
    }
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10, 
    },
    formView:{
        margin: 10, 
        padding: 10
    },
    formIcon: {
        marginRight: 20
    },
    formInput: {
        padding: 5
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 70,
        height: 70
    },
    imageLoginContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        justifyContent: 'space-evenly',
        margin: 10
    },
    imageLogin: {
        width: 80,
        height: 80,
       
    }

});

export default Login;