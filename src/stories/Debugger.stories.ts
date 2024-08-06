import {Debugger} from "../components"
import {formikMock} from "./formikMock";

export default {
    title: "Components/Debugger",
    component: Debugger,
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
}

export const Primary = {
    args: {
        formik: formikMock
    },
};
