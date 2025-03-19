import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = ({
  border,
  boxShadow,
  borderCTA,
  boxShadowCTA,
  textColor,
  showSixthBox,
  SecondbackgroundImage,
  loadLetters
}: {
  border: MotionValue<string>,
  boxShadow: MotionValue<string>,
  borderCTA: MotionValue<string>,
  boxShadowCTA: MotionValue<string>,
  textColor: string,
  showSixthBox: boolean,
  SecondbackgroundImage: MotionValue<string>,
  loadLetters: ReactNode | null | string
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showSixthBox ? 1 : 0, y: showSixthBox ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="relative lg:rounded-[128px] md:rounded-[128px] rounded-[64px] grid lg:min-h-screen place-content-center overflow-hidden w-full bg-gray-950 px-4 py-24 text-gray-200"
      style={{
        backgroundImage: SecondbackgroundImage,
        border: borderCTA,
        boxShadow: boxShadowCTA,
        marginTop: "64px",
        pointerEvents: showSixthBox ? "auto" : "none",
      }}
    >
      <div className="z-10 overflow-hidden max-w-5xl p-4 sm:p-6 md:p-8 flex flex-col gap-6">
        <motion.h1 whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ color: textColor }} className="text-6xl sm:text-3xl font-bold text-center">About Us</motion.h1>
        <p className="text-xl sm:text-lg font-medium text-gray-300 text-center">Our Life is not start at this. Read About As</p>

        <motion.div
          className="grid grid-cols-1 mt-10 gap-6 border-2 border-gray-500 p-8 rounded-xl min-w-full max-w-full min-h-[350px] lg:min-h-[350px] md:min-h-[350px] sm:min-h-[200px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: 1,
              transition: { staggerChildren: 0.2, duration: 0.8 },
            },
          }}
          style={{
            backgroundImage: SecondbackgroundImage,
            borderRadius: "32px",
            border: borderCTA,
            boxShadow: boxShadowCTA,
          }}
        >
          <div className="text-left overflow-hidden min-h-[350px] lg:min-h-[350px] md:min-h-[350px] sm:min-h-[200px] min-w-full max-w-full"
            style={{ position: "relative", maxHeight: "500px", width: "100%", }}>
            <div className="text-gray-400">
              {/* About Page Content */}
              {loadLetters}
            </div>
            <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translate(-50%, -50%)" }}>
              <Link className="group relative flex w-fit items-center gap-1.5 rounded-full text-gray-50 transition-colors" to={'/about'}
              >
                <motion.button
                  style={{ border, boxShadow }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/30 px-4 py-2 ml-1 text-gray-50 transition-colors hover:bg-gray-950/50"
                >
                  Read More
                  <FiArrowRight className="transition-transform group-hover:-rotate-40 group-active:-rotate-12" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}

export default About
