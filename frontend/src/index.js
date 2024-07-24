

document.addEventListener("DOMContentLoaded", app);

function app() {
	renderGrid();
	renderPalette();
	addListeners();
};

function renderGrid() {
	const grid = document.getElementById("grid");
	let nVerticalCells = Math.floor(window.innerHeight / 50);

	for (let i = 0; i < 50; i++) {
		for (let j = 0; j < nVerticalCells; j++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			grid.appendChild(cell);
		}
	}
};

function renderPalette( ) {
	const palette = document.getElementById("palette");
	const colors = [
		"black",
		"white",
		"red",
		"green",
		"blue",
		"yellow",
		"orange",
		"cyan",
		"magenta",
		"gray"
	];
	colors.forEach(colorName => {
		const color = document.createElement("div");
		color.classList.add("color", colorName);
		palette.appendChild(color);
	});
}

function addListeners() {
	let state = {
		selectedColor: "black",
		isMouseDown: false
	}

	// selecting color logic
	document.querySelectorAll(".color").forEach((color) => {
		color.addEventListener("click", selectColor.bind(color, state));				// bind()
	})

	// painting logic
	document.querySelectorAll(".cell").forEach((cell) => {
		cell.addEventListener("mousedown", paintOne.bind(cell, state));					// bind()
		cell.addEventListener("mouseover", () => paintDrag(cell, state));				// arrow function
		cell.addEventListener("mouseup", function() { state.isMouseDown = false; });	// inline function
	})
}

function selectColor(state) {
	state.selectedColor = this.classList[1];
}

function paintOne(state) {
	state.isMouseDown = true;
	this.classList.add(state.selectedColor);
}

function paintDrag(cell, state) {
	if (state.isMouseDown)
		cell.classList.add(state.selectedColor);
}

/*	NOTES
	• ARROW FUNCTIONS: (this) is inherited from the outer context in which they are defined.
	In case of addEventListener() the inherited context would be the window object.
	• "use strict": good practice to set, otherwise everytime this could potentially point
	to the global OR window object.

	• this: is unbound, means, evaluated run-time (tricky to understand in this way) ---- restart from here https://javascript.info/bind


*/
