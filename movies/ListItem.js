import React, {Component} from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideAnim: new Animated.Value(100),
        }
    }

    componentDidMount() {
        Animated.timing(this.state.slideAnim, {
            toValue: 0,
            duration: 500,
            delay: this.props.delay,
        }).start();
    }

    render() {
        const {images, title, genres, year} = this.props.row;
        return (
            <Animated.View style={[styles.listItem, {marginLeft: this.state.slideAnim}]}>
                <Image source={{uri: images.small}} style={styles.poster}/>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subHeading}>{genres[0]} - {year}</Text>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    poster: {
        width: 94,
        height: 70
    },
    title: {
        margin: 5,
        fontSize: 15,
    },
    subHeading: {
        margin: 5,
        fontSize: 12,
    }
});