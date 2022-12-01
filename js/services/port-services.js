import { elementHeight } from "../global";
import { portsIn, portsOut, portOutDimension } from "../utils/element-ports";

const getDefaultInPort = () => portsIn;

const getDefaultOutPort = () => portsOut;

const createPort = (element) => {
    const ports = element.options.model.getPorts().length - 1;
    const x = ports * (portOutDimension.width + portOutDimension.gap) + 20;
    let elementWidth = element.model.attributes.size.width;
    element.options.model.addPort({
        id: `out-${ports + 1}-${element.options.model.id}`,
        group: "out",
        attrs: {
            portLabel: {
                text: `${ports + 1}`,
            },
        },
        args: {
            x,
        },
    });
    if (ports > 4) {
        elementWidth += 10 + portOutDimension.width;
        element.options.model.resize(elementWidth, elementHeight);
    }
};

export { getDefaultInPort, getDefaultOutPort, createPort };
