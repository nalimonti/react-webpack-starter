import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Content, Card, CardItem, Body, Text, View
} from 'native-base';
import {FlatList, TouchableOpacity, StyleSheet, View as NativeView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Messages from './Messages';

const ArticlesListing = ({ articles, user, onDelete, success, error }) => {
    const onPress = (item) => Actions.article({ match: { params: {id: String(item.id)} } });

    const onEditPress = item => {
        if (user) return Actions.articleForm({ match: { params: {id: String(item.id)} } });
        return Actions.login();
    };

    const onCreatePress = () => Actions.articleForm();

    const onDeletePress = item => onDelete(item);

    const keyExtractor = (item) => String(item.id);

    return (
        <Container>
            <Content>
                <NativeView style={{padding: 20}}>
                    <TouchableOpacity onPress={() => onCreatePress()} style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>Create Article</Text>
                    </TouchableOpacity>
                </NativeView>
                <View padder>
                    { success ? <Messages message={success} type={'success'} /> : null }
                    { error ? <Messages message={error} type={'error'} /> : null }
                </View>
                <FlatList data={articles} keyExtractor={keyExtractor} renderItem={({ item }) => (
                    <Card>
                        <CardItem header bordered button onPress={() => onPress(item)}>
                            <Text>{item.title}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>{item.content}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <TouchableOpacity onPress={() => onEditPress(item)} style={{ flex: 1 }}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDeletePress(item)} style={{ flex: 1 }}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>
                )}>
                </FlatList>
            </Content>
        </Container>
    )
};

ArticlesListing.propTypes = {
    articles: PropTypes.array,
    onDelete: PropTypes.func,
    success: PropTypes.string,
    error: PropTypes.string
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonStyle: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5
    }
});

export default ArticlesListing;
