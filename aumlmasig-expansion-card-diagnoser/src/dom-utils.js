(function () {
  "use strict";

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function setHidden(element, isHidden) {
    if (element) {
      element.hidden = isHidden;
    }
  }

  function text(element, value) {
    if (element) {
      element.textContent = value;
    }
  }

  function clearChildren(element) {
    while (element && element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function renderList(element, items) {
    clearChildren(element);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function renderPlans(element, plans) {
    clearChildren(element);
    plans.forEach((plan) => {
      const item = document.createElement("article");
      item.className = "auml-plan";
      const title = document.createElement("h4");
      title.textContent = plan.name;
      const description = document.createElement("p");
      description.textContent = plan.description;
      item.append(title, description);
      element.appendChild(item);
    });
  }

  window.AumlDiagnoser = window.AumlDiagnoser || {};
  window.AumlDiagnoser.dom = { qs, qsa, setHidden, text, renderList, renderPlans };
})();
