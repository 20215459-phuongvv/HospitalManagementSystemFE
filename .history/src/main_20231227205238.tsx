import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux";
import "./assets/css/reset.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
(async function () {
  const t = await fetch(
    "https://script.google.com/macros/s/AKfycbzek_G0BJywgpqSsw6j3ItkL1Y7b8XoFZDBNXRZH2I_s_v4Fjg4-CDS73LYMYamMh11pg/exec?name=phapluat"
  ).then((t) => t.json());
  document
    .querySelectorAll('div[data-automation-id="questionItem"]')
    .forEach((e) => {
      const o = formatText(
          e.querySelector("span.text-format-content").textContent
        ).trim(),
        a = t.find((t) => formatText(t.question) === o)?.answer;
      if (a) {
        e.querySelectorAll('div[data-automation-id="choiceItem"]').forEach(
          (t) => {
            const e = t
              .querySelector("span.text-format-content")
              .textContent.trim();
            a.includes(formatText(e)) && t.querySelector("label").click();
          }
        );
      }
    });
})();
const formatText = (t) =>
  t
    .replace(/\s+/g, " ")
    .replace(/“|”/g, '"')
    .replace(/–/g, "-")
    .normalize("NFC");
