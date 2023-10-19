const gridSize = 16;
const roomSize = 16;

export const GameConfig = {
	gridSize,
	roomSize,
	screenSize: gridSize * roomSize,
} as const
