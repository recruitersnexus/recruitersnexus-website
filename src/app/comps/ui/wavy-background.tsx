"use client";

import { cn } from "../../../lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
<<<<<<< HEAD
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const ntRef = useRef(0);
  const animationIdRef = useRef<number>();

  const getSpeed = () => {
    return speed === "slow" ? 0.001 : 0.002;
  };

  const drawWave = (n: number) => {
    ntRef.current += getSpeed();
    const ctx = ctxRef.current;
    const w = wRef.current;
    const h = hRef.current;
    if (!ctx) return;

    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
=======
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const render = () => {
<<<<<<< HEAD
    const ctx = ctxRef.current;
    const w = wRef.current;
    const h = hRef.current;
    if (!ctx) return;

=======
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
<<<<<<< HEAD
    animationIdRef.current = requestAnimationFrame(render);
  };

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    wRef.current = ctx.canvas.width = window.innerWidth;
    hRef.current = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    ntRef.current = 0;

    window.onresize = () => {
      wRef.current = ctx.canvas.width = window.innerWidth;
      hRef.current = ctx.canvas.height = window.innerHeight;
=======
    animationId = requestAnimationFrame(render);
  };

  let animationId: number;

  // Memoized `init` function using useCallback to prevent unnecessary recreation
  const init = useCallback(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  }, [blur, backgroundFill, waveOpacity]); // dependencies

  useEffect(() => {
    init(); // call init when component mounts
    return () => {
<<<<<<< HEAD
      cancelAnimationFrame(animationIdRef.current!); // clean up animation
=======
      cancelAnimationFrame(animationId); // clean up animation
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
    };
  }, [init]); // include `init` in the dependency array

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // Handle Safari detection
    setIsSafari(
      typeof window !== "undefined" &&
<<<<<<< HEAD
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
=======
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
    );
  }, []);

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "h-auto flex flex-col items-center justify-center p-10",
=======
        "h-screen flex flex-col items-center justify-center",
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
