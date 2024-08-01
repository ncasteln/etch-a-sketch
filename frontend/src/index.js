"use strict"

const MOUSE_LEFT = 0

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
		color.state = state;
		color.addEventListener("click", function(e) {
			if (e.button != MOUSE_LEFT) return ;
			e.preventDefault();
			resetValue(".color", "selected");
			let domElement = e.currentTarget;
			domElement.state.selectedColor = domElement.classList[1];
			domElement.classList.add("selected");
		});
	})

	// painting logic
	document.querySelectorAll(".cell").forEach((cell) => {
		cell.state = state;
		cell.addEventListener("mousedown", function(e) {
			if (e.button != MOUSE_LEFT) return ;
			e.preventDefault();
			let domElement = e.currentTarget;
			domElement.state.isMouseDown = true;
			domElement.style.backgroundColor = domElement.state.selectedColor;
		});
		cell.addEventListener("mouseover", function(e) {
			if (e.button != MOUSE_LEFT) return ;
			e.preventDefault();
			let domElement = e.currentTarget;
			if (!domElement.state.isMouseDown) {
				resetValue(".cell", "hovered");
				domElement.classList.add("hovered");
			}
			if (domElement.state.isMouseDown)
				domElement.style.backgroundColor = domElement.state.selectedColor;
		});
		cell.addEventListener("mouseup", function(e) {
			if (e.button != MOUSE_LEFT) return ;
			e.preventDefault();
			let domElement = e.currentTarget;
			domElement.state.isMouseDown = false;
		});
	})
}

function resetValue(element, classToRemove) {
	document.querySelectorAll(element).forEach(element => {
		element.classList.remove(classToRemove);
	});
}
