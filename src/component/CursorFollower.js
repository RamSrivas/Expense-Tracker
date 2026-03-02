import React, { useEffect, useRef } from 'react';
import '../component-css/cursor.css';

const CursorFollower = () => {
  const cursor = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = e => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      // simple linear interpolation (lerp) towards the target
      // larger factor makes it track more closely
      const factor = 0.5;
      current.current.x += (pos.current.x - current.current.x) * factor;
      current.current.y += (pos.current.y - current.current.y) * factor;

      if (cursor.current) {
        cursor.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={cursor} className="cursor-follower" />;
};

export default CursorFollower;
