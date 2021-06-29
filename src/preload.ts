import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipc", {
  getPart: (part: string) => {
    return ipcRenderer.invoke("get-part", part);
  },
  getOverall: () => {
    return ipcRenderer.invoke("get-overall");
  },
  setPart: (part: string, value: number) => {
    ipcRenderer.send("set-part", part, value);
  },
  updatePart: (
    listener: (
      event: Electron.IpcRendererEvent,
      part: string,
      value: string
    ) => void
  ) => {
    ipcRenderer.on("update-part", listener);
  },
});
