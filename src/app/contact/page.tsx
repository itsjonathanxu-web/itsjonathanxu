"use client";

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

function ScrollRevealLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.65"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Project Inquiry from ${formData.name}${formData.company ? ` - ${formData.company}` : ""}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nProject Type: ${formData.projectType || "N/A"}\nBudget: ${formData.budget || "N/A"}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:jonathanxu02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-white/10 py-3 text-[15px] text-white placeholder:text-white/20 outline-none transition-colors focus:border-white/40";
  const labelClasses =
    "font-display text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase";

  return (
    <>
      <section className="bg-black pt-32 pb-24 md:pt-40 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            {/* Left side -info */}
            <div>
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
                <h1 className="font-display text-[clamp(40px,8vw,72px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                  Let&apos;s work
                  <br />
                  together.
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-white/40">
                  Have a project in mind? I&apos;d love to hear about it. Fill
                  out the form and I&apos;ll get back to you within 48 hours.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="mt-12 flex flex-col gap-6">
                  <div className="glass-panel rounded-xl p-5">
                    <p className={labelClasses}>Email</p>
                    <a
                      href="mailto:jonathanxu02@gmail.com"
                      className="font-display mt-2 block text-[15px] font-bold text-white transition-opacity duration-300 hover:opacity-50"
                    >
                      jonathanxu02@gmail.com
                    </a>
                  </div>
                  <div className="glass-panel rounded-xl p-5">
                    <p className={labelClasses}>Instagram</p>
                    <a
                      href="https://instagram.com/itsjonathanxu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display mt-2 block text-[15px] font-bold text-white transition-opacity duration-300 hover:opacity-50"
                    >
                      @itsjonathanxu
                    </a>
                  </div>
                  <div className="glass-panel rounded-xl p-5">
                    <p className={labelClasses}>Based In</p>
                    <p className="font-display mt-2 text-[15px] font-bold text-white">
                      Toronto, Canada
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side -form */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex h-full items-center">
                    <div>
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
                            company: "",
                            projectType: "",
                            budget: "",
                            message: "",
                          });
                        }}
                        className="font-display mt-6 text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
                      >
                        Send Another &rarr;
                      </button>
                    </div>
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
                      <label className={labelClasses}>Company / Brand</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectType: e.target.value,
                          })
                        }
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" className="bg-black">
                          Select a project type
                        </option>
                        <option value="hospitality" className="bg-black">
                          Hospitality (Hotel / Restaurant / Bar)
                        </option>
                        <option value="architecture" className="bg-black">
                          Architecture &amp; Interiors
                        </option>
                        <option value="travel" className="bg-black">
                          Travel &amp; Destination
                        </option>
                        <option value="brand" className="bg-black">
                          Brand &amp; Commercial
                        </option>
                        <option value="other" className="bg-black">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" className="bg-black">
                          Select a range
                        </option>
                        <option value="under-2k" className="bg-black">
                          Under $2,000
                        </option>
                        <option value="2k-5k" className="bg-black">
                          $2,000 - $5,000
                        </option>
                        <option value="5k-10k" className="bg-black">
                          $5,000 - $10,000
                        </option>
                        <option value="10k-plus" className="bg-black">
                          $10,000+
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>Project Details *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me about your project, what are you looking for, timeline, any references..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="glass-btn mt-4 w-full py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase md:w-auto md:px-12"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
