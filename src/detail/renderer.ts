import "./detail.css";

window.onmessage = async (ev) => {
  if (ev.data && ev.data.type === "part-select") {
    const partElems = document.getElementsByClassName("part");
    for (let i = 0; i < partElems.length; i++) {
      partElems.item(i).innerHTML = ev.data.part;
    }

    const slider = document.getElementById("slider");

    slider.setAttribute("value", await window.ipc.getPart(ev.data.part));

    slider.oninput = function (this: HTMLInputElement) {
      window.ipc.setPart(ev.data.part, this.value);
    };
  }
};
