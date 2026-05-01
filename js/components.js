class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = window.location.pathname.split("/").pop();

    this.innerHTML = `
      <header class="site-header">
        <div class="container flex justify-between items-center">

          <div class="logo text-primary">
            <a href="index.html">Manyata Dhakal</a>
          </div>

          <nav class="site-nav">
            <ul class="flex gap-6">
              <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
              <li><a href="resume.html" class="${page === 'resume.html' ? 'active' : ''}">Skills</a></li>
              <li><a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact</a></li>
            </ul>
          </nav>

        </div>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer section-bg-alt">
        <div class="container text-center">

          <p class="mb-4">&copy; ${year} Manyata Dhakal</p>

          <p class="mb-4">BIT Student | Learner</p>

          <div class="flex gap-6 justify-center">
            <a href="https://github.com/ManyataDhakal" target="_blank">GitHub</a>
            <a href="mailto:manyatadhakal12@gmail.com">Email</a>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);