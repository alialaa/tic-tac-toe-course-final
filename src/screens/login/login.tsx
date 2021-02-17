import React, { ReactElement, useRef, useState } from "react";
import { Alert, ScrollView, TextInput as NativeTextInput, TouchableOpacity } from "react-native";
import { GradientBackground, TextInput, Button, Text } from "@components";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { RouteProp } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import styles from "./login.styles";

type LoginProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Login">;
    route: RouteProp<StackNavigatorParams, "Login">;
};

export default function Login({ navigation, route }: LoginProps): ReactElement {
    const redirect = route.params?.redirect;
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const login = async () => {
        setLoading(true);
        const { username, password } = form;
        try {
            await Auth.signIn(username, password);
            redirect ? navigation.replace(redirect) : navigation.navigate("Home");
        } catch (error) {
            if (error.code === "UserNotConfirmedException") {
                navigation.navigate("SignUp", { username });
            } else {
                Alert.alert("Error!", error.message || "An error has occurred!");
            }
        }
        setLoading(false);
    };
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    value={form.username}
                    onChangeText={value => {
                        setFormInput("username", value);
                    }}
                    returnKeyType="next"
                    placeholder="Username"
                    style={{ marginBottom: 20 }}
                    onSubmitEditing={() => {
                        passwordRef.current?.focus();
                    }}
                />
                <TextInput
                    value={form.password}
                    onChangeText={value => {
                        setFormInput("password", value);
                    }}
                    style={{ marginBottom: 30 }}
                    ref={passwordRef}
                    returnKeyType="done"
                    secureTextEntry
                    placeholder="Password"
                />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ForgotPassword");
                    }}
                >
                    <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button loading={loading} title="Login" onPress={login} />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    <Text style={styles.registerLink}>Don&apos;t have an account?</Text>
                </TouchableOpacity>
            </ScrollView>
        </GradientBackground>
    );
}
