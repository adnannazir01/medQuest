import {View, SafeAreaView, Image, FlatList, Dimensions, ImageBackground} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {IMAGES} from '../../assets';
import {AppButton, AppText, FocusAwareStatusBar} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {CustomTheme, WIDTH} from '../../theme';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {normalizeFont, pixelSizeX, pixelSizeY} from '../../theme/size';

const {width: screenWidth} = Dimensions.get('window');

export default function OnBoardingScreen(): JSX.Element {
  /*
   * Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  const navigation = useAppNavigation();
  const flatListRef = useRef<FlatList>(null);
  const isFocused = useIsFocused();

  // Walkthrough Data
  const walkthroughData = [
    {
      id: '1',
      title: 'Enhance Your Medical Expertise',
      description: 'Challenge your knowledge with expertly crafted quizzes designed to elevate your skills.',
    },
    {
      id: '2',
      title: 'Learn and Grow',
      description: 'Access learning materials tailored to your expertise and field of work.',
    },
    {
      id: '3',
      title: 'Stay Ahead',
      description: 'Keep up-to-date with the latest medical advancements and stay ahead in your career.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % walkthroughData.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setCurrentIndex(0); // Reset the index when screen loses focus
    }
  }, [isFocused, walkthroughData.length]);

  /*
   * Functions
   */
  const onPressLogin = (): void => {
    navigation.navigate('LoginScreen');
  };
  const onPressSignUp = (): void => {
    navigation.navigate('SignupScreen');
  };

  const renderWalkthroughItem = ({item}: {item: (typeof walkthroughData)[0]}) => (
    <View style={{width: screenWidth, paddingHorizontal: 20}}>
      <AppText
        style={{fontSize: normalizeFont(40), fontWeight: 'bold', marginBottom: pixelSizeY(10), color: colors.Ebony}}>
        {item.title}
      </AppText>
      <AppText style={{fontSize: normalizeFont(16), color: colors.Nevada}}>{item.description}</AppText>
    </View>
  );

  const renderIndicator = () => (
    <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
      {walkthroughData.map((_, index) => (
        <View
          key={index}
          style={{
            height: 4,
            width: '30%',
            borderRadius: 2,
            backgroundColor: currentIndex === index ? colors.primary : '#d3d3d3',
            marginHorizontal: pixelSizeX(2),
          }}
        />
      ))}
    </View>
  );

  return (
    <>
      <SafeAreaView />
      <FocusAwareStatusBar />
      {/* Top Image */}
      <ImageBackground source={IMAGES.onBoard} style={{flex: 1, justifyContent: 'flex-end'}} resizeMode='cover'>
        {/* Walkthrough Section */}
        <View
          style={{flex: 0.4, backgroundColor: colors.background, borderTopRightRadius: 25, borderTopLeftRadius: 25}}>
          {/* Dashes/Indicator */}
          {renderIndicator()}
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={walkthroughData}
            initialScrollIndex={currentIndex}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderWalkthroughItem}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            onScroll={event => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentIndex(index);
            }}
          />

          {/* Fixed Buttons */}
          <View
            style={{
              paddingHorizontal: pixelSizeX(20),
              paddingBottom: pixelSizeY(20),
              backgroundColor: colors.background,
            }}>
            <AppButton
              btnStyle={{backgroundColor: colors.secondary}}
              textStyle={{color: colors.primary1}}
              title='Login'
              onPress={onPressLogin}
              style={{marginBottom: pixelSizeY(10)}}
            />
            <AppButton
              btnStyle={{backgroundColor: colors.primary1}}
              textStyle={{color: colors.inputColor}}
              title='Create Account'
              onPress={onPressSignUp}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
