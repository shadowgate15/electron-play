interface Window {
  ipc: {
    getPart: (part: string) => Promise<string>;
    getOverall: () => Promise<string>;
    setPart: (part: string, value: string) => void;
    updatePart: (
      listener: (
        event: Electron.IpcRendererEvent,
        part: string,
        value: string
      ) => void
    ) => void;
  };
}
