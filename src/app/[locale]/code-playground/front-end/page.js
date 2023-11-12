"use client";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { less } from "@codemirror/lang-less";
import React from "react";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
const Tabs = ({ color, bg }) => {
  const [openTab, setOpenTab] = React.useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const handleTabChange = (tabId) => {
    setOpenTab(tabId);
  };

  const handleCodeChange = (value, codeType) => {
    switch (codeType) {
      case "html":
        setHtmlCode(value);
        break;
      case "css":
        setCssCode(value);
        break;
      case "js":
        setJsCode(value);
        break;
      default:
        break;
    }
  };

  const generateIframeContent = () => {
    // console.log("html", htmlCode);
    // console.log("css", cssCode);
    // console.log("js", jsCode);
    return `
      ${htmlCode}
      <style>
        ${cssCode}
      </style>
      <script>
        ${jsCode}
      </script>
    `;
  };
  return (
    <>
      <div className="px-5 bg-[#fafafa] min-h-screen flex justify-between flex-wrap">
        <div className="lg:w-[49.5%] w-full">
          <ul
            className="ps-2 flex mb-0 list-none flex-wrap pt-3 flex-row"
            role="tablist"
          >
            <li className="-mb-px me-1 last:mr-0  text-center">
              <a
                className={
                  "text-xs font-semibold uppercase px-5 py-[6px] rounded-t-lg  block leading-normal " +
                  (openTab == "html"
                    ? "text-white bg-" + bg
                    : "text-" + color + " bg-gray-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("html");
                  handleTabChange("html");
                }}
                data-toggle="tab"
                role="tablist"
              >
                HTML
              </a>
            </li>
            <li className="-mb-px me-1 last:mr-0 text-center">
              <a
                className={
                  "text-xs font-semibold uppercase px-5 py-[6px] rounded-t-lg  block leading-normal " +
                  (openTab == "css"
                    ? "text-white bg-" + bg
                    : "text-" + color + " bg-gray-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("css");
                  handleTabChange("css");
                }}
                data-toggle="tab"
                role="tablist"
              >
                CSS
              </a>
            </li>
            <li className="-mb-px me-1 last:mr-0 text-center">
              <a
                className={
                  "text-xs font-semibold uppercase px-5 py-[6px] rounded-t-lg block leading-normal " +
                  (openTab == "js"
                    ? "text-white bg-" + bg
                    : "text-" + color + " bg-gray-100")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("js");
                  handleTabChange("js");
                }}
                data-toggle="tab"
                role="tablist"
              >
                JS
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words rounded bg-white w-full  mb-6">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={openTab == "html" ? "block" : "hidden"}
                  id="link1"
                >
                  <CodeMirror
                    id="htmlTextarea"
                    className="shadow"
                    onChange={(e) => handleCodeChange(e, "html")}
                    height="calc(100vh - 130px)"
                    extensions={[html()]}
                  />
                </div>
                <div
                  className={openTab == "css" ? "block" : "hidden"}
                  id="link2"
                >
                  <CodeMirror
                    id="cssTextarea"
                    className="shadow"
                    onChange={(e) => handleCodeChange(e, "css")}
                    height="calc(100vh - 130px)"
                    extensions={[less()]}
                  />
                </div>
                <div
                  className={openTab == "js" ? "block" : "hidden"}
                  id="link3"
                >
                  <CodeMirror
                    id="jsTextarea"
                    className="shadow"
                    onChange={(e) => handleCodeChange(e, "js")}
                    height="calc(100vh - 130px)"
                    extensions={[javascript({ jsx: true })]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[49.5%] w-full pt-[9px]">
          <div>
            <p className="ms-2 px-5 rounded-t-lg text-white py-[5px] text-sm w-24 font-semibold bg-gradient-secondary">
              Browser
            </p>
            <iframe
              className="bg-white shadow w-full"
              style={{ height: "calc(100vh - 130px)" }}
              srcDoc={generateIframeContent()}
              id="iFrame"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs bg="gradient-primary" color="app-primary" />
    </>
  );
}
