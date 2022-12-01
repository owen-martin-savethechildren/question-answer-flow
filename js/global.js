import $ from "./lib/jquery/jquery.min";
import {
    dia,
    shapes,
    elementTools,
    g,
    V,
    Vectorizer,
    ui,
} from "./lib/jointjs/joint.min.js";

import * as dagre from "./lib/dagre/dagre.min";
import * as grahpLib from "./lib/dagre/graphlib.min";

const gridSize = 15;
const contentPaperWidth = 6000;
const contentPaperHeight = 3000;
const elementWidth = 300;
const elementHeight = 70;
// const aiData = {
//     AIDataId: "",
//     DiagramId: "",
//     Tag: "",
//     Topic: "",
//     Command: "",
//     Hook: [],
//     QuestionPattern: [],
//     AnswerResponse: [],
//     Fallback: "",
//     Keywords: [[]],
// };

class aiData {
    AIDataId = "";
    DiagramId = "";
    Tag = "";
    Topic = "";
    Command = "";
    Hook = [];
    QuestionPattern = [];
    AnswerResponse = [];
    Fallback = "";
    Keywords = [[]];
}
class diagramData {
    DiagramId = "";
    UserId = "";
    DiagramJSON = {};
    CreatedOn = "";
    ModifiedOn = "";
}

let graphJSON;
let currentElement;

setGraphJSON = (value) => {
    graphJSON = value;
};

window.elementPostiontX = 60;
window.elementPostiontY = 100;
window.elementCount = 0;

export {
    $,
    dia,
    shapes,
    elementTools,
    g,
    V,
    Vectorizer,
    ui,
    dagre,
    grahpLib,
    gridSize,
    contentPaperWidth,
    contentPaperHeight,
    elementWidth,
    elementHeight,
    portWidth,
    portHeight,
    portGap,
    currentElement,
    graphJSON,
    setGraphJSON,
    aiData,
    diagramData,
};
