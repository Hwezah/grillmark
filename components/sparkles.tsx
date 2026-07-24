"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SparklesProps {
  /**
   * drift — embers scattered across the field, rising slowly (hero).
   * fountain — sparks born at a source under the plate that shoot up
   * and outward.
   */
  mode?: "drift" | "fountain";
  count?: number;
  /** World-unit particle size range [min, max]; a few "bubbles" exceed max. */
  sizeRange?: [number, number];
  speed?: number;
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
  g.addColorStop(0.4, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// Each particle lives entirely on the GPU: born crisp at its spawn point,
// carried by its velocity, fading to nothing as its life runs out, then
// reborn on the next cycle.
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  attribute vec3 aSpawn;
  attribute vec3 aVel;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aBirth;
  attribute float aLife;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float age = mod(uTime - aBirth, aLife);
    float t = age / aLife;

    vec3 pos = aSpawn + aVel * age;
    pos.x += sin(uTime * 0.7 + aSeed) * 0.06;

    // Crisp at birth, easing out to nothing as the spark dies.
    vAlpha = pow(1.0 - t, 1.5);
    vColor = aColor;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float mask = texture2D(uMap, gl_PointCoord).a;
    gl_FragColor = vec4(vColor, mask * vAlpha);
  }
`;

/**
 * Three.js ember/sparkle field. Every spark is born crisp, travels, and fades
 * out over its own lifetime — in assorted sizes. Used on the home hero
 * (drift) and beneath the flavour plate (fountain).
 */
export function Sparkles({
  mode = "drift",
  count = 160,
  sizeRange = [0.05, 0.16],
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

    let halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    let halfW = halfH;

    const spawn = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    const births = new Float32Array(n);
    const lives = new Float32Array(n);
    const seeds = new Float32Array(n);

    const color = new THREE.Color();
    const [sMin, sMax] = sizeRange;

    const seedParticle = (i: number) => {
      if (mode === "fountain") {
        // Born as a spark under the plate: bottom-centre source, kicked
        // up and outward.
        const dir = Math.random() * 2 - 1;
        spawn[i * 3] = dir * halfW * 0.5;
        spawn[i * 3 + 1] = -halfH * (0.75 + Math.random() * 0.2);
        spawn[i * 3 + 2] = Math.random() * 3 - 1.5;
        vel[i * 3] = dir * (0.15 + Math.random() * 0.5) * speed;
        vel[i * 3 + 1] = (0.45 + Math.random() * 0.85) * speed;
        vel[i * 3 + 2] = 0;
        lives[i] = 2.4 + Math.random() * 2.6;
      } else {
        spawn[i * 3] = (Math.random() * 2 - 1) * halfW * 2.2;
        spawn[i * 3 + 1] = (Math.random() * 2 - 1) * halfH * 1.15;
        spawn[i * 3 + 2] = Math.random() * 4 - 2;
        vel[i * 3] = (Math.random() * 2 - 1) * 0.03 * speed;
        vel[i * 3 + 1] = (0.1 + Math.random() * 0.22) * speed;
        vel[i * 3 + 2] = 0;
        lives[i] = 4 + Math.random() * 5;
      }

      // Mostly small sparks, a few large glowing bubbles.
      const big = Math.random() < 0.08;
      sizes[i] = big
        ? sMax * (1.6 + Math.random() * 0.9)
        : sMin + (sMax - sMin) * Math.pow(Math.random(), 2.2);

      // Negative birth staggers the field so cycles never pulse together.
      births[i] = -Math.random() * lives[i];
      seeds[i] = Math.random() * Math.PI * 2;

      color.set(COLORS[(Math.random() * COLORS.length) | 0]);
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
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 300 },
        uMap: { value: makeSprite() },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    const reseed = () => {
      for (let i = 0; i < n; i++) seedParticle(i);
      for (const name of ["aSpawn", "aVel", "aColor", "aSize", "aBirth", "aLife", "aSeed"]) {
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
