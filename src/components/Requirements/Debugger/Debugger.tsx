import React, {useCallback, useMemo, useState} from 'react';
import {FormikProps} from "formik";
import {useToggle} from "../hooks/useToggle";
import FormikFieldUpdater from "./FormikFieldUpdater";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import  Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

enum FormikDebuggingTools {
    VALUES = "VALUES",
    INITIAL_VALUES = "INITIAL VALUES",
    ERRORS = "ERRORS",
    TOUCHED = "TOUCHED",
    ETC = "ETC",
    FIELD_UPDATER = "FIELD UPDATER",
    CUSTOM_TOOLS = "CUSTOM TOOLS"
}

const listOfToolsAsKeys = Object.keys(FormikDebuggingTools) as (keyof typeof FormikDebuggingTools)[];
const toolOptions = listOfToolsAsKeys.map((toolKeyname) => ({
    id: FormikDebuggingTools[toolKeyname],
    displayName: FormikDebuggingTools[toolKeyname],
}));
const customToolPlaceholder: DebuggerProps["customTools"] = []


export type DebuggerProps = {
    formik: FormikProps<any>
    customTools?: React.ReactNode[]
}

const Debugger = ({formik, customTools=customToolPlaceholder}: DebuggerProps) => {
    const {validateForm, resetForm, ...formikRest} = formik;
    const {values, errors, touched, initialValues, ...formikETC} = formikRest;

    const [isDebuggerOpen, {toggleOff: closeDebugger, toggle: toggleDebugger}] = useToggle(false);
    const [selectedTool, setSelectedTool] = useState<FormikDebuggingTools | null>(null);


    const handleForceValidate = useCallback(() => validateForm(values), [validateForm, values]);
    const handleResetForm = useCallback(
        () => resetForm(formik.initialValues),
        [formik.initialValues, resetForm],
    );
    const handleToggleButtonChange = useCallback(
        (_event, value) => setSelectedTool(value),
        [],
    );

    const content = useMemo(() => {
        const convertObjectToJSX = (value: Record<string, unknown>) => (
            <pre>{JSON.stringify(value, null, 2)}</pre>
        );

        switch (selectedTool) {
            case null:
                return <span>Select a tool to begin</span>;
            case FormikDebuggingTools.VALUES:
                return convertObjectToJSX(values);
            case FormikDebuggingTools.INITIAL_VALUES:
                return convertObjectToJSX(initialValues);
            case FormikDebuggingTools.ERRORS:
                return convertObjectToJSX(errors);
            case FormikDebuggingTools.TOUCHED:
                return convertObjectToJSX(touched);
            case FormikDebuggingTools.ETC:
                return convertObjectToJSX(formikETC);
            case FormikDebuggingTools.FIELD_UPDATER:
                return <FormikFieldUpdater formik={formik}/>;
            case FormikDebuggingTools.CUSTOM_TOOLS:
                return customTools
            default:
                return <span>Invalid tool selected</span>;
        }
    }, [errors, formik, formikETC, initialValues, selectedTool, touched, values]);

    return (
        <Stack gap={2}>
            <ButtonGroup fullWidth>
                <Button onClick={handleForceValidate}>Force Validate</Button>
                <Button onClick={handleResetForm}>Reset Form</Button>
            </ButtonGroup>
            <Box display={"flex"} justifyContent={"center"}>
            <ToggleButtonGroup
                color="secondary"
                value={selectedTool}
                exclusive
                onChange={handleToggleButtonChange}
                aria-label="Platform"
            >
                {toolOptions.map((item) => {
                    if(item.displayName === FormikDebuggingTools.CUSTOM_TOOLS && customTools?.length === 0 ){
                        return null
                    }
                    return <ToggleButton key={item.id} value={item.id}>{item.displayName}</ToggleButton>
                })}
            </ToggleButtonGroup>
            </Box>
            <Box height="25rem" overflow="auto" sx={{ overflowY: "overflow" }}>
                {content}
            </Box>
        </Stack>
    );
};

export default Debugger;
