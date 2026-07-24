"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SparklesProps {
  /**
   * drift — faint embers scattered across a dark field, rising slowly (hero).
   * pop — solid dots that appear around the centre (the plate), crisp at
   * birth, swelling slightly and fading as they drift outward.
   */
  mode?: "drift" | "pop";
  count?: number;
  /** World-unit particle size range [min, max]; a few "bubbles" exceed max. */
  sizeRange?: [number, number];
  speed?: number;
  className?: string;
}

/** Warm brand palettes per mode. */
const DRIFT_COLORS = ["#E8B27A", "#E24F02", "#FFF6EC", "#B52126", "#F2C99B"];
const POP_COLORS = ["#E24F02", "#F4CBA6", "#E8B27A", "#B52126", "#F7DEC4", "#C86A3A"];

/** Soft round sprite for the glowing drift embers. */
function makeSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// Every particle lives on the GPU: born crisp at its spawn point at its own
// peak brightness, carried by its velocity (swelling a little in pop mode),
// fading to nothing as its life ends, then reborn on the next cycle.
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  uniform float uGrow;
  attribute vec3 aSpawn;
  attribute vec3 aVel;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aBirth;
  attribute float aLife;
  attribute float aSeed;
  attribute float aPeak;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float age = mod(uTime - aBirth, aLife);
    float t = age / aLife;

    vec3 pos = aSpawn + aVel * age;
    pos.x += sin(uTime * 0.7 + aSeed) * 0.05;

    // Crisp at birth, easing out to nothing as the spark dies.
    vAlpha = aPeak * pow(1.0 - t, 1.4);
    vColor = aColor;

    float size = aSize * (1.0 + uGrow * t);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uSolid;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Solid matte dot for pop mode; soft glow sprite for drift.
    float d = length(gl_PointCoord - vec2(0.5));
    float circle = 1.0 - smoothstep(0.42, 0.5, d);
    float glow = texture2D(uMap, gl_PointCoord).a;
    float mask = mix(glow, circle, uSolid);
    gl_FragColor = vec4(vColor, mask * vAlpha);
  }
`;

/**
 * Three.js sparkle field. Every spark is born crisp, travels, and fades out
 * over its own lifetime — in assorted sizes. `drift` scatters glowing embers
 * across the home hero; `pop` blooms solid dots around the flavour plate.
 */
export function Sparkles({
  mode = "drift",
  count = 110,
  sizeRange = [0.03, 0.12],
  speed = 1,
  className,
}: SparklesProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const isSmall = window.innerWidth < 720;
    const n = isSmall ? Math.round(count * 0.6) : count;
    const pop = mode === "pop";

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

    let halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    let halfW = halfH;

    const spawn = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    const births = new Float32Array(n);
    const lives = new Float32Array(n);
    const seeds = new Float32Array(n);
    const peaks = new Float32Array(n);

    const palette = pop ? POP_COLORS : DRIFT_COLORS;
    const color = new THREE.Color();
    const [sMin, sMax] = sizeRange;

    const seedParticle = (i: number) => {
      if (pop) {
        // Born on a loose ring around the plate, nudged gently outward.
        const a = Math.random() * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.55;
        const x = Math.cos(a) * r * halfW;
        const y = Math.sin(a) * r * halfH;
        spawn[i * 3] = x;
        spawn[i * 3 + 1] = y;
        spawn[i * 3 + 2] = Math.random() * 2 - 1;
        const drift = (0.04 + Math.random() * 0.1) * speed;
        vel[i * 3] = Math.cos(a) * drift;
        vel[i * 3 + 1] = Math.sin(a) * drift;
        vel[i * 3 + 2] = 0;
        lives[i] = 1.8 + Math.random() * 2.2;
        // Solid dots read clearly — keep them near-opaque at birth.
        peaks[i] = 0.75 + Math.random() * 0.25;
      } else {
        spawn[i * 3] = (Math.random() * 2 - 1) * halfW * 2.2;
        spawn[i * 3 + 1] = (Math.random() * 2 - 1) * halfH * 1.15;
        spawn[i * 3 + 2] = Math.random() * 4 - 2;
        vel[i * 3] = (Math.random() * 2 - 1) * 0.03 * speed;
        vel[i * 3 + 1] = (0.08 + Math.random() * 0.2) * speed;
        vel[i * 3 + 2] = 0;
        lives[i] = 4 + Math.random() * 5;
        // Mostly faint embers; roughly a quarter burn bright.
        peaks[i] =
          Math.random() < 0.25
            ? 0.7 + Math.random() * 0.3
            : 0.2 + Math.random() * 0.35;
      }

      // Mostly small sparks, the occasional large bubble.
      const big = Math.random() < (pop ? 0.14 : 0.06);
      sizes[i] = big
        ? sMax * (pop ? 1.15 + Math.random() * 0.35 : 1.4 + Math.random() * 0.8)
        : sMin + (sMax - sMin) * Math.pow(Math.random(), 2.2);

      // Negative birth staggers the field so cycles never pulse together.
      births[i] = -Math.random() * lives[i];
      seeds[i] = Math.random() * Math.PI * 2;

      color.set(palette[(Math.random() * palette.length) | 0]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    };

    const geo = new THREE.BufferGeometry();
    // gl_Position is derived from aSpawn; position is a required stub.
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aSpawn", new THREE.BufferAttribute(spawn, 3));
    geo.setAttribute("aVel", new THREE.BufferAttribute(vel, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aBirth", new THREE.BufferAttribute(births, 1));
    geo.setAttribute("aLife", new THREE.BufferAttribute(lives, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aPeak", new THREE.BufferAttribute(peaks, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 300 },
        uMap: { value: makeSprite() },
        uSolid: { value: pop ? 1 : 0 },
        uGrow: { value: pop ? 0.35 : 0 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: pop ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    const reseed = () => {
      for (let i = 0; i < n; i++) seedParticle(i);
      for (const name of [
        "aSpawn",
        "aVel",
        "aColor",
        "aSize",
        "aBirth",
        "aLife",
        "aSeed",
        "aPeak",
      ]) {
        (geo.getAttribute(name) as THREE.BufferAttribute).needsUpdate = true;
      }
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      halfW = halfH * camera.aspect;
      mat.uniforms.uScale.value =
        (h * renderer.getPixelRatio()) /
        (2 * Math.tan((camera.fov * Math.PI) / 360));
      reseed();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

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
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.uniforms.uMap.value?.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mode, count, sizeRange, speed]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0"}
    />
  );
}
