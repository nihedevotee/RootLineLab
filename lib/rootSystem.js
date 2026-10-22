// Deterministic root-network generator shared by the WebGL hero, its SVG fallback
// and the per-member "root signature" marks. Same seed → same drawing, on server and client.

export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const length = (a) => Math.hypot(a[0], a[1], a[2]);
const normalize = (a) => {
  const l = length(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [0, 1, 2].map(
    (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]
  );
}

/**
 * A root-like curve from `from` to `to`: leaves heading down (gravitropism),
 * arrives from above, with a low-frequency wobble that vanishes at both ends.
 */
function rootCurve(from, to, rand, { steps = 40, wobble = 0.05, planar = false } = {}) {
  const d = length(sub(to, from));
  const lateral = () => (rand() - 0.5) * d * 0.35;
  const c1 = [from[0] + lateral() * 0.6, from[1] - d * 0.42, planar ? 0 : from[2] + lateral() * 0.6];
  const c2 = [
    to[0] - (to[0] - from[0]) * 0.18 + lateral() * 0.5,
    to[1] + d * 0.22,
    planar ? 0 : to[2] + lateral() * 0.5,
  ];
  const f1 = 5 + rand() * 6;
  const f2 = 9 + rand() * 9;
  const ph1 = rand() * Math.PI * 2;
  const ph2 = rand() * Math.PI * 2;

  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = cubic(from, c1, c2, to, t);
    const envelope = Math.sin(Math.PI * t);
    const w = wobble * d * envelope;
    p[0] += Math.sin(t * f1 + ph1) * w + Math.sin(t * f2 + ph2) * w * 0.35;
    if (!planar) p[2] += Math.cos(t * f1 + ph2) * w * 0.8;
    pts.push(p);
  }
  return pts;
}

/** Arc length from the start of a polyline to point i. */
function arcLength(points, i) {
  let d = 0;
  for (let k = 1; k <= i; k++) d += length(sub(points[k], points[k - 1]));
  return d;
}

function tangentAt(points, i) {
  const a = points[Math.max(0, i - 1)];
  const b = points[Math.min(points.length - 1, i + 1)];
  return normalize(sub(b, a));
}

/**
 * Recursively sprout rootlets along a parent polyline.
 * Every polyline carries timing (birth/duration, in seconds) so the renderer can grow it.
 */
function sprout(parent, rand, out, opts) {
  const { depth, maxDepth, planar, count, lengthScale } = opts;
  if (depth > maxDepth) return;
  const n = count[depth - 1] ?? 0;
  for (let k = 0; k < n; k++) {
    const t = 0.12 + rand() * 0.8;
    const i = Math.round(t * (parent.points.length - 1));
    const origin = parent.points[i];
    const tan = tangentAt(parent.points, i);
    const side = rand() < 0.5 ? -1 : 1;
    const dir = normalize(
      add(scale(tan, 0.45), [side * (0.6 + rand() * 0.9), -0.55 - rand() * 0.7, planar ? 0 : (rand() - 0.5) * 1.6])
    );
    const len = lengthScale * (0.35 + rand() * 0.65) * (1 - t * 0.55) * Math.pow(0.62, depth - 1);
    const to = add(origin, scale(dir, len));
    const points = rootCurve(origin, to, rand, { steps: Math.max(8, Math.round(len * 40)), wobble: 0.08, planar });
    const child = {
      points,
      birth: parent.birth + t * parent.duration,
      duration: 0.5 + len * 1.4,
      depth,
      member: parent.member,
      // Distance from the trunk top — lets signals travel continuously from parent into child.
      dist0: (parent.dist0 || 0) + arcLength(parent.points, i),
    };
    out.push(child);
    sprout(child, rand, out, { ...opts, depth: depth + 1 });
  }
}

/**
 * The hero network. Founders root high and wide; directors root deeper.
 * Every member root starts at the trunk — the drawing shows tiers, not reporting lines.
 *
 * @param {{slug: string, tier: 'founders' | 'directors'}[]} members
 */
const systemCache = new Map();

export function buildRootSystem(members, { seed = 'rootline-lab', planar = false, maxDepth = 4 } = {}) {
  const key = `${seed}|${planar}|${maxDepth}|${members.map((m) => `${m.slug}:${m.tier}`).join(',')}`;
  if (!systemCache.has(key)) systemCache.set(key, growRootSystem(members, seed, planar, maxDepth));
  return systemCache.get(key);
}

