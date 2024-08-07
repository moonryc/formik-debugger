import React from 'react';
import Debugger, {DebuggerProps} from "../Debugger/Debugger";
import StickyNote, {StickyNoteProps} from "../StickyNote/StickyNote";

export type DebuggerModalProps = {
    open: boolean,
    onClose: StickyNoteProps["onClose"]
} & DebuggerProps

const DebuggerModal = ({open, onClose, formik}: DebuggerModalProps) => {
    return (
        <StickyNote open={open} onClose={onClose} title={"Formik Debugger"}>
            <Debugger formik={formik}/>
        </StickyNote>
    );
};

export default DebuggerModal;
