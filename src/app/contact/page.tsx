"use client";

import { useState, FormEvent } from "react";
import FadeIn from "@/components/FadeIn";

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
    // For now, open mailto with form data. Later this can be connected to a form service.
    const subject = `Project Inquiry from ${formData.name}${formData.company ? ` — ${formData.company}` : ""}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nProject Type: ${formData.projectType || "N/A"}\nBudget: ${formData.budget || "N/A"}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:jonathanxu02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-[#1A1A1A] py-3 text-base font-light text-white placeholder:text-[#8A8A8A]/50 outline-none transition-colors focus:border-[#8A8A8A]";
  const labelClasses =
    "text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase";

  return (
    <>
      <section className="bg-black pt-32 pb-24 md:pt-40 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            {/* Left side — info */}
            <div>
              <FadeIn>
                <p className="mb-4 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
                  Contact
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[56px]">
                  Let&apos;s work
                  <br />
                  together.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[#8A8A8A]">
                  Have a project in mind? I&apos;d love to hear about it. Fill
                  out the form and I&apos;ll get back to you within 48 hours.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="mt-12 flex flex-col gap-6">
                  <div>
                    <p className={labelClasses}>Email</p>
                    <a
                      href="mailto:jonathanxu02@gmail.com"
                      className="mt-2 block text-base font-light text-white transition-colors hover:text-[#C8C8C8]"
                    >
                      jonathanxu02@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className={labelClasses}>Instagram</p>
                    <a
                      href="https://instagram.com/itsjonathanxu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-base font-light text-white transition-colors hover:text-[#C8C8C8]"
                    >
                      @itsjonathanxu
                    </a>
                  </div>
                  <div>
                    <p className={labelClasses}>Based In</p>
                    <p className="mt-2 text-base font-light text-white">
                      Toronto, Canada
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right side — form */}
            <div>
              {submitted ? (
                <FadeIn>
                  <div className="flex h-full items-center">
                    <div>
                      <h2 className="text-2xl font-light text-white">
                        Thank you.
                      </h2>
                      <p className="mt-3 text-base font-light text-[#8A8A8A]">
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
                        className="mt-6 text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
                      >
                        Send Another &rarr;
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.2}>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div>
                      <label className={labelClasses}>
                        Name *
                      </label>
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
                      <label className={labelClasses}>
                        Email *
                      </label>
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
                      <label className={labelClasses}>
                        Company / Brand
                      </label>
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
                      <label className={labelClasses}>
                        Project Type
                      </label>
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
                      <label className={labelClasses}>
                        Budget Range
                      </label>
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
                          $2,000 — $5,000
                        </option>
                        <option value="5k-10k" className="bg-black">
                          $5,000 — $10,000
                        </option>
                        <option value="10k-plus" className="bg-black">
                          $10,000+
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>
                        Project Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me about your project — what are you looking for, timeline, any references..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 w-full border border-white/80 py-4 text-[13px] font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black md:w-auto md:px-12"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
