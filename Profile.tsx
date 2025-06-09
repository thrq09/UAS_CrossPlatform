import React from 'react';
import { View, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './authSlice';

const Profile = () => {
    const datauser = useSelector((state) => state.auth.user);

    return(
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }} >
            {datauser ? (
                <>
                <Text>User Id: {datauser.email}</Text>
                <Text>User Id: {datauser.userId}</Text>
                <Text>User Id: {datauser.role}</Text>
                </>
            ) : (
                <Text>Belum Login</Text>
            )}
        </View>
    );
}

export default Profile;

