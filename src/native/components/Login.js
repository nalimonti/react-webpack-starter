import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
// import Loading from './Loading';

class Login extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string,
        }),
        error: PropTypes.string,
        success: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        error: null,
        success: null,
        locale: null,
        user: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            email: (props.user && props.user.email) ? props.user.email : '',
            password: '',
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
            .then(() => Actions.pop())
            .catch(e => console.log(`Error: ${e}`));
    };

    render() {
        const {
            loading,
            error,
            success
        } = this.props;
        const { email } = this.state;

        // if (loading) return <Loading />;

        return (
            <Container>
                <Content>
                    <View padder>

                    </View>

                    <Form>
                        <Item stackedLabel>
                            <Label>
                                Email
                            </Label>
                            <Input
                                autoCapitalize="none"
                                value={email}
                                keyboardType="email-address"
                                onChangeText={v => this.handleChange('email', v)}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Password
                            </Label>
                            <Input
                                secureTextEntry
                                onChangeText={v => this.handleChange('password', v)}
                            />
                        </Item>

                        <View padder>
                            <Button block onPress={this.handleSubmit}>
                                <Text>
                                    Login
                                </Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Login;
