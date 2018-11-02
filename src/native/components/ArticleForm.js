import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
// import Loading from './Loading';
import Messages from './Messages';

class ArticleForm extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        articles: PropTypes.array,
        articleId: PropTypes.string,
        success: PropTypes.string,
        error: PropTypes.string
    };

    constructor(props) {
        console.log('Article form component constructor');
        console.log(props);
        super(props);

        const { articles, articleId } = props;

        let article = null;
        if (articleId) {
            article = articles.find(a => parseInt(a.id) === parseInt(articleId));
        }

        this.state = {
            title: article ? article.title : '',
            content: article ? article.content : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val,
        });
    };

    handleSubmit = () => {
        const { onFormSubmit } = this.props;
        onFormSubmit(this.state)
            .catch(e => console.log(`Error: ${e}`));
    };

    render() {
        console.log('article form component render');
        const {
            loading,
            error,
            success
        } = this.props;
        const { title, content } = this.state;

        // if (loading) return <Loading />;

        return (
            <Container>
                <Content>
                    <View padder>
                        { error ? <Messages message={error} type={'error'} /> : null }
                        { success ? <Messages message={success} type={'success'} /> : null }
                    </View>

                    <Form>
                        <Item stackedLabel>
                            <Label>
                                Title
                            </Label>
                            <Input
                                autoCapitalize="none"
                                value={title}
                                keyboardType="email-address"
                                onChangeText={v => this.handleChange('title', v)}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Content
                            </Label>
                            <Input
                                autoCapitalize="none"
                                value={content}
                                keyboardType="email-address"
                                onChangeText={v => this.handleChange('content', v)}
                            />
                        </Item>

                        <View padder>
                            <Button block onPress={this.handleSubmit}>
                                <Text>
                                    Save
                                </Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default ArticleForm;
