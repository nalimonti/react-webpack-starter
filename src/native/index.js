import * as Expo from "expo";
import React, { Component } from "react";

import App from "./components/App";
import PropTypes from "prop-types";

export default class Setup extends Component {
    static propTypes = {
        store: PropTypes.shape({}).isRequired
    };

    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        this.loadFonts();
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <App store={this.props.store}/>
        );
    }
}