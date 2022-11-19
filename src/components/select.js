export function select({
  id,
  name,
  required = false,
}) {
  return `
    <div class="select">
      <div class="select__container">
        <select
          name="${name}"
          id="${id}"
          class="select__content"
        >
          <option value="Family" selected>Family</option>
          <option value="Friend">Friend</option>
          <option value="Work">Work</option>
          <option value="Aquaintance">Aquaintance</option>
        </select>
      </div>
    </div>
  `;
}
