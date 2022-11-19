export function input({
	id,
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
					type="${type ? type : "text" }"
					placeholder="${placeholder}"
					class="input__content"
					name="${name}"
					id = "${id}"
					${value ?  `value="${value}"` : ""}
					${required ? "required" : ""}
				>
			</div>
		</div>
	`
}
