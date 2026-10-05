(() => {
  const SESSION_KEY = "packit.prototype.access.v1";
  const SESSION_VALUE = "unlocked";
  const PASSWORD_DIGEST = "926d8122e46bc31df3795f09655ef171ca8501fcba6dd5c39e11bb693a5895c9";

  const root = document.documentElement;
  const lockScreen = document.querySelector("#prototypeLock");
  const app = document.querySelector("#desktop");
  const form = document.querySelector("#prototypeLockForm");
  const passwordInput = document.querySelector("#prototypePassword");
  const errorMessage = document.querySelector("#prototypeLockError");

  const hasSessionAccess = () => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === SESSION_VALUE;
    } catch (_error) {
      return false;
    }
  };

  const rememberSessionAccess = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, SESSION_VALUE);
    } catch (_error) {
      // The prototype still unlocks when browser storage is unavailable.
    }
  };

  const hashPassword = async (password) => {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const unlock = () => {
    rememberSessionAccess();
    root.classList.remove("prototype-locked");
    root.classList.add("prototype-unlocked");
    lockScreen.hidden = true;
    lockScreen.setAttribute("aria-hidden", "true");
    app.removeAttribute("inert");
    app.removeAttribute("aria-hidden");
  };

  if (hasSessionAccess()) {
    unlock();
    return;
  }

  root.classList.add("prototype-locked");
  requestAnimationFrame(() => passwordInput.focus());

  passwordInput.addEventListener("input", () => {
    passwordInput.removeAttribute("aria-invalid");
    errorMessage.hidden = true;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!passwordInput.value) {
      passwordInput.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Enter the password to continue.";
      errorMessage.hidden = false;
      passwordInput.focus();
      return;
    }

    form.setAttribute("aria-busy", "true");

    try {
      if (await hashPassword(passwordInput.value) === PASSWORD_DIGEST) {
        passwordInput.value = "";
        unlock();
        return;
      }
      passwordInput.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "That password is not correct. Try again.";
      errorMessage.hidden = false;
      passwordInput.select();
    } catch (_error) {
      errorMessage.textContent = "Password verification is unavailable in this browser.";
      errorMessage.hidden = false;
    } finally {
      form.removeAttribute("aria-busy");
    }
  });
})();
