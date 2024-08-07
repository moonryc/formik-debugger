import React from "react"
import {DebuggerModal} from "../components"
import {useToggle} from "../components/Requirements/hooks/useToggle";
import Button from "@mui/material/Button";
import {formikMock} from "./formikMock";
import Box from "@mui/material/Box";
import {useFormik} from "formik";
import * as yup from "yup"

const initialState = {
    username: "",
    password: "",
    birthDate: new Date(),
    agreeToTOC: false
} as const


const schema = yup.object({
    username: yup.string().length(25),
    password: yup.string().length(25),
    birthdate: yup.date(),
    agreeToTOC: yup.boolean().isTrue()
    })

const DebuggerModalSetup = () =>{
    const [isOpen, {toggle, toggleOff}] = useToggle(false)


    const formik = useFormik({
        initialValues: initialState,
        validationSchema: schema,
    })

    return (
        <Box>
            <Button size={"large"} variant={"contained"} onClick={toggle}>FORMIK</Button>
            <DebuggerModal open={isOpen} onClose={toggleOff} formik={formik}/>
        </Box>
    )
}


export default {
    title: "Components/DebuggerModal",
    component: DebuggerModalSetup,
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',

    },
}

export const Primary = {
    args: {},
};
