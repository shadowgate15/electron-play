import "./detail.css";

window.onmessage = (ev) => {
  if (ev.data && ev.data.type === "part-select") {
    const partElems = document.getElementsByClassName("part");
    for (let i = 0; i < partElems.length; i++) {
      partElems.item(i).innerHTML = ev.data.part;
    }
  }
};
