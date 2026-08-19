"use client";

import { useState } from "react";
import Cursor from "./Cursor";
import MotionRuntime from "./MotionRuntime";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";

/**
 * Single mount point for every global motion concern. Scroll easing and the
 * reveal engine only start once the curtain is up, so nothing animates behind
 * it and the first section plays to an audience.
 */
export default function MotionProvider() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      {ready && <SmoothScroll />}
      <Cursor />
      <MotionRuntime ready={ready} />
    </>
  );
}
