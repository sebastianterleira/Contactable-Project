export function input({
  name,
  placeholder = "",
  type,
  required = false,
  value = false,
}) {
  return `
    <div class="input">
      <div class="input__container">
        <input
          type="${type ? type : "text"}"
          placeholder="${placeholder}"
          class="input__content"
          name="${name}"
          ${value ? `value="${value}"` : ""}
          ${required ? "required" : ""}
        >
      </div>
    </div>
  `;
}
