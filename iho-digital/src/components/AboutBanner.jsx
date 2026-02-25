import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AboutBanner = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const shapesRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. SETUP: THE SPHERE (Tight Shell around Text) ---
      const spherePoints = 80; 
      const sphereRadius = 380; // Tighter radius to hug the text
      
      for (let i = 0; i < spherePoints; i++) {
        const point = document.createElement("div");
        point.className = "absolute w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_cyan]";
        
        // Sphere Math
        const theta = Math.random() * Math.PI * 2; 
        const phi = Math.acos((Math.random() * 2) - 1); 
        
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);
        
        gsap.set(point, { x, y, z });
        shapesRef.current.appendChild(point);
      }

      // --- 2. SETUP: THE ORBITAL RING (Saturn Ring Effect) ---
      const ringPoints = 60;
      const ringRadius = 500; // Wider than the sphere

      for (let i = 0; i < ringPoints; i++) {
        const point = document.createElement("div");
        point.className = "absolute w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_blue]";
        
        // Circle Math (Flat Ring)
        const theta = (i / ringPoints) * Math.PI * 2;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);
        
        gsap.set(point, { x, y: 0, z }); // y:0 keeps it flat
        shapesRef.current.appendChild(point);
      }

      // --- 3. ANIMATION: ROTATE THE ENTIRE SYSTEM ---
      // This rotates the sphere + ring together as one solid object
      gsap.to(shapesRef.current, {
        rotationY: 360,
        rotationX: 30, // Slight tilt to show depth
        rotationZ: 10,
        duration: 20,  // Slow, majestic spin
        repeat: -1,
        ease: "none"
      });

      // --- 4. ANIMATION: GRID FLOOR ---
      gsap.to(gridRef.current, {
        backgroundPosition: "0px 100px",
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      // --- 5. ENTRY ANIMATION (Pop Up) ---
      const tl = gsap.timeline();
      
      // Scale up the text
      tl.from(textRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
      });

      // Expand the particles from the center outwards
      tl.from(shapesRef.current, {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "expo.out"
      }, "<"); // Happen at same time

      // --- 6. MOUSE INTERACTION ---
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        // Tilt the container gently
        gsap.to(containerRef.current, {
          perspectiveOrigin: `${50 + xPos * 15}% ${50 + yPos * 15}%`,
          duration: 1
        });
        
        // Move text slightly for 3D feel
        gsap.to(textRef.current, {
          x: -xPos * 20,
          y: -yPos * 20,
          duration: 1
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (shapesRef.current) shapesRef.current.innerHTML = "";
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center perspective-[1200px] z-0"
      style={{ marginLeft: "calc(-50vw + 50%)" }}
    >
      {/* --- LAYER 1: MOVING GRID FLOOR --- */}
      <div 
        ref={gridRef}
        className="absolute bottom-[-25%] left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(75deg)] pointer-events-none opacity-40 blur-[1px]" 
      />

      {/* --- LAYER 2: DEEP BLUE GLOW --- */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-black/90 to-black pointer-events-none" />

      {/* --- LAYER 3: 3D SHAPES (Sphere + Ring) --- */}
      <div 
        ref={shapesRef} 
        className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] pointer-events-none"
      />

      {/* --- LAYER 4: HERO TEXT --- */}
      <div 
        ref={textRef} 
        className="relative z-20 flex flex-col items-center justify-center [transform-style:preserve-3d]"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white select-none whitespace-nowrap glow-text">
          IHO <span className="text-blue-500">DIGITAL</span>
        </h1>

        {/* Floating Badge */}
        <div className="mt-16 px-8 py-3 border border-blue-500/30 rounded-full bg-blue-950/30 backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <p className="text-blue-300 text-xs tracking-[0.3em] font-bold uppercase animate-pulse">
            System Online • Future Ready
          </p>
        </div>
      </div>

      <style jsx>{`
        .perspective-[1200px] { perspective: 1200px; }
        .glow-text {
          text-shadow: 
            0 0 15px rgba(59, 130, 246, 0.9),
            0 0 50px rgba(59, 130, 246, 0.6),
            0 0 100px rgba(59, 130, 246, 0.4);
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default AboutBanner;