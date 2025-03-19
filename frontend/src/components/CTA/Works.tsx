import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce App",
    description: "A full-stack e-commerce platform with Express, MongoDB, HBS.",
    image: "/images/works/ecommerce.png",
    link: "https://r3-commerce.onrender.com",
  },
  {
    title: "Portfolio Website",
    description: "A MERN sleek React & Tailwind-based portfolio site. with Backend",
    image: "/images/works/protofolio.png",
    link: "/",
  },
  {
    title: "AI Chatbot",
    description: "A GPT-powered chatbot with voice recognition.",
    image: "/images/works/chatbot.png",
    link: "https://razin-developer.github.io/MeBot/index.html",
  },
  {
    title: "Result Publication Website",
    description: "A MERN Fullstack Project.",
    image: "/images/works/madrasa-result.png",
    link: "https://tsmk.onrender.com",
  },
  {
    title: "Blogging Website",
    description: "A Nodejs Express and Hbs Fullstack Project.",
    image: "/images/works/blog.png",
    link: "https://blogify-db65.onrender.com",
  },
  {
    title: "Chatting Website",
    description: "A MERN Fullstack Project.",
    image: "/images/works/chat.png",
    link: "https://r3-chatty.onrender.com",
  },
  {
    title: "Threads Clone",
    description: "A MERN Fullstack Project.",
    image: "/images/works/threads.png",
    link: "https://threads-clone-master-i2u1.onrender.com",
  },
  {
    title: "To-Do List",
    description: "A React Project.",
    image: "/images/works/todo.png",
    link: "https://r3-todo-list.onrender.com",
  },
  {
    title: "A Result Publication Website",
    description: "A Simple HTML, CSS, JSProject.",
    image: "/images/works/ishal-madeena.png",
    link: "https://razin-developer.github.io/Ishal-Madeena/grand-total.html",
  },
  {
    title: "Spotify Clone",
    description: "A MERN Fullstack Project. But Failed At Deploy.",
    image: "https://placehold.co/295x140?text=Spotify+Clone",
    link: "https://r3-spotify.onrender.com",
  },
];


const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Works = ({
  textColor,
  showFourthBox,
}: {
  textColor: string;
  showFourthBox: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <motion.section
        className="p-10 bg-base-200"
        variants={variants}
        initial="hidden"
        animate={showFourthBox ? "visible" : "hidden"}
        whileInView={showFourthBox ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          style={{ color: textColor }}
        >
          My Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-base-100 shadow-lg rounded-xl p-5 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-fit rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              />
              <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
              <p className="text-sm text-base-500 mt-2">{project.description}</p>
              <motion.a
                href={project.link}
                className="btn btn-primary mt-4"
                whileHover={{ scale: 1.1 }}
                target="_blank"
              >
                View Project
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 lg:inset-40 flex items-center justify-center z-50"
          >
            <div className="relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-400 transition size-12 text-xl"
                onClick={() => {
                  // Delay unmounting for exit animation
                  setTimeout(() => setSelectedImage(null), 450);
                }}
              >
                ✖
              </button>

              <motion.img
                src={selectedImage}
                alt="Fullscreen"
                className="max-w-full max-h-screen rounded-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Works;
