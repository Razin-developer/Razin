import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion, MotionValue } from "framer-motion";
import { Frame } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Main = ({
  border,
  boxShadow,
  borderCTA,
  boxShadowCTA,
  textColor,
  backgroundImage,
  showFirstBox,
}: {
  border: MotionValue<string>;
  boxShadow: MotionValue<string>;
  borderCTA: MotionValue<string>;
  boxShadowCTA: MotionValue<string>;
  textColor: string;
  backgroundImage: MotionValue<string>;
  showFirstBox: boolean;
}) => {
  return (
    <>
      {showFirstBox && (
        <motion.section
          style={{
            backgroundImage,
            border: borderCTA,
            boxShadow: boxShadowCTA,
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:rounded-[128px] md:rounded-[128px] rounded-[64px] grid lg:min-h-screen md:min-h-screen overflow-hidden w-full h-full bg-gray-950 text-gray-200"
        >
          <div className="grid grid-cols-1 w-full h-full">
            {/* Content Section */}
            <div className="flex items-center justify-center px-8 py-24 relative h-full z-auto">
              <div className="relative max-w-5xl z-10 flex flex-col items-center text-center">
                <motion.h1
                  style={{ color: textColor }}
                  className="text-4xl font-bold sm:text-6xl mb-9 flex justify-center"
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 1 }}
                  variants={fadeInVariants}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <div className="flex items-center gap-2">
                      <div className="size-14 rounded-lg bg-primary/10 flex items-center justify-center mr-1">
                        <Frame size={36} className="w-10 h-10" />
                      </div>
                      <span>Razin</span>
                    </div>
                  </motion.div>
                </motion.h1>

                <motion.button
                  style={{ border, boxShadow }}
                  className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 1 }}
                >
                  Newer Services Available!
                </motion.button>

                <h1 className="max-w-5xl pt-3 text-[#c9dffa] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-[25px] font-medium leading-tight sm:text-[33px] md:text-5xl lg:text-6xl">
                  Websites made {" "}
                  <motion.div
                    style={{ display: "inline-block", color: textColor }}
                    whileHover={{ scale: 1.3, padding: "0rem 1.5rem" }}
                  >
                    Easy
                  </motion.div>
                  ,{" "}<br />
                  <motion.div
                    style={{ display: "inline-block", color: textColor }}
                    whileHover={{ scale: 1.3, padding: "0rem 1.5rem" }}
                  >
                    Fast
                  </motion.div>
                  , and{" "}
                  <motion.div
                    style={{ display: "inline-block", color: textColor }}
                    whileHover={{ scale: 1.3, padding: "0rem 1.5rem" }}
                  >
                    Secure
                  </motion.div>{" "}
                  By{" "}<br />
                  <motion.div
                    style={{ display: "inline-block", color: textColor }}
                    whileHover={{ scale: 1.3, margin: "0px 3rem" }}
                  >
                    Razin
                  </motion.div>
                </h1>

                <p className="my-6 max-w-xl text-base lg:text-xl leading-relaxed md:text-lg">
 
                </p>

                <div className="flex gap-4">
                  <a target="_blank" href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRnXdzBBzDbbKfQLKlzKRMvzLQLwcPvBFGDHtgmRQSDrrWThKbGXZgHrLPSsJXFzjSLmxLv"}>
                    <motion.button
                      style={{ border, boxShadow }}
                      whileHover={{ scale: 1.23 }}
                      whileTap={{ scale: 0.9 }}
                      className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                    >
                      Hire Me Now!
                      <FiArrowRight className="transition-transform group-hover:-rotate-40 group-active:-rotate-12" />
                    </motion.button>
                  </a>

                  <Link to={"/contact"}>
                    <motion.button
                      style={{ border, boxShadow }}
                      whileHover={{ scale: 1.24 }}
                      whileTap={{ scale: 0.985 }}
                      className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                    >
                      Contact Me
                      <FiArrowRight className="transition-transform group-hover:-rotate-40 group-active:-rotate-12" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Background Stars Effect */}
              <div className="absolute inset-0 z-0">
                <Canvas>
                  <Stars radius={50} count={1500} factor={4} fade speed={2} />
                </Canvas>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default Main;
