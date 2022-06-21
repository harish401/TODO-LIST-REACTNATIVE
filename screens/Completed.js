import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateField from "react-native-datefield";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider, TextInput } from "react-native-paper";
import { FAB, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const Completed = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  const saveTodoToUserDevice = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = (todoId) => {
    const newTodosItem = todos.filter((item) => item.id != todoId);
    Alert.alert("Confirm", "Delete this task?", [
      {
        text: "Yes",
        onPress: () => {
          setTodos(newTodosItem);
          saveTodoToUserDevice(newTodosItem);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const clearAllTodos = () => {
    Alert.alert("Confirm", "Clear All Task?", [
      {
        text: "Yes",
        onPress: () => {
          setTodos([]);
          saveTodoToUserDevice([]);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const ListItem = ({ todo, route }) => {
    return (
      <ScrollView>
        {todo?.completed && (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              marginBottom: 10,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "black",

                  textDecorationLine: todo?.completed ? "line-through" : "none",
                }}
              >
                {todo?.task}
              </Text>
            </View>
            {todo?.completed && (
              <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                <Ionicons name="trash" size={25} color="#07b6ff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#E8EAED",
        paddingBottom: 5,
      }}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 27,
            color: "black",
          }}
        >
          Completed List
        </Text>
        <Icon name="delete" size={30} color="#07b6ff" onPress={clearAllTodos} />
      </View>

      <View>
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          data={todos}
          renderItem={({ item }) => <ListItem todo={item} />}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      ></View>
    </SafeAreaView>
  );
};

export default Completed;
