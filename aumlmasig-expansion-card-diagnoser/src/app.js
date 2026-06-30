(function () {
  "use strict";

  const dom = window.AumlDiagnoser.dom;
  let latestReportText = "";

  function readAnswers(form) {
    const data = new FormData(form);
    return {
      device: String(data.get("device") || "").trim(),
      deviceType: String(data.get("device_type") || "unknown"),
      goal: String(data.get("goal") || "unknown"),
      pain: dom.qsa("input[name='pain']:checked", form).map((input) => input.value),
      pcie: String(data.get("pcie") || "unknown"),
      m2Type: String(data.get("m2_type") || "unknown"),
      longrun: String(data.get("longrun") || "unknown"),
      os: String(data.get("os") || "unknown"),
      notes: String(data.get("notes") || "").trim()
    };
  }

  function renderResult(result) {
    latestReportText = result.reportText;
    const resultPanel = dom.qs("#diagnosis-result");
    resultPanel.className = `auml-result auml-risk-${result.riskLevel}`;
    dom.setHidden(resultPanel, false);
    dom.text(dom.qs("#result-risk"), result.riskLabel);
    dom.text(dom.qs("#result-title"), result.title);
    dom.text(dom.qs("#result-summary"), result.summary);
    dom.text(dom.qs("#recommended-category"), result.recommendedCategory);
    dom.renderPlans(dom.qs("#plan-list"), result.plans);
    dom.renderList(dom.qs("#warning-list"), result.warnings.length ? result.warnings : ["目前未發現明確相容性提醒，仍建議購買前確認主機規格。"]);
    dom.renderList(dom.qs("#checklist"), result.checklist);
    dom.qs("#report-text").value = result.reportText;

    const productLink = dom.qs("#product-link");
    const noProduct = dom.qs("#no-product-message");
    if (result.recommendedUrl) {
      productLink.href = result.recommendedUrl;
      dom.setHidden(productLink, false);
      dom.setHidden(noProduct, true);
    } else {
      productLink.removeAttribute("href");
      dom.setHidden(productLink, true);
      dom.setHidden(noProduct, false);
    }
  }

  function resetResult() {
    latestReportText = "";
    dom.setHidden(dom.qs("#diagnosis-result"), true);
    dom.text(dom.qs("#copy-status"), "");
  }

  function copyWithFallback(text) {
    const reportBox = dom.qs("#report-text");
    reportBox.focus();
    reportBox.select();
    return document.execCommand("copy");
  }

  function copyReport() {
    if (!latestReportText) {
      dom.text(dom.qs("#copy-status"), "請先完成診斷再複製診斷單");
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(latestReportText)
        .then(() => dom.text(dom.qs("#copy-status"), "已複製，可貼給客服確認"))
        .catch(() => {
          const ok = copyWithFallback(latestReportText);
          dom.text(dom.qs("#copy-status"), ok ? "已複製，可貼給客服確認" : "瀏覽器未允許複製，請手動選取診斷單內容");
        });
      return;
    }
    const ok = copyWithFallback(latestReportText);
    dom.text(dom.qs("#copy-status"), ok ? "已複製，可貼給客服確認" : "瀏覽器未允許複製，請手動選取診斷單內容");
  }

  function setupOptionalLinks() {
    const config = window.AumlDiagnoser.config;
    const download = dom.qs("#download-link");
    const support = dom.qs("#support-link");
    if (config.downloadCenterUrl) {
      download.href = config.downloadCenterUrl;
      dom.setHidden(download, false);
    }
    if (config.supportUrl) {
      support.href = config.supportUrl;
      dom.setHidden(support, false);
    }
  }

  function init() {
    const form = dom.qs("#diagnoser-form");
    setupOptionalLinks();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const answers = readAnswers(form);
      const result = window.AumlDiagnoser.diagnoseExpansionCard(answers);
      renderResult(result);
      dom.qs("#diagnosis-result").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    form.addEventListener("reset", () => {
      window.setTimeout(resetResult, 0);
    });
    dom.qs("#copy-report").addEventListener("click", copyReport);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
