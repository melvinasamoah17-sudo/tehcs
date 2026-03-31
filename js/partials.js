/* =============================================
   TEHCS — Nav & Footer HTML Partials
   Injected by every page
============================================= */

(function () {
  /* ── NAV ── */
  var navHTML = `
  <nav id="nav">
    <a href="index.html" class="logo">
      <img src="images/tehcs.jpg" alt="TEHCS — Twitch Empire Home Care Service" style="height:52px;width:auto;object-fit:contain;display:block;">
      <div>
    <div class="logo-name">Twitch Empire</div>
    <div class="logo-tag">Home Care Service</div>
  </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="process.html">Our Process</a></li>
      <li><a href="contact.html" class="nav-cta">Contact Us</a></li>
    </ul>
    <button class="burger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  /* ── FOOTER ── */
  var footerHTML = `
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="logo">
      <img src="images/tehcs.jpg" alt="TEHCS — Twitch Empire Home Care Service" style="height:52px;width:auto;object-fit:contain;display:block;">
      <div>
    <div class="logo-name">Twitch Empire</div>
    <div class="logo-tag">Home Care Service</div>
  </div>
    </a>
        <p>Reliable Home Health Care, Construction and Non-Health Care Service Provider. Serving families across Ghana and the United Kingdom.</p>
        <div class="footer-social">
          <a href="mailto:twitchempireinfo@gmail.com" class="soc-btn" title="Email">&#x2709;&#xFE0F;</a>
          <a href="tel:+447448468070" class="soc-btn" title="UK">&#x1F4DE;</a>
          <a href="tel:+233240699329" class="soc-btn" title="Ghana">&#x1F4F1;</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="process.html">Our Process</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">Home Health Care</a></li>
          <li><a href="services.html">Construction</a></li>
          <li><a href="services.html">Non-Medical</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+447448468070">+44 7448 468070 (UK)</a></li>
          <li><a href="tel:+233240699329">+233 240 699 329 (GH)</a></li>
          <li><a href="tel:0302449719">030 244 9719 (Landline)</a></li>
          <li><a href="mailto:twitchempireinfo@gmail.com">twitchempireinfo@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bot">
      <p>&copy; 2026 TEHCS &mdash; Twitch Empire Home Care Service. All rights reserved.</p>
      <div>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Accessibility</a>
      </div>
    </div>
  </footer>`;

  /* inject */
  var navMount = document.getElementById('nav-mount');
  var footMount = document.getElementById('footer-mount');
  if (navMount)  navMount.outerHTML  = navHTML;
  if (footMount) footMount.outerHTML = footerHTML;
})();
