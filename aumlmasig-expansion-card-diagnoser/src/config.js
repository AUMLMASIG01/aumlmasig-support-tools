(function () {
  "use strict";

  const optionLabels = {
    deviceType: {
      unknown: "不確定 / 不填",
      desktop: "桌上型電腦",
      mini: "迷你主機 / 小主機",
      laptop: "筆電",
      nas: "NAS / 監控主機",
      workstation: "工作站 / 伺服器"
    },
    goal: {
      unknown: "請選擇",
      nvme_basic: "增加 NVMe M.2 SSD",
      nvme_raid: "多顆 NVMe / RAID / 高速工作流",
      u2: "使用 U.2 NVMe SSD",
      sata: "增加 SATA 硬碟",
      usb: "增加 USB 埠",
      nic: "增加網路埠",
      other: "其他 / 不確定"
    },
    pain: {
      slot: "插槽不夠 / 想擴充",
      speed: "速度不穩 / 會掉速",
      temp: "溫度高 / 怕降速",
      compat: "不知道相容 / 怕買錯",
      install: "不會裝 / 沒把握"
    },
    pcie: {
      unknown: "不確定",
      x1: "有 PCIe x1",
      x4: "有 PCIe x4",
      x16: "有 PCIe x16",
      none: "沒有 / 筆電或迷你主機無法裝"
    },
    m2Type: {
      unknown: "不確定",
      nvme: "NVMe",
      sata: "SATA",
      mixed: "混合 / 不知道怎麼分",
      not_needed: "不需要 M.2"
    },
    longrun: {
      unknown: "不確定",
      no: "不會，一般使用",
      yes: "會，渲染 / 備份 / 伺服器 / 監控 / 長時間運作"
    },
    os: {
      unknown: "不確定",
      win11: "Windows 11",
      win10: "Windows 10",
      linux: "Linux / NAS",
      other: "其他"
    }
  };

  const categoryLinks = {
    nvme_basic: "https://www.aumlmasig.com/categories/nvme-m2-m-key",
    nvme_raid: "https://www.aumlmasig.com/categories/nvme-m2-m-key",
    u2: "https://www.aumlmasig.com/categories/u-2",
    sata: "https://www.aumlmasig.com/categories/sata3-0",
    usb: "https://www.aumlmasig.com/categories/usb3-0-%E6%93%B4%E5%85%85%E5%8D%A1",
    nic: "https://www.aumlmasig.com/categories/rj-45-network-card-gigabit-network-card",
    other: null,
    unknown: null
  };

  window.AumlDiagnoser = window.AumlDiagnoser || {};
  window.AumlDiagnoser.config = {
    optionLabels,
    categoryLinks,
    downloadCenterUrl: "https://www.aumlmasig.com/pages/new-page",
    supportUrl: "https://aumlmasig01.github.io/aumlmasig-support-tools/support-contact.html"
  };
})();
