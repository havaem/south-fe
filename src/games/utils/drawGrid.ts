export const drawGrid = (ctx: CanvasRenderingContext2D, tileSize: number, mapData: number[][]) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= mapData.length * tileSize; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, mapData.length * tileSize);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= mapData[0].length * tileSize; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(mapData[0].length * tileSize, y);
        ctx.stroke();
    }
};
