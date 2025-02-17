export function cleanHtml(html) {
  if (!html) return "";

  // First remove excessive &nbsp;
  html = html.replace(/&nbsp;+/g, " ");

  const div = document.createElement("div");
  div.innerHTML = html;

  // Remove empty p tags
  const emptyPTags = div.querySelectorAll("p:empty");
  emptyPTags.forEach((tag) => tag.remove());

  const elements = div.getElementsByTagName("*");
  for (let el of elements) {
    el.removeAttribute("style");
    el.classList.remove(
      "times",
      "times-new-roman",
      "arial",
      "helvetica",
      "verdana"
    );
    if (el.tagName.toLowerCase() === "font") {
      const parent = el.parentNode;
      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
      parent.removeChild(el);
    }
  }

  // Clean up any remaining whitespace between tags
  return div.innerHTML.replace(/>\s+</g, "><").trim();
}

export function formatTime(minutes) {
  return `${minutes} min`;
}

export function formatType(type) {
  const types = {
    MC: "Multiple Choice",
    TF: "True/False",
    YN: "Yes/No",
  };
  return types[type] || type;
}
