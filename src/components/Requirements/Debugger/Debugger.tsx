import React, {useCallback, useMemo, useState} from 'react';
import {FormikProps} from "formik";
import {useToggle} from "../hooks/useToggle";
import FormikFieldUpdater from "./FormikFieldUpdater";

enum FormikDebuggingTools {
    VALUES = "VALUES",
    INITIAL_VALUES = "INITIAL VALUES",
    ERRORS = "ERRORS",
    TOUCHED = "TOUCHED",
    ETC = "ETC",
    FIELD_UPDATER = "FIELD UPDATER",
}

const listOfToolsAsKeys = Object.keys(FormikDebuggingTools) as (keyof typeof FormikDebuggingTools)[];
const toolOptions = listOfToolsAsKeys.map((toolKeyname) => ({
    id: FormikDebuggingTools[toolKeyname],
    displayName: FormikDebuggingTools[toolKeyname],
}));

export type DebuggerProps = {
    formik: FormikProps<any>
    customTools?: React.ReactNode[]
}

const Debugger = ({formik, customTools}: DebuggerProps) => {
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
            default:
                return <span>Invalid tool selected</span>;
        }
    }, [errors, formik, formikETC, initialValues, selectedTool, touched, values]);

    return (
        <>
            <div>
                <div>
                    <button onClick={handleForceValidate}>Force Validate</button>
                    <button onClick={handleResetForm}>Reset Form</button>
                </div>
                <div>
                    {/*TOGGLE BUTTONS*/}
                    {toolOptions.map((item) => (
                        // <ToggleButton key={item.id} value={item.id}>
                        //     {item.displayName}
                        "help"
                        // </ToggleButton>
                    ))}
                </div>
                <div height="25rem" overflow="auto" styles={{overflowY: "overflow"}}>
                    {content}
                </div>
            </div>
        </>
    );
};

export default Debugger;
