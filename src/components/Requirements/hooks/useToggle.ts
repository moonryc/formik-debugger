import {useMemo, useState} from "react";

export const useToggle = (initialState:boolean) => {
    const [value, setValue] = useState(initialState)

    return useMemo(()=>[
        value,
        {
            toggle: ()=>setValue(initial=>!initial),
            toggleOn: ()=>setValue(true),
            toggleOff: ()=>setValue(false),
        }
    ] as const,[value, setValue])
}