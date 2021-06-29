/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
declare const DETAIL_WINDOW_WEBPACK_ENTRY: string;

import "./index.css";
const ipcRenderer = window.ipcRenderer;

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

(async () => {
  document.getElementById("overall").innerText = await ipcRenderer.invoke(
    "get-overall"
  );

  const elems = document.getElementsByClassName("part");
  let promises = [];

  for (let i = 0; i < elems.length; i++) {
    const elem = elems.item(i);
    const part = elem.getAttribute("data-part");

    elem.addEventListener("click", () => {
      const win = window.open(DETAIL_WINDOW_WEBPACK_ENTRY);

      win.onload = () => {
        win.postMessage({ type: "part-select", part }, "*");
      };
    });

    promises.push(ipcRenderer.invoke("get-part", part));
  }

  promises = await Promise.all(promises);

  for (let i = 0; i < elems.length; i++) {
    const elem = elems.item(i);
    document.getElementById(elem.getAttribute("data-part")).innerHTML =
      promises[i];
  }
})();

ipcRenderer.on("update-part", (_, part: string, value: number) => {
  document.getElementById(part).innerHTML = value.toString();
});
