import { motion, MotionValue } from "framer-motion";
import { useEffect } from "react";

const Services = ({
  borderCTA,
  boxShadowCTA,
  textColor,
  showSecondBox,
  SecondbackgroundImage,
}: {
  borderCTA: MotionValue<string>;
  boxShadowCTA: MotionValue<string>;
  textColor: string;
  showSecondBox: boolean;
  SecondbackgroundImage: MotionValue<string>;
}) => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
    const stackArea = document.querySelector(".stack-area") as HTMLElement | null;
    const servicesCTA = document.querySelector(".services-cta") as HTMLElement | null;

    function rotateCards() {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = `translateY(-120vh) rotate(-48deg)`;
          card.style.opacity = "0";
        } else {
          card.style.transform = `rotate(${angle}deg) translateY(${index * -5}px)`;
          angle -= 10;
          card.style.zIndex = `${cards.length - index}`;
          card.style.opacity = "1";
        }
      });
    }

    function handleScroll() {
      if (!stackArea) return;
      let distance = window.innerHeight / 2;
      let topVal = stackArea.getBoundingClientRect().top;
      let index = Math.floor(-1 * (topVal / distance + 1));

      cards.forEach((element, i) => {
        if (i <= index) {
          element.classList.add("away");
        } else {
          element.classList.remove("away");
        }
      });

      rotateCards();
    }

    servicesCTA?.addEventListener("scroll", handleScroll);
    rotateCards();

    return () => {
      servicesCTA?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showSecondBox ? 1 : 0, y: showSecondBox ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="relative lg:rounded-[128px] md:rounded-[128px] rounded-[64px] grid w-full bg-gray-950 text-gray-200 overflow-y-auto md:max-h-[125vh] sm:max-h-[115vh] lg:max-h-screen services-cta p-12 md:p-20 lg:p-0"
      style={{
        backgroundImage: SecondbackgroundImage.get(),
        border: borderCTA.get(),
        boxShadow: boxShadowCTA.get(),
        marginTop: "64px",
        pointerEvents: showSecondBox ? "auto" : "none",
        scrollbarWidth: "none",
      }}
    >
      {/* Background Scroll Effect */}
      <div className="relative w-full h-[400vh] stack-area">
        <div className="sticky top-0 flex flex-col lg:flex-row w-full h-screen gap-32 lg:gap-4 ">
          {/* Left Section */}
          <div className="lg:w-1/2 w-full p-6 md:p-12 flex flex-col gap-6 md:gap-16 items-start justify-center text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-extrabold" style={{ color: textColor }}>My Services</h1>
            <p className="text-base md:text-lg lg:text-xl">
              I am MERN website developer. I bult a full-stack website, ecommerce website, frontend, backend, API. I do Full-Stack development, Backend Development, Frontend Development, API Development, Web Designing, etc....... 
            </p>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 w-full flex flex-wrap justify-center items-center gap-6 py-12">
            {[
              { color: "#407AFF", name: "Web Development" },
              { color: "#ff4040", name: "Frontend Development" },
              { color: "#c640ff", name: "Backend Development" },
              { color: "#40ff70", name: "API Development" },
              { color: "#8940ff", name: "Web Designing" },
            ].map((cardObj, index) => (
              <div
                key={index}
                className="absolute w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl shadow-lg card flex flex-col justify-center items-center text-white font-bold text-lg md:text-xl"
                style={{
                  backgroundColor: cardObj.color,
                  transition: "0.5s ease-in-out",
                }}
              >
                <h1>{cardObj.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
