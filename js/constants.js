import { dia, shapes, V } from "./global";
import paperServices from "./services/paper-services";
import elementServices from "./services/element-services";

// Variables

// -- qna
const qnaFlowContainer = document.querySelector(".rf-qna-flow-container");
const qnaFlowGraph = new dia.Graph({}, { cellNamespace: shapes });
const qnaFlowPaper = paperServices.createPaper(qnaFlowGraph, "doubleMesh");

qnaFlowPaper.paperType = "qna";
qnaFlowContainer.appendChild(qnaFlowPaper.el);

// V(qnaFlowPaper.viewport).translate(100,100);

// Scroll to middle of the qna-flow-paper
qnaFlowContainer.scrollTo(
    (qnaFlowContainer.scrollWidth - qnaFlowContainer.clientWidth) / 2,
    (qnaFlowContainer.scrollHeight - qnaFlowContainer.clientHeight) / 2
);

// -- stencil
const stencilContainer = document.querySelector(
    ".rf-qna-flow-left-bar-content .element-container .stencil"
);
const stencilGraph = new dia.Graph({}, { cellNamespace: shapes });
const stencilPaper = new dia.Paper({
    el: stencilContainer,
    //    height: 60,
    model: stencilGraph,
    interactive: false,
    width: 200,
    height: "95vh",
});

// -- togglers
const togglerRight = document.querySelector(".rf-qna-flow-right-bar-toggler");
const togglerLeft = document.querySelector(".rf-qna-flow-left-bar-toggler");

// -- right toggler elements
const elementTopic = document.querySelector("#element-topic");
const elemnentCoordinates = document.querySelector("#element-coordinates");

// buttons
const scaleToFitButton = document.querySelector("#scaleToFit");
const autoArrangeButton = document.querySelector("#autoArrange");
const saveGraphButton = document.querySelector("#saveGraph");

// qnaFunctions

// -- qna
const removeElements = function (elements) {
    qnaFlowGraph.removeLinks(elements);
    qnaFlowGraph.removeCells(qnaFlowGraph.getCell(elements.model.id));
};

// -- Stencil elements
const question = elementServices.createElement(null, "stencilQuestion");
question.shape.addTo(stencilGraph);

export {
    //qna
    qnaFlowPaper,
    qnaFlowGraph,
    qnaFlowContainer,
    //stencil
    stencilPaper,
    stencilGraph,
    stencilContainer,
    //togglers
    togglerRight,
    togglerLeft,
    //toggler-elements
    elementTopic,
    elemnentCoordinates,
    // qnaFunctions
    allElements,
    removeElements,
    // buttons
    scaleToFitButton,
    autoArrangeButton,
    saveGraphButton,
};
