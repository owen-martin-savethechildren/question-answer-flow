const el1 = new shapes.standard.Rectangle({
    position: {
        x: 360,
        y: 50,
    },
    size: {
        width: 200,
        height: 90,
    },
    attrs: {
        root: {
            magnet: false,
        },
        body: {
            strokeWidth: 2,
            fill: "#555555",
            rx: 10,
            ry: 10,
        },
        label: {
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "#ffffff",
            stroke: "#333333",
            strokeWidth: 5,
            paintOrder: "stroke",
            text: "Question - 1",
        },
    },
    ports: {
        groups: {
            digits: {
                markup: [
                    {
                        tagName: "rect",
                        selector: "portBody",
                    },
                    {
                        tagName: "text",
                        selector: "portLabel",
                    },
                ],
                attrs: {
                    portBody: {
                        x: 0,
                        y: -portHeight / 2,
                        width: "calc(w)",
                        height: "calc(h)",
                        fill: "#F1948A",
                        stroke: "#333333",
                        strokeWidth: 1,
                        magnet: "active",
                        cursor: "grab",
                        rx: 5,
                        ry: 5,
                    },
                    portLabel: {
                        x: "calc(0.5*w)",
                        textAnchor: "middle",
                        textVerticalAnchor: "middle",
                        pointerEvents: "none",
                        // fontWeight: "bold",
                        fontSize: 10,
                        fontFamily: "sans-serif",
                    },
                },
                size: { width: portWidth, height: portHeight },
                position: "absolute",
            },
        },
        items: [],
    },
});

const el2 = new shapes.standard.Rectangle({
    position: {
        x: 60,
        y: 300,
    },
    size: {
        width: 300,
        height: 60,
    },
    attrs: {
        root: {
            magnet: true,
        },
        body: {
            strokeWidth: 0.5,
            fill: "#fff",
            rx: 5,
            ry: 5,
        },
        label: {
            // fontWeight: "bold",
            fontSize: 11,
            fontFamily: "sans-serif",
            fill: "#000",
            // stroke: "#333333",
            // strokeWidth: 5,
            // paintOrder: "stroke",
            text: "Answer - 1",
        },
    },
});

const el3 = new shapes.standard.Rectangle({
    position: {
        x: 360,
        y: 300,
    },
    size: {
        width: 200,
        height: 90,
    },
    attrs: {
        root: {
            magnet: true,
        },
        body: {
            strokeWidth: 2,
            fill: "#34495E",
            rx: 10,
            ry: 10,
        },
        label: {
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "#ffffff",
            stroke: "#333333",
            strokeWidth: 5,
            paintOrder: "stroke",
            text: "Answer - 2",
        },
    },
});

const el4 = new shapes.standard.Rectangle({
    position: {
        x: 660,
        y: 300,
    },
    size: {
        width: 200,
        height: 90,
    },
    attrs: {
        root: {
            magnet: true,
        },
        body: {
            strokeWidth: 2,
            fill: "#1D8348",
            rx: 10,
            ry: 10,
        },
        label: {
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "#ffffff",
            stroke: "#333333",
            strokeWidth: 5,
            paintOrder: "stroke",
            text: "Answer - Fallback",
        },
    },
});

const el5 = new shapes.standard.Rectangle({
    position: {
        x: 360,
        y: 500,
    },
    size: {
        width: 200,
        height: 90,
    },
    attrs: {
        root: {
            magnet: false,
        },
        body: {
            strokeWidth: 2,
            fill: "#2980B9",
            rx: 10,
            ry: 10,
        },
        label: {
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "#ffffff",
            stroke: "#333333",
            strokeWidth: 5,
            paintOrder: "stroke",
            text: "Answer - Overloaded",
        },
    },
});

