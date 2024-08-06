import {DebuggerModal} from "../components"

// const stories = storiesOf("App Test", module);

// stories.add("App", ()=>{
//     return <Requirements/>
// })

export default {
    title: "Components/DebuggerModal",
    component: DebuggerModal,
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
}

export const Primary = {
    args: {},
};
