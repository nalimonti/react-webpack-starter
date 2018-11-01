import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Content, Card, CardItem, Body, Text
} from 'native-base';
import Error from "./Error";

class Article extends React.Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        articleId: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        // if (loading) return <Loading />;

        const { articles, articleId } = this.props;

        let article = null;
        if (articles && articles.length && articleId) {
            article = articles.find(a => parseInt(a.id) === parseInt(articleId))
        }

        if (!article) return(<Error content="Article not found"/>);

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>{article.title}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>{article.content}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>Footer</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default Article;