const el6 = new shapes.standard.Rectangle({
    position: {
        x: 60,
        y: 500,
    },
    size: {
        width: 200,
        height: 90,
    },
    attrs: {
        root: {
            magnet: false,
        },
        body: {
            strokeWidth: 2,
            fill: "#2980B9",
            rx: 10,
            ry: 10,
        },
        label: {
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "#ffffff",
            stroke: "#333333",
            strokeWidth: 5,
            paintOrder: "stroke",
            text: "Answer - New",
        },
    },
});

const l1 = linkServices.createLink({ id: el1.id, port: "1" }, { id: el2.id });

l1.set({ name: "rounded", args: { radius: 50 } });

const l2 = linkServices.createLink({ id: el1.id, port: "2" }, { id: el3.id });

const l3 = linkServices.createLink({ id: el1.id }, { id: el5.id });
l3.attr({
    line: {
        stroke: "#154360",
        strokeWidth: 2,
        strokeDasharray: "5 5",
        strokeDashoffset: 5,
        // sourceMarker: {
        //     'type': 'path',
        //     'stroke': 'none',
        //     'fill': '#154360',
        //     'd': 'M 20 -10 0 0 20 10 Z \
        //         M 40 -10 20 0 40 10 Z'
        // },
        // targetMarker: {
        //     'type': 'path',
        //     'stroke': 'none',
        //     'fill': '#3498DB',
        //     'd': '\ M 40 -10 20 0 40 10 Z'
        // }
    },
});

const l5 = linkServices.createLink({ id: el2.id }, { id: el6.id });

const l4 = linkServices.createLink(
    { id: el1.id, port: "fallback" },
    { id: el4.id }
);

var elem = elementServices.createElement({
    text: "This is text",
    position: { x: 60, y: 100 },
});

qnaFlowGraph.addCells([elem.shape]);

function setPorts(el, digits) {
    let width = 0;
    // Optional ports
    const digitPorts = digits.map((digit, index) => {
        const x = index * (portWidth + portGap);
        width = x + portWidth;
        return {
            id: `${digit}`,
            group: "digits",
            attrs: {
                portLabel: {
                    text: `${digit}`,
                },
            },
            args: {
                x,
                y: "100%",
            },
        };
    });
    if (digitPorts.length > 0) {
        width += portGap;
    }

    // Required port.
    const fallbackPort = {
        id: "fallback",
        group: "digits",
        size: { width: portWidth * 2, height: portHeight },
        attrs: {
            portLabel: {
                text: "fallback",
            },
        },
        args: {
            x: width,
            y: "100%",
        },
    };

    const connectPort = {
        position: {
            name: "top", // Layout name
            args: {}, // Arguments for port layout function, properties depend on type of layout
        },
        label: {
            position: {
                name: "top",
                args: { y: 6 },
            },
            markup: [
                {
                    tagName: "text",
                    selector: "label",
                },
            ],
        },
        attrs: {
            body: {
                magnet: "passive",
                width: 15,
                height: 15,
                stroke: "black",
                x: -8,
                y: -8,
            },
            label: {},
        },
        markup: [
            {
                tagName: "rect",
                selector: "body",
            },
        ],
    };

    width += 2 * portWidth;

    el.prop(["ports", "items"], [...digitPorts, fallbackPort, connectPort], {
        rewrite: true,
    });
    el.prop(["size", "width"], width);
}

// Update element from html inputs

//const outputPortsEl = document.getElementById("output-ports");
//outputPortsEl.addEventListener("change", () => update());

function update() {
    const digits = [1, 2];
    //Array.from(outputPortsEl.querySelectorAll("input")).forEach((input) => {
    //    if (input.checked) digits.push(input.name);
    //});
    setPorts(el1, digits);
}

update();

var elementView = el2.findView(qnaFlowPaper);
// elementView.addTools(toolsView);
// elementView.hideTools();

// qnaFlowPaper.on("mouseleave", function (elView) {
//   console.log(elView);
//   elView.hideTools();
// });

