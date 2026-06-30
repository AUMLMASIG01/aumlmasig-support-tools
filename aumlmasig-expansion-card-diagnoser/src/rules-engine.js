(function () {
  "use strict";

  const riskRank = { low: 1, medium: 2, high: 3 };
  const riskLabels = {
    low: "低風險：可直接購買",
    medium: "中風險：建議先確認",
    high: "高風險：請先聯繫客服，不建議直接下單"
  };

  const categoryNames = {
    nvme_basic: "NVMe M.2 擴充卡",
    nvme_raid: "NVMe M.2 擴充卡",
    u2: "U.2 / U.3 擴充方案",
    sata: "SATA 擴充卡",
    usb: "USB 擴充卡",
    nic: "網路擴充卡",
    other: "需客服協助確認",
    unknown: "需客服協助確認"
  };

  function raiseRisk(current, next) {
    return riskRank[next] > riskRank[current] ? next : current;
  }

  function includesText(value, keyword) {
    return String(value || "").toLowerCase().includes(keyword.toLowerCase());
  }

  function unique(items) {
    return Array.from(new Set(items.filter(Boolean)));
  }

  function plansForGoal(goal) {
    const goalText = categoryNames[goal] || categoryNames.other;
    return [
      {
        name: "超值方案",
        description: `適合一般擴充、預算優先、需求單純的 ${goalText} 選型。`
      },
      {
        name: "穩定方案",
        description: "適合長時間使用、資料備份、NAS、監控、工作站，優先考量穩定性與散熱。"
      },
      {
        name: "專業方案",
        description: "適合多顆 SSD、RAID、高速工作流、10G 網路、伺服器或高負載用途。"
      }
    ];
  }

  function diagnoseExpansionCard(answers) {
    const config = window.AumlDiagnoser.config;
    const pain = Array.isArray(answers.pain) ? answers.pain : [];
    const warnings = [];
    const checklist = [
      "確認主機是否有可用 PCIe 插槽、插槽尺寸與可用通道。",
      "確認機殼空間、散熱條件與目標裝置規格。",
      "確認作業系統與用途是否符合預期。"
    ];
    let riskLevel = "low";
    let title = "已產生擴充卡選型建議";
    let summary = "依目前填寫資料，可先參考建議方案與購買前確認事項。";

    const goal = answers.goal || "unknown";
    const recommendedCategory = categoryNames[goal] || categoryNames.other;
    const recommendedUrl = config.categoryLinks[goal] || null;

    if (answers.pcie === "none") {
      riskLevel = raiseRisk(riskLevel, "high");
      title = "目前不建議直接購買 PCIe 擴充卡";
      warnings.push("筆電、部分迷你主機或無 PCIe 插槽設備，通常無法安裝 PCIe 擴充卡。");
      summary = "目前資料顯示可能沒有可用 PCIe 插槽，建議先聯繫客服確認可安裝方式。";
    }

    if (answers.deviceType === "laptop") {
      warnings.push("筆電通常不能安裝標準 PCIe 擴充卡，需確認是否有其他外接或原廠支援方案。");
      riskLevel = raiseRisk(riskLevel, answers.pcie === "x1" || answers.pcie === "x4" || answers.pcie === "x16" ? "medium" : "high");
    }

    if (goal === "unknown" || goal === "other") {
      riskLevel = raiseRisk(riskLevel, "medium");
      summary = "目前需求仍不夠明確，建議複製診斷單提供客服確認。";
      checklist.push("補充希望擴充的裝置類型、數量、速度需求與預算方向。");
    }

    if (goal === "nvme_raid") {
      warnings.push("多顆 NVMe / RAID 可能需要主機板支援 PCIe Bifurcation。");
      if (answers.pcie === "x1") {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("PCIe x1 頻寬通常不足以發揮多顆 NVMe / RAID 的效能。");
      }
      if (answers.pcie === "unknown") {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("PCIe 插槽與通道尚未確認，建議先確認主機板規格。");
      }
      summary = "建議優先確認 PCIe 通道配置與主機板分岔支援，再選擇 NVMe 擴充方案。";
    }

    if (goal === "nvme_basic") {
      if (answers.m2Type === "sata") {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("SATA M.2 與 NVMe M.2 不相同，購買前需確認 SSD 規格。");
      }
      if (answers.pcie === "x1") {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("PCIe x1 可用但速度會受插槽頻寬限制。");
      }
      summary = "建議選擇 NVMe M.2 擴充卡，並先確認 SSD 類型與 PCIe 插槽通道。";
    }

    if (goal === "u2") {
      riskLevel = raiseRisk(riskLevel, "medium");
      warnings.push("U.2 / U.3 需確認 SSD 規格、線材、供電與主機板 PCIe 通道。");
      summary = "建議選擇 U.2 / U.3 對應方案，購買前需確認線材與供電條件。";
    }

    if (goal === "sata") {
      summary = "建議選擇 SATA 擴充卡，並確認硬碟數量、連接埠需求與作業系統支援。";
      if (answers.longrun === "yes") {
        warnings.push("長時間使用建議選擇穩定晶片與散熱較佳的 SATA 擴充方案。");
      }
    }

    if (goal === "usb") {
      summary = "建議選擇 USB 擴充卡，並確認需要的 USB 版本、連接埠數量與供電需求。";
      if (includesText(answers.notes, "20Gbps")) {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("USB 20Gbps 需確認主機 PCIe 頻寬與前端裝置支援。");
      }
    }

    if (goal === "nic") {
      summary = "建議選擇網路擴充卡，並確認網路速度、交換器、線材與散熱需求。";
      if (includesText(answers.notes, "10G")) {
        riskLevel = raiseRisk(riskLevel, "medium");
        warnings.push("10G 網路需確認 PCIe 插槽頻寬、散熱、交換器與網路線規格。");
      }
    }

    if (pain.includes("speed")) {
      warnings.push("實際速度會受主機板插槽通道、晶片、線材、SSD / 裝置本身影響。");
    }

    if (pain.includes("temp") || answers.longrun === "yes") {
      warnings.push("長時間使用建議優先選擇散熱與穩定性較好的方案。");
    }

    if (pain.includes("compat") || pain.includes("install")) {
      checklist.push("購買前建議提供主機板型號、CPU、作業系統與目標用途給客服確認。");
    }

    const result = {
      riskLevel,
      riskLabel: riskLabels[riskLevel],
      title,
      summary,
      recommendedCategory,
      recommendedUrl: riskLevel === "high" ? null : recommendedUrl,
      plans: plansForGoal(goal),
      warnings: unique(warnings),
      checklist: unique(checklist),
      reportText: ""
    };
    result.reportText = window.AumlDiagnoser.generateReportText(answers, result);
    return result;
  }

  window.AumlDiagnoser = window.AumlDiagnoser || {};
  window.AumlDiagnoser.diagnoseExpansionCard = diagnoseExpansionCard;
})();
