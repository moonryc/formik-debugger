import React from "react"
import {DebuggerModal} from "../components"
import {useToggle} from "../components/Requirements/hooks/useToggle";
import Button from "@mui/material/Button";
import {formikInitialState, formikSchema} from "./formikMock";
import {FormikConfig, useFormik} from "formik";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {Typography} from "@mui/material";


const DebuggerModalSetup = () => {
    const [isOpen, {toggle, toggleOff}] = useToggle(false)


    const formik = useFormik<typeof formikInitialState>({
        initialValues: formikInitialState,
        validationSchema: formikSchema,
        validateOnMount: true,
        validateOnChange: true
    } as FormikConfig<typeof formikInitialState>)

    return (
        <Stack gap={2} p={2}>
            <Typography variant={"h6"} textAlign={"center"}>Use the debugger to determine the correct valid login</Typography>
            <TextField inputProps={{autocomplete:"off"}}  label={"username"} name={"username"} required value={formik.values.username}
                       onChange={formik.handleChange} onBlur={formik.handleBlur}
                       helperText={formik.errors.username && "Use The Formik Debugger to find the correct username"}
            />
            <TextField  inputProps={{autocomplete:"off"}} label={"password"} name={"password"} required value={formik.values.password}
                       onChange={formik.handleChange} onBlur={formik.handleBlur}
                       error={formik.touched.password && Boolean(formik.errors.password)}
                       helperText={formik.errors.password && "Use The Formik Debugger to find the correct password"}
            />
            <Typography variant={"h1"} color={formik.isValid ? "green" : "red"}>Login
                is {formik.isValid ? "VALID" : "INVALID"}</Typography>

            <Button size={"large"} variant={"contained"} onClick={toggle}>FORMIK</Button>
            <DebuggerModal open={isOpen} onClose={toggleOff} formik={formik}/>
        </Stack>
    )
}


export default {
    title: "Components/DebuggerModal",
    component:
    DebuggerModalSetup,
    tags:
        [
            'autodocs'],
    parameters:
        {
            // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
            layout: 'centered',
        }
    ,
}

export const Primary
    = {
    args:
        {}
    ,
};
