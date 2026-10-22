'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Uint32BufferAttribute,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { buildRootSystem } from '@/lib/rootSystem';
import { FOLLOW, easeOutExpo } from '@/lib/motion';

// ── Shaders ──────────────────────────────────────────────────────────────────
// Roots (depth 0–2): tapered tubes, lit, with signals travelling outward from the trunk.
const TUBE_VERTEX = /* glsl */ `
  attribute float aRadius;
  attribute float aBirth;
  attribute float aMember;
  attribute float aDist;
  uniform float uTime;
  uniform float uActive;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vAge;
  varying float vDist;
  varying float vHi;
  varying float vFog;

  void main() {
    float age = uTime - aBirth;
    // The growing tip tapers in, so roots extend rather than pop.
    float grow = clamp(age / 0.4, 0.0, 1.0);
    vec3 p = position + normal * aRadius * grow;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vAge = age;
    vDist = aDist;
    vHi = (uActive > -0.5 && abs(aMember - uActive) < 0.5) ? 1.0 : 0.0;
    vFog = smoothstep(3.4, 7.4, -mv.z);
  }
`;

const TUBE_FRAGMENT = /* glsl */ `
  uniform vec3 uLine;
  uniform vec3 uShade;
  uniform vec3 uAccent;
  uniform vec3 uInk;
  uniform float uTime;
  uniform float uActive;
  uniform float uFade;
  uniform float uPulse;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vAge;
  varying float vDist;
  varying float vHi;
  varying float vFog;

  void main() {
    if (vAge < 0.0) discard;
    vec3 n = normalize(vNormal);
    float diffuse = clamp(dot(n, normalize(vec3(-0.45, 0.8, 0.55))) * 0.5 + 0.5, 0.0, 1.0);
    float rim = pow(1.0 - clamp(dot(n, vView), 0.0, 1.0), 2.4);
    vec3 color = mix(uShade, uLine, diffuse) + uAccent * rim * 0.28;

    bool hasActive = uActive > -0.5;
    // Signals: a sharp head with an exponential tail, emitted from the trunk outward.
    float s = fract(vDist * 1.35 - uTime * 0.42);
    float pulse = pow(s, 26.0) * uPulse;
    float gain = hasActive ? (vHi > 0.5 ? 1.8 : 0.12) : 0.75;
    color = mix(color, uAccent, clamp(pulse * gain, 0.0, 1.0));

    if (hasActive) {
      color = vHi > 0.5 ? mix(color, uAccent, 0.28 + rim * 0.45) : mix(color, uInk, 0.74);
    }
    float tip = 1.0 - smoothstep(0.0, 0.55, vAge);
    color = mix(color, uAccent, tip * 0.85);
    color = mix(color, uInk, vFog * 0.82);
    color = mix(uInk, color, uFade);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

// Fine rootlets (depth 3+): hairlines, so the system keeps its delicacy.
const HAIR_VERTEX = /* glsl */ `
  attribute float aBirth;
  attribute float aMember;
  uniform float uTime;
  uniform float uActive;
  uniform float uFade;
  varying float vAge;
  varying float vAlpha;
  varying float vHi;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAge = uTime - aBirth;
    float fog = smoothstep(7.4, 3.4, -mv.z);
    bool hasActive = uActive > -0.5;
    vHi = (hasActive && abs(aMember - uActive) < 0.5) ? 1.0 : 0.0;
    vAlpha = 0.42 * fog * ((hasActive && vHi < 0.5) ? 0.35 : 1.0) * uFade;
  }
`;

const HAIR_FRAGMENT = /* glsl */ `
  uniform vec3 uLine;
  uniform vec3 uAccent;
  varying float vAge;
  varying float vAlpha;
  varying float vHi;

  void main() {
    if (vAge < 0.0) discard;
    float tip = 1.0 - smoothstep(0.0, 0.45, vAge);
    gl_FragColor = vec4(mix(uLine, uAccent, max(tip, vHi * 0.8)), min(1.0, vAlpha * (1.0 + vHi) + tip * 0.3));
    #include <colorspace_fragment>
  }
`;

// Ground: a perspective survey grid at the soil line, fading toward its edges.
const GRID_VERTEX = /* glsl */ `
  attribute float aFade;
  uniform float uFade;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = aFade * uFade * smoothstep(8.0, 3.6, -mv.z);
  }
