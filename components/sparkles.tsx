"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SparklesProps {
  /** Particle count (scaled down automatically on small screens). */
  count?: number;
  /** Base particle size in px at z=0. */
  size?: number;
  /** Upward drift speed factor. */
  speed?: number;
  /** Extra CSS classes for the wrapping div (positioned absolute by default). */
  className?: string;
}

/** Warm brand palette for the embers. */
const COLORS = ["#E8B27A", "#E24F02", "#FFF6EC", "#B52126", "#F2C99B"];

/** Soft round sprite so points render as glowing dots, not squares. */
function makeSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Three.js ember/sparkle field — slow-drifting, twinkling warm particles on a
 * transparent canvas. Used behind the home hero and the flavour plate.
 */
export function Sparkles({
  count = 160,
  size = 26,
  speed = 1,
  className,
}: SparklesProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const isSmall = window.innerWidth < 720;
    const n = isSmall ? Math.round(count * 0.5) : count;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
    });
    host.appendChild(renderer.domElement);

    // World-space bounds sized to the host's aspect at z=0.
    let halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    let halfW = halfH;

    const positions = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const seeds = new Float32Array(n); // per-point twinkle phase
    const vel = new Float32Array(n); // per-point rise speed

    const color = new THREE.Color();
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * halfW * 2.2;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * halfH * 1.2;
      positions[i * 3 + 2] = Math.random() * 4 - 2;
      color.set(COLORS[(Math.random() * COLORS.length) | 0]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      seeds[i] = Math.random() * Math.PI * 2;
      vel[i] = (0.14 + Math.random() * 0.3) * speed;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: size / 100,
      map: makeSprite(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      halfW = halfH * camera.aspect;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pause when off-screen.
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta() + 0.016, 0.05);

      for (let i = 0; i < n; i++) {
        let y = pos.getY(i) + vel[i] * dt;
        let x = pos.getX(i) + Math.sin(t * 0.6 + seeds[i]) * 0.0016;
        const limit = halfH * 1.35;
        if (y > limit) {
          y = -limit;
          x = (Math.random() * 2 - 1) * halfW * 2.2;
        }
        pos.setY(i, y);
        pos.setX(i, x);
      }
      pos.needsUpdate = true;

      // Global twinkle — cheap and good enough at this particle scale.
      mat.opacity = 0.65 + Math.sin(t * 1.7) * 0.2;
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.map?.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [count, size, speed]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0"}
    />
  );
}
