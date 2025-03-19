import React from "react";
import "./3d.css";
import { motion, MotionValue } from "framer-motion";

const images = [
  { src: "/images/skills/js.png", alt: "Next.js Development" },
  { src: "/images/skills/react.jpeg", alt: "React Development" },
  { src: "/images/skills/nodejs.png", alt: "Node.js Backend" },
  { src: "/images/skills/mongodb.png", alt: "MongoDB Database" },
  { src: "/images/skills/tailwindcss.png", alt: "Tailwind CSS Styling" },
  { src: "/images/skills/framermotion.png", alt: "Framer Motion Animations" },
  { src: "/images/skills/express.png", alt: "Express Development" },
  { src: "/images/skills/figma.png", alt: "UI/UX Design with Figma" }
];

// Define props for the component
interface BannerProps {
  border: MotionValue<string>;
  boxShadow: MotionValue<string>;
  textShadow: MotionValue<string>;
}

const Banner: React.FC<BannerProps> = ({ border, boxShadow }) => {
  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": images.length } as React.CSSProperties}>
        {images.map((img, index) => (
          <motion.div
            className="item"
            key={index}
            style={{ "--position": index + 1 } as React.CSSProperties}
            initial={{ opacity: 0, border: "none", boxShadow: "none" }}
            animate={{ opacity: 1, border: border.get(), boxShadow: boxShadow.get() }}
            transition={{ duration: 0.5 }}
          >
            <img src={img.src} alt={img.alt} />
          </motion.div>
        ))}
      </div>

      <motion.div className="content">
        <motion.h1 data-content="RAZIN" >RAZIN</motion.h1>
        <div className="model"></div>
      </motion.div>
    </div>
  );
};

export default Banner;
