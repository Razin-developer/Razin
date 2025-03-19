import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiFramer, SiExpress, SiJavascript, SiHandlebarsdotjs, SiJsonwebtokens, SiMongoose, SiHtml5, SiCss3, SiSocketdotio, SiBootstrap, SiRender, SiJquery, SiPython, SiAxios, SiCloudinary, SiShadcnui, SiDaisyui, SiRazorpay, SiStripe, SiVite, SiReacthookform, SiPaypal, SiPaytm } from "react-icons/si";
import { Link } from "react-router-dom";

const skills = [
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, level: "Expert", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React.js", icon: <FaReact className="text-[#61DAFB]" />, level: "Advanced", link: "https://react.dev/" },
  { name: "Express.js", icon: <SiExpress className="text-[#000000]" />, level: "Expert", link: "https://expressjs.com/" },
  { name: "Node.js", icon: <FaNodeJs className="text-[#8CC84B]" />, level: "Expert", link: "https://nodejs.org/en/docs" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38BDF8]" />, level: "Advanced", link: "https://tailwindcss.com/docs" },
  { name: "Framer Motion", icon: <SiFramer className="text-[#FF0050]" />, level: "Advanced", link: "https://www.framer.com/motion/" },
  { name: "MongoDB", icon: <SiMongodb className="text-[#4DB33D]" />, level: "Advanced", link: "https://www.mongodb.com/docs/" },
  { name: "HandleBars.js", icon: <SiHandlebarsdotjs className="text-[#AD3F0C]" />, level: "Advanced", link: "https://handlebarsjs.com/guide/" },
  { name: "JsonWebTokens (JWT)", icon: <SiJsonwebtokens className="text-[#000000]" />, level: "Advanced", link: "https://jwt.io/introduction/" },
  { name: "Mongoose", icon: <SiMongoose className="text-[#880000]" />, level: "Advanced", link: "https://mongoosejs.com/docs/" },
  { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" />, level: "Expert", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", icon: <SiCss3 className="text-[#1572B6]" />, level: "Advanced", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Socket.io", icon: <SiSocketdotio className="text-[#010101]" />, level: "Advanced", link: "https://socket.io/docs/" },
  { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" />, level: "Advanced", link: "https://getbootstrap.com/docs/" },
  { name: "Render", icon: <SiRender className="text-[#4353FF]" />, level: "Intermediate", link: "https://render.com/docs" },
  { name: "JQuery", icon: <SiJquery className="text-[#0769AD]" />, level: "Intermediate", link: "https://api.jquery.com/" },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" />, level: "Basic", link: "https://docs.python.org/3/" },
  { name: "Axios", icon: <SiAxios className="text-[#5A29E4]" />, level: "Advanced", link: "https://axios-http.com/docs/intro" },
  { name: "Cloudinary", icon: <SiCloudinary className="text-[#F6C000]" />, level: "Intermediate", link: "https://cloudinary.com/documentation" },
  { name: "ShadCN UI", icon: <SiShadcnui className="text-[#000000]" />, level: "Intermediate", link: "https://ui.shadcn.com/" },
  { name: "Daisy UI", icon: <SiDaisyui className="text-[#FF49A4]" />, level: "Intermediate", link: "https://daisyui.com/docs/" },
  { name: "Razorpay", icon: <SiRazorpay className="text-[#02042B]" />, level: "Intermediate", link: "https://razorpay.com/docs/" },
  { name: "Stripe", icon: <SiStripe className="text-[#635BFF]" />, level: "Intermediate", link: "https://stripe.com/docs" },
  { name: "Vite", icon: <SiVite className="text-[#646CFF]" />, level: "Intermediate", link: "https://vitejs.dev/guide/" },
  { name: "React Hook Form", icon: <SiReacthookform className="text-[#EC5990]" />, level: "Intermediate", link: "https://react-hook-form.com/get-started" },
  { name: "PayPal", icon: <SiPaypal className="text-[#00457C]" />, level: "Basic", link: "https://developer.paypal.com/docs/" },
  { name: "Paytm", icon: <SiPaytm className="text-[#002970]" />, level: "Basic", link: "https://developer.paytm.com/docs/" },
];



const Skills = ({
  textColor,
  showThirdBox,
}: {
  textColor: string;
  showThirdBox: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, color: textColor }}
      animate={{ opacity: showThirdBox ? 1 : 0, y: showThirdBox ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      className="py-10 px-6 text-center"
      style={
        {
          pointerEvents: showThirdBox ? "auto" : "none",
        }
      }
      viewport={{once: true}}
    >
      <h2 className="text-4xl font-bold mb-8">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            <Link to={skill.link}>
              <Card className="p-5 shadow-xl bg-base-100 hover:shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center text-base-50">
                  <div className="text-6xl mb-4 text-base-50">{skill.icon}</div>
                  <h3 className="text-xl font-semibold text-primary">{skill.name}</h3>
                  <Badge className="mt-2 px-3 py-1 bg-primary text-base-50 font-semibold">{skill.level}</Badge>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
