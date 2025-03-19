import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { LandPlot, Mail, Phone } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import useContactStore from "../store/useContactstore";

const ContactPage = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 pt-36 max-w-4xl">

        {/* Animated Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-8 text-center"
        >
          Contact Us For More
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Mail or Call now for Enquiry
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-semibold mb-8 text-center"
        >
          Our Services are available. Mail or Call now for Our Services
        </motion.p>

        <div className="grid grid-cols-1 gap-6 w-full max-w-6xl mt-16">

          {/* Contact Information */}
          <motion.div whileHover={{ scale: 1.05 }} className="w-full">
            <Card className="bg-base-200 shadow-xl text-center border border-base-300">
              <CardContent className="p-6">
                <motion.h2 whileHover={{ scale: 1.125 }} className="text-3xl font-semibold mb-6">Find Us</motion.h2>
                <motion.div whileHover={{ scale: 1.04 }} className="text-base-content/60 mt-2 text-lg font-semibold flex flex-col ml-8">
                  <p className="flex items-center gap-2">
                    <LandPlot className="size-5" />
                    <span>EntreFlow Headquarters - 123 Innovation Street, Tech City, CA 90210, USA</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-5" />
                    <span>Phone - +1 (123) 456-7890</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="size-5" />
                    <span>Email - support@entreflow.com</span>
                  </p>
                </motion.div>

                {/* Mail Now Button */}
                <div className="flex gap-12 justify-center mt-6">
                  <a target="_blank" href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRnXdzBBzDbbKfQLKlzKRMvzLQLwcPvBFGDHtgmRQSDrrWThKbGXZgHrLPSsJXFzjSLmxLv"}>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.985 }}
                      className="btn btn-primary w-[20em] text-lg"
                    >
                      Mail Now
                      <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
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
                  <Input type="text" name="O" value={formData.O} onChange={handleChange} placeholder="Name" className="w-full p-3 rounded-lg border" required />
                  <Input type="email" name="P" value={formData.P} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded-lg border" required />
                  <Input type="text" name="S" value={formData.S} onChange={handleChange} placeholder="Subject" className="w-full p-3 rounded-lg border" required />

                  <select name="R" value={formData.R} onChange={handleChange} className="w-full p-3 rounded-lg border" required>
                    <option value="">Choose One</option>
                    <option value="enquiry">Enquiry</option>
                    <option value="contact">Contact</option>
                  </select>

                  <Textarea name="Q" value={formData.Q} onChange={handleChange} placeholder="Message" className="w-full p-3 rounded-lg border h-32" required />

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
  );
};

export default ContactPage;
