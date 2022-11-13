import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StatusBar,
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image'

import { ScrollView, ViewStyle } from 'react-native';
import {
  RewardedAdEventType,
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  TestIds
} from 'react-native-google-mobile-ads';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../assets/images';
import AppLoader from '../components/AppLoader';
import BoldText from '../components/BoldText';
import LargeRoundedButton from '../components/LargeRoundedButton';
import Root from '../components/Root';
import RoundedImageInput from '../components/RoundedImageInput';
import RoundedImageInputButton from '../components/RoundedImageInputButton';
import appContants from '../constants/appContants';
import colors from '../constants/colors';
import { validateEmail } from '../utils/StringUtils';
import { ErrorToast, SuccessToast } from '../utils/ToastUtils';
import ActionSheet from 'react-native-actionsheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useGallery from '../hooks/useGallery';
import {
  MyBackButton,
  MyHeader,
  MyHeaderButton,
} from '../navigation/MainNavigation';
import { AddReminderReq, Reminder } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReminder,
  addReminders,
  updateReminder,
} from '../store/actions/remindersActions';
import NetworkLogger from 'react-native-network-logger';
import moment, { isMoment } from 'moment';
import {
  convertDateToAPIFormat,
  convertDateToUnixFormat,
  convertUnixDateToAPIFormat,
} from '../utils/MiscUtils';
import CreateUrlModal from '../components/CreateUrlModal';
import RoundedImageButton from '../components/RoundedImageButton';
import AdmobBannerAd from "../components/AdmobBannerAd";
import Modal from 'react-native-modal';
import axios from '../axios.auth';


const PREMIUM_POINTS_KEY = "premium-points";

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: colors.globalBg,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
  overflow: 'hidden',
  paddingHorizontal: 15,
};

const SAVE_BUTTON_STYLE: ViewStyle = {
  marginTop: 30,
  width: '50%',
  alignSelf: 'center',
};

const CLOSE_BUTTON_STYLE: ViewStyle = {
  marginBottom: 30,
  width: '50%',
  alignSelf: 'center',
};

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: colors.secondry,
};

const NAME = 'NAME';
const EMAIL = 'EMAIL';
const WHATSAPP = 'WHATSAPP';
const MESSAGE = 'MESSAGE';

type AddReminderScreenProps = {
  navigation: any;
  route: any;
};

let adUnitId = Platform.OS == "ios" ? 'ca-app-pub-6913209057057592/9315181188' : "ca-app-pub-6913209057057592/4034934349";
// adUnitId = TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

