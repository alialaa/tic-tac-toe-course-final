import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 120
    },
    logo: {
        height: 150,
        maxWidth: "60%",
        resizeMode: "contain"
    },
    buttons: {
        marginTop: 80
    },
    button: {
        marginBottom: 20
    },
    loggedInText: {
        color: colors.lightGreen,
        textAlign: "center",
        fontSize: 12
    }
});

export default styles;
