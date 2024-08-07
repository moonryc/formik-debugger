import React from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import type {
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import type { FilterOptionsState } from "@mui/material/useAutocomplete";
import isNaN from "lodash/isNaN";
import { matchSorter } from "match-sorter";

export type DropdownOption = {
    id: string;
    displayName: string;
};

export type FlexibleOption = {
    id: string | number;
    displayName?: string;
};

export type RenderInput = typeof renderInput;
export const AUTOCOMPLETE_ADD_ID = "__ADD__";
const AUTOCOMPLETE_MORE_ID = "__MORE__";
export const AUTOCOMPLETE_PLACEHOLDER_ID = "__PLACEHOLDER__";

const MAX_OPTIONS_DISPLAY = 60;
export const filterOptions = (
    options: DropdownOption[],
    state: FilterOptionsState<DropdownOption>,
    renderCountLimit: number | false = MAX_OPTIONS_DISPLAY,
    freeSolo = false,
): DropdownOption[] => {
    const { inputValue } = state;
    const filtered: DropdownOption[] = matchSorter(options, inputValue, {
        keys: ["displayName", "id"],
        baseSort: (a, b) => {
            // Placeholder should always be at the top
            if (a.item.id === AUTOCOMPLETE_PLACEHOLDER_ID) return 1;
            // Add should always be at the bottom
            if (a.item.id === AUTOCOMPLETE_ADD_ID) return -1;
            // Add should always be at the bottom
            if (a.item.id === AUTOCOMPLETE_MORE_ID) return -1;
            return a.index > b.index ? 1 : -1;
        },
    });

    if (freeSolo) {
        const isExisting = filtered.some((option) => inputValue === option.displayName);
        if (!(inputValue == null || inputValue === "") && !isExisting) {
            filtered.push({
                id: AUTOCOMPLETE_ADD_ID,
                displayName: inputValue,
            });
        }
    }

    if (renderCountLimit === false) return filtered;

    const shown = filtered.slice(0, renderCountLimit);
    if (filtered.length > shown.length) {
        shown.push({
            displayName: `and ${filtered.length - shown.length} more...`,
            id: AUTOCOMPLETE_MORE_ID,
        });
    }

    return shown;
};

export const getOptionLabel = (option: DropdownOption | string) => {
    if (typeof option === "string") {
        return option;
    }
    return option.displayName;
};

export const isOptionEqualToValue = (option: DropdownOption, value: DropdownOption) => {
    return String(option.id) === String(value.id);
};

export const renderOptionSolo = (props: React.HTMLAttributes<HTMLLIElement>, option: DropdownOption) => {
    if (option.id === AUTOCOMPLETE_PLACEHOLDER_ID || option.id === AUTOCOMPLETE_MORE_ID) {
        const { onClick, onTouchStart, onMouseOver, ...otherProps } = props;
        return (
            <li {...otherProps} key={`option-${option.id}`}>
        {option.displayName}
        </li>
    );
    }
    if (option.id === AUTOCOMPLETE_ADD_ID) {
        return (
            <li {...props} key={`option-${option.id}`}>
        {`Add "${option.displayName}"`}
        </li>
    );
    }
    return (
        <li {...props} key={`option-${option.id}`}>
    {option.displayName}
    </li>
);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

export const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: DropdownOption,
    { selected }: AutocompleteRenderOptionState,
) => {
    if (option.id === AUTOCOMPLETE_PLACEHOLDER_ID || option.id === AUTOCOMPLETE_MORE_ID) {
        const { onClick, onTouchStart, onMouseOver, ...otherProps } = props;
        return (
            <li {...otherProps} key={`option-${option.id}`}>
        {option.displayName}
        </li>
    );
    }
    if (option.id === AUTOCOMPLETE_ADD_ID) {
        return (
            <li {...props} key={`option-${option.id}`}>
        {`Add "${option.displayName}"`}
        </li>
    );
    }
    return (
        <li {...props} key={`option-${option.id}`}>
    <Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ marginRight: 2 }} checked={selected} />
    {option.displayName}
    </li>
);
};

export const renderInput = (
    params: AutocompleteRenderInputParams,
    label: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
) => {
    return <TextField {...params} label={label} variant="outlined" onChange={onChange} />;
};

export const dropDownOptionToNumericId = (option: DropdownOption | null) => {
    if (option === null) return option;
    if (isNaN(Number(option.id))) {
        return null;
    }
    return Number(option.id);
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export const dropDownOptionsToNumericIds = (options: DropdownOption[]) => {
    return options.map(dropDownOptionToNumericId).filter(notEmpty);
};

type FlexibleDropdownOptionsToDropdownOptions = (options: readonly FlexibleOption[]) => DropdownOption[];
type FlexibleDropdownOptionToDropdownOption = (option: FlexibleOption) => DropdownOption;

export const flexibleDropdownOptionToDropdownOption: FlexibleDropdownOptionToDropdownOption = ({
                                                                                                   id,
                                                                                                   displayName,
                                                                                               }) => {
    return {
        id: String(id),
        displayName: displayName ?? String(id),
    };
};

export const flexibleDropdownOptionsToDropdownOptions: FlexibleDropdownOptionsToDropdownOptions = (
    options,
) => {
    return options.map(flexibleDropdownOptionToDropdownOption);
};
