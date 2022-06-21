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

const Pending = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  // useEffect(() => {
  //   saveTodoToUserDevice(todos);
  // }, [todos]);

  const addTodo = () => {
    Keyboard.dismiss();
    if (textInput == "") {
      Alert.alert("Error", "Please write something");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");
      saveTodoToUserDevice([...todos, newTodo]);
    }
  };

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

  const markTodoComplete = (todoId) => {
    const newTodosItem = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodosItem);
    saveTodoToUserDevice(newTodosItem);
  };

  const ListItem = ({ todo }) => {
    return (
      <ScrollView>
        {!todo?.completed && (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              marginBottom: 10,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                markTodoComplete(todo.id);
              }}
            >
              <Ionicons
                name="checkmark-circle-sharp"
                size={25}
                style={{ marginTop: 5 }}
                color="green"
              />
            </TouchableOpacity>

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
          Pending List
        </Text>
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
      >
        <View style={{ flex: 1, padding: 5 }}>
          <KeyboardAvoidingView behavior={"height"}>
            <TextInput
              value={textInput}
              placeholder="Enter your Task"
              onChangeText={(text) => setTextInput(text)}
              mode="outlined"
              activeoutlineColor="blue"
              dense="true"
              theme={{
                colors: {
                  primary: "#07b6ff",
                  underlineColor: "transparent",
                },
              }}
            />
          </KeyboardAvoidingView>
        </View>

        <TouchableOpacity
          style={{ marginBottom: 5 }}
          activeOpacity={0.7}
          onPress={addTodo}
        >
          <FAB
            small
            style={{
              backgroundColor: "#07b6ff",
            }}
            icon="plus"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Pending;
