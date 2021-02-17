import { colors, globalStyles } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    text: {
        color: colors.lightGreen,
        marginBottom: 20
    }
});

export default styles;
