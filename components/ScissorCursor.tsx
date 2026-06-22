'use client';

import { useEffect } from 'react';

export default function ScissorCursor() {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const cursorEl = document.getElementById('scissor-cursor');
    if (!cursorEl) return;

    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let ticking = false;
    let activated = false;

    function loop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursorEl!.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        requestAnimationFrame(loop);
      } else {
        ticking = false;
      }
    }

    function activate() {
      if (activated) return;
      activated = true;
      cursorEl!.style.display = 'block';
      document.documentElement.classList.add('cursor-active');
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!activated) {
        activate();
        cx = e.clientX;
        cy = e.clientY;
        cursorEl!.classList.add('is-ready');
      }
      tx = e.clientX;
      ty = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(loop);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!activated) {
        activate();
        cx = e.clientX;
        cy = e.clientY;
        cursorEl!.classList.add('is-ready');
      }
      tx = e.clientX;
      ty = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(loop);
      }
    }

    const hotSel =
      "a, button, [role='button'], summary, label, input[type='submit'], [data-cursor='hot']";

    const onPointerOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(hotSel)) cursorEl!.classList.add('is-hot');
    };
    const onPointerOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(hotSel)) cursorEl!.classList.remove('is-hot');
    };
    const onLeave = () => cursorEl!.classList.remove('is-ready');
    const onEnter = () => {
      if (activated) cursorEl!.classList.add('is-ready');
    };
    const onDown = () => {
      if (activated) cursorEl!.classList.add('is-snip');
    };
    const onUp = () => {
      setTimeout(() => cursorEl!.classList.remove('is-snip'), 140);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerenter', onEnter);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerenter', onEnter);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('cursor-active');
    };
  }, []);

  return (
    <div className="cursor" id="scissor-cursor" aria-hidden>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="13" r="5" />
        <circle cx="11" cy="35" r="5" />
        <g className="blade blade--top">
          <path d="M15.5 14.5 L44 22" />
          <path d="M28 24 L44 22" />
        </g>
        <g className="blade blade--bot">
          <path d="M15.5 33.5 L44 26" />
          <path d="M28 24 L44 26" />
        </g>
        <circle cx="28" cy="24" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
