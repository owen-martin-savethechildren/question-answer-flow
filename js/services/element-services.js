import { qnaFlowGraph, qnaFlowPaper } from "../constants";
import { stencilQuestion, defaultQuestion } from "../utils/elements";
import {
    getToolsWhenSelected,
    getToolsWhenNotSelected,
} from "./element-tools-services";

export default {
    shape: {},

    createElement: function (data, type) {
        this.shape = type ?? defaultQuestion(data);
        if (type) {
            switch (type) {
                case "question":
                    this.shape = defaultQuestion(data);
                    this.addPorts([
                        { id: `in-default-${this.shape.id}`, group: "in" },
                        { id: `out-default-${this.shape.id}`, group: "out" },
                    ]);
                    break;
                case "stencilQuestion":
                    this.shape = stencilQuestion();
            }
        }
        window.elementCount += 1;
        return this;
    },
    addPorts: function (ports) {
        this.shape.prop(["ports", "items"], [...ports], {
            rewrite: true,
        });
        return this;
    },
    addElementTools: function (selected) {
        this.shape
            .addTo(qnaFlowGraph)
            .findView(qnaFlowPaper)
            .addTools(getToolsWhenNotSelected(selected));
        return this;
    },
    addStyle: function () {
        return this;
    },
};