`;

const GRID_FRAGMENT = /* glsl */ `
  uniform vec3 uLine;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uLine, vAlpha);
    #include <colorspace_fragment>
  }
`;

const NODE_VERTEX = /* glsl */ `
  attribute float aBirth;
  attribute float aIndex;
  uniform float uTime;
  uniform float uActive;
  uniform float uFade;
  uniform float uPixelRatio;
  varying float vOn;
  varying float vHi;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float on = smoothstep(0.0, 0.6, uTime - aBirth);
    vHi = abs(aIndex - uActive) < 0.5 ? 1.0 : 0.0;
    vOn = on * uFade;
    gl_PointSize = (34.0 + 16.0 * vHi) * uPixelRatio * on * (4.4 / -mv.z);
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  uniform vec3 uLine;
  uniform vec3 uAccent;
  uniform float uTime;
  varying float vOn;
  varying float vHi;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.075, 0.1, d);
    float ring = 1.0 - smoothstep(0.008, 0.02, abs(d - 0.27));
    // A slow breathing halo — the only ambient motion on the node.
    float halo = exp(-d * d * 26.0) * (0.22 + 0.08 * sin(uTime * 1.6)) * (0.6 + vHi);
    vec3 color = mix(uLine, uAccent, max(core, vHi));
    float alpha = max(max(core, ring * 0.8), halo) * vOn;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(mix(uAccent, color, max(core, ring)), alpha);
    #include <colorspace_fragment>
  }
