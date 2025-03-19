import { ReactNode, useEffect, useRef, useState } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  MotionValue,
  useAnimate,
} from "framer-motion";
import ThreeD from "../components/CTA/3d";
import Main from "../components/CTA/Main";
import Services from "../components/CTA/Services";
import Contact from "../components/CTA/Contact";
import About from "../components/CTA/About";
import Skills from "../components/CTA/Skills";
import Works from "../components/CTA/Works";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const aboutSectionContent = `The Tale of Our Achievement Story,
Our achievement story is a testament to teamwork and perseverance. Together, we've
                    overcome challenges, celebrated victories, and created a narrative of progress and
                    success.`

export let border: MotionValue<string>;
export let borderCTA: MotionValue<string>;
export let boxShadow: MotionValue<string>;
export let boxShadowCTA: MotionValue<string>;
export let textShadow: MotionValue<string>;
export let backgroundImage: MotionValue<string>;
export let SecondbackgroundImage: MotionValue<string>;

const HomePage = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [textColor, setTextColor] = useState(COLORS_TOP[0]);
  const [showFirstBox, setShowFirstBox] = useState<boolean>(true);
  const [showSecondBox, setShowSecondBox] = useState<boolean>(true);
  const [showThirdBox, setShowThirdBox] = useState<boolean>(true);
  const [showFourthBox, setShowFourthBox] = useState<boolean>(true);
  const [showFifthBox, setShowFifthBox] = useState<boolean>(true);
  const [showSixthBox, setShowSixthBox] = useState<boolean>(false);
  const [loadLetters, setLoadLetters] = useState<string | ReactNode>("");
  const [_, animate] = useAnimate();
  const intervalId = useRef<number | null>(null);
  let count = useRef(-1);

  const loadLettersFun = () => {
    if (intervalId.current) clearInterval(intervalId.current); // Clear previous interval if any

    intervalId.current = window.setInterval(() => {
      count.current++;

      if (count.current >= aboutSectionContent.length) {
        setLoadLetters(<div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-base-content/60 text-base font-normal leading-relaxed">About Us</h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                      Just one night cannot change a person's life.
                    </h2>
                    <p className="text-base-content/60 text-base font-normal leading-relaxed lg:text-start text-center">
                      Our achievement story is a testament to hard work and perseverance. Together, we've overcome challenges, celebrated victories, and created a narrative of progress and success.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div
                      className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex"
                      style={{ opacity: 1, transform: "none" }}
                    >
                      <h4 className="text-2xl font-bold font-manrope leading-9">1+ Years</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">
                        The long journey started only. Waiting for precious times
                      </p>
                    </div>
                    <div
                      className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex"
                      style={{ opacity: 1, transform: "none" }}
                    >
                      <h4 className="text-2xl font-bold font-manrope leading-9">5+ Projects</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">
                        Excellence Achieved Through Success
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div
                      className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex"
                      style={{ opacity: 1, transform: "none" }}
                    >
                      <h4 className="text-2xl font-bold font-manrope leading-9">One-man Business</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">
                        Anyone can do anything. Don't wait for others
                      </p>
                    </div>
                    <div
                      className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex"
                      style={{ opacity: 1, transform: "none" }}
                    >
                      <h4 className="text-2xl font-bold font-manrope leading-9">99% Happy Clients</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">
                        Mirrors our Focus on Client Satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img
                  className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  alt="About Us image"
                  src="https://pagedone.io/asset/uploads/1717742431.png"
                  style={{ transform: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        )
        clearInterval(intervalId.current!); // Stop when done
        return;
      }

      setLoadLetters((prev) => prev + aboutSectionContent.charAt(count.current));

    }, 1);
  };


  useEffect(() => {
    animate(color, COLORS_TOP, {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
      

      // Set visibility of boxes
      setShowFirstBox(true);
      setShowSecondBox(true);
      setShowThirdBox(true);
      setShowFourthBox(true);
      setShowFifthBox(true);

      if (scrollY > 6000) {
        setShowSixthBox(true);
        loadLettersFun();
      } else {
        setShowSixthBox(false);
        setLoadLetters("");
        count.current = -1;
        if (intervalId.current) clearInterval(intervalId.current);
      }
    };

    window.scrollTo(0, 0)

    // Listen for manual scrolling
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  // Update text color dynamically when `color` changes
  useMotionValueEvent(color, "change", (latest) => {
    setTextColor(latest);
  });

  backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  SecondbackgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 50%, #020617 50%, ${color})`;
  border = useMotionTemplate`1px solid ${color}`;
  borderCTA = useMotionTemplate`5px solid ${color}`;
  boxShadow = useMotionTemplate`0px 0px 24px ${color}`;
  boxShadowCTA = useMotionTemplate`0px 0px 24px ${color}`;
  textShadow = useMotionTemplate`drop-shadow(0px 0px 24px ${color})`;

  return (
    <div className="bg-gray-950 overflow-x-hidden">
      <div className="h-full rounded-[100px] p-[60px] pt-[100px]">
        <div  className="hidden lg:block"><ThreeD border={borderCTA} boxShadow={boxShadowCTA} textShadow={textShadow} /></div>

        {/* First section */}

        <Main
          textColor={textColor}
          backgroundImage={backgroundImage}
          border={border}
          borderCTA={borderCTA}
          boxShadow={boxShadow}  // ✅ Ensure this is passed
          boxShadowCTA={boxShadowCTA}  // ✅ Ensure this is passed
          showFirstBox={showFirstBox}
        />


        {/* Second section */}
        <Services
          borderCTA={borderCTA}
          boxShadowCTA={boxShadowCTA}
          textColor={textColor}
          showSecondBox={showSecondBox}
          SecondbackgroundImage={SecondbackgroundImage}
        />

        {/* Third section */}
        <Skills showThirdBox={showThirdBox} textColor={textColor} />
        <Works showFourthBox={showFourthBox} textColor={textColor} />

        {/* Fourth Section */}
        <Contact
          borderCTA={borderCTA}
          boxShadowCTA={boxShadowCTA}
          textColor={textColor}
          showFifthBox={showFifthBox}
          SecondbackgroundImage={SecondbackgroundImage}
        />

        {/* Fifth Section */}
        <About
          border={border}
          boxShadow={boxShadow}
          borderCTA={borderCTA}
          boxShadowCTA={boxShadowCTA}
          textColor={textColor}
          showSixthBox={showSixthBox}
          SecondbackgroundImage={SecondbackgroundImage}
          loadLetters={loadLetters}
        />

      </div>
    </div>
  );
};

export default HomePage;
