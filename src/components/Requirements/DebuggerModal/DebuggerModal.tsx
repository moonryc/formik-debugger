import React from 'react';
import Debugger, {DebuggerProps} from "../Debugger/Debugger";
import StickyNote, {StickyNoteProps} from "../StickyNote/StickyNote";

export type DebuggerModalProps = {
    open: boolean,
    onClose: StickyNoteProps["onClose"]
} & DebuggerProps

const DebuggerModal = ({open, onClose, formik}: DebuggerModalProps) => {

    if (!open) {
        return null;
    }

    return (
        <StickyNote onClose={onClose} title={"FormikDebugger"}>
            <Debugger formik={formik}/>
        </StickyNote>
    );
};

export default DebuggerModal;
