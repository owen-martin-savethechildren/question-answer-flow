import {
    $,
    dia,
    V,
    contentPaperWidth,
    contentPaperHeight,
    graphJSON,
    setGraphJSON,
} from "../global";
import {
    qnaFlowGraph,
    qnaFlowPaper,
    qnaFlowContainer,
    stencilPaper,
    togglerRight,
    togglerLeft,
    elementTopic,
    elemnentCoordinates,
    scaleToFitButton,
    autoArrangeButton,
    saveGraphButton,
} from "../constants";
import elementServices from "../services/element-services";
import { GetAIData } from "../services/data-services";
import {
    getToolsWhenSelected,
    getToolsWhenNotSelected,
} from "../services/element-tools-services";

let selectedCell,
    scale = 1,
    mousePositionOnPaper = { top: 0, left: 0, x: 0, y: 0 };

export default {
    function: () => {
        // -- toggler
        togglerRight.addEventListener("click", function () {
            togglerRight.parentElement.classList.toggle(
                "rf-qna-flow-right-bar-toggler-collapsed"
            );
        });

        togglerLeft.addEventListener("click", function () {
            togglerLeft.parentElement.classList.toggle(
                "rf-qna-flow-left-bar-toggler-collapsed"
            );
        });

        // paper events
        qnaFlowPaper.on("cell:pointerclick", function (elementView) {
            selectedCell = qnaFlowGraph.getCell(elementView.model.id);
            (() => {
                selectedCell.isElement()
                    ? (() => {
                          elementTopic.value =
                              elementView.model.attributes.attrs.label.text;
                          elemnentCoordinates.value = elementView.getBBox();
                          toggleClass(
                              togglerRight.parentElement,
                              "rf-qna-flow-right-bar-toggler-collapsed",
                              "rf-qna-flow-right-bar-toggler-collapsed",
                              true
                          );
                      })()
                    : (() =>
                          toggleClass(
                              togglerRight.parentElement,
                              "rf-qna-flow-right-bar-toggler-collapsed",
                              "rf-qna-flow-right-bar-toggler-collapsed",
                              false
                          ))();
            })();

            setToolsWhenNotSelected();

            elementView.addTools(
                getToolsWhenSelected(selectedCell.isElement())
            );
        });

        // evt: Event, x: mouse pointer x coordinate, y: mouse pointer y coordinate
        qnaFlowPaper.on("blank:pointerclick", (evt, x, y) => {
            setToolsWhenNotSelected();
            toggleClass(
                togglerRight.parentElement,
                "rf-qna-flow-right-bar-toggler-collapsed",
                "rf-qna-flow-right-bar-toggler-collapsed",
                false
            );
        });

        // evt: Event, x: mouse pointer x coordinate, y: mouse pointer y coordinate
        qnaFlowPaper.on("blank:pointerdown", (evt, x, y) => {
            mousePositionOnPaper.left = qnaFlowContainer.scrollLeft;
            mousePositionOnPaper.top = qnaFlowContainer.scrollTop;
            mousePositionOnPaper.x = x;
            mousePositionOnPaper.y = y;
        });

        qnaFlowPaper.on("blank:pointerdown", function (event, x, y) {
            mousePositionOnPaper = { x: x * scale, y: y * scale };
        });

        // evt: Event, x: mouse pointer x coordinate, y: mouse pointer y coordinate
        qnaFlowPaper.on("blank:pointermove", (evt, x, y) => {
            // let dx = x - mousePositionOnPaper.x;
            // let dy = y - mousePositionOnPaper.y;
            // qnaFlowContainer.scrollLeft = Math.max(
            //     dx,
            //     mousePositionOnPaper.left - dx
            // );
            // qnaFlowContainer.scrollTop = Math.max(
            //     dy,
            //     mousePositionOnPaper.top - dy
            // );

            // console.log(`x: ${scales.sx}, y: ${scales.sy}`);
            qnaFlowPaper.translate(
                evt.offsetX - mousePositionOnPaper.x,
                evt.offsetY - mousePositionOnPaper.y
            );
        });

        qnaFlowPaper.on(
            "cell:pointerup blank:pointerup",
            function (cellView, x, y) {
                // delete mousePositionOnPaper;
                mousePositionOnPaper = { top: 0, left: 0, x: 0, y: 0 };
            }
        );

        // evt: Event, x: mouse pointer x coordinate, y: mouse pointer y coordinate, delta:
        qnaFlowPaper.on("blank:mousewheel", (evt, x, y, delta) =>
            zoom(evt, delta)
        );

        // cellView: element view of the selected element
        // evt: Event, x: mouse pointer x coordinate, y: mouse pointer y coordinate
        // delta:
        qnaFlowPaper.on("cell:mousewheel", (cellView, evt, x, y, delta) =>
            zoom(evt, delta)
        );

        // Stencil events
        stencilPaper.on("cell:pointerdown", (cellView, e, x, y) => {
            $("body").append(
                '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
            );
            let flyGraph = new dia.Graph(),
                flyPaper = new dia.Paper({
                    el: $("#flyPaper"),
                    model: flyGraph,
                    height: 45,
                    width: 80,
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
                let x = e.pageX,
                    y = e.pageY,
                    target = qnaFlowPaper.$el.offset();

                // Dropped over paper ?
                if (
                    x > target.left &&
                    x < target.left + qnaFlowPaper.$el.width() &&
                    y > target.top &&
                    y < target.top + qnaFlowPaper.$el.height()
                ) {
                    let s = elementServices
                        .createElement(
                            {
                                text: GetAIData(),
                                x: x - target.left - offset.x,
                                y: y - target.top - offset.y,
                            },
                            "question"
                        )
                        .addElementTools(true);
                    currentElement = s;
                    qnaFlowGraph.addCell(s.shape);
                }
                $("body").off("mousemove.fly").off("mouseup.fly");
                flyShape.remove();
                $("#flyPaper").remove();
            });
        });

        // Property panel events
        elementTopic.addEventListener("keyup", (e) => {
            selectedCell.prop(
                "attrs/label",
                { text: elementTopic.value },
                { rewrite: true }
            );
        });

        // button events
        scaleToFitButton.addEventListener("click", () => {
            // let fitScaleX = 1;
            // let fitScaleY = 1;
            // if (fitScaleX > 0.5 && fitScaleY > 0.5) {
            //     fitScaleX = fitScaleY = 0.6;
            //     qnaFlowPaper.scale(
            //         parseFloat(fitScaleX, 10),
            //         parseFloat(fitScaleY, 10),
            //         0,
            //         0
            //         // contentPaperWidth / 2,
            //         // contentPaperHeight / 2
            //     );
            //     // qnaFlowPaper.translate(0, 0);
            //     console.dir(qnaFlowPaper);
            // } else {
            //     fitScaleX = fitScaleY = 0.8;
            //     qnaFlowPaper.scale(
            //         parseFloat(0.3, 10),
            //         parseFloat(0.3, 10),
            //         0,
            //         0
            //         // contentPaperWidth / 2,
            //         // contentPaperHeight / 2
            //     );
            //     // qnaFlowPaper.translate(0, 0);
            // }
            // qnaFlowPaper.scaleContentToFit({
            //     // padding: padding,
            //     minScale: 0.1,
            //     maxScale: 2.0,
            //     scaleGrid: 0.01,
            //     preserveAspectRatio: true,
            // });

            // log
            console.log(`${qnaFlowPaper.getContentBBox()}`);
            console.log(`${qnaFlowPaper.pageOffset()}`);
            console.dir(qnaFlowPaper.checkViewport());
            console.dir(qnaFlowGraph.getElements(2));

            // qnaFlowPaper.matrix({ a: 0.5, b: 0, c: 0, d: 0.5, e: 0, f: 0 });

            qnaFlowPaper.scale(
                parseFloat(0.5, 10),
                parseFloat(0.5, 10),
                contentPaperWidth / 2, //2.05,
                contentPaperHeight / 2 //4.2
            );
            // qnaFlowPaper.scaleContentToFit({
            //     minScaleX: 0.3,
            //     minScaleY: 0.3,
            //     maxScaleX: 1,
            //     maxScaleY: 1,
            // });
        });

        autoArrangeButton.addEventListener("click", () => {
            // const cell = qnaFlowPaper.getFirstCell();

            // qnaFlowGraph.resetCells(qnaFlowGraph.getCells());
            if (graphJSON !== null)
                qnaFlowGraph.fromJSON(JSON.parse(graphJSON));
        });

        saveGraphButton.addEventListener("click", async () => {
            setGraphJSON(JSON.stringify(qnaFlowGraph.toJSON()));
            // Object.assign(graphJSON, qnaFlowGraph.toJSON());
        });
    },
};

const setToolsWhenNotSelected = () => {
    qnaFlowGraph.getCells().forEach((el) => {
        el.findView(qnaFlowPaper).addTools(
            getToolsWhenNotSelected(el.isElement())
        );
    });
};

const zoom = (evt, delta) => {
    if (!evt.ctrlKey) return;
    // stop the default behaviour
    evt.preventDefault();
    // if delta < 0 zoom-out else zoom-in
    scale = delta < 0 ? Math.max(0.1, scale - 0.1) : Math.max(0.1, scale + 0.1);
    qnaFlowPaper.translate(0, 0);
    qnaFlowPaper.scale(
        parseFloat(scale, 10),
        parseFloat(scale, 10),
        contentPaperWidth / 2,
        contentPaperHeight / 2
    );
};

const toggleClass = (element, className, query, has) => {
    (() =>
        has
            ? (() =>
                  togglerRight.parentElement.classList.value.includes(query)
                      ? element.classList.toggle(className)
                      : (() => {})())()
            : (() =>
                  !togglerRight.parentElement.classList.value.includes(query)
                      ? element.classList.toggle(className)
                      : (() => {})())())();
};
