import {
    dia,
    shapes,
    gridSize,
    contentPaperHeight,
    contentPaperWidth,
} from "../global";
import linkServices from "./link-services";

export default {
    createPaper: function (graph, drawGridName, backgroundColor) {
        return new dia.Paper({
            model: graph,
            cellViewNamespace: shapes,
            width: /* "100%" */ contentPaperWidth,
            height: /* "100%" */ contentPaperHeight,
            gridSize: gridSize,
            drawGrid: drawGridName
                ? {
                      name: drawGridName,
                      args: [
                          { color: "red", thickness: 0.5 }, // settings for the primary mesh
                          { color: "green", scaleFactor: 5, thickness: 0.6 }, //settings for the secondary mesh
                      ],
                  }
                : false,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            background: {
                color: backgroundColor ? backgroundColor : "#F3F7F6",
            },
            defaultLink: () => linkServices.createLink(),
            // validateConnection: (sv, _sm, tv, _tm) => sv !== tv,
            linkPinning: false,
            defaultAnchor: {
                name: "perpendicular",
            },
            validateConnection: function (
                cellViewS,
                magnetS,
                cellViewT,
                magnetT,
                end,
                linkView
            ) {
                // Prevent linking from input ports
                if (magnetS && magnetS.getAttribute("port-group") === "in")
                    return false;
                // Prevent linking from output ports to input ports within one element
                if (cellViewS === cellViewT) return false;
                // Prevent linking to output ports
                return magnetT && magnetT.getAttribute("port-group") === "in";
            },
            validateMagnet: function (cellView, magnet) {
                // Note that this is the default behaviour. It is shown for reference purposes.
                // Disable linking interaction for magnets marked as passive
                return magnet.getAttribute("magnet") !== "passive";
            },
            snapLinks: { radius: 20 },
        });
    },
};
