import React, { useCallback, useMemo, useState } from "react";

import {type TextFieldProps} from "@mui/material/TextField";

import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";
import AutoCompleteSingleSelect, { AutoCompleteSingleSelectProps, type DropdownOption } from "../AutoCompleteSingleSelect/AutoCompleteSingleSelect"
import {useToggle} from "../hooks/useToggle";

type FormikFieldSelectorProps = {
    formik: FormikProps<any>;
};

const FormikFieldUpdater = ({ formik }: FormikFieldSelectorProps) => {
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [parseAsJSON, { toggle: toggleParseAsJSON }] = useToggle(false);

    const fieldNames = useMemo(() => Object.keys(formik.values).sort(), [formik.values]);

    const options: DropdownOption[] = useMemo(() => {
        return fieldNames.map<DropdownOption>((fieldName) => ({ id: fieldName, displayName: fieldName }));
    }, [fieldNames]);

    const handleAutoCompleteOnChange = useCallback<AutoCompleteSingleSelectProps["onChange"]>(
        (_event, value) => {
            if (!value) {
                setSelectedField(null);
                return;
            }
            //fieldname and id are the same here, dirty "hack" but it works in this isolated scenario
            setSelectedField(value.id);
        },
        [],
    );

    const handleTextFieldOnChange = useCallback<NonNullable<TextFieldProps["onChange"]>>(
        (event) => setText(event.target.value),
        [],
    );

    const handleUpdate = useCallback(() => {
        //If a field is not selected do nothing
        if (!selectedField) {
            return;
        }

        //prevents adding new fields to formik
        if (!fieldNames.includes(selectedField)) {
            return;
        }

        if (!parseAsJSON) {
            formik.setFieldValue(selectedField, text);
            return;
        }

        try {
            const parsedValue = JSON.parse(text) as unknown;
            formik.setFieldValue(selectedField, parsedValue);
        } catch (e) {
            alert("Was unable to JSON.parse, please check for errors in your text");
        }
    }, [fieldNames, formik, parseAsJSON, selectedField, text]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AutoCompleteSingleSelect
                    id="fieldName"
                    onChange={handleAutoCompleteOnChange}
                    value={selectedField}
                    options={options}
                    // eslint-disable-next-line react/jsx-no-bind
                    renderInput={(props) => <TextField {...props} fullWidth label="Field Name" />}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="New Value" multiline value={text} onChange={handleTextFieldOnChange} />
            </Grid>
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <FormControlLabel
                    control={<Switch checked={parseAsJSON} onChange={toggleParseAsJSON} />}
                    label="Use JSON.parse?"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Button fullWidth variant="contained" onClick={handleUpdate}>
                    Update
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormikFieldUpdater;