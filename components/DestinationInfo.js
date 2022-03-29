import React, { Component } from 'react';
import {
    Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share
} from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

// panResponder zoom in out and for user touchable support movement 
const mapStateToProps = state => {
    return {
        destinations: state.destinations,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: destinationId => (postFavorite(destinationId)),
    postComment: (destinationId, rating, author, text) => (postComment(destinationId, rating, author, text))

};

function RenderDestination(props) {

    const { destination } = props;
    const view = React.createRef();
    const recognizeDrag = ({ dx }) => (dx < -200) ? true : false;
    const recognizeComment = ({ dx }) => (dx > 200) ? true : false;


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + destination.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            else if (recognizeComment(gestureState)) {
                props.onShowModal();
            }

            return true;
        }
    });

    const shareDestination = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    };

    if (destination) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={<Text style={styles.label}>{destination.name}</Text>}
                    image={{ uri: baseUrl + destination.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {destination.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set a favorite') : props.markFavorite()}
                        />
                        <Icon
                            name='comment'
                            type='font-awesome'
                            color='#008080'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />

                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#008080'
                            raised
                            reverse
                            onPress={() => shareDestination(`Want to plan a trip to ${destination.name} with me? `, baseUrl + destination.image)}
                        />

                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}
function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    showRating
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{
                        alignItems: 'flex-start',
                        paddingVertical: '5%'

                    }}
                />
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtract={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}
class DestinationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            author: '',
            text: '',
            showModal: false
        }
    }

    markFavorite(destinationId) {
        this.props.postFavorite(destinationId);
    }
    static navigationOptions = {
        title: 'Destination Information'
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
    handleComment(destinationId) {
        this.props.postComment(destinationId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();

    }
    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            text: '',
            showModal: false
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    render() {
        const destinationId = this.props.navigation.getParam('destinationId');
        const destination = this.props.destinations.destinations.filter(destination => destination.id === destinationId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.destinationId === destinationId);
        return (
            <ScrollView>
                <RenderDestination destination={destination}
                    favorite={this.props.favorites.includes(destinationId)}
                    markFavorite={() => this.markFavorite(destinationId)} //this is an onPress button 
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            tartingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='AUTHOR'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={author => this.setState({ author: author })}
                            value={this.state.author}

                        />
                        <Input
                            placeholder='COMMENT'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingVertical: 10 }}
                            onChangeText={text => this.setState({ text: text })}
                        />
                        <View>
                            <Button
                                onPress={() => {
                                    this.handleComment(destinationId);
                                    this.resetForm();
                                }}
                                color='#008080'
                                title='Submit'
                            />
                        </View>

                        <View>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DestinationInfo);