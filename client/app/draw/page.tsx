"use client";

import { useEffect, useRef } from "react";

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawingRef = useRef(false);
  const currentPathRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    ctxRef.current = canvas.getContext("2d");

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const stopDrawing = () => {
      if (!drawingRef.current) return;

      drawingRef.current = false;

      console.log("stroke:", currentPathRef.current);
    };

    window.addEventListener("mouseup", stopDrawing);

    return () => {
      window.removeEventListener("mouseup", stopDrawing);
    };
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawingRef.current = true;

    currentPathRef.current = [
      {
        x: e.clientX,
        y: e.clientY,
      },
    ];
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    const x = e.clientX;
    const y = e.clientY;

    currentPathRef.current.push({ x, y });

    const prev =
      currentPathRef.current[currentPathRef.current.length - 2];

    if (!prev) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!drawingRef.current) return;

    drawingRef.current = false;

    console.log("stroke:", currentPathRef.current);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />

      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
        }}
      >
        <button onClick={clearCanvas}>Clear</button>
      </div>
    </>
  );
}