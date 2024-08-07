import React, { memo, useCallback, useMemo } from "react";

import type { AutocompleteProps, AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import type {UseAutocompleteProps} from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";


import type { DropdownOption, FlexibleOption } from "./utils";
import {
    filterOptions,
    flexibleDropdownOptionsToDropdownOptions,
    getOptionLabel,
    isOptionEqualToValue,
    renderOptionSolo,
} from "./utils";
import cloneEvent from "./cloneEvent";

type AutoCompleteSingleSelectOnChange = NonNullable<
    UseAutocompleteProps<DropdownOption, false, false, false>["onChange"]
>;
type AutoCompleteSingleSelectOnBlur = NonNullable<
    AutocompleteProps<DropdownOption, false, false, false>["onBlur"]
>;
type AutoCompleteSingleSelectOnChangeParams = Parameters<AutoCompleteSingleSelectOnChange>;
type AutoCompleteSingleSelectOnChangeProxy = (
    event: ClonedEvent,
    value?: AutoCompleteSingleSelectOnChangeParams[1],
    reason?: AutoCompleteSingleSelectOnChangeParams[2],
    details?: AutoCompleteSingleSelectOnChangeParams[3],
) => void;
type AutoCompleteSingleSelectOnSelectProxy = (event: ClonedEvent) => void;

export type AutoCompleteSingleSelectProps = {
    id: string;
    onChange: AutoCompleteSingleSelectOnChangeProxy;
    onBlur?: AutoCompleteSingleSelectOnSelectProxy;
    value: DropdownOption | number | string | null;
    options: UseAutocompleteProps<FlexibleOption, false, false, false>["options"];
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
    disableClearable?: boolean;
    fullWidth?: boolean;
    name?: string;
    disabled?: boolean;
};

const AutoCompleteSingleSelect: React.FC<AutoCompleteSingleSelectProps> = memo(
    ({
         id,
         value,
         options,
         onChange,
         onBlur,
         name,
         renderInput,
         disableClearable = false,
         disabled = false,
         fullWidth,
     }: AutoCompleteSingleSelectProps) => {
        const optionsClean = useMemo(() => flexibleDropdownOptionsToDropdownOptions(options), [options]);

        const valueNormalized = useMemo(() => {
            if (typeof value === "string" || typeof value === "number") {
                return optionsClean.find((option) => option.id === String(value)) ?? null;
            }
            return value;
        }, [optionsClean, value]);

        const handleOnChangeProxy = useCallback<AutoCompleteSingleSelectOnChange>(
            (event, value, reason, details) => {
                const clonedEvent = cloneEvent(event);
                clonedEvent.target.value = value?.id;
                clonedEvent.target.name = name;
                onChange(clonedEvent, value, reason, details);
            },
            [name, onChange],
        );

        const handleOnBlurProxy = useCallback<AutoCompleteSingleSelectOnBlur>(
            (event) => {
                const clonedEvent = cloneEvent(event);
                clonedEvent.target.name = name;
                onBlur?.(clonedEvent);
            },
            [name, onBlur],
        );

        return (
            <Autocomplete
                data-component="Autocomplete"
                id={id}
                size="small"
                multiple={false}
                disableClearable={disableClearable}
                freeSolo={false}
                autoHighlight
                fullWidth={fullWidth}
                value={valueNormalized}
                options={optionsClean}
                readOnly={disabled}
                filterOptions={filterOptions}
                onChange={handleOnChangeProxy}
                onBlur={handleOnBlurProxy}
                isOptionEqualToValue={isOptionEqualToValue}
                getOptionLabel={getOptionLabel}
                renderOption={renderOptionSolo}
                renderInput={renderInput}
                disabled={disabled}
            />
        );
    },
);
AutoCompleteSingleSelect.displayName = "AutoCompleteSingleSelect";

export default AutoCompleteSingleSelect;
