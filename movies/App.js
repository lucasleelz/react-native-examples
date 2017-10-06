/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    View
} from 'react-native';
import {debounce} from 'lodash'
import ListItem from "./ListItem";

export default class App extends Component<{}> {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            text: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter search keyword"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.searchMovies}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(row, sectionId, rowId) => <ListItem row={row} delay={rowId * 50}/>}
                    enableEmptySections
                />
            </View>
        );
    }


    searchMovies = debounce(text => {
        fetch(`http://api.douban.com/v2/movie/search?q=${text}&apikey=0df993c66c0c636e29ecbb5344252a4a`)
            .then(response => response.json())
            .then((jsonData) => {
                const {subjects} = jsonData;
                if (subjects && subjects.length > 0) {
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(subjects)
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, 500);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 25,
    }
});
