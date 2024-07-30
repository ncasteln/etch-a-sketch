"use strict"

document.addEventListener("DOMContentLoaded", app);

function app() {
	defaultGrid();
	renderPalette();
	addListeners();
};

function defaultGrid() {
	const grid = document.getElementById("grid");

	const idealCellSize = 20;
	const gridWidth = grid.offsetWidth;
	const gridHeight = grid.offsetHeight;

	let cols = Math.floor(gridWidth / idealCellSize);
	let rows = Math.floor(gridHeight / idealCellSize);

	const adjustedCellWidth = gridWidth / cols;
	const adjustedCellHeight = gridHeight / rows;
	const totalCells = rows * cols;

	for (let i = 0; i < totalCells; i++) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.style.width = `${adjustedCellWidth}px`;
		cell.style.height = `${adjustedCellHeight}px`;
		grid.appendChild(cell);
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
		color.classList.add("color", colorName); // change and void class
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
	document.querySelectorAll(".color").forEach((color) => {
		color.classList.remove("selected");
	})
	state.selectedColor = this.classList[1];
	this.classList.add("selected");
}

function paintOne(state) {
	state.isMouseDown = true;
	this.style.backgroundColor = state.selectedColor;
}

function paintDrag(cell, state) {
	if (!state.isMouseDown) {
		document.querySelectorAll(".cell").forEach((cell) => {
			cell.classList.remove("hovered");
		})
		cell.classList.add("hovered");
	}
	if (state.isMouseDown)
		cell.style.backgroundColor = state.selectedColor;
}

/*	NOTES
	• ARROW FUNCTIONS: (this) is inherited from the outer context in which they are defined.
	In case of addEventListener() the inherited context would be the window object.
	• "use strict": good practice to set, otherwise everytime this could potentially point
	to the global OR window object.

	• this: is unbound, means, evaluated run-time (tricky to understand in this way) ---- restart from here https://javascript.info/bind


*/
