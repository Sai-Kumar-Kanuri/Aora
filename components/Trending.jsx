import { FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);
    // console.log(item.video);
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-73 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{
                            uri: item.thumnail
                        }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode='cover'
                    />

                    <Image
                        source={icons.play}
                        className="h-12 w-12 absolute"
                        resizeMode='contain'
                    />
                </TouchableOpacity>)}
        </Animatable.View>

    )
}

const Trending = ({ posts }) => {
    const [activeItem, setactiveItem] = useState(posts[0]);


    const viewableItemChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setactiveItem(viewableItems[0].key)
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={
                { itemVisiblePercentThreshold: 70 }
            }
            contentOffset={{ x: 170 }}
        />
    )
}

export default Trending