let json = {
    cells: [
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "6f7dad69-eb1d-49c7-a4b6-3790495afe93",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Default",
                            },
                        },
                        id: "2cabe1f8-52f1-4deb-b530-420a484e34ef",
                    },
                ],
            },
            position: {
                x: -88,
                y: -184,
            },
            id: "27ca316a-c6ab-46c9-b788-fc5712eb109f",
            z: 1,
            attrs: {
                label: {
                    text: "User action",
                },
                description: {
                    text: "Transfer funds",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+",
                },
            },
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "43f66fe1-4a7e-4e2f-a7b3-76f19191f5e0",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Default",
                            },
                        },
                        id: "203cc295-0a3b-404c-810c-5732c00c404a",
                    },
                ],
            },
            position: {
                x: -48,
                y: -48,
            },
            id: "4f30bb12-5506-4ddc-9193-3b57dc63971c",
            z: 2,
            attrs: {
                label: {
                    text: "Entity",
                },
                description: {
                    text: "From - Account number",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg==",
                },
            },
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "68819f22-06d7-476b-9b3e-408c47e16845",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Default",
                            },
                        },
                        id: "7e42d4ec-36da-476a-a3c9-83bb3e8a80d3",
                    },
                ],
            },
            position: {
                x: -8,
                y: 96,
            },
            id: "990330ee-aeb5-4392-980d-1e15bafbcba9",
            z: 3,
            attrs: {
                label: {
                    text: "User action",
                },
                description: {
                    text: "Get account balance",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjEgMy4wMUgzYy0xLjEgMC0yIC45LTIgMlY5aDJWNC45OWgxOHYxNC4wM0gzVjE1SDF2NC4wMWMwIDEuMS45IDEuOTggMiAxLjk4aDE4YzEuMSAwIDItLjg4IDItMS45OHYtMTRjMC0xLjExLS45LTItMi0yek0xMSAxNmw0LTQtNC00djNIMXYyaDEwdjN6Ii8+PC9zdmc+",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.22035108723975363,
                        offset: -4,
                        angle: 0,
                    },
                },
            ],
            source: {
                id: "27ca316a-c6ab-46c9-b788-fc5712eb109f",
                magnet: "portBody",
                port: "2cabe1f8-52f1-4deb-b530-420a484e34ef",
            },
            target: {
                id: "4f30bb12-5506-4ddc-9193-3b57dc63971c",
                magnet: "portBody",
                port: "43f66fe1-4a7e-4e2f-a7b3-76f19191f5e0",
            },
            id: "fd01b965-1f50-4d58-811a-109896ada307",
            z: 4,
            attrs: {},
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "ad64674f-11ea-4d81-b29d-3dadbc7f87f9",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Abort",
                            },
                        },
                        id: "a473f98e-d21b-4a54-b6c2-6d9703c58ff8",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Confirm",
                            },
                        },
                        id: "9fba8354-8cc7-4e48-8b55-b079458811d5",
                    },
                ],
            },
            position: {
                x: 32,
                y: 240,
            },
            id: "dafeb49c-833b-493e-a708-a243e4daaf16",
            z: 6,
            attrs: {
                label: {
                    text: "Confirmation",
                },
                description: {
                    text: "Balance information",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIvPjwvc3ZnPg==",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "990330ee-aeb5-4392-980d-1e15bafbcba9",
                magnet: "portBody",
                port: "7e42d4ec-36da-476a-a3c9-83bb3e8a80d3",
            },
            target: {
                id: "dafeb49c-833b-493e-a708-a243e4daaf16",
                magnet: "portBody",
                port: "ad64674f-11ea-4d81-b29d-3dadbc7f87f9",
            },
            id: "c524e89d-722a-4d8d-ab05-9f3e8a47c9a2",
            z: 7,
            attrs: {},
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "48573db2-8c56-4ef9-b44b-33ea089421e1",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "End",
                            },
                        },
                        id: "2141ad38-3415-4994-ba63-eb29940b551e",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "out",
                            },
                        },
                        id: "e72511e3-8c9c-4100-86d5-c91a14ecd0bb",
                    },
                ],
            },
            position: {
                x: 72,
                y: 392,
            },
            id: "e48dbbbb-0051-4ead-98b1-0e7d05541fb2",
            z: 8,
            attrs: {
                label: {
                    text: "Message",
                },
                description: {
                    text: "Transfer fund aborted",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "dafeb49c-833b-493e-a708-a243e4daaf16",
                magnet: "portBody",
                port: "a473f98e-d21b-4a54-b6c2-6d9703c58ff8",
            },
            target: {
                id: "e48dbbbb-0051-4ead-98b1-0e7d05541fb2",
                magnet: "portBody",
                port: "48573db2-8c56-4ef9-b44b-33ea089421e1",
            },
            id: "6550af0e-fc25-4da1-841b-5963657c49e7",
            z: 9,
            attrs: {},
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "857eb8fb-0293-47ba-9e3a-5b68e2206b2b",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Default",
                            },
                        },
                        id: "d2f5e221-cf5d-458e-8809-cfca929ef3d8",
                    },
                ],
            },
            position: {
                x: 448,
                y: 88,
            },
            id: "67f9bcff-8143-4fab-bbf6-065e151f7b0f",
            z: 10,
            attrs: {
                label: {
                    text: "Entity",
                },
                description: {
                    text: "To - Account number",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg==",
                },
            },
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "95bb2fb8-26c7-41b0-8978-663291855e11",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "Default",
                            },
                        },
                        id: "1dae1ddf-42bb-455e-be88-04a0a6354918",
                    },
                ],
            },
            position: {
                x: 488,
                y: 240,
            },
            id: "01d96073-43da-46a5-a38d-9e34b3c66c00",
            z: 12,
            attrs: {
                label: {
                    text: "Entity",
                },
                description: {
                    text: "Enter the amount to be transferred",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9ImJsYWNrIiB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4Ij48Zz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiLz48L2c+PGc+PGcvPjxnPjxwYXRoIGQ9Ik04LDhINnY3YzAsMS4xLDAuOSwyLDIsMmg5di0ySDhWOHoiLz48cGF0aCBkPSJNMjAsM2gtOGMtMS4xLDAtMiwwLjktMiwydjZjMCwxLjEsMC45LDIsMiwyaDhjMS4xLDAsMi0wLjksMi0yVjVDMjIsMy45LDIxLjEsMywyMCwzeiBNMjAsMTFoLThWN2g4VjExeiIvPjxwYXRoIGQ9Ik00LDEySDJ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg0VjEyeiIvPjwvZz48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIi8+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBkPSJNOCw4SDZ2N2MwLDEuMSwwLjksMiwyLDJoOXYtMkg4Vjh6Ii8+PHBhdGggZD0iTTIwLDNoLThjLTEuMSwwLTIsMC45LTIsMnY2YzAsMS4xLDAuOSwyLDIsMmg4YzEuMSwwLDItMC45LDItMlY1QzIyLDMuOSwyMS4xLDMsMjAsM3ogTTIwLDExaC04VjdoOFYxMXoiLz48cGF0aCBkPSJNNCwxMkgydjdjMCwxLjEsMC45LDIsMiwyaDl2LTJINFYxMnoiLz48L2c+PC9nPjwvc3ZnPg==",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "67f9bcff-8143-4fab-bbf6-065e151f7b0f",
                magnet: "portBody",
                port: "d2f5e221-cf5d-458e-8809-cfca929ef3d8",
            },
            target: {
                id: "01d96073-43da-46a5-a38d-9e34b3c66c00",
                magnet: "portBody",
                port: "95bb2fb8-26c7-41b0-8978-663291855e11",
            },
            id: "32cf8dd3-831e-4317-9a10-619f3d59171b",
            z: 13,
            attrs: {},
        },
        {
            type: "app.Message",
            size: {
                width: 368,
                height: 80,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "066dcab9-cfa2-4b94-a8bf-5b9dba1ddf94",
                    },
                    {
                        group: "out",
                        attrs: {
                            portLabel: {
                                text: "End",
                            },
                        },
                        id: "d487d13f-4651-403a-90b8-dbcae875607e",
                    },
                ],
            },
            position: {
                x: 568,
                y: 424,
            },
            id: "cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39",
            z: 14,
            attrs: {
                label: {
                    text: "Message",
                },
                description: {
                    text: "Amount has been transferred",
                },
                icon: {
                    xlinkHref:
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "01d96073-43da-46a5-a38d-9e34b3c66c00",
                magnet: "portBody",
                port: "1dae1ddf-42bb-455e-be88-04a0a6354918",
            },
            target: {
                id: "cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39",
                magnet: "portBody",
                port: "066dcab9-cfa2-4b94-a8bf-5b9dba1ddf94",
            },
            id: "d12f50b9-313c-4567-b008-573da6831110",
            z: 15,
            vertices: [],
            attrs: {},
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "4f30bb12-5506-4ddc-9193-3b57dc63971c",
                magnet: "portBody",
                port: "203cc295-0a3b-404c-810c-5732c00c404a",
            },
            target: {
                id: "990330ee-aeb5-4392-980d-1e15bafbcba9",
                magnet: "portBody",
                port: "68819f22-06d7-476b-9b3e-408c47e16845",
            },
            id: "402d022f-88ba-48ab-8caa-66de54a91cc5",
            z: 16,
            attrs: {},
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "dafeb49c-833b-493e-a708-a243e4daaf16",
                magnet: "portBody",
                port: "9fba8354-8cc7-4e48-8b55-b079458811d5",
            },
            target: {
                id: "67f9bcff-8143-4fab-bbf6-065e151f7b0f",
                magnet: "portBody",
                port: "857eb8fb-0293-47ba-9e3a-5b68e2206b2b",
            },
            id: "4d9c06a9-d89d-4b5a-b79a-6b6b92e8672f",
            z: 17,
            vertices: [],
            attrs: {},
        },
        {
            type: "app.FlowchartStart",
            size: {
                width: 48,
                height: 48,
            },
            ports: {
                items: [
                    {
                        group: "out",
                        id: "4eb6a098-7345-4e6d-b15f-7a8069339170",
                    },
                ],
            },
            position: {
                x: -88,
                y: -296,
            },
            id: "15b1e67d-2d13-4c26-9061-059218126f6c",
            z: 18,
            attrs: {
                label: {
                    text: "Start",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "15b1e67d-2d13-4c26-9061-059218126f6c",
                magnet: "portBody",
                port: "4eb6a098-7345-4e6d-b15f-7a8069339170",
            },
            target: {
                id: "27ca316a-c6ab-46c9-b788-fc5712eb109f",
                magnet: "portBody",
                port: "6f7dad69-eb1d-49c7-a4b6-3790495afe93",
            },
            id: "55175fd3-f3b7-4c5a-ad84-faab4fc6138e",
            z: 19,
            attrs: {},
        },
        {
            type: "app.FlowchartEnd",
            size: {
                width: 48,
                height: 48,
            },
            ports: {
                items: [
                    {
                        group: "in",
                        id: "a05eeff4-344c-4f83-9bc9-4bfa156e20ba",
                    },
                ],
            },
            position: {
                x: 336,
                y: 552,
            },
            id: "8b1eff36-0d08-4326-9c06-3197387286a5",
            z: 20,
            attrs: {
                label: {
                    text: "End",
                },
            },
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "Aborted",
                        },
                    },
                    position: {
                        distance: 0.30207471194317553,
                        offset: -16,
                        angle: 0,
                    },
                },
            ],
            source: {
                id: "e48dbbbb-0051-4ead-98b1-0e7d05541fb2",
                magnet: "portBody",
                port: "2141ad38-3415-4994-ba63-eb29940b551e",
            },
            target: {
                id: "8b1eff36-0d08-4326-9c06-3197387286a5",
                magnet: "portBody",
                port: "a05eeff4-344c-4f83-9bc9-4bfa156e20ba",
            },
            id: "afd7992f-aaf9-4ae0-8847-93d91d34c6f6",
            z: 21,
            attrs: {},
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "Confirmed",
                        },
                    },
                    position: {
                        distance: 0.3396172434541929,
                        offset: 16,
                        angle: 0,
                    },
                },
            ],
            source: {
                id: "cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39",
                magnet: "portBody",
                port: "d487d13f-4651-403a-90b8-dbcae875607e",
            },
            target: {
                id: "8b1eff36-0d08-4326-9c06-3197387286a5",
                magnet: "portBody",
                port: "a05eeff4-344c-4f83-9bc9-4bfa156e20ba",
            },
            id: "f0f29396-3d9a-4773-ab86-b649f0f0ae57",
            z: 22,
            vertices: [],
            attrs: {},
        },
        {
            type: "app.Link",
            labels: [
                {
                    attrs: {
                        labelText: {
                            text: "Label",
                        },
                    },
                    position: {
                        distance: 0.25,
                    },
                },
            ],
            source: {
                id: "e48dbbbb-0051-4ead-98b1-0e7d05541fb2",
                magnet: "portBody",
                port: "e72511e3-8c9c-4100-86d5-c91a14ecd0bb",
            },
            target: {
                id: "cf4a5fe1-b41f-44ae-a8b2-050ba69c7d39",
                magnet: "portBody",
                port: "066dcab9-cfa2-4b94-a8bf-5b9dba1ddf94",
            },
            id: "033f1c73-a17a-44e8-b29c-64f59c5f2e57",
            z: 23,
            attrs: {},
        },
    ],
};

