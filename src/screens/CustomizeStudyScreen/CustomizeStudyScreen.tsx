import { View, Text, FlatList, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { AppButton, AppCard, AppHeader, AppScreen, AppText, HeaderRightButton, InputTextLabel } from '../../components'
import { useTheme } from '@react-navigation/native'
import { CustomTheme, Globaltypography, STYLES } from '../../theme'
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '../../theme/size'
import { SVG } from '../../assets'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import CheckBox from '../../libraries/CheckBox/CheckBox'
import { ScrollView } from 'react-native-gesture-handler'


const data = [{ id: 1, name: 'Cardiology', selected: false },
{ id: 2, name: 'Dermatology', selected: false },
{ id: 3, name: 'Endocrinology', selected: false },
{ id: 4, name: 'General Medicine', selected: false },
{ id: 5, name: 'GI', selected: false },]

const CustomizeStudyScreen = () => {
    const { colors } = useTheme() as CustomTheme;
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState(0)
    const [activeCategory, setActiveCategory] = useState<null | number>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [sessionVisible, setSessionVisible] = useState(false)
    const [planName, setPlanName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [timeLimit, setTimeLimit] = useState('')
    const [sessions, setSessions] = useState([])
    const [limit, setLimit] = useState('')
    const [search, setSearch] = useState('')
    const [selectedAll, setSelectedAll] = useState(false)
    const [allSessions, setAllSessions] = useState(data)

    // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // // callbacks
    // const handlePresentModalPress = useCallback(() => {
    //     bottomSheetModalRef.current?.present();
    // }, []);
    // const handleSheetChanges = useCallback((index: number) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    const onPressRemove = (ind: number) => {
        const tempArr = [...sessions]

        const filterArray = tempArr.filter((val, index) => index !== ind)

        setSessions(filterArray)
    }

    const handleItemSelection = (id) => {
        // setSessions((prevItems) =>
        //     prevItems.map((item) =>
        //         item.id === id ? { ...item, selected: !item.selected } : item
        //     )
        // );

        setAllSessions((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );

        // Update the "Select All" state
        const allSelected = sessions.filter((item) => item.id !== id).every((item) => item.selected);
        setSelectedAll(allSelected);
    };

    // Handle "Select All" checkbox
    const handleSelectAll = () => {
        const newSelectAll = !selectedAll;
        setSelectedAll(newSelectAll);
        // setSessions((prevItems) =>
        //     prevItems.map((item) => ({ ...item, selected: newSelectAll }))
        // );
        setAllSessions((prevItems) =>
            prevItems.map((item) => ({ ...item, selected: newSelectAll }))
        );
    };



    const renderCategory = () => {
        return (
            <View >
                <FlatList data={[
                    { title: 'Cardiology', lightIcon: <SVG.HeartIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.HeartIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                    { title: 'Dermatology', lightIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                    { title: 'Dermatology', lightIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                    { title: 'Dermatology', lightIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                    { title: 'Dermatology', lightIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                    { title: 'Dermatology', lightIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.Nevada} />, darkIcon: <SVG.SkinIcon width={normalizeWidth(24)} height={normalizeHeight(24)} fill={colors.secondary} /> },
                ]}
                    // style={{flex:1}}
                    renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => setActiveCategory(index)} style={[styles.categoryCardCont, STYLES.bgColor(index === activeCategory ? colors.secondary : colors.white)]}>

                        <View style={STYLES.rowCenter} >
                            <View style={{ backgroundColor: index === activeCategory ? colors.primary1 : colors.inputColor, borderRadius: 8, padding: pixelSizeX(5), marginRight: pixelSizeX(10) }}>
                                {index === activeCategory ? item.darkIcon : item.lightIcon}
                            </View>
                            <AppText transText={item.title as any} style={{ color: index === activeCategory ? colors.primary1 : colors.Nevada, fontSize: normalizeFont(16), fontWeight: '500', }} />
                        </View>
                        <View style={{ backgroundColor: index === activeCategory ? colors.primary1 : colors.inputColor, borderRadius: 50, padding: pixelSizeX(4) }}>
                            <SVG.PlayIcon stroke={index === activeCategory ? colors.secondary : colors.Nevada} />
                        </View>
                    </TouchableOpacity>}
                />

                <AppButton
                    title={t('customizeStudy') as any}
                    onPress={() => setModalVisible(true)}
                    btnStyle={{ backgroundColor: colors.primary1, bottom: pixelSizeY(20) }}
                    textStyle={{ color: colors.inputColor }}
                // loading={loading}
                />
            </View>
        )
    }

    return (
        <View style={[STYLES.flex1, STYLES.bgColor(colors.background)]} >
            <AppHeader titleMode='flex' titleStyle={{ fontSize: normalizeFont(14), fontWeight: '400', color: colors.Ebony }} containerStyle={STYLES.pR(pixelSizeX(20))} title={t('customizeStudy')} titleContainerStyle={{ alignItems: 'flex-end' }} backBtn />
            <View style={STYLES.pH(pixelSizeX(20))}>

                <AppCard title='Pharmacology' desc='Dive into the science of drugs and their effects.' />

                <View style={[STYLES.rowCenterBt, STYLES.mT(pixelSizeY(10))]}>

                    {['Categories', 'History', 'Bookmarked'].map((val, index) => <TouchableOpacity onPress={() => setActiveTab(index)} activeOpacity={0.8} key={index} style={[styles.tabBtn, STYLES.mH(index === 1 ? pixelSizeX(10) : 0), STYLES.bgColor(index === activeTab ? colors.secondary : colors.inputColor)]}><AppText style={[STYLES.fontSize(normalizeFont(14), STYLES.color(colors.Ebony), STYLES.fontWeight('400'))]}>{val}</AppText></TouchableOpacity>)}

                </View>
                <AppText transText={activeTab === 0 ? 'category' : 'history'} style={{ color: colors.Ebony, fontSize: normalizeFont(18), fontWeight: '500', marginVertical: pixelSizeY(20) }} />

                {activeTab === 0 && renderCategory()}

            </View>


            <Modal transparent={true} animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.centeredView}
                //  onPress={() => setModalVisible(false)}
                >

                    <View style={styles.modalView} >
                            <ScrollView  style={{paddingHorizontal:0}}>
                        {/* <KeyboardAvoidingView> */}

                            <View style={[STYLES.rowCenterBt, STYLES.mB(pixelSizeY(20))]}>
                                <AppText transText={'customizeStudy'} style={{ color: colors.Ebony, fontSize: normalizeFont(18), fontWeight: '500' }} />

                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <SVG.CrossIcon stroke={colors.Ebony} />
                                </TouchableOpacity>
                            </View>

                            <InputTextLabel placeHolder={t('planPlaceholder')} textLable={'studyPlan'} onChangeText={setPlanName} value={planName} />

                            <View style={STYLES.rowCenterBt}>

                                <InputTextLabel rightIcon viewStyle={STYLES.width('48%')} placeHolder={t('startDate')} textLable={'deadLine'} onChangeText={setStartDate} value={startDate} >
                                    <SVG.Calendar2Icon stroke={colors.Ebony} />
                                </InputTextLabel>

                                <InputTextLabel rightIcon viewStyle={STYLES.width('48%')} placeHolder={t('endDate')} onChangeText={setEndDate} value={endDate} >
                                    <SVG.Calendar2Icon stroke={colors.Ebony} />

                                </InputTextLabel>

                            </View>

                            <InputTextLabel placeHolder={t('limitPlaceholder')} textLable={'timeLimit'} onChangeText={setTimeLimit} value={timeLimit} />


                            <AppText transText={'selectedSession'} style={{ color: colors.Ebony, fontSize: normalizeFont(16), fontWeight: '500', marginVertical: pixelSizeY(10) }} />

                            {sessions.map((val, index) => <TouchableOpacity activeOpacity={0.5} style={{ height: normalizeHeight(35), backgroundColor: colors.inputColor, borderRadius: 8, justifyContent: 'center', paddingHorizontal: pixelSizeX(10), marginBottom: pixelSizeY(10) }}>
                                <View style={STYLES.rowCenterBt}>

                                    <AppText transText={val.name} style={{ color: colors.Ebony, fontSize: normalizeFont(14), fontWeight: '400' }} />
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressRemove(index)}>

                                        <SVG.BinIcon stroke={colors.error} />
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>)}
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                setSessionVisible(true)
                            }} activeOpacity={0.5} style={{ height: normalizeHeight(35), backgroundColor: colors.background, borderRadius: 8, justifyContent: 'center', paddingHorizontal: pixelSizeX(10) }}>
                                <View style={STYLES.rowCenter}>

                                    <AppText transText={'addSession'} style={{ color: colors.lightBlue, fontSize: normalizeFont(14), fontWeight: '400' }} />
                                    <SVG.PlusIcon stroke={colors.lightBlue} />
                                </View>

                            </TouchableOpacity>


                            <AppText transText={'customizeCard'} style={{ color: colors.Ebony, fontSize: normalizeFont(16), fontWeight: '500', marginVertical: pixelSizeY(10) }} />
                            <View style={STYLES.rowCenterBt}>

                                {['10', '20', '30', '40', '50'].map((val) => <TouchableOpacity onPress={() => setLimit(val)} style={{ width: '19%', borderRadius: 4, backgroundColor: limit === val ? colors.primary1 : colors.inputColor, padding: pixelSizeX(5), alignItems: 'center', justifyContent: 'center', }}><AppText style={{ color: limit === val ? colors.white : colors.Nevada, fontSize: normalizeFont(16), fontWeight: '500' }}>{val}</AppText></TouchableOpacity>)}
                            </View>

                            <InputTextLabel viewStyle={STYLES.mT(pixelSizeY(-10))} placeHolder={t('enterCard')} onChangeText={setLimit} value={limit} />

                            <AppButton
                                title={t('startStudy') as any}
                                // onPress={() => setModalVisible(true)}
                                btnStyle={{ backgroundColor: colors.primary1 }}
                                textStyle={{ color: colors.inputColor }}
                            // loading={loading}
                            />

                        {/* </KeyboardAvoidingView> */}
                            </ScrollView>
                    </View>

                </TouchableOpacity>
            </Modal>

            <Modal transparent={true} animationType='slide' visible={sessionVisible} onRequestClose={() => setSessionVisible(false)}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.centeredView}
                //  onPress={() => setModalVisible(false)}
                >

                    <View style={styles.modalView} >
                        <AppText transText={'selectStudy'} style={{ color: colors.Ebony, fontSize: normalizeFont(18), fontWeight: '500', marginBottom: pixelSizeY(-20) }} />

                        <InputTextLabel textInputStyle={STYLES.pL(pixelSizeX(10))} viewStyle={{ width: '100%' }} placeHolder='Search here' leftIcon onChangeText={setSearch} value={search} >
                            <SVG.SearchIcon />
                        </InputTextLabel>

                        <CheckBox
                            tintColor={colors.Ebony}
                            onValueChanged={handleSelectAll}
                            value={selectedAll}
                            iconColor={colors.Ebony}
                            bgColor={colors.transparent}
                            title="Selected All"
                            style={{
                                title: [STYLES.color(colors.Ebony), STYLES.mL(5)],
                                container: [STYLES.pH(pixelSizeX(10)), STYLES.mV(pixelSizeY(10))]
                            }}

                        />


                        <ScrollView style={{ maxHeight: '70%' }}>
                            {allSessions.map(val => <TouchableOpacity>
                                <CheckBox
                                    tintColor={colors.Ebony}
                                    onValueChanged={() => handleItemSelection(val.id)}
                                    value={val.selected}
                                    iconColor={colors.Ebony}
                                    bgColor={colors.transparent}
                                    title={val.name}
                                    style={{
                                        title: [STYLES.color(colors.Ebony), STYLES.mL(5)],
                                        container: [STYLES.pH(pixelSizeX(10)), STYLES.mV(pixelSizeY(10))]
                                    }}

                                />
                            </TouchableOpacity>)}
                        </ScrollView>
                        <View style={[STYLES.rowCenterBt, { position: 'absolute', alignSelf: 'center', bottom: pixelSizeY(20) }]}>

                            <AppButton
                                title={t('cancel') as any}
                                onPress={() => {
                                    setSessionVisible(false)
                                    setModalVisible(true)
                                }}
                                btnStyle={{ backgroundColor: colors.secondary, width: '49%' }}
                                textStyle={{ color: colors.primary1 }}
                            // loading={loading}
                            />

                            <AppButton
                                title={t('continue') as any}
                                onPress={() => {
                                    setSessions(allSessions.filter(val => val.selected))
                                    setSessionVisible(false)
                                    setModalVisible(true)
                                }}
                                btnStyle={{ backgroundColor: colors.primary1, width: '49%' }}
                                textStyle={{ color: colors.inputColor }}
                            // loading={loading}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default CustomizeStudyScreen