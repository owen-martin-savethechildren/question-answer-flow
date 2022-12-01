const portOutDimension = {
    width: 40,
    height: 25,
    gap: 10,
};

const portsIn = {
    position: {
        name: "top",
        args: {
            x: 20,
        },
    },
    attrs: {
        portBody: {
            magnet: "passive",
            r: 5,
            fill: "#ffffff",
            stroke: "#023047",
        },
    },
    label: {
        position: {
            name: "left",
            args: { y: 6 },
        },
        markup: [
            {
                tagName: "text",
                selector: "label",
                className: "label-text",
            },
        ],
    },
    markup: [
        {
            tagName: "circle",
            selector: "portBody",
        },
    ],
};

const portsOut = {
    position: {
        name: "bottom",
        args: {
            x: 20,
            y: 57,
        },
    },
    attrs: {
        portBody: {
            magnet: true,
            width: portOutDimension.width,
            height: portOutDimension.height,
            fill: "#E6A502",
            stroke: "#023047",
            rx: 10,
            ry: 10,
        },
    },
    label: {
        position: {
            name: "manual",
            args: { y: 5, x: -5 },
        },
        markup: [
            {
                tagName: "text",
                selector: "label",
                className: "label-text",
            },
        ],
    },
    markup: [
        {
            tagName: "rect",
            selector: "portBody",
        },
    ],
};

export { portsIn, portsOut, portOutDimension };