// Canvas where sape are dropped
var graph = new joint.dia.Graph(),
    paper = new joint.dia.Paper({
        el: $("#paper"),
        model: graph,
    });

// Canvas from which you take shapes
var stencilGraph = new joint.dia.Graph(),
    stencilPaper = new joint.dia.Paper({
        el: $("#stencil"),
        height: 60,
        model: stencilGraph,
        interactive: false,
    });

var r1 = new joint.shapes.basic.Rect({
    position: {
        x: 10,
        y: 10,
    },
    size: {
        width: 100,
        height: 40,
    },
    attrs: {
        text: {
            text: "Rect1",
        },
    },
});
var r2 = new joint.shapes.basic.Rect({
    position: {
        x: 120,
        y: 10,
    },
    size: {
        width: 100,
        height: 40,
    },
    attrs: {
        text: {
            text: "Rect2",
        },
    },
});
stencilGraph.addCells([r1, r2]);

stencilPaper.on("cell:pointerdown", function (cellView, e, x, y) {
    $("body").append(
        '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
    );
    var flyGraph = new joint.dia.Graph(),
        flyPaper = new joint.dia.Paper({
            el: $("#flyPaper"),
            model: flyGraph,
            interactive: false,
        }),
        flyShape = cellView.model.clone(),
        pos = cellView.model.position(),
        offset = {
            x: x - pos.x,
            y: y - pos.y,
        };

    flyShape.position(0, 0);
    flyGraph.addCell(flyShape);
    $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
    });
    $("body").on("mousemove.fly", function (e) {
        $("#flyPaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y,
        });
    });
    $("body").on("mouseup.fly", function (e) {
        var x = e.pageX,
            y = e.pageY,
            target = paper.$el.offset();

        // Dropped over paper ?
        if (
            x > target.left &&
            x < target.left + paper.$el.width() &&
            y > target.top &&
            y < target.top + paper.$el.height()
        ) {
            var s = flyShape.clone();
            s.position(x - target.left - offset.x, y - target.top - offset.y);
            graph.addCell(s);
        }
        $("body").off("mousemove.fly").off("mouseup.fly");
        flyShape.remove();
        $("#flyPaper").remove();
    });
});

