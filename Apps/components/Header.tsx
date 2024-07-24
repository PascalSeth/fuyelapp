import { View, Text, Image, TextInput, Button } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

type Props = {}

const Header = (props: Props) => {
  return (
    <View className='p-10 pb-5 bg-white w-full'>
    <View className='flex flex-row items-center justify-between  '>
      <View>
        <Text className='font-semibold text-[24px]'>Hi, <Text className='text-purple-600'>Eva</Text></Text>
        <Text className='font-[500]'>Stock up on all your agric supplies </Text>
      </View>
        <View className=''>
            <Image source={{uri:'https://images.hitpaw.com/topics/3d/profile-photo-1.jpg'}} alt='' className='w-12 h-12 rounded-full'  />
        </View>
    </View>
    <View className='mt-5 mx-2'>
      <View className='bg-[#b4aeae39] p-3 w-full flex items-center flex-row rounded-[12px]'> 
        <Ionicons name='search' icon='search' size={22} />    
         <TextInput placeholder='Search' className='ml-2 w-fit text-[18px] '/>
      </View>

    </View>
    </View>
  )
}

export default Header