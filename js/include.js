/**
 * include.js
 * 直接注入共用 HTML，不使用 fetch（支援直接開啟本機檔案）
 * 各頁面在 <body> 加 data-page="xxx" 對應 nav 的 data-type
 */

const INCLUDES = {
  header: `<header id="site-header">
  <div class="header-hamburger">
    <span></span><span></span><span></span>
  </div>
  <div class="header-logo">
    <img src="images/Settour_Logo.svg" alt="SET 東南旅遊">
  </div>
  <div class="header-right">
    <div class="header-user">
      <img src="images/user-icon.svg" alt="會員" style="width:17px;height:20px;display:block;">
    </div>
  </div>
</header>`,

  banner: `<div class="site-banner"></div>`,

  nav: `<div class="site-nav-sticky"><div class="site-nav">
  <a class="type-tab" data-type="builder" href="BUILDER.html" style="background:#F3473D;color:#fff;font-weight:700;">⭐ 組合器</a>
  <a class="type-tab" data-type="product" href="PRD_01.html#content">產品卡牌</a>
  <a class="type-tab" data-type="free" href="FREE_01.html#content">自由行卡牌</a>
  <a class="type-tab" data-type="member" href="MBR_01.html#content">會員卡牌</a>
  <a class="type-tab" data-type="travel" href="TRIP_01.html#content">旅展卡牌</a>
  <a class="type-tab" data-type="intro" href="INT_01.html#content">介紹卡牌</a>
  <a class="type-tab" data-type="video" href="VIDEO_01.html#content">影片卡牌</a>
  <a class="type-tab" data-type="blog" href="BLOG_01.html#content">部落格卡牌</a>
  <a class="type-tab" data-type="qa" href="QA_01.html#content">ＱＡ卡牌</a>
  <a class="type-tab" data-type="cpn" href="CPN_01.html#content">票券卡牌</a>
  <a class="type-tab" data-type="fbk" href="FBK_01.html#content">評價卡牌</a>
</div></div>`,

  footer: `<footer id="site-footer">
  <div class="footer-disclaimer">
    <p>以上優惠屬限量，正確內容、價格及出發日期，以實際銷售狀況為主，本公司保留活動內容修改、解釋及終止之權利。</p>
  </div>
  <div class="footer-main">
    <div class="footer-col-logo">
      <img src="images/Settour_Logo_w.svg" alt="SET 東南旅遊">
      <div class="footer-copyright">
        <p>東南旅行社股份有限公司版權所有</p>
        <p>©2026 SETtour All Rights Reserved.</p>
        <p style="margin-top:6px;">交觀綜字第2027號 品保0150號</p>
      </div>
    </div>
    <div class="footer-col-contact">
      <div class="footer-col-title">Contact Us</div>
      <div class="footer-divider"></div>
      <div class="footer-phone">全台市話 (02)412-8688 | (02)2567-8111</div>
    </div>
    <div class="footer-col-follow">
      <div class="footer-col-title">Follow Us</div>
      <div class="footer-divider"></div>
      <div class="footer-social-icons">
        <a href="#"><img src="images/LINE.svg" alt="LINE"></a>
        <a href="#"><img src="images/FB.svg" alt="Facebook"></a>
        <a href="#"><img src="images/IG.svg" alt="Instagram"></a>
        <a href="#"><img src="images/YT.svg" alt="YouTube"></a>
      </div>
    </div>
  </div>
</footer>`
};

function injectIncludes() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const key = el.getAttribute('data-include');
    if (INCLUDES[key]) {
      el.outerHTML = INCLUDES[key];
    }
  });
}

function setActiveNav() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('.site-nav .type-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-type') === page);
  });
  // 自動把 active tab 捲動到可見範圍
  const activeTab = document.querySelector('.site-nav .type-tab.active');
  if (activeTab) {
    activeTab.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
}

function initTopBtn() {
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('topBtn');
    if (btn) btn.classList.toggle('visible', window.scrollY > 300);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectIncludes();
  setActiveNav();
  initTopBtn();
  if (typeof window.pageInit === 'function') {
    window.pageInit();
  }
});
