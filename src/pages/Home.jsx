import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiChevronDown,
  FiUsers,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiPieChart,
  FiActivity,
  FiBarChart,
  FiCreditCard,
  FiDatabase,
} from "react-icons/fi";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import CountUp from "../utils/CountUp";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // New state for testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef);
  const controls = useAnimation();

  const testimonials = [
    {
      name: "Subhash Jha",
      role: "Startup Founder",
      image:
        "https://thumbs.dreamstime.com/b/young-man-as-successful-business-startup-founder-young-man-as-successful-business-startup-founder-tablet-computer-262346042.jpg",
      text: "Invest-IQ helped me plan my investments smartly while growing my startup. The AI suggestions are truly tailored!",
    },
    {
      name: " Milan Kumar",
      role: "Marketing Executive",
      image:
        "https://th.bing.com/th/id/OIP.QiBuq5R5Av4Vfqsgnqb8VwHaE7?rs=1&pid=ImgDetMain",
      text: "I never thought investing could be this simple. Invest-IQ made me feel confident with every decision.",
    },
    {
      name: "Ashutosh Kumar",
      role: "Government Employee",
      image:
        "https://th.bing.com/th/id/OIP.vAdlzJYyaCSM2-JKAKJzyQHaFk?rs=1&pid=ImgDetMain",
      text: "The SIP and tax-saving calculators are so helpful! Invest-IQ has become my go-to financial buddy.",
    },
    {
      name: "Anjali Sharma",
      role: "Freelance Writer",
      image:
        "https://thewritelife.com/wp-content/uploads/2020/10/freelance-writing-contracts.jpg",
      text: "As someone new to investing, I love how Invest-IQ explains everything in simple terms.",
    },
    {
      name: "Sandeep Nandi",
      role: "College Student",
      image:
        "https://thumbs.dreamstime.com/b/composite-image-smiling-student-against-desk-63471394.jpg",
      text: "The portfolio simulator taught me how to balance returns and risks before even investing real money!",
    },
    {
      name: "Riya Gupta",
      role: "Homemaker",
      image:
        "https://th.bing.com/th/id/OIP.r41gh6UpPW122JIdiA88VQHaLL?rs=1&pid=ImgDetMain",
      text: "Thanks to Invest-IQ, I've started planning for my children's future with more clarity and confidence.",
    },
  ];

  // Enhanced hero section with floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Handle automatic testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Add this meta viewport effect to ensure proper mobile scaling
  useEffect(() => {
    // Ensure the viewport is properly set for mobile devices
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    }
  }, []);

  // New floating icons animation
  const floatingIconsAnimation = (delay) => ({
    y: [0, -15, 0],
    x: [0, 5, 0],
    rotate: [0, 10, 0],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: Math.random() * 3 + 5, // Random duration between 5-8s
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  // Background decoration icons
  const backgroundIcons = [
    { icon: FiDollarSign, size: "2.5rem", top: "15%", left: "10%", delay: 0 },
    { icon: FiPieChart, size: "2rem", top: "40%", left: "5%", delay: 1.2 },
    { icon: FiBarChart, size: "2.2rem", top: "70%", left: "8%", delay: 2.5 },
    { icon: FiActivity, size: "2.8rem", top: "20%", right: "7%", delay: 0.7 },
    { icon: FiDatabase, size: "1.8rem", top: "60%", right: "6%", delay: 1.8 },
    { icon: FiCreditCard, size: "2.4rem", top: "85%", right: "12%", delay: 3 },
  ];

  return (
    <div className="w-full max-w-none sm:max-w-none md:max-w-8xl mx-auto  relative overflow-hidden">
      {/* Background floating icons */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/30 to-white/90 backdrop-blur-3xl"></div>
        {backgroundIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-teal-300"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              width: item.size,
              height: item.size,
            }}
            animate={floatingIconsAnimation(item.delay)}
          >
            {createElement(item.icon, {
              style: { width: "100%", height: "100%" },
            })}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Hero Section with better mobile responsiveness */}
      <div className="relative mt-2  sm:mt-6 overflow-hidden bg-white text-gray-900 rounded-lg shadow-lg sm:shadow-xl">
        {/* Multi-layered background effects */}
        <div className="absolute inset-0 z-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/65 via-white to-teal-100" />

          {/* Radial glow */}
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-teal-400/20 rounded-full blur-[120px] opacity-70 pointer-events-none" />

          {/* Blurred floating blobs */}
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/30 rounded-full blur-3xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-10 -left-10 w-52 h-52 bg-teal-400/20 rounded-full blur-[100px] opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative text-center py-16 sm:py-24  md:py-20 z-10"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-xl sm:text-2xl font-semibold text-center z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block text-xs md:text-sm px-2 py-1 mb-4 md:mb-1 md:px-5 md:py-2 rounded-full bg-teal-400/60 text-teal-700 backdrop-blur-md border border-teal-500 shadow-md ring-1 ring-teal-400/40 transition-all duration-300"
              style={{
                boxShadow:
                  "0 0 10px rgba(99,102,241,0.25), 0 4px 20px rgba(99,102,241,0.15)",
              }}
            >
              ✨{" "}
              <span className="font-medium tracking-wide">
                AI-powered investment advisor platform
              </span>
            </motion.span>
          </motion.div>

          <motion.h1
            className="font-bold text-gray-800 mb-4 sm:my-6 px-4"
            style={{
              fontSize: "min(max(2rem, 7vw), 4.5rem)",
              lineHeight: 1.1,
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Smart Investing,{" "}
            <span className="text-teal-500">Made Simple</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-4"
            style={{
              fontSize: "min(max(1.125rem, 4vw), 1.875rem)",
              lineHeight: 1.5,
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Get personalized investment recommendations powered by AI. Start
            your journey to financial freedom today.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/signup"
              className="inline-block font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                padding:
                  "min(max(0.75rem, 3vw), 1.25rem) min(max(1.5rem, 4vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.25rem)",
              }}
            >
              Get Started – It's Free
            </Link>
          </motion.div>
        </motion.div>

        {/* ///////////////////////////////////////////// */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6  sm:py-14 px-4 sm:px-8 rounded-2xl pb-6 relative z-10 mx-2 sm:mx-0"
          style={{ marginTop: "min(max(-1rem, -4vw), -2rem)" }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Active Users", value: 25, icon: FiUsers, suffix: "K+" },
            {
              label: "Assets Managed",
              value: 320,
              icon: FiBarChart2,
              suffix: "M+",
            },
            { label: "Success Rate", value: 94, icon: FiTarget, suffix: "%" },
            {
              label: "Client Satisfaction",
              value: 4.9,
              icon: FiShield,
              suffix: "/5",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 text-center rounded-3xl border-1 border-teal-500 bg-gradient-to-tl from-teal-100 via-teal-400/10 to-teal-100   p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Glowing Circle */}
              <motion.div
                className="rounded-full bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center shadow-md"
                style={{
                  width: "min(max(3.5rem, 10vw), 4rem)",
                  height: "min(max(3.5rem, 10vw), 4rem)",
                  boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.4 },
                }}
              >
                {createElement(stat.icon, {
                  style: {
                    width: "min(max(1.5rem, 4vw), 2rem)",
                    height: "min(max(1.5rem, 4vw), 2rem)",
                  },
                  className: "text-teal-500",
                })}
              </motion.div>

              <h3
                className="font-bold text-gray-800"
                style={{ fontSize: "min(max(1.25rem, 5vw), 1.75rem)" }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} />
              </h3>

              <p
                className="text-gray-500"
                style={{ fontSize: "min(max(0.8rem, 3vw), 1rem)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Statistics Section - Improved scaling */}

      {/* Features Grid - Larger and better scaled */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 py-10 sm:py-20 mt-6 sm:mt-8 px-2 sm:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {[
          {
            icon: FiTarget,
            title: "Personalized Strategy",
            description:
              "Get investment recommendations tailored to your goals, risk tolerance, and timeline.",
          },
          {
            icon: FiShield,
            title: "Risk Management",
            description:
              "Understand and manage your investment risks with our smart risk assessment system.",
          },
          {
            icon: FiTrendingUp,
            title: "Growth Focused",
            description:
              "Access curated investment funds designed to help you achieve your financial goals.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="relative text-center p-5 sm:p-8 rounded-xl bg-white shadow-md hover:shadow-xl transition-all group overflow-hidden"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            {/* Glowing hover blob behind icon */}
            <motion.div
              className="absolute top-5 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-100 rounded-full blur-xl opacity-0 transition-opacity duration-500"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
            />

            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-5 rounded-full bg-teal-100 flex items-center justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: [0, 2, -2, 0],
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {createElement(feature.icon, {
                className: "text-teal-500",
                style: {
                  width: "min(max(2rem, 6vw), 2.5rem)",
                  height: "min(max(2rem, 6vw), 2.5rem)",
                },
              })}
            </motion.div>

            <h3
              className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3"
              style={{ fontSize: "min(max(1.25rem, 4vw), 1.5rem)" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-sm sm:text-lg text-gray-600"
              style={{ fontSize: "min(max(0.875rem, 3vw), 1.125rem)" }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced CTA Section - Better scaling */}
      <motion.div
        className="py-10 sm:py-20 my-6 sm:my-12 bg-gradient-to-r from-teal-50 to-teal-50 rounded-xl sm:rounded-2xl shadow-inner px-4 sm:px-10 mx-2 sm:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
          <div className="w-full md:w-3/5">
            <motion.h2
              className="font-bold text-center md:text-left text-gray-800 mb-3 sm:mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
            >
              Take Control of Your Financial Future Today
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 sm:mb-10 text-center md:text-left"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: "min(max(1rem, 3vw), 1.5rem)" }}
            >
              Join over 25,000 smart investors who have trusted Invest-IQ to help
              build their wealth. Our AI-powered platform provides personalized
              guidance every step of the way.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-5 justify-center md:justify-start"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/signup"
                className="text-white font-medium bg-teal-500 rounded-lg hover:bg-teal-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  padding:
                    "min(max(0.75rem, 2vw), 1rem) min(max(1.5rem, 3vw), 2.5rem)",
                  fontSize: "min(max(1rem, 3vw), 1.125rem)",
                }}
              >
                Start Investing Now
              </Link>
              <Link
                to="/demo"
                target="_blank"
                className="font-medium bg-white text-teal-500 border-2 border-teal-500 rounded-lg hover:bg-teal-50 transition-all shadow-sm"
                style={{
                  padding:
                    "min(max(0.75rem, 2vw), 1rem) min(max(1.5rem, 3vw), 2.5rem)",
                  fontSize: "min(max(1rem, 3vw), 1.125rem)",
                }}
              >
                See How It Works
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="w-4/5 md:w-2/5 flex justify-center mx-auto md:mx-0 mt-6 md:mt-0"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-teal-200 rounded-full opacity-30 blur-xl"></div>
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiUsers className="w-6 h-6 sm:w-7 sm:h-7 text-teal-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-semibold">
                      <CountUp to={25000} suffix="+" />
                    </h4>

                    <p className="text-sm sm:text-base text-gray-500">
                      Active Investors
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiBarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-teal-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-semibold">
                      <CountUp to={320} suffix="M+" />
                    </h4>

                    <p className="text-sm sm:text-base text-gray-500">
                      Assets Managed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Testimonials Section with background pattern */}
      <motion.div
        ref={testimonialsRef}
        className="py-10 sm:py-20 my-8 sm:my-16 bg-gradient-to-r from-teal-50 to-teal-50 rounded-xl sm:rounded-3xl relative overflow-hidden mx-2 sm:mx-0"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Add animated background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-teal-200/30 rounded-full blur-xl"
              style={{
                width: `${Math.random() * 10 + 8}rem`,
                height: `${Math.random() * 10 + 8}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative">
          <motion.h2
            className="font-bold text-center text-gray-800 mb-8 sm:mb-14 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
          >
            What Our Users Say
          </motion.h2>

          <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-4xl mx-auto px-2 sm:px-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev > 0 ? prev - 1 : testimonials.length - 1
                  )
                }
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev < testimonials.length - 1 ? prev + 1 : 0
                  )
                }
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
              </button>
            </div>

            <motion.div
              className="flex items-center"
              animate={{ x: `-${currentTestimonial * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1 sm:px-4">
                  <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                    <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 sm:w-16 h-12 sm:h-16 aspect-square rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-base sm:text-xl font-semibold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-base text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-lg text-gray-700 italic">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
                    currentTestimonial === index
                      ? "bg-teal-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section - Better scaling */}
      <motion.div
        className="py-10 sm:py-20 px-2 sm:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-bold text-center text-gray-800 mb-8 sm:mb-14 px-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-3 sm:space-y-5 max-w-xl md:max-w-4xl mx-auto px-2 sm:px-0">
          {[
            {
              question: "What is Invest-IQ?",
              answer:
                "Invest-IQ is a smart, AI-powered platform that helps you choose the right investment options based on your age, goals, capital, and risk profile — all in a beginner-friendly and educational way.",
            },
            {
              question: "Is this a real investment platform?",
              answer:
                "No. Invest-IQ is not a broker or a financial transaction platform. It's an educational and guidance tool that helps you understand what kind of investments may suit you.",
            },
            {
              question: "Do I need any financial knowledge to use Invest-IQ?",
              answer:
                'Not at all! Invest-IQ is designed for complete beginners. It explains everything in simple terms, and even has a mode called "Explain Like I\'m 18" for ultra-clear explanations.',
            },
            {
              question: "How does Invest-IQ give suggestions?",
              answer:
                "Invest-IQ uses AI (Gemini) to understand your profile (like age, goal, capital, etc.) and gives you personalized investment suggestions like SIPs, mutual funds, or gold — based on your risk category.",
            },
            {
              question: "Is my data safe?",
              answer:
                "Yes. We only collect basic profile info like age, capital, and goals. We don't store any sensitive or financial data, and everything stays private and secure.",
            },
            {
              question: "Do I need to pay to use Invest-IQ?",
              answer:
                "Nope! Invest-IQ MVP is completely free to use. It's designed for learning and exploring how to invest smartly.",
            },
            {
              question: "Does InvestIQ tell me exactly where to invest?",
              answer:
                "InvestIQ gives AI-based suggestions, not fixed advice. You still make your own decisions — we just help you understand your options better.",
            },
            {
              question: "What's coming next on InvestIQ?",
              answer:
                "In future updates, we'll add: \
                \n• A smart portfolio simulator \
                \n• AI-powered financial chatbot \
                \n• Easy-to-read blogs \
                \n• Goal tracking and more!",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="border border-teal-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 sm:p-6 text-left bg-teal-50/35 hover:bg-emerald-100/45 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className="font-medium text-gray-800 text-sm sm:text-lg"
                  style={{ fontSize: "min(max(0.875rem, 3vw), 1.125rem)" }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 flex-shrink-0" />
                </motion.div>
              </button>
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
                  <p
                    className="text-sm sm:text-lg text-gray-600"
                    style={{
                      fontSize: "min(max(0.875rem, 2.5vw), 1.125rem)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA Section - Improved sizing */}
      <motion.div
        className="text-center py-10 sm:py-20 my-8 sm:my-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-3xl text-white relative overflow-hidden mx-2 sm:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-pattern opacity-10" />

        {/* Add animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative px-4 sm:px-6">
          <motion.h2
            className="font-bold mb-3 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
          >
            Start Your Investment Journey Today
          </motion.h2>
          <motion.p
            className="opacity-90 mb-6 sm:mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "min(max(1rem, 3vw), 1.5rem)" }}
          >
            Join thousands of smart investors and take control of your financial
            future.
          </motion.p>
          <motion.div
            className="flex justify-center gap-3 sm:gap-6 flex-wrap"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="font-medium bg-white text-teal-500 rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              style={{
                padding:
                  "min(max(0.75rem, 2vw), 1.25rem) min(max(1.5rem, 3vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.125rem)",
              }}
            >
              Create Free Account
            </Link>
            <Link
              to="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all"
              style={{
                padding:
                  "min(max(0.75rem, 2vw), 1.25rem) min(max(1.5rem, 3vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.125rem)",
              }}
            >
              Watch Demo
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
