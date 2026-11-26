import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* A small 3D scene: a neon wireframe graduation cap that floats, spins and follows the mouse.
   Loaded lazily. If WebGL is not available, it silently renders nothing (the page still looks fine). */
export default function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.8, 9);
    const group = new THREE.Group();
    scene.add(group);

    const PINK = 0xff2bd6, CYAN = 0x22d3ee, VIOLET = 0x8b5cf6, GOLD = 0xffd166;
    const outline = (geo: THREE.BufferGeometry, color: number) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color }));
    const dark = new THREE.MeshBasicMaterial({ color: 0x1a0638, transparent: true, opacity: 0.88 });

    // mortarboard (flat top)
    const boardGeo = new THREE.BoxGeometry(3.2, 0.18, 3.2);
    const board = outline(boardGeo, PINK); board.rotation.y = Math.PI / 4; board.position.y = 0.75;
    const boardFill = new THREE.Mesh(new THREE.BoxGeometry(3.14, 0.16, 3.14), dark); boardFill.rotation.y = Math.PI / 4; boardFill.position.y = 0.75;
    // cap base
    const base = outline(new THREE.CylinderGeometry(1.15, 1.4, 1.1, 20, 1), CYAN); base.position.y = -0.05;
    const baseFill = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.37, 1.08, 20, 1), dark); baseFill.position.y = -0.05;
    // tassel
    const tasselLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.86, 0), new THREE.Vector3(2.2, 0.86, 0), new THREE.Vector3(2.2, -0.45, 0)]), new THREE.LineBasicMaterial({ color: GOLD }));
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshBasicMaterial({ color: GOLD })); ball.position.set(2.2, -0.55, 0);
    // glowing rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.025, 8, 90), new THREE.MeshBasicMaterial({ color: PINK })); ring1.rotation.x = Math.PI / 2; ring1.position.y = -1.3;
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.02, 8, 90), new THREE.MeshBasicMaterial({ color: CYAN })); ring2.rotation.x = Math.PI / 2; ring2.position.y = -1.3;
    group.add(boardFill, board, baseFill, base, tasselLine, ball, ring1, ring2);

    // floating sparkles
    const N = 90, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 9; pos[i * 3 + 1] = (Math.random() - 0.5) * 5; pos[i * 3 + 2] = (Math.random() - 0.5) * 5; }
    const sparkGeo = new THREE.BufferGeometry(); sparkGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({ color: VIOLET, size: 0.07, transparent: true, opacity: 0.9 }));
    scene.add(sparks);

    const resize = () => {
      const w = host.clientWidth || 1, h = host.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(host); resize();

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => { target.x = (e.clientX / window.innerWidth - 0.5) * 2; target.y = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('pointermove', onMove);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, t = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      t += 0.016;
      group.rotation.y += (target.x * 0.6 + t * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (0.28 + target.y * 0.25 - group.rotation.x) * 0.05;
      group.position.y = Math.sin(t * 1.4) * 0.15;
      sparks.rotation.y = t * 0.05;
      renderer.render(scene, camera);
    };
    if (reduce) { group.rotation.set(0.28, 0.6, 0); renderer.render(scene, camera); } else frame();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointermove', onMove);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); const mat = m.material as THREE.Material | THREE.Material[] | undefined; (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose()); });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" aria-hidden="true" />;
}