function AddReminderScreen(props: AddReminderScreenProps) {
  const { navigation, route } = props;
  const params = route?.params;
  const reminderData: Reminder = params?.reminderData;

  const isEdit = useMemo(() => !!reminderData, [reminderData?.rem_id]);
  const editId = useMemo(() => reminderData?.rem_id, [reminderData?.rem_id]);
  const editDate = useMemo(() => {
    if (reminderData?.event_date) {
      return convertDateToUnixFormat(reminderData?.event_date) * 1000;
    } else {
      return '';
    }
  }, [reminderData?.event_date]);

  // useMemo(() => {
  //   if (reminderData?.event_date) {
  //     const dateArray = reminderData?.event_date.split('-')
  //     const date = moment()
  //     if (dateArray && dateArray.length) {
  //       date.set({
  //         date: dateArray[0],
  //         month: dateArray[1]-1,
  //         year: dateArray[2]
  //       })
  //     }
  //     return dateArray && dateArray.length ? new Date(date).getTime() : ''
  //   } else {
  //     return ''
  //   }
  // }, [reminderData?.dob])

  const user = useSelector((state: any) => state.auth);

  const [premiumPoints, setPremiumPoints] = useState(0);
  const [isPremiumCard, selectedPremiumCard] = useState(false);

  const dispatch = useDispatch();
  const { openGalleryHandler: openGallery } = useGallery(false);

  const nameRef = useRef<TextInput | any>();
  const emailRef = useRef<TextInput | any>();
  const phoneRef = useRef<TextInput | any>();
  const whatsappNumberRef = useRef<TextInput | any>();
  const messageRef = useRef<TextInput | any>();

  const mountedRef = useRef(false);
  const actionSheetRef = useRef<any>(null);
  const createUrlModalRef = useRef<any>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(reminderData?.rem_name || '');
  const [email, setEmail] = useState(reminderData?.email || '');
  const [waNumber, setWANumber] = useState(reminderData?.whatsapp || '');
  const [occationType, setOccationType] = useState(
    reminderData?.event_type
      ? reminderData?.event_type === 'Bir'
        ? 'Birthday'
        : 'Anniversary'
      : '',
  );
  const [occasionDate, setOccasionDate] = useState<any>(editDate || '');
  const [message, setMessage] = useState<string>(reminderData?.message || '');
  const [image, setImage] = useState<string>(
    reminderData?.celeb_picture
      ? appContants.BASE_IMAGE_URL + reminderData?.celeb_picture
      : '',
  );
  const [imgBase64, setImgBase64] = useState<any>();

  const [isVisible, setIsVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(
    reminderData?.card_id || '',
  );

  useEffect(() => {

    fetchPremiumPoints();

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      // setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        Alert.alert("Congrats", "You just won 10 points");

        const newPoints = premiumPoints + 10;
        updatePremiumPoints(newPoints)
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  useEffect(() => {
    getCards();
  }, []);

  const fetchPremiumPoints = async () => {

    const _points = await AsyncStorage.getItem(PREMIUM_POINTS_KEY);
    if (_points) {
      setPremiumPoints(Number(_points));
    }

  }

  const updatePremiumPoints = async (_points: number) => {
    setPremiumPoints(_points);
    await AsyncStorage.setItem(PREMIUM_POINTS_KEY, _points.toString())
    fetchPremiumPoints();
  }

  const getCards = async () => {
    try {
      const response = await axios({
        url: 'authentication/getCards',
        method: 'GET',
      });
      if (response?.data?.response) {

        const cardsList = response.data.response;

        if (isEdit) {
          const card = cardsList.find(card => card.id == reminderData?.card_id);

          if (card) {
            setSelectedCard(card);
          }
        }

        cardsList.sort(() => Math.random() - 0.5);
        // setCards(cardsList.reverse());

        setCards(cardsList);
      }
    } catch (error) {
      console.log('GET CARDS ERROR', error);
    }
  };

  const questionButtonPressHandler = useCallback(() => {
    const { dismissHandler, setVisibleHandler } = createUrlModalRef.current;
    setVisibleHandler();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation, route, options, back }: any) => {
        return (
          <MyHeader
            title={isEdit ? 'Edit Reminder' : 'Add Reminder'}
            leftButton={<MyBackButton onPress={navigation.goBack} />}
            rightButton={
              !isEdit ? (
                <MyHeaderButton
                  image={images.ic_question_mark}
                  onPress={questionButtonPressHandler}
                />
              ) : null
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
    });
  }, [navigation, isEdit, questionButtonPressHandler]);

  const onSubmitTextHandler = useCallback(textInputId => {
    switch (textInputId) {
      case NAME:
        emailRef.current?.focus();
        break;
      case EMAIL:
        phoneRef.current?.focus();
        break;
      case WHATSAPP:
        // whatsappNumberRef.current?.focus()
        Keyboard.dismiss();
        break;
      default:
        break;
    }
  }, []);

  const onTextChangeHandler = useCallback((textInputId, enteredText) => {
    switch (textInputId) {
      case NAME:
        setName(enteredText);
        break;
      case EMAIL:
        setEmail(enteredText);
        break;
      case WHATSAPP:
        setWANumber(enteredText);
        break;
      case MESSAGE:
        setMessage(enteredText);
        break;
      default:
        break;
    }
  }, []);

  const checkValidation = useCallback(() => {
    try {
      if (!image || !image.trim()) {
        ErrorToast('Please select image to continue.');
        return false;
      }
      if (!name || !name.trim()) {
        ErrorToast('Please enter your name.');
        return false;
      }
      if (!email || !email.trim()) {
        ErrorToast('Please enter your email.');
        return false;
      }
      if (!validateEmail(email.trim())) {
        ErrorToast('Please enter a valid email-address.');
        return false;
      }
      if (!waNumber || !waNumber.trim()) {
        ErrorToast('Please enter user whatsapp number.');
        return false;
      }
      if (isNaN(+waNumber)) {
        ErrorToast('Please enter a valid whatsapp number.');
        return false;
      }
      if (!occationType) {
        ErrorToast('Select occasion to continue.');
        return false;
      }
      if (!occasionDate) {
        ErrorToast('Select occasion date to continue.');
        return false;
      }
      if (selectedCard?.id == '') {
        ErrorToast('Select card to continue.');
        return false;
      }
      return true;
    } catch (err: any) {
      console.log('[checkValidation] Error : ', err.message);
      return false;
    }
  }, [image, email, name, waNumber, occasionDate, occationType, selectedCard]);

  const savePressHandler = useCallback(async () => {
    try {
      if (checkValidation()) {
        // setIsLoading(true);
        const data: AddReminderReq = {
          email: email,
          event_date: convertUnixDateToAPIFormat(occasionDate),
          event_type: occationType === 'Birthday' ? 'Bir' : 'Anni',
          fullname: name,
          image_data: image,
          logged_in: user.u_id,
          message: message,
          phone: waNumber,
          card_id: selectedCard.id,
        };
        // if (isEdit) {
        //   await dispatch(updateReminder(data, +editId));
        // } else {
        //   await dispatch(addReminder(data));
        // }
        // if (isPremiumCard) {
        //   const newPoints = premiumPoints - 10;
        //   updatePremiumPoints(newPoints);
        //   selectedPremiumCard(false);
        // }

        // setIsLoading(false);
        // SuccessToast(`Reminder ${isEdit ? 'Updated' : 'Added'} Successfully`);
        // navigation.goBack();
        navigation.navigate("reminderCardView", {
          data,
          imgBase64,
          isPremiumCard,
          isEdit,
          editId,
          premiumPoints,
          setPremiumPoints,
          updatePremiumPoints,
          selectedPremiumCard

        });
      }
    } catch (err: any) {
      console.log(err?.response?.data ?? err?.message);
      setIsLoading(false);
      ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG);
      console.log('[savePressHandler] Error : ', err.message);
    }
  }, [
    checkValidation,
    dispatch,
    isEdit,
    editId,
    navigation,
    email,
    name,
    waNumber,
    occasionDate,
    occationType,
    image,
    user.u_id,
    message,
    selectedCard,
    isPremiumCard
  ]);

  const onOccasionTypeSelect = useCallback((index: number) => {
    if (index === 0) {
      setOccationType('Birthday');
    } else if (index === 1) {
      setOccationType('Anniversary');
    }
  }, []);

  const openGalleryHandler = useCallback(async () => {
    try {
      const gallerRes = await openGallery('image', true);
      if (gallerRes?.base64) {
        setImgBase64(gallerRes?.base64);
      }
      if (gallerRes && gallerRes?.uri) {
        setImage(gallerRes.uri);
      }
    } catch (err: any) {
      console.log('[openGalleryHandler] Error : ', err.message);
    }
  }, []);

  const pickThisCard = (item) => {

    setSelectedCard(item);
    setIsVisible(false);
  }

  const renderCards = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          marginTop: 40,
          marginHorizontal: 20,
          backgroundColor: colors.lighterGrey,
          borderRadius: 10
        }}
        onPress={() => {

          // return pickThisCard(item);

          if (item.premium) {
            if (premiumPoints >= 10) {
              selectedPremiumCard(true);
              pickThisCard(item);
            } else {
              Alert.alert(
                "Alert",
                "You need at-least 10 Points to select a Premium Card. To get Points Watch Ad now",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "Watch Ad",
                    onPress: () => {
                      if (rewarded.loaded) {
                        rewarded.show();
                      }
                    }
                  }
                ]
              )
            }
          } else {
            pickThisCard(item);
          }
        }}>

        <FastImage
          style={{ width: '100%', height: 500, borderRadius: 10 }}
          source={{
            uri: item.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        {
          item.premium &&
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "absolute",
              top: 0,
              right: 0,
              paddingHorizontal: 12,
              backgroundColor: "#0007",
              borderRadius: 10
            }}
          >

            <Text
              style={{
                fontWeight: "bold",
                color: "#fff"

              }}
            >
              Premium
            </Text>
            <Image
              width={40}
              height={40}
              source={images.ic_premium}
              style={{ width: 40, height: 40 }}
            />


          </View>
        }
      </TouchableOpacity>
    );
  };

  const renderCardModal = () => {
    return (
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver={true}
        style={{ flex: 1, margin: 0 }}>
        <View style={MODAL_CONTAINER}>
          <SafeAreaView style={{ flex: 1 }} >

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {`${premiumPoints} Points`}
              </Text>
              <Pressable
                onPress={() => setIsVisible(false)}
              >
                <Image
                  source={images.ic_close}
                  width={32}
                  height={32}
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: colors.primary,
                  }}
                />

              </Pressable>
            </View>

            <FlatList
              data={cards}
              renderItem={renderCards}
              keyExtractor={item => item.id}
              style={{ flex: 1 }}
            />

            <AdmobBannerAd />
          </SafeAreaView>
        </View>
      </Modal>
    );
  };


  return (
    <View

      style={{
        backgroundColor: colors.globalBg,
        flex: 1
      }}
    >


      <Root unsafe style={ROOT}>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
        <AppLoader isVisible={isLoading} />
        <CreateUrlModal ref={createUrlModalRef} />
        <ActionSheet
          ref={actionSheetRef}
          title={'Choose your ideal match'} // {'Which one do you like ?'}
          options={['Birthday', 'Anniversary', 'Cancel']}
          tintColor={colors.primary}
          cancelButtonIndex={2}
          destructiveButtonIndex={undefined}
          onPress={onOccasionTypeSelect}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(selectedDate: any) => {
            setOccasionDate(new Date(selectedDate).getTime());
            setDatePickerVisibility(false);
          }}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
        />
        {/* <NetworkLogger style={{ height: 200 }} /> */}
        <ScrollView
          contentContainerStyle={{
            minHeight: '100%',
            backgroundColor: colors.globalBg,
          }}
          alwaysBounceVertical={false}>
          <View style={INPUT_CONTAINER}>
            <Pressable
              style={{
                marginVertical: 10,
                alignSelf: 'center',
                overflow: 'hidden',
                height: image ? 80 : 100,
                width: image ? 80 : 200,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: image ? 40 : 0,
                borderWidth: image ? 2 : 0,
              }}
              onPress={openGalleryHandler}>
              <Image
                source={image ? { uri: image } : images.ic_gallery}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: image ? 40 : 0,
                }}
                resizeMode="contain"
              />
              {!image && <BoldText>{'Upload Celebrant Photo'}</BoldText>}
            </Pressable>
            <RoundedImageInput
              ref={nameRef}
              logo={images.ic_username}
              value={name}
              onChangeText={onTextChangeHandler.bind(null, NAME)}
              autoCapitalize="none"
              keyboardType="default"
              placeholder={'Name'}
              maxLength={20}
              onSubmitEditing={onSubmitTextHandler.bind(null, NAME)}
            />
            <RoundedImageInput
              ref={emailRef}
              logo={images.ic_email}
              value={email}
              onChangeText={onTextChangeHandler.bind(null, EMAIL)}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={'Email address'}
              onSubmitEditing={onSubmitTextHandler.bind(null, EMAIL)}
            />
            <RoundedImageInput
              ref={whatsappNumberRef}
              logo={images.ic_whatsapp}
              value={waNumber}
              onChangeText={onTextChangeHandler.bind(null, WHATSAPP)}
              autoCapitalize="none"
              keyboardType="numeric"
              maxLength={10}
              placeholder={'Whatsapp Phone'}
              onSubmitEditing={onSubmitTextHandler.bind(null, WHATSAPP)}
            />
            <RoundedImageInputButton
              logo={images.ic_menu}
              onPress={() => {
                actionSheetRef.current.show();
              }}
              text={occationType || 'Select Event Type'}
            />
            <RoundedImageInputButton
              logo={images.ic_calendar}
              onPress={() => setDatePickerVisibility(true)}
              text={
                occasionDate
                  ? new Date(occasionDate).toDateString().substr(0, 10)
                  : 'Select Event Date'
              }
            />
            <RoundedImageInput
              ref={messageRef}
              logo={images.ic_text}
              value={message}
              onChangeText={onTextChangeHandler.bind(null, MESSAGE)}
              autoCapitalize="none"
              keyboardType="default"
              placeholder={'Custom Greeting Message'}
              maxLength={100}
              onSubmitEditing={onSubmitTextHandler.bind(null, MESSAGE)}
            />
            <RoundedImageButton
              logo={images.ic_gallery}
              text={selectedCard.image ? "Change Card" : "Select Card"}
              image={selectedCard.image}
              onPress={() => setIsVisible(true)}
            />
          </View>


          <AdmobBannerAd />


          <LargeRoundedButton
            style={SAVE_BUTTON_STYLE}
            // title={isEdit ? 'UPDATE' : 'SAVE'}
            title='Preview'
            onPress={savePressHandler}
          />
        </ScrollView>
        {renderCardModal()}
      </Root>

    </View>
  );
}

export default AddReminderScreen;
