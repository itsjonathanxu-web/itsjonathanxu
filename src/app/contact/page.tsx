"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:jonathanxu02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-white/10 py-3 text-[15px] text-white/80 placeholder:text-white/30 outline-none transition-colors focus:border-white/40";
  const labelClasses =
    "font-display text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase";

  return (
    <>
      <section className="bg-black pt-32 pb-24 md:pt-40 md:pb-40">
        <div className="mx-auto px-6">
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-display mb-4 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                Contact
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-display whitespace-nowrap text-[clamp(32px,8vw,80px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                LET&apos;S WORK TOGETHER
              </h1>
            </motion.div>
          </div>

          {/* Form */}
          <div className="mx-auto mt-12 max-w-[600px]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <h2 className="font-display text-[clamp(24px,3vw,36px)] font-extrabold text-white">
                    Thank you.
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.8] text-white/40">
                    Your email client should have opened with the message.
                    If it didn&apos;t, feel free to email me directly at{" "}
                    <a
                      href="mailto:jonathanxu02@gmail.com"
                      className="text-white underline"
                    >
                      jonathanxu02@gmail.com
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        message: "",
                      });
                    }}
                    className="font-display mt-6 text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
                  >
                    Send Another &rarr;
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div>
                    <label className={labelClasses}>Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="glass-btn mx-auto mt-4 w-full py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase md:w-auto md:px-12"
                  >
                    Send Inquiry
                  </button>
                </form>

                {/* Email & Instagram inline */}
                <div className="mt-12 flex items-center justify-center gap-8">
                  <a
                    href="mailto:jonathanxu02@gmail.com"
                    className="font-display text-[13px] font-medium tracking-[0.08em] text-white/40 transition-colors duration-300 hover:text-white/70"
                  >
                    jonathanxu02@gmail.com
                  </a>
                  <span className="text-white/10">|</span>
                  <a
                    href="https://instagram.com/itsjonathanxu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[13px] font-medium tracking-[0.08em] text-white/40 transition-colors duration-300 hover:text-white/70"
                  >
                    @itsjonathanxu
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
