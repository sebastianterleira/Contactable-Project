export function select({ id, name, required = false, selected = "Family" }) {
  return `
    <div class="select">
      <div class="select__container">
        <select
          name="${name}"
          id="${id}"
          class="select__content"
        >
          <option value="Family" ${
            selected === "Family" ? "selected" : ""
          }>Family</option>
          <option value="Friend" ${
            selected === "Friend" ? "selected" : ""
          }>Friend</option>
          <option value="Work" ${
            selected === "Work" ? "selected" : ""
          }>Work</option>
          <option value="Acquaintance" ${
            selected === "Acquaintance" ? "selected" : ""
          }>Acquaintance</option>
        </select>
      </div>
    </div>
  `;
}
