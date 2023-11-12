"use client"
import { useState } from "react";

const Editor = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCodeChange = (event, codeType) => {
    const value = event.target.value;

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
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold">Front end Playground</h2>
      <ul className="flex my-4">
        <li className={`${activeTab === "html" ? "bg-blue-200" : ""}`}>
          <a href="#html" onClick={() => handleTabChange("html")} className="p-2 bg-blue-300 rounded-tl">
            HTML
          </a>
        </li>
        <li className={`${activeTab === "css" ? "bg-blue-200" : ""}`}>
          <a href="#css" onClick={() => handleTabChange("css")} className="p-2 bg-blue-300">
            CSS
          </a>
        </li>
        <li className={`${activeTab === "js" ? "bg-blue-200" : ""}`}>
          <a href="#js" onClick={() => handleTabChange("js")} className="p-2 bg-blue-300 rounded-tr">
            JS
          </a>
        </li>
      </ul>
      <div className="iframe-container">
        <div id="myTabContent">
          <div className={`tab-pane ${activeTab === "html" ? "active" : ""}`} id="html">
            <p>
              <textarea id="htmlTextarea" className="w-full h-32" value={htmlCode} onChange={(e) => handleCodeChange(e, "html")}></textarea>
            </p>
          </div>
          <div className={`tab-pane ${activeTab === "css" ? "active" : ""}`} id="css">
            <p>
              <textarea id="cssTextarea" className="w-full h-32" value={cssCode} onChange={(e) => handleCodeChange(e, "css")}></textarea>
            </p>
          </div>
          <div className={`tab-pane ${activeTab === "js" ? "active" : ""}`} id="js">
            <p>
              <textarea id="jsTextarea" className="w-full h-32" value={jsCode} onChange={(e) => handleCodeChange(e, "js")}></textarea>
            </p>
          </div>
        </div>
        <div>
          <iframe id="iFrame" className="w-full h-32" srcDoc={generateIframeContent()}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Editor;