`;

const LINE_COLOR = new Color('#FBFAF2');
const SHADE_COLOR = new Color('#3E6E70');
const ACCENT_COLOR = new Color('#D4EA50');
const INK_COLOR = new Color('#0E3D47');

// Tube radius at [start, end] of a polyline, by depth.
const RADII = [
  [0.036, 0.024],
  [0.021, 0.0055],
  [0.0075, 0.0022],
];

const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
};

/** Tapered tubes with parallel-transport frames, merged into one indexed geometry. */
function buildTubeGeometry(polylines, radialSegments) {
  const position = [];
  const normal = [];
  const radius = [];
  const birth = [];
  const member = [];
  const dist = [];
  const index = [];
  let base = 0;

  for (const line of polylines) {
    const pts = line.points;
    const n = pts.length;
    const [r0, r1] = RADII[line.depth];
    let N = null;
    let d = line.dist0 || 0;

    for (let i = 0; i < n; i++) {
      const p = pts[i];
      const T = v3.norm(v3.sub(pts[Math.min(n - 1, i + 1)], pts[Math.max(0, i - 1)]));
      if (!N) {
        N = v3.norm(v3.cross(T, Math.abs(T[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
      } else {
        const k = v3.dot(N, T);
        N = v3.norm([N[0] - T[0] * k, N[1] - T[1] * k, N[2] - T[2] * k]);
      }
      const B = v3.cross(T, N);
      if (i > 0) d += Math.hypot(...v3.sub(p, pts[i - 1]));
      const t = i / (n - 1);
      const r = r0 + (r1 - r0) * Math.pow(t, 0.8);
      const b = line.birth + line.duration * t;
      for (let s = 0; s < radialSegments; s++) {
        const a = (s / radialSegments) * Math.PI * 2;
        const c = Math.cos(a);
        const si = Math.sin(a);
        position.push(p[0], p[1], p[2]);
        normal.push(N[0] * c + B[0] * si, N[1] * c + B[1] * si, N[2] * c + B[2] * si);
        radius.push(r);
        birth.push(b);
        member.push(line.member);
        dist.push(d);
      }
    }
    for (let i = 0; i < n - 1; i++) {
      for (let s = 0; s < radialSegments; s++) {
        const a = base + i * radialSegments + s;
        const b = base + i * radialSegments + ((s + 1) % radialSegments);
        index.push(a, a + radialSegments, b, b, a + radialSegments, b + radialSegments);
      }
    }
    base += n * radialSegments;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(position, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normal, 3));
  geometry.setAttribute('aRadius', new Float32BufferAttribute(radius, 1));
  geometry.setAttribute('aBirth', new Float32BufferAttribute(birth, 1));
  geometry.setAttribute('aMember', new Float32BufferAttribute(member, 1));
  geometry.setAttribute('aDist', new Float32BufferAttribute(dist, 1));
  geometry.setIndex(new Uint32BufferAttribute(index, 1));
  return geometry;
}

function buildHairGeometry(polylines) {
  const positions = [];
  const birth = [];
  const member = [];
  for (const line of polylines) {
    const n = line.points.length;
    for (let i = 0; i < n - 1; i++) {
      for (const j of [i, i + 1]) {
        positions.push(...line.points[j]);
        birth.push(line.birth + line.duration * (j / (n - 1)));
        member.push(line.member);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aBirth', new Float32BufferAttribute(birth, 1));
  geometry.setAttribute('aMember', new Float32BufferAttribute(member, 1));
  return geometry;
}

/** Survey grid on the soil plane plus the drawing's ground line with ticks. */
function buildGroundGeometry(y) {
  const positions = [];
  const fade = [];
  const X = 2.6;
  const Z = 1.5;
  const segment = (a, b, alpha) => {
    const steps = 24;
    for (let i = 0; i < steps; i++) {
      for (const t of [i / steps, (i + 1) / steps]) {
        const x = a[0] + (b[0] - a[0]) * t;
        const z = a[2] + (b[2] - a[2]) * t;
        positions.push(x, y, z);
        const r = Math.hypot(x / X, z / Z);
        fade.push(alpha * (1 - Math.min(1, Math.max(0, (r - 0.35) / 0.65))));
      }
    }
  };
  for (let x = -X; x <= X + 1e-6; x += 0.25) segment([x, y, -Z], [x, y, Z], 0.1);
  for (let z = -Z; z <= Z + 1e-6; z += 0.25) segment([-X, y, z], [X, y, z], 0.1);
  // Front ground line, stronger, with survey ticks hanging below it.
  segment([-1.9, y, 0], [2.6, y, 0], 0.55);
  for (let x = -1.8; x <= 2.401; x += 0.2) {
    const major = Math.abs(Math.round(x * 5) % 5) === 0;
    positions.push(x, y, 0, x, y - (major ? 0.07 : 0.035), 0);
    fade.push(0.45, 0.45);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aFade', new Float32BufferAttribute(fade, 1));
  return geometry;
}

const FRAME_WINDOW = 90; // frames per adaptive-DPR sample
const SLOW_FRAME_MS = 22; // sustained average above this → step resolution down
const FAST_FRAME_MS = 12; // sustained average below this → allowed to step back up
const MAX_DPR_CHANGES = 4; // flip-flop guard
const INTRO_SECONDS = 3.4;

/**
 * @param {{
 *   members: import('@/data/team').TeamMember[],
 *   activeIndex: number,
 *   reducedMotion: boolean,
 *   quality: 'full' | 'lite',
 *   onHover: (index: number) => void,
 *   onSelect: (slug: string) => void,
 *   onFallback: () => void,
 * }} props
 */
export default function RootSystemCanvas({ members, activeIndex, reducedMotion, quality = 'full', onHover, onSelect, onFallback }) {
  const containerRef = useRef(null);
  const labelRefs = useRef([]);
  const uniformsRef = useRef(null);
  const requestRenderRef = useRef(() => {});
  const callbacks = useRef({ onHover, onSelect, onFallback });

  useLayoutEffect(() => {
    callbacks.current = { onHover, onSelect, onFallback };
  });

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.uActive.value = activeIndex;
    requestRenderRef.current();
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let teardown = null;
    // Build the scene once the main thread is idle, so hydration and first paint are never delayed.
    const init = () => {
      const lite = quality === 'lite';

      let renderer;
      try {
        renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: lite ? 'low-power' : 'default' });
      } catch {
        callbacks.current.onFallback();
        return;
      }

      const system = buildRootSystem(members);
      const scene = new Scene();
      const camera = new PerspectiveCamera(32, 1, 0.1, 30);
      const group = new Group();
      scene.add(group);

      const maxDpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2);
      let dpr = maxDpr;
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      container.prepend(renderer.domElement);

      const settled = system.duration + 1;
      const uniforms = {
        uTime: { value: reducedMotion ? settled : 0 },
        uActive: { value: activeIndex },
        uFade: { value: 1 },
        uPulse: { value: 0 },
        uPixelRatio: { value: dpr },
        uLine: { value: LINE_COLOR },
        uShade: { value: SHADE_COLOR },
        uAccent: { value: ACCENT_COLOR },
        uInk: { value: INK_COLOR },
      };
      uniformsRef.current = uniforms;

      const thick = system.polylines.filter((p) => p.depth <= 2);
      const thin = system.polylines.filter((p) => p.depth > 2);

      const tubeGeometry = buildTubeGeometry(thick, lite ? 6 : 10);
      const tubeMaterial = new ShaderMaterial({ vertexShader: TUBE_VERTEX, fragmentShader: TUBE_FRAGMENT, uniforms });
      const tubes = new Mesh(tubeGeometry, tubeMaterial);
      tubes.frustumCulled = false;
      group.add(tubes);

      const hairGeometry = buildHairGeometry(thin);
      const hairMaterial = new ShaderMaterial({
        vertexShader: HAIR_VERTEX,
        fragmentShader: HAIR_FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      group.add(new LineSegments(hairGeometry, hairMaterial));

      const groundGeometry = buildGroundGeometry(system.surfaceY);
      const groundMaterial = new ShaderMaterial({
        vertexShader: GRID_VERTEX,
        fragmentShader: GRID_FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      group.add(new LineSegments(groundGeometry, groundMaterial));

      const nodeGeometry = new BufferGeometry();
      nodeGeometry.setAttribute('position', new Float32BufferAttribute(system.nodes.flatMap((n) => n.position), 3));
      nodeGeometry.setAttribute('aBirth', new Float32BufferAttribute(system.nodes.map((n) => n.birth), 1));
      nodeGeometry.setAttribute('aIndex', new Float32BufferAttribute(system.nodes.map((n) => n.index), 1));
      const nodeMaterial = new ShaderMaterial({
        vertexShader: NODE_VERTEX,
        fragmentShader: NODE_FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      const nodePoints = new Points(nodeGeometry, nodeMaterial);
      group.add(nodePoints);

      const nodeVectors = system.nodes.map((n) => new Vector3(...n.position));
      const projected = new Vector3();
      const labelState = system.nodes.map(() => ({ x: NaN, y: NaN, on: null }));
      const layout = { s: 1, x: 0, y: 0, z: 4.6 };
      const hero = container.closest('section') || container;
      let width = 1;
      let height = 1;
      let heroTop = 0;
      let heroHeight = 1;
      let needsRender = true;
      let visible = true;
      let raf = 0;

      // Desktop: the network is fitted into the right half, clear of the title column.
      // Smaller screens: the canvas has its own band and the network is centred.
      const resize = () => {
        width = container.clientWidth || 1;
        height = container.clientHeight || 1;
        const aspect = width / height;
        camera.aspect = aspect;
        if (window.innerWidth >= 1024) {
          layout.z = 4.6;
          const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * layout.z * aspect;
          layout.s = Math.min(0.62, halfWidth * 0.245);
          layout.x = halfWidth * 0.505;
          layout.y = 0.02;
        } else {
          layout.z = aspect < 0.85 ? 7.4 : 5.4;
          layout.s = 1;
          layout.x = 0;
          layout.y = 0.02;
        }
        group.scale.setScalar(layout.s);
        group.position.x = layout.x;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        // Cache scroll geometry so the frame loop never forces a layout read.
        const rect = hero.getBoundingClientRect();
        heroTop = rect.top + window.scrollY;
        heroHeight = Math.max(rect.height, 1);
        needsRender = true;
      };

      // ── Input
      // Parallax follows the cursor across the whole hero (not just the canvas), so moving over the
      // headline or legend never snaps the system back. Picking only runs over open canvas area, and
      // the canvas only clears hover states it set itself (legend hover stays in charge of its own).
      const raycaster = new Raycaster();
      const pointer = new Vector2(10, 10);
      const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
      const drag = { id: null, startX: 0 };
      let hovered = -1;
      let ownsHover = false;

      const setHover = (index) => {
        if (index === hovered) return;
        hovered = index;
        container.style.cursor = index >= 0 ? 'pointer' : '';
        if (index >= 0) {
          ownsHover = true;
          callbacks.current.onHover(index);
        } else if (ownsHover) {
          ownsHover = false;
          callbacks.current.onHover(-1);
        }
      };

      const pickAt = (clientX, clientY, threshold) => {
        const rect = container.getBoundingClientRect();
        const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
        if (!inside) return setHover(-1);
        pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -(((clientY - rect.top) / rect.height) * 2 - 1));
        raycaster.params.Points = { threshold };
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObject(nodePoints)[0];
        const node = hit && system.nodes[hit.index];
        setHover(node && uniforms.uTime.value > node.birth ? node.index : -1);
      };

      const onHeroMove = (e) => {
        if (e.pointerType !== 'mouse') return;
        if (!reducedMotion) {
          // Normalised to the network's own centre on screen, so the turn feels anchored to it.
          const rect = container.getBoundingClientRect();
          const cx = rect.left + rect.width * (window.innerWidth >= 1024 ? 0.75 : 0.5);
          tilt.tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width * 0.5)));
          tilt.ty = Math.max(-1, Math.min(1, -((e.clientY - (rect.top + rect.height * 0.5)) / (rect.height * 0.5))));
        }
        if (e.target.closest('a, button, input, [role="button"]')) setHover(-1);
        else pickAt(e.clientX, e.clientY, 0.14 / layout.s);
        needsRender = true;
      };
      const onHeroLeave = (e) => {
        if (e.pointerType !== 'mouse') return;
        tilt.tx = 0;
        tilt.ty = 0;
        setHover(-1);
        needsRender = true;
      };

      // Touch: a horizontal drag turns the system; vertical movement stays with the page (touch-action: pan-y).
      const onPointerDown = (e) => {
        if (e.pointerType === 'mouse') return;
        drag.id = e.pointerId;
        drag.startX = e.clientX;
      };
      const onPointerMove = (e) => {
        if (drag.id !== e.pointerId || reducedMotion) return;
        tilt.tx = Math.max(-1, Math.min(1, ((e.clientX - drag.startX) / width) * 2.4));
        needsRender = true;
      };
      const onPointerUp = (e) => {
        if (drag.id !== e.pointerId) return;
        drag.id = null;
        tilt.tx = 0; // spring back to rest
        needsRender = true;
      };
      const onClick = (e) => {
        pickAt(e.clientX, e.clientY, (e.pointerType === 'mouse' || !e.pointerType ? 0.14 : 0.26) / layout.s);
        if (hovered >= 0) callbacks.current.onSelect(members[hovered].slug);
      };
      const onScroll = () => {
        needsRender = true;
      };

      hero.addEventListener('pointermove', onHeroMove, { passive: true });
      hero.addEventListener('pointerleave', onHeroLeave, { passive: true });
      container.addEventListener('pointerdown', onPointerDown, { passive: true });
      container.addEventListener('pointermove', onPointerMove, { passive: true });
      container.addEventListener('pointerup', onPointerUp, { passive: true });
      container.addEventListener('pointercancel', onPointerUp, { passive: true });
      container.addEventListener('click', onClick);
      window.addEventListener('scroll', onScroll, { passive: true });

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        needsRender = true;
      });
      io.observe(container);
      const ro = new ResizeObserver(resize);
      ro.observe(container);
      resize();

      requestRenderRef.current = () => {
        needsRender = true;
      };

      // ── Adaptive resolution: step DPR down on sustained slow frames, back up when there is headroom.
      let frameSum = 0;
      let frameCount = 0;
      let dprChanges = 0;
      let lastFrame = 0;
      const adapt = (now) => {
        if (lastFrame) {
          frameSum += Math.min(now - lastFrame, 100);
          frameCount++;
        }
        lastFrame = now;
        if (frameCount < FRAME_WINDOW || dprChanges >= MAX_DPR_CHANGES) return;
        const avg = frameSum / frameCount;
        frameSum = 0;
        frameCount = 0;
        let next = dpr;
        if (avg > SLOW_FRAME_MS && dpr > 1) next = Math.max(1, dpr - 0.25);
        else if (avg < FAST_FRAME_MS && dpr < maxDpr) next = Math.min(maxDpr, dpr + 0.25);
        if (next !== dpr) {
          dpr = next;
          dprChanges++;
          renderer.setPixelRatio(dpr);
          renderer.setSize(width, height, false);
          uniforms.uPixelRatio.value = dpr;
        }
      };

      let start = 0;
      let lastProgress = -1;

      const frame = (now) => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) {
          lastFrame = 0;
          return;
        }

        const elapsed = (now - start) / 1000;
        const intro = reducedMotion ? 1 : easeOutExpo(Math.min(elapsed / INTRO_SECONDS, 1));
        const growing = !reducedMotion && elapsed < settled + 1;
        if (!reducedMotion) {
          uniforms.uTime.value = elapsed;
          uniforms.uPulse.value = Math.min(Math.max((elapsed - system.duration) / 1.2, 0), 1);
        }

        const progress = Math.min(Math.max((window.scrollY - heroTop) / heroHeight, 0), 1);
        const scrolled = Math.abs(progress - lastProgress) > 0.0005;
        // Signals keep flowing on fine-pointer devices; touch devices go fully still once grown (battery).
        const ambient = !reducedMotion && !lite;
        const drift = ambient ? Math.sin(now * 0.00011) * 0.14 : 0;
        tilt.x += (tilt.tx - tilt.x) * FOLLOW.parallax;
        tilt.y += (tilt.ty - tilt.y) * FOLLOW.parallax;
        const settling = Math.abs(tilt.tx - tilt.x) > 0.0005 || Math.abs(tilt.ty - tilt.y) > 0.0005;

        if (!(growing || settling || scrolled || ambient || drag.id !== null || needsRender)) {
          lastFrame = 0;
          return;
        }

        // Cinematic entrance: a slow dolly-in and quarter-turn while the roots grow.
        // Camera sits above the soil plane looking slightly down, so the survey grid recedes in perspective.
        camera.position.set(0, 1.3 - (1 - intro) * 0.45, layout.z + (1 - intro) * 1.1);
        camera.lookAt(0, 0.02, 0);
        group.rotation.y = (1 - intro) * -0.7 + tilt.x * 0.42 + drift + (reducedMotion ? 0 : progress * 0.5);
        group.rotation.x = -tilt.y * 0.08;
        // Scroll hand-off: the system lifts and thins as the hero leaves the viewport.
        group.position.y = layout.y + progress * 0.55 * layout.s;
        uniforms.uFade.value = 1 - progress * 0.8;
        lastProgress = progress;

        renderer.render(scene, camera);
        needsRender = false;
        adapt(now);

        group.updateMatrixWorld();
        for (let i = 0; i < nodeVectors.length; i++) {
          const el = labelRefs.current[system.nodes[i].index];
          if (!el) continue;
          projected.copy(nodeVectors[i]).applyMatrix4(group.matrixWorld).project(camera);
          const x = Math.round((projected.x * 0.5 + 0.5) * width * 2) / 2;
          const y = Math.round((-projected.y * 0.5 + 0.5) * height * 2) / 2;
          const state = labelState[i];
          if (x !== state.x || y !== state.y) {
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            state.x = x;
            state.y = y;
          }
          const on = uniforms.uTime.value > system.nodes[i].birth;
          if (on !== state.on) {
            el.dataset.on = on ? 'true' : 'false';
            state.on = on;
          }
        }
      };
      // Compile shaders off the critical path (KHR_parallel_shader_compile where available).
      const begin = () => {
        if (disposed) return;
        start = performance.now();
        raf = requestAnimationFrame(frame);
      };
      if (renderer.compileAsync) renderer.compileAsync(scene, camera).then(begin, begin);
      else begin();

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        hero.removeEventListener('pointermove', onHeroMove);
        hero.removeEventListener('pointerleave', onHeroLeave);
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('pointercancel', onPointerUp);
        container.removeEventListener('click', onClick);
        window.removeEventListener('scroll', onScroll);
        for (const g of [tubeGeometry, hairGeometry, groundGeometry, nodeGeometry]) g.dispose();
        for (const m of [tubeMaterial, hairMaterial, groundMaterial, nodeMaterial]) m.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        uniformsRef.current = null;
        requestRenderRef.current = () => {};
      };
    };
    const run = () => {
      if (!disposed) teardown = init();
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 60);
    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      teardown?.();
    };
    // Scene is built once per mount; activeIndex is pushed through uniforms above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, reducedMotion, quality]);

  return (
    <div ref={containerRef} className="root-canvas absolute inset-0" data-quality={quality}>
      {members.map((m, i) => (
        <span
          key={m.slug}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          data-on="false"
          data-active={activeIndex === i ? 'true' : 'false'}
          aria-hidden="true"
          className="root-label"
        >
          <span className="root-label__index">{m.index}</span>
          <span className="root-label__name">{m.shortName || m.name}</span>
        </span>
      ))}
    </div>
  );
}
