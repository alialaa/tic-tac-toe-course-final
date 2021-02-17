const getErrorMessage = (error: { [key: string]: any }): string => {
    const defaultError = "An error has occurred!";
    if (error.errors && error.errors.length > 0) {
        return error.errors[0].message || defaultError;
    }
    if (error.message) {
        return error.message;
    }
    return defaultError;
};

export default getErrorMessage;
