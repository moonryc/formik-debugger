import React, {PropsWithChildren} from 'react';
import Draggable from "react-draggable";

export type StickyNoteProps = {
    onClose: ()=>void;
    title: string;
}

const StickyNote = ({children, onClose, title}:PropsWithChildren<StickyNoteProps>) => {

    return (
        <Draggable handle={"#sticky-note"}>
        <div>
            <h1>{title}</h1>
            {children}
            <button onClick={onClose}>Close</button>
        </div>
        </Draggable>
    );
};

export default StickyNote;
