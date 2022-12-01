// import { allElements, qnaFlowGraph } from "../constants";
// import linkServices from "./link-services";

// const sourceDropdown = document.querySelector("#set-link-source-dropdown");
// const targetDropdown = document.querySelector("#set-link-target-dropdown");
// const setLinkButton = document.querySelector(".set-link-modal-btn");
// const modal = document.querySelector(".set-link-modal");

// // Get the button that opens the modal
// const btn = document.getElementById("addLink");

// // Get the <span> element that closes the modal
// const span = document.querySelector(".set-link-modal-close");

// // When the user clicks the button, open the modal
// btn.onclick = function () {
//   console.log(`btn click!`);

//   sourceDropdown.value = "";
//   targetDropdown.value = "";

//   modal.style.display = "block";
//   if (sourceDropdown.options.length > 1) {
//     Array.from(sourceDropdown.options).forEach((option) =>
//       option.value !== "" ? option.remove() : null
//     );
//   }
//   qnaFlowGraph.getElements().forEach((element) => {
//     addOptionsToDropdown(
//       sourceDropdown,
//       element.id,
//       element.attributes.attrs.label.text
//     );
//   });
// };

// // When the user select the source dropdown
// sourceDropdown.onchange = function (e) {
//   if (targetDropdown.options.length > 1) {
//     Array.from(targetDropdown.options).forEach((option) =>
//       option.value !== "" ? option.remove() : null
//     );
//   }

//   qnaFlowGraph
//     .getElements()
//     .filter((el) => el.id !== e.target.value)
//     .forEach((element) => {
//       addOptionsToDropdown(
//         targetDropdown,
//         element.id,
//         element.attributes.attrs.label.text
//       );
//     });
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// // Add option to dropdown
// const addOptionsToDropdown = function (dropdown, value, text) {
//   let option = document.createElement("option");
//   option.value = value;
//   option.text = text;
//   dropdown.add(option);
// };

// // Create link between elements - link.addTo(graph);
// setLinkButton.onclick = function () {
//   linkServices
//     .createLink(sourceDropdown.value, targetDropdown.value)
//     .addTo(qnaFlowGraph);
//   modal.style.display = "none";
//   //   console.log(
//   //     `source: ${sourceDropdown.value}, target: ${targetDropdown.value}`
//   //   );
// };