label: fill: "#000";
fontFamily: "sans-serif";
fontSize: 11;
refX: "50%";
refY: "50%";
text: "Element -- 2";
textAnchor: "middle";
textVerticalAnchor: "middle";

const x = {
    angle: 0,
    attrs: {
        body: {
            fill: "#fff",
            filter: {
                args: {
                    blur: 3,
                    dx: 2,
                    dy: 2,
                },
                name: dropShadow,
            },
            rx: 5,
            ry: 5,
            strokeWidth: 0.5,
        },
        label: {
            fill: "#000",
            fontFamily: "sans-serif",
            fontSize: 11,
            markup: [
                {
                    className: "label-text",
                    selector: "label",
                    tagName: "text",
                },
            ],
            position: {
                position: {
                    args: {
                        y: 6,
                    },
                    name: "left",
                },
                text: "Element -- 1",
            },
        },
        root: {
            magnet: false,
        },
        id: "a5345f83-7011-4f8a-8dda-61031b78139d",
        ports: {
            groups: {
                in: {
                    attrs: {
                        portBody: {
                            fill: "#ffffff",
                            magnet: "passive",
                            r: 5,
                            stroke: "#023047",
                        },
                    },
                    label: {
                        markup: [
                            {
                                selector: "portBody",
                                tagName: "circle",
                            },
                        ],
                        position: {
                            args: {
                                x: 20,
                            },
                            name: "top",
                        },
                    },
                },
                out: {
                    attrs: {
                        portBody: {
                            fill: "#E6A502",
                            height: 25,
                            magnet: true,
                            rx: 10,
                            ry: 10,
                            stroke: "#023047",
                            width: 40,
                        },
                    },
                    lable: {
                        markup: [
                            {
                                className: "label-text",
                                selector: "label",
                                tagName: "text",
                            },
                        ],
                        position: {
                            args: {
                                x: -5,
                                y: 5,
                            },
                            name: "manual",
                        },
                    },
                    markup: [
                        {
                            selector: "portBody",
                            tagName: "rect",
                        },
                    ],
                    position: {
                        args: {
                            x: 20,
                            y: 57,
                        },
                        name: "bottom",
                    },
                },
            },
            items: [
                {
                    group: "in",
                    id: "in-default-a5345f83-7011-4f8a-8dda-61031b78139d",
                },
                {
                    group: "out",
                    id: "out-default-a5345f83-7011-4f8a-8dda-61031b78139d",
                },
            ],
        },
        position: {
            x: 2569,
            y: 1315,
        },
        size: {
            height: 70,
            width: 300,
        },
        type: "standard.Rectangle",
        z: 1,
    },
};

