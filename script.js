const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const projectContent = {
  meesho: {
    title: 'Meesho Reseller Growth & Alert Intelligence Pipeline',
    body: `
      <p>This project demonstrates a complete, local analytics-to-action workflow: generated data is queried with SQL, analysed for monthly revenue movement, checked against a documented alert threshold, then converted into a reviewable stakeholder-message draft.</p>
      <ul class="dialog-list">
        <li><strong>Metrics:</strong> monthly category and regional revenue summaries from SQLite.</li>
        <li><strong>Detection:</strong> Python calculates month-over-month growth and flags changes using a default 8% threshold.</li>
        <li><strong>Communication:</strong> deterministic Context → Insight → Implication templates create a draft for human approval.</li>
        <li><strong>Guardrails:</strong> feed validation, test fixtures, and documented retry/error handling are part of the workflow.</li>
      </ul>
      <p><strong>Important:</strong> the “agent” is a local mock runner. It does not call an LLM or external AI service, and it never sends messages externally.</p>
    `
  },
  tiktok: {
    title: 'TikTok Video Claims Classification',
    body: `
      <p>Compared two models for classifying TikTok videos as claims or opinions using a dataset of 19,382 videos and 12 fields.</p>
      <ul class="dialog-list">
        <li><strong>Preparation:</strong> data cleaning, inspection, and exploratory analysis.</li>
        <li><strong>Statistical reasoning:</strong> hypothesis testing used to explore relationships in the data.</li>
        <li><strong>Model comparison.</strong> Engineered features, compared logistic regression and random forest using a stratified 80/20 split, and tuned the random forest with three-fold cross-validation.</li>
        <li><strong>Evaluation.</strong> Compared precision, recall, and F1 on 3,817 held-out videos. Random forest missed zero claims and logistic regression missed two.</li>
      </ul>
      <p>The classifier can help reviewers decide which videos to examine first.</p>
    `
  }
};

const dialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogContent = document.querySelector('#dialog-content');
const dialogClose = document.querySelector('.dialog-close');

document.querySelectorAll('.project-open').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectContent[button.dataset.project];
    if (!project || !dialog) return;
    dialogTitle.textContent = project.title;
    dialogContent.innerHTML = project.body;
    dialog.showModal();
    dialogClose.focus();
  });
});

if (dialog && dialogClose) {
  dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (isOutside) dialog.close();
  });
}
