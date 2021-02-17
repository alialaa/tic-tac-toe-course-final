import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
    weight: "400" | "700";
    children: ReactNode;
} & NativeTextProps;

const defaultProps = {
    weight: "700"
};

export default function Text({ children, style, weight, ...props }: TextProps): ReactElement {
    let fontFamily;
    if (weight === "400") {
        fontFamily = "DeliusUnicase_400Regular";
    }
    if (weight === "700") {
        fontFamily = "DeliusUnicase_700Bold";
    }
    return (
        <NativeText {...props} style={[{ fontFamily }, style]}>
            {children}
        </NativeText>
    );
}

Text.defaultProps = defaultProps;