function growRootSystem(members, seed, planar, maxDepth) {
  const rand = mulberry32(hashString(seed));
  const polylines = [];
  const nodes = [];

  const surfaceY = 1.05;
  const trunkEnd = [0.02, 0.42, 0];
  const trunk = {
    points: rootCurve([0, surfaceY, 0], trunkEnd, rand, { steps: 30, wobble: 0.02, planar }),
    birth: 0,
    duration: 0.9,
    depth: 0,
    member: -1,
    dist0: 0,
  };
  polylines.push(trunk);

  const founders = members.filter((m) => m.tier === 'founders');
  const directors = members.filter((m) => m.tier === 'directors');

  const founderTargets = [
    [-0.95, 0.12, 0.28],
    [0.92, 0.02, -0.26],
  ];
  const directorTargets = [
    [-1.72, -0.58, -0.18],
    [-0.62, -0.86, 0.36],
    [0.58, -0.8, -0.34],
    [1.66, -0.52, 0.2],
  ];

  const place = (member, target, startT, birth) => {
    const index = members.indexOf(member);
    const i = Math.round(startT * (trunk.points.length - 1));
    const from = trunk.points[i];
    const to = planar ? [target[0], target[1], 0] : target;
    const root = {
      points: rootCurve(from, to, rand, { steps: 64, wobble: 0.045, planar }),
      birth,
      duration: 1.5,
      depth: 1,
      member: index,
      dist0: arcLength(trunk.points, i),
    };
    polylines.push(root);
    nodes.push({ slug: member.slug, index, position: to, birth: birth + root.duration });
    sprout(root, rand, polylines, {
      depth: 2,
      maxDepth,
      planar,
      count: [0, 6, 3, 2],
      lengthScale: 0.62,
    });
  };

  founders.forEach((m, k) => place(m, founderTargets[k % founderTargets.length], 0.62, 0.55 + k * 0.12));
  directors.forEach((m, k) => place(m, directorTargets[k % directorTargets.length], 1, 0.95 + k * 0.12));

  // A few unaffiliated rootlets off the trunk so it reads as a living system, not a chart.
  sprout(trunk, rand, polylines, { depth: 2, maxDepth: 3, planar, count: [0, 5, 2], lengthScale: 0.5 });

  const end = polylines.reduce((max, p) => Math.max(max, p.birth + p.duration), 0);
  return { polylines, nodes, surfaceY, duration: end };
}

/**
 * A small 2D root signature for one person, in a 200×250 viewBox.
 * Returns SVG path strings ordered by depth plus the signature node.
 */
const markCache = new Map();

export function buildRootMark(slug) {
  if (!markCache.has(slug)) markCache.set(slug, drawRootMark(slug));
  return markCache.get(slug);
}

function drawRootMark(slug) {
  const rand = mulberry32(hashString(`mark:${slug}`));
  const polylines = [];

  // Grown in world space (y up, ground at 0), then mapped into the SVG viewBox.
  const trunkEnd = [(rand() - 0.5) * 14, -(50 + rand() * 18), 0];
  polylines.push({
    points: rootCurve([0, 0, 0], trunkEnd, rand, { steps: 18, wobble: 0.03, planar: true }),
    birth: 0,
    duration: 1,
    depth: 0,
    member: 0,
  });

  const mains = 3 + Math.floor(rand() * 2);
  let node = trunkEnd;
  for (let k = 0; k < mains; k++) {
    const spread = (k / (mains - 1) - 0.5) * 2;
    const to = [spread * (50 + rand() * 20), -(112 + rand() * 50), 0];
    const root = {
      points: rootCurve(trunkEnd, to, rand, { steps: 30, wobble: 0.045, planar: true }),
      birth: 0.6 + k * 0.1,
      duration: 1.1,
      depth: 1,
      member: 0,
    };
    polylines.push(root);
    if (to[1] < node[1]) node = to;
    sprout(root, rand, polylines, { depth: 2, maxDepth: 3, planar: true, count: [0, 3, 2], lengthScale: 34 });
  }

  const surface = 46;
  const X = (x) => 100 + x;
  const Y = (y) => surface - y;
  const toPath = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ');

  return {
    surface,
    paths: polylines.map((p) => ({ d: toPath(p.points), depth: p.depth, delay: p.birth })),
    node: { x: X(node[0]), y: Y(node[1]) },
  };
}

/** Orthographic projection of the hero network for the SVG fallback (viewBox 0 0 1000 620). */
export function projectRootSystem(system) {
  const sx = (x) => 500 + x * 225;
  const sy = (y) => 250 - y * 225;
  const toPath = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)} ${sy(p[1]).toFixed(1)}`).join(' ');
  return {
    surfaceY: sy(system.surfaceY),
    paths: system.polylines.map((p) => ({
      d: toPath(p.points),
      depth: p.depth,
      member: p.member,
      delay: p.birth,
      duration: p.duration,
    })),
    nodes: system.nodes.map((n) => ({ ...n, x: sx(n.position[0]), y: sy(n.position[1]) })),
  };
}
