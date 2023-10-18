export const getButtonStyle = (button: string, activeButton: string, styles: any) => {
    if (button === activeButton) {
        return [styles.roundedButton, styles.activeButton];
    }
    return styles.roundedButton;
}

export const getButtonTextStyle = (button: string, activeButton: string, styles: any) => {
    if (button === activeButton) {
        return [styles.buttonText, styles.activeButtonText];
    }
    return styles.buttonText;
}
