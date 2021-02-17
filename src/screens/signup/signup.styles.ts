import { colors, globalStyles } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    otpInputBox: {
        color: colors.lightGreen,
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 20,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: colors.purple,
        borderBottomWidth: 1,
        borderColor: colors.lightGreen
    },
    otpActiveInputBox: {
        borderWidth: 1,
        borderColor: colors.lightPurple
    },
    otpText: {
        color: colors.lightGreen
    },
    resendLink: {
        color: colors.lightGreen,
        textAlign: "center",
        textDecorationLine: "underline"
    }
});

export default styles;
