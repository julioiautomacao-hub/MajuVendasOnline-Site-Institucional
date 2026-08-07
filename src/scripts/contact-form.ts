const WEBHOOK_URL = import.meta.env.PUBLIC_N8N_WEBHOOK_URL;

export function initContactForm() {
  const form = document.getElementById("contato-form") as HTMLFormElement | null;
  const status = document.getElementById("contato-status");
  const submitBtn = document.getElementById("contato-submit") as HTMLButtonElement | null;
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!WEBHOOK_URL) {
      status.textContent = "Formulário ainda não configurado. Tente novamente mais tarde.";
      status.setAttribute("data-state", "error");
      return;
    }

    const data = new FormData(form);
    const payload = {
      email: data.get("email"),
      message: data.get("message"),
      source: "site-institucional-contato",
      page: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    status.textContent = "Enviando...";
    status.setAttribute("data-state", "pending");
    submitBtn?.setAttribute("data-disabled", "true");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook respondeu ${res.status}`);

      form.reset();
      status.textContent = "Mensagem enviada! Responderemos em até 24h úteis.";
      status.setAttribute("data-state", "success");
    } catch (err) {
      status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
      status.setAttribute("data-state", "error");
    } finally {
      submitBtn?.removeAttribute("data-disabled");
    }
  });
}
