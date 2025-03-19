import { motion } from "framer-motion";
import { useEffect } from "react";

const achievementDetails1 = [{ title: "1+ Years", desc: "The long journey started only. Waiting for precious times" }, { title: "5+ project", desc: "Excellence Achieved Through Success" }]
const achievementDetails2 = [{ title: "One-man business", desc: "Anyone can do anything. Don't wait for others" }, { title: "99% Happy Clients", desc: "Mirrors our Focus on Client Satisfaction." }]

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0 overflow-hidden">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6 className="text-base-content/60 text-base font-normal leading-relaxed">About Us</h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2
                    className="text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Just one night cannot change a persons life.</h2>
                  <p
                    className="text-base-content/60 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our achievement story is a testament to hardwork and perseverance. Together, we've
                    overcome challenges, celebrated victories, and created a narrative of progress and
                    success.</p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  {achievementDetails1.map(({ title, desc }, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 158 : -158, y: 75 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.2 , transition: {duration: 0.1}}} key={index} className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-2xl font-bold font-manrope leading-9">{title}</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  {achievementDetails2.map(({ title, desc }, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 158 : -158, y: -75 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      transition={{ duration: 0.5 }} whileHover={{ scale: 1.2 , transition: {duration: 0.1} }} key={index} className="w-full h-full p-3.5 bg-base-200 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-2xl font-bold font-manrope leading-9">{title}</h4>
                      <p className="text-base-content/60 text-base font-normal leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div
              className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <motion.img whileHover={{ scale: 1.2 }} className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default AboutPage
