/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faIdCard, faUniversity, faAward } from '@fortawesome/free-solid-svg-icons';

type SectionProps = PropsWithChildren<{
  title: string;
  icon: any;
  index: number;
}>;

function Section({children, title, icon, index}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const shadowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: index * 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: index * 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous shadow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shadowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shadowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedShadowStyle = {
    shadowOpacity: shadowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.25],
    }),
    transform: [
      {
        translateY: slideAnim,
      },
      {
        scale: shadowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.02],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.sectionContainer,
        {
          opacity: fadeAnim,
        },
        animatedShadowStyle,
      ]}>
      <View style={[
        styles.sectionContent,
        {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.9)',
        }
      ]}>
        <View style={[
          styles.iconContainer,
          {
            backgroundColor: isDarkMode
              ? 'rgba(0, 122, 255, 0.15)'
              : 'rgba(0, 122, 255, 0.1)',
          }
        ]}>
          <FontAwesomeIcon
            icon={icon}
            size={24}
            style={[
              styles.icon,
              {color: isDarkMode ? Colors.lighter : Colors.darker}
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {color: isDarkMode ? Colors.light : Colors.dark},
            ]}>
            {children}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
          ]}>
          <Section title="Nama" icon={faUser} index={0}>
            Hafizh Vergiansyah 
          </Section>
          <Section title="NIM" icon={faIdCard} index={1}>
            22/492605/SV/20578
          </Section>
          <Section title="Program Studi" icon={faUniversity} index={2}>
            Sistem Informasi Geografis
          </Section>
          <Section title="Angkatan" icon={faAward} index={3}>
            22
          </Section>
          <View style={styles.linksContainer}>
            <LearnMoreLinks />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  sectionContainer: {
    marginVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: '700',
    color: '#007AFF',
  },
  linksContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 20,
  },
});

export default App;