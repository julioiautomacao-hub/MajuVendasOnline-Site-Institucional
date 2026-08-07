export function initComingSoon() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-coming-soon]");

  buttons.forEach((button) => {
    const messageId = button.getAttribute("aria-describedby");
    const message = messageId ? document.getElementById(messageId) : null;
    if (!message) return;

    let hideTimeout: number | undefined;

    button.addEventListener("click", () => {
      message.textContent = "Essa seção ainda está em construção. Volte em breve!";
      message.setAttribute("data-state", "info");

      window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        message.removeAttribute("data-state");
      }, 4000);
    });
  });
}
