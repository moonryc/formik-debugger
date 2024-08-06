import { fn } from '@storybook/test';

export const formikMock:FormikProps<any> = {
    // Mock form state
    values: {},
    errors: {},
    touched: {},
    handleChange: fn(),
    handleBlur: fn(),
    handleSubmit: fn(),
    setFieldValue: fn(),
    setFieldTouched: fn(),
    setFieldError: fn(),
    setValues: fn(),
    setErrors: fn(),
    setTouched: fn(),
    resetForm: fn(),
    submitForm: fn(),
    validateForm: fn(),
    validateField: fn(),
    isValid: true,
    dirty: false,
    isSubmitting: false,
    isValidating: false,
    status: null,
    // Add any additional props as needed
};