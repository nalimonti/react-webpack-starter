import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import Landing from '../components/Landing';
import LoginComponent from '../components/Login';
import LoginContainer from '../../containers/Login';
import Articles from '../components/Articles';
import ArticlesContainer from '../../containers/Articles';
import Article from '../components/Article';
import ArticleFormContainer from '../../containers/ArticleForm';
import ArticleForm from '../components/ArticleForm';

const Index = (
    <Stack hideNavBar>
        <Scene hideNavBar>
            <Tabs
                key="tabbar"
                swipeEnabled
                type="replace"
                showLabel={false}
                {...DefaultProps.tabProps}
            >
                <Stack
                    key="landing"
                    title="Landing"
                    icon={() => <Icon name="planet" {...DefaultProps.icons} />}
                    {...DefaultProps.navbarProps}
                >
                    <Scene
                        back
                        key="landing"
                        title="LANDING"
                        {...DefaultProps.navbarProps}
                        component={ArticlesContainer}
                        Layout={Articles}
                    />

                    <Scene
                        back
                        key="article"
                        title="ARTICLE"
                        {...DefaultProps.navbarProps}
                        component={ArticlesContainer}
                        Layout={Article}
                    />

                    <Scene
                        back
                        key="articleForm"
                        title="ARTICLE FORM"
                        {...DefaultProps.navbarProps}
                        component={ArticleFormContainer}
                        Layout={ArticleForm}
                    />
                </Stack>

                <Stack
                    key="profile"
                    title="PROFILE"
                    icon={() => <Icon name="contact" {...DefaultProps.icons} />}
                    {...DefaultProps.navbarProps}
                >
                    <Scene
                        back
                        key="login"
                        title="LOGIN"
                        {...DefaultProps.navbarProps}
                        component={LoginContainer}
                        Layout={LoginComponent}
                    />
                </Stack>
            </Tabs>
        </Scene>
    </Stack>
);

export default Index;
