import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Content, Card, CardItem, Body, Text
} from 'native-base';
import {FlatList, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

const ArticlesListing = ({ articles, user }) => {
    console.log('articles listing', user);
    const onPress = (item) => Actions.article({ match: { params: {id: String(item.id)} } });

    const onEditPress = item => {
        console.log('edit press22');
        console.log(user);
        if (user) return Actions.articleForm({ match: { params: {id: String(item.id)} } });
        return Actions.login();
    };

    const keyExtractor = (item) => String(item.id);

    return (
        <Container>
            <Content>
                <FlatList data={articles} keyExtractor={keyExtractor} renderItem={({ item }) => (
                    <Card>
                        <CardItem header>
                            <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>{item.content}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <TouchableOpacity onPress={() => onEditPress(item)} style={{ flex: 1 }}>
                                <Text>Edit</Text>
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
    articles: PropTypes.array
};

export default ArticlesListing;
