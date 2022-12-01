import { shapes, elementHeight, elementWidth } from "../global";
import { getDefaultInPort, getDefaultOutPort } from "../services/port-services";

const defaultQuestion = (data) =>
    new shapes.standard.Rectangle({
        position: {
            x: data.x, // 60,
            y: data.y, //500,
        },
        size: {
            width: elementWidth,
            height: elementHeight,
        },
        attrs: {
            root: {
                magnet: false,
            },
            body: {
                strokeWidth: 0.5,
                fill: "#fff",
                rx: 5,
                ry: 5,
                filter: {
                    name: "dropShadow",
                    args: {
                        dx: 2,
                        dy: 2,
                        blur: 3,
                    },
                },
            },
            label: {
                // fontWeight: "bold",
                // textAnchor: "left", // align text to left
                // x: 5, // offset text from right edge of model bbox
                fontSize: 11,
                fontFamily: "sans-serif",
                fill: "#000",
                // stroke: "#333333",
                // strokeWidth: 5,
                // paintOrder: "stroke",
                text: data.text.Topic,
                position: {
                    name: "left",
                    args: { y: 0 },
                },
                markup: [
                    {
                        tagName: "text",
                        selector: "label",
                        className: "label-text",
                    },
                ],
            },
        },
        ports: {
            groups: {
                in: getDefaultInPort(),
                out: getDefaultOutPort(),
            },
            items: [{ group: "in" }, { group: "out" }],
        },
    });

const stencilQuestion = () =>
    new shapes.standard.Rectangle({
        position: {
            x: 10, // 60,
            y: 30, //500,
        },
        size: {
            width: 80,
            height: 40,
        },
        attrs: {
            body: {
                rx: 10, // add a corner radius
                ry: 10,
                fill: "#ADD8E6",
            },
            label: {
                text: "Question", // add Multiline label with Newline character
            },
        },
    });

export { defaultQuestion, stencilQuestion };
