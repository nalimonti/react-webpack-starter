import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import Landing from '../components/Landing';
import LoginComponent from '../components/Login';
import LoginContainer from '../../containers/Login';

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
                    <Scene key="landing" component={Landing} />
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
