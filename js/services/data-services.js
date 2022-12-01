import { aiData, diagramData } from "../global";
import { getUUID } from "./common-services";

export function GetAIData() {
    data = new aiData();
    uniqueNo = getUUID();
    data = {
        AIDataId: uniqueNo,
        DiagramId: getUUID(),
        Tag: uniqueNo,
        Topic: "About Save the Children",
        Command: "",
        Hook: [],
        QuestionPattern: ["Bye", "See you later", "Goodbye"],
        AnswerResponse: [
            "See you later, thanks for visiting",
            "Have a nice day",
            "Bye! Come back again soon.",
        ],
        Fallback: "Sorry",
        Keywords: [["save the children", "SCI"], ["Founder"]],
    };
    console.dir(data);
    return data;
}
