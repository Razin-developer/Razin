import { MotionValue } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"
import { motion } from "framer-motion"
import useContactStore from "../../store/useContactstore"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { LandPlot, Mail, Phone } from "lucide-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const Contact = ({
  borderCTA,
  boxShadowCTA,
  textColor,
  showFifthBox,
  SecondbackgroundImage,
}: {
  borderCTA: MotionValue<string>,
  boxShadowCTA: MotionValue<string>,
  textColor: string,
  showFifthBox: boolean,
  SecondbackgroundImage: MotionValue<string>,
}) => {

  const { createContact } = useContactStore();

  // State for form inputs
  const [formData, setFormData] = useState({
    O: "",
    P: "",
    S: "",
    R: "",
    Q: "",
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, R: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContact(formData); // Assuming createContact is an async function
      setFormData({ O: "", P: "", S: "", R: "", Q: "" }); // Reset form
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showFifthBox ? 1 : 0, y: showFifthBox ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="relative lg:rounded-[128px] md:rounded-[128px] rounded-[64px] grid lg:min-h-screen md:min-h-screen place-content-center overflow-hidden w-full h-full bg-gray-950 px-4 pt-24 pb-12 text-gray-200"
      style={{
        backgroundImage: SecondbackgroundImage,
        border: borderCTA,
        boxShadow: boxShadowCTA,
        marginTop: "64px",
        pointerEvents: showFifthBox ? "auto" : "none",
      }}
    >
      <div className="z-10 w-full max-w-5xl p-4 sm:p-6 md:p-8 flex flex-col gap-6">
        <motion.h1 whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ color: textColor }} className="text-6xl sm:text-3xl font-bold text-center">Contact Us</motion.h1>
        <p className="text-xl sm:text-lg font-medium text-gray-300 text-center">Contact Us for more details and pricing</p>

        <div className="flex justify-center items-center overflow-hidden">
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-4xl">

            <div className="grid grid-cols-1 gap-6 w-full max-w-6xl">

              {/* Contact Information */}
              <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Card className="bg-base-200 shadow-xl text-center border border-base-300">
                  <CardContent className="p-6">
                    <motion.h2 whileHover={{ scale: 1.125 }} className="text-3xl font-semibold mb-6">Find Us</motion.h2>
                    <motion.div whileHover={{ scale: 1.04 }} className="text-base-content/60 mt-2 text-lg font-semibold flex flex-col ml-8">
                      <p className="flex items-center gap-2">
                        <LandPlot className="size-5" />
                        <span>Razin - Pattanithodi House Kandamangalam PO, Mannarkkad, Kerala, India - 678583</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="size-5" />
                        <span>Phone - +91 949678****</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="size-5" />
                        <span>Email - razinmohammedpt@gmail.com</span>
                      </p>
                    </motion.div>

                    {/* Mail Now Button */}
                    <div className="flex gap-12 justify-center mt-6">
                      <a target="_blank" href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRnXdzBBzDbbKfQLKlzKRMvzLQLwcPvBFGDHtgmRQSDrrWThKbGXZgHrLPSsJXFzjSLmxLv"}>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.985 }}
                          className="group btn btn-primary w-[20em] text-lg"
                        >
                          Mail Now
                          <FiArrowRight className="transition-transform duration-1000 group-hover:-rotate-40 group-active:-rotate-12" />
                        </motion.button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                <Card className="bg-base-200 shadow-xl text-center border border-base-300">
                  <CardContent className="p-6">
                    <motion.h2 whileHover={{ scale: 1.125 }} className="text-3xl font-semibold">
                      Contact Us
                    </motion.h2>
                    <p className="text-base-content/60 mt-2 text-lg">
                      Fill out the form below, and our support team will respond promptly.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                      <Input type="email" name="P" value={formData.P} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded-lg border text-primary placeholder-primary" required />
                      <Input type="text" name="S" value={formData.S} onChange={handleChange} placeholder="Subject" className="w-full p-3 rounded-lg border text-primary placeholder-primary" required />


                      <Select name="R" value={formData.R} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="w-full p-3 rounded-lg border text-primary" >
                          <SelectValue placeholder="Choose One" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enquiry">Hiring</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                        </SelectContent>
                      </Select>


                      <Textarea name="Q" value={formData.Q} onChange={handleChange} placeholder="Message" className="w-full p-3 rounded-lg border h-32 text-primary placeholder-primary" required />

                      {/* Submit Button with Loading State */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className={`btn btn-primary w-[80%] text-lg mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </motion.button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
