import { shapes } from "../global";

export default {
    createLink: (source, target) => {
        return new shapes.standard.Link({
            source:
                source === null
                    ? null
                    : { id: source, port: `out-default-${source}` },
            target:
                target === null
                    ? null
                    : { id: target, port: `in-default-${target}` },
            router: { name: "manhattan" },
            connector: { name: "rounded" },
        });
    },
    setAttribute: (el, attr) => {
        el.attr(attr);
    },
};
