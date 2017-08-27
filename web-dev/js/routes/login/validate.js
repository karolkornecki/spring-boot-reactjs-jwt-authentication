export const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Username is required.';
    } else if (values.username.length < 5 || values.username.length > 100) {
        errors.username = 'Username must contain between 5 and 100 characters!';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 4 || values.password.length > 50) {
        errors.password = 'Password must contain between 4 and 50 characters!!';
    }
    return errors;
}