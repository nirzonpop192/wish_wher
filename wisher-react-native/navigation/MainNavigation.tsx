import React, { useCallback, useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import ReminderCardView from '../screens/ReminderCardView';
import BoldText from '../components/BoldText';
import { Image, Platform, Pressable, View } from 'react-native';
import images from '../assets/images';
import colors from '../constants/colors';
import RegularText from '../components/RegularText';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import ShareCardScreen from '../screens/ShareCardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type BottomTabNavigationProps = {
  route: any
  navigation: any
}

const TabIcon = (props: any) => {
  const {
    focused,
    activeIcon,
    inActiveIcon
  } = props
  return (
    <Image
      source={focused ? activeIcon : inActiveIcon}
      style={{ height: focused ? 24 : 22, width: focused ? 24 : 22 }}
      resizeMode='contain'
    />
  )
}

const TabLabel = (props: any) => {
  const {
    focused,
    text,
  } = props
  
  return focused ? (
    <BoldText style={{ color: colors.primary }}>{text}</BoldText>
  ) : (
    // null
    <RegularText style={{ color: colors.lightGrey, fontSize: 13 }}>{text}</RegularText>
  )
}

const BottomTabNavigation = (props: BottomTabNavigationProps) => {
  const { navigation, route } = props
  const activeIndex = navigation?.getState()?.routes[0]?.state?.index || 0

  const addButtonPressHandler = useCallback(() => {
    navigation.navigate('addReminder')
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation, route, options, back }) => {
        const title = activeIndex === 0 ? "Reminders" : activeIndex === 1 ? "Calendar" : "Settings" // getHeaderTitle(options, route.name);
        return (
          <MyHeader
            title={title}
            leftButton={
              back ? <MyBackButton onPress={navigation.goBack} /> : undefined
            }
            rightButton={activeIndex === 2 ? null : 
              <Pressable
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={addButtonPressHandler}
              >
                <BoldText
                  style={{
                    fontSize: 14
                  }}
                >
                  {"ADD"}
                </BoldText>
              </Pressable>
            }
            style={{
              height: 55,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      },
    })
  }, [addButtonPressHandler, activeIndex])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                focused={focused}
                activeIcon={images.ic_tab_home_selected}
                inActiveIcon={images.ic_tab_home}
              />
            )
          },
          tabBarLabel: ({ focused, color, position }) => {
            return (
              <TabLabel
                text="Home"
                focused={focused}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                focused={focused}
                activeIcon={images.ic_tab_calendar_selected}
                inActiveIcon={images.ic_tab_calendar}
              />
            )
          },
          tabBarLabel: ({ focused, color, position }) => {
            return (
              <TabLabel
                text="Calendar"
                focused={focused}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                focused={focused}
                activeIcon={images.ic_tab_settings_selected}
                inActiveIcon={images.ic_tab_settings}
              />
            )
          },
          tabBarLabel: ({ focused, color, position }) => {
            return (
              <TabLabel
                text="Settings"
                focused={focused}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export const MyHeader = (props: any) => {
  const { title, leftButton, rightButton, style } = props
  const safeArea = useSafeAreaInsets()
  return (
    <View style={{ ...style, flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === "ios" ? safeArea.top : 0 }}>
       <View style={{ flex: 0.2 }}>
      {leftButton || null}
      </View>
      <View
        style={{
          flex: leftButton && rightButton ? 0.6 : leftButton || rightButton ? 0.8 : 1,
          alignSelf: 'center',
          ...style,
        }}
      >
        <BoldText style={{ fontSize: 21 }}>{title}</BoldText>
      </View>
      <View style={{ flex: 0.2 }}>
        {
        rightButton || null
      }
    </View>
    </View>
  )
}

export const MyBackButton = (props: any) => {
  const { onPress } = props
  return (
    <Pressable style={{ marginHorizontal: 10 }} onPress={onPress}>
      <Image
        source={images.ic_back}
        style={{ height: 22, width: 22 }}
        resizeMode='contain'
      />
    </Pressable>
  )
}

export const MyHeaderButton = (props: any) => {
  const { image, onPress } = props
  return (
    <Pressable style={{ marginRight: 15, alignSelf: 'flex-end' }} onPress={onPress}>
      <Image
        source={image}
        style={{ height: 22, width: 22 }}
        resizeMode='contain'
      />
    </Pressable>
  )
}

const MainNavigation = () => {
  const safeArea = useSafeAreaInsets()
  return (
    <Stack.Navigator  screenOptions={{ animation: 'none', animationTypeForReplace: 'push' }}>
        <Stack.Screen
          name="home"
          component={BottomTabNavigation}
          options={{
            header: ({ navigation, route, options, back }) => {
              const title = "Reminders" // getHeaderTitle(options, route.name);
              return (
                <MyHeader
                  title={title}
                  leftButton={
                    back ? <MyBackButton onPress={navigation.goBack} /> : undefined
                  }
                  style={{
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              );
            }
          }}
        />
        <Stack.Screen
          name="addReminder"
          component={AddReminderScreen}
          options={{
            header: undefined
          }}
        />
        <Stack.Screen
          name="reminderCardView"
          component={ReminderCardView}
          options={{
            header: undefined
          }}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfileScreen}
          options={{
            header: ({ navigation, route, options, back }) => {
              return (
                <MyHeader
                  title={"Edit Profile"}
                  leftButton={
                    <MyBackButton onPress={navigation.goBack} />
                  }
                  style={{
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              );
            }
          }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePasswordScreen}
          options={{
            header: ({ navigation, route, options, back }) => {
              return (
                <MyHeader
                  title={"Change Password"}
                  leftButton={
                    <MyBackButton onPress={navigation.goBack} />
                  }
                  style={{
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              );
            }
          }}
        />
        <Stack.Screen
          name="privacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            header: ({ navigation, route, options, back }) => {
              return (
                <MyHeader
                  title={"Privacy Policy"}
                  leftButton={
                    <MyBackButton onPress={navigation.goBack} />
                  }
                  style={{
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              );
            }
          }}
        />
        <Stack.Screen
          name="aboutUs"
          component={AboutUsScreen}
          options={{
            header: ({ navigation, route, options, back }) => {
              return (
                <MyHeader
                  title={"About Us"}
                  leftButton={
                    <MyBackButton onPress={navigation.goBack} />
                  }
                  style={{
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              );
            }
          }}
        />
        <Stack.Screen
          name="shareCard"
          component={ShareCardScreen}
          options={{
            headerTitle: 'Preview',
            // header: ({ navigation, route, options, back }) => {
            //   return (
            //     <MyHeader
            //       title={"Preview"}
            //       leftButton={
            //         <MyBackButton onPress={navigation.goBack} />
            //       }
            //       style={{
            //         height: 55,
            //         backgroundColor: 'white',
            //         justifyContent: 'center',
            //         alignItems: 'center'
            //       }}
            //     />
            //   );
            // }
          }}
        />
    </Stack.Navigator>
  );
}

export default MainNavigation;