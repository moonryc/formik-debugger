import * as yup from "yup";


export const formikInitialState = {
    username: "",
    password: "",
} as const


export const formikSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .test('is-arthur-dent', 'username is not Arthur Dent', (username) => {
            return username === 'Arthur Dent';
        }),
    password: yup
        .string()
        .required()
        .test('is-password-42', 'password is not \'42\'', (password) => {
            return password === '42';
        }),
});