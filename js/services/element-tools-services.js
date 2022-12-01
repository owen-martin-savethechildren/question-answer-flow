import {
    getBoundaryTool,
    getRemoveButton,
    getPortAddButton,
} from "../utils/element-tools";
import { dia } from "../global";

const getToolsWhenSelected = (isElement) =>
    new dia.ToolsView({
        tools: isElement
            ? [getBoundaryTool(), getRemoveButton(), getPortAddButton()]
            : [getBoundaryTool(), getRemoveButton()],
    });

const getToolsWhenNotSelected = (isElement) =>
    new dia.ToolsView({
        tools: isElement ? [getPortAddButton()] : [],
    });

export { getToolsWhenSelected, getToolsWhenNotSelected };