joint.layout.DirectedGraph = {
    layout: function (graph, opt) {
        opt = opt || {};
        var dGraph = new dagre.graphlib.Graph();
        /*    var dGraph = new dagre.graphlib.Graph({ multigraph: true })*/
        var inputGraph = this._prepareData(graph, dGraph);
        var runner = dGraph.setGraph({});
        if (opt.debugLevel) {
            runner.debugLevel(opt.debugLevel);
        }
        if (opt.rankDir) {
            inputGraph.graph().rankdir = opt.rankDir;
        }
        if (opt.rankSep) {
            inputGraph.graph().rankSep = opt.rankSep;
        }
        if (opt.edgeSep) {
            inputGraph.graph().edgeSep = opt.edgeSep;
        }
        if (opt.nodeSep) {
            inputGraph.graph().nodeSep = opt.nodeSep;
        }
        if (opt.rankSep) {
            inputGraph.graph().rankSep = opt.rankSep;
        }
        var layoutGraph = dagre.layout(inputGraph);
        inputGraph.nodes().forEach(function (u) {
            var value = inputGraph.node(u);
            if (!value.dummy) {
                var cell = graph.getCell(u);
                opt.setPosition
                    ? opt.setPosition(cell, value)
                    : graph
                          .get("cells")
                          .get(u)
                          .set("position", {
                              x: value.x - value.width / 2,
                              y: value.y - value.height / 2,
                          });
            }
        });
        if (opt.setLinkVertices) {
            inputGraph.edges().forEach(function (e) {
                var e_label = inputGraph.edge(e.v, e.w);
                var link = graph.getCell(e_label);
                if (link) {
                    opt.setVertices
                        ? opt.setVertices(link, value.points)
                        : link.set("vertices", value.points);
                }
            });
        }
        return {
            width: runner.graph().width,
            height: runner.graph().height,
        };
    },
    _prepareData: function (graph, dagre_graph) {
        var dagreGraph = dagre_graph;
        // For each element.
        _.each(graph.getElements(), function (cell) {
            if (dagreGraph.hasNode(cell.id)) return;
            dagreGraph.setNode(cell.id.toString(), {
                width: cell.get("size").width,
                height: cell.get("size").height,
                rank: cell.get("rank"),
            });
        });
        // For each link.
        _.each(graph.getLinks(), function (cell) {
            if (dagreGraph.hasEdge(cell.id)) return;
            var sourceId = cell.get("source").id.toString();
            var targetId = cell.get("target").id.toString();
            dagreGraph.setEdge(sourceId, targetId, {
                label: cell.id,
                minLen: cell.get("minLen") || 1,
            });
        });
        return dagreGraph;
    },
};
// Helpers.
// --------

