import React, {PropsWithChildren} from 'react';
import Draggable from "react-draggable";
import {Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper/BasePopper";
import Button from "@mui/material/Button";

export type StickyNoteProps = {
    open: boolean
    onClose: ()=>void;
    title: string;
}

const StickyNote = ({children, open,onClose, title}:PropsWithChildren<StickyNoteProps>) => {

    return (
        <Draggable handle={"#sticky-note"}>
            <Popper open={open} style={{ zIndex: 9999999 }}>
                <Paper sx={{ paddingX: "24px" }}>
                    <Typography
                        id="sticky-note"
                        variant="h3"
                        paddingBottom="4px"
                        paddingTop="16px"
                        sx={{ cursor: "move" }}
                    >
                        {title}
                    </Typography>
                    {children}
                    <Box display="flex" justifyContent="end" paddingY="16px">
                        <Button onClick={onClose}>Close</Button>
                    </Box>
                </Paper>
            </Popper>
        </Draggable>
    );
};

export default StickyNote;
