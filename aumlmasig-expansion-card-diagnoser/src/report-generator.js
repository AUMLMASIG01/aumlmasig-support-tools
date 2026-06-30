(function () {
  "use strict";

  function label(group, value) {
    const labels = window.AumlDiagnoser.config.optionLabels[group] || {};
    return labels[value] || "不確定";
  }

  function painLabels(values) {
    if (!values || values.length === 0) {
      return "未選擇";
    }
    return values.map((value) => label("pain", value)).join("、");
  }

  function listOrDefault(items) {
    if (!items || items.length === 0) {
      return "無";
    }
    return items.map((item) => `- ${item}`).join("\n");
  }

  function generateReportText(answers, result) {
    const time = new Date().toLocaleString("zh-TW", { hour12: false });
    return [
      "【AUMLMASIG 擴充卡一鍵診斷單】",
      `診斷時間：${time}`,
      `使用裝置：${answers.device || "未填寫"}`,
      `機器類型：${label("deviceType", answers.deviceType)}`,
      `主要需求：${label("goal", answers.goal)}`,
      `遇到痛點：${painLabels(answers.pain)}`,
      `PCIe 插槽：${label("pcie", answers.pcie)}`,
      `M.2 類型：${label("m2Type", answers.m2Type)}`,
      `長時間使用：${label("longrun", answers.longrun)}`,
      `作業系統：${label("os", answers.os)}`,
      `補充說明：${answers.notes || "未填寫"}`,
      `風險等級：${result.riskLabel}`,
      `系統建議：${result.summary}`,
      "相容提醒：",
      listOrDefault(result.warnings),
      "購買前確認事項：",
      listOrDefault(result.checklist),
      "",
      "請客服協助確認：",
      "",
      "1. 此主機是否可安裝對應擴充卡？",
      "2. 是否需要確認 PCIe 插槽尺寸與通道？",
      "3. 是否需要推薦超值 / 穩定 / 專業方案？"
    ].join("\n");
  }

  window.AumlDiagnoser = window.AumlDiagnoser || {};
  window.AumlDiagnoser.generateReportText = generateReportText;
})();
