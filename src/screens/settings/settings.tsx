import React, { ReactElement } from "react";
import { ScrollView, View, TouchableOpacity, Switch } from "react-native";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";
import { colors } from "@utils";
import { difficulties, useSettings } from "@contexts/settings-context";
import { useAuth } from "@contexts/auth-context";
import { StackNavigatorParams } from "@config/navigator";
import { StackNavigationProp } from "@react-navigation/stack";

type SettingsScreenNavigationProp = StackNavigationProp<StackNavigatorParams, "Settings">;

type SettingsProps = {
    navigation: SettingsScreenNavigationProp;
};

export default function Settings({ navigation }: SettingsProps): ReactElement | null {
    const { settings, saveSetting } = useSettings();
    const { user } = useAuth();
    if (!settings) return null;
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulties).map(level => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        saveSetting(
                                            "difficulty",
                                            level as keyof typeof difficulties
                                        );
                                    }}
                                    style={[
                                        styles.choice,
                                        {
                                            backgroundColor:
                                                settings.difficulty === level
                                                    ? colors.lightPurple
                                                    : colors.lightGreen
                                        }
                                    ]}
                                    key={level}
                                >
                                    <Text
                                        style={[
                                            styles.choiceText,
                                            {
                                                color:
                                                    settings.difficulty === level
                                                        ? colors.lightGreen
                                                        : colors.darkPurple
                                            }
                                        ]}
                                    >
                                        {difficulties[level as keyof typeof difficulties]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Sounds</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={settings.sounds}
                        onValueChange={() => {
                            saveSetting("sounds", !settings.sounds);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Haptics/Vibrations</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={settings.haptics}
                        onValueChange={() => {
                            saveSetting("haptics", !settings.haptics);
                        }}
                    />
                </View>
                {user && (
                    <View style={[styles.field, styles.switchField]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ChangePassword");
                            }}
                        >
                            <Text style={[styles.label, { textDecorationLine: "underline" }]}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </GradientBackground>
    );
}
