import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddEditNoteScreen from "./screens/AddEditNoteScreen"; 

const Stack =  createNativeStackNavigator();

const AppNavigator = () => {
    <Stack.Navigator>
        <Stack.screen name = "Notes" component = {HomeScreen} />
        <Stack.screen name =  "AddEdit" component = {AddEditNoteScreen} />
        </Stack.Navigator>
}

export default AppNavigator;