function buildGraph(data) {
    var elements = [];
    var links = [];

    _.each(data.nodes, function (node) {
        elements.push(makeElement(node));
    });

    _.each(data.links, function (edge) {
        links.push(makeLink(edge));
    });
    return elements.concat(links);
}

function makeLink(edge) {
    /*  if (edge.source.toString() == "2") {
        var lnk = new joint.dia.Link({
        source: { id: edge.source.toString() },
        target: { x: 25, y: 25 },
        attrs: {
          '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
        },
        labels: [{
          position: 0.5,
          attrs: {
            text: {
              text: "on"
            }
          }
        }],
        connector: {name: 'smooth'}
    });
      lnk.transition('target', { x: 250, y: 250 }, {
        delay: 100,
        duration: 1000,
        timingFunction: joint.util.timing.bounce,
        valueFunction: joint.util.interpolate.object
      });
    } else {*/
    var lnk = new joint.dia.Link({
        source: { id: edge.source.toString() },
        target: { id: edge.target.toString() },
        attrs: {
            ".marker-target": { d: "M 4 0 L 0 2 L 4 4 z" },
        },
        labels: [
            {
                position: 0.5,
                attrs: {
                    text: {
                        text: "on",
                    },
                },
            },
        ],
        connector: { name: "smooth" },
    });

    //}

    return lnk;
}

function makeElement(node) {
    var maxLineLength = _.max(node.name.split("\n"), function (l) {
        return l.length;
    }).length;

    // Compute width/height of the rectangle based on the number
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    var letterSize = 8;
    var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    var height = 2 * ((node.name.split("\n").length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
        id: node.id.toString(),
        size: { width: 100, height: height },
        attrs: {
            text: {
                text: node.name,
                "font-size": letterSize,
                "font-family": "monospace",
            },
            rect: {
                width: width,
                height: height,
                rx: 5,
                ry: 5,
                stroke: "#555",
            },
        },
    });
}

// Main.
// -----

var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: $("#paper"),
    width: 2000,
    height: 2000,
    gridSize: 1,
    model: graph,
});

// Just give the viewport a little padding.
V(paper.viewport).translate(20, 20);

$("#btn-layout").on("click", layout);

function layout() {
    try {
        var dataList = eval("dataList = " + $("#adjacency-list").val());
    } catch (e) {
        alert(e);
    }

    var cells = buildGraph(dataList);
    graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(graph, {
        setLinkVertices: false,
        rankDir: "lr",
        nodeSep: 100,
        rankSep: 100,
    });
}
layout();
