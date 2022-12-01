import { elementTools } from "../global";
import { createPort } from "../services/port-services";

const getBoundaryTool = () =>
    new elementTools.Boundary({
        padding: 20,
        rotate: true,
        useModelGeometry: true,
    });

const getRemoveButton = () =>
    new elementTools.Remove({
        focusOpacity: 0.5,
        rotate: true,
        // top-mid
        x: "-6.6%",
        y: "-19.3%",
        // offset: { x: -19, y: -16 },
        action: function (evt, element, button) {
            element.remove();
            window.elementCount =
                window.elementCount > 0 ? (window.elementCount -= 1) : 0;
        },
    });

const getPortAddButton = () =>
    new elementTools.Button({
        markup: [
            {
                tagName: "circle",
                selector: "button",
                attributes: {
                    r: 7,
                    fill: "#001DFF",
                    cursor: "pointer",
                },
            },
            {
                tagName: "path",
                selector: "icon",
                attributes: {
                    d: "M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4",
                    fill: "none",
                    stroke: "#FFFFFF",
                    "stroke-width": 2,
                    "pointer-events": "none",
                },
            },
        ],
        x: "96%",
        y: "85%",
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function (evt, element, button) {
            createPort(element);
        },
    });

export { getBoundaryTool, getRemoveButton, getPortAddButton };
