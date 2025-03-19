import { motion } from "framer-motion";
import { Button } from "../components/ui/button"; // ShadCN Button
import { useNavigate } from "react-router-dom"; // If using React Router

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-base-200 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Error Code */}
      <motion.h1
        className="text-9xl font-bold text-primary"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-xl text-gray-500 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button
          className="mt-6 btn btn-primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </motion.div>

      {/* Floating Animation Effect */}
      <motion.div
        className="absolute bottom-10 text-gray-400"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Looks like you’re lost... 🧭
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
