'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ChevronRight, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroContentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Hero Animation
    const ctx = gsap.context(() => {
      // 1.15x scale to 1.0x on discovery
      gsap.fromTo(heroImgRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.5, ease: "power2.out" }
      );

      // Typography reveal
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".hero-title span", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "expo.out"
        }, "-=0.4")
        .from(".hero-subhead", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-cards", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=0.4");

      // 3D Floating cards
      cardsRef.current.forEach((card, index) => {
        gsap.to(card, {
          y: -20,
          duration: 2 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Hero parallax scroll
      gsap.to(heroImgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 150,
        ease: "none"
      });

      // Stats Counters
      const stats = document.querySelectorAll('.stat-value');
      stats.forEach(stat => {
        const value = parseInt(stat.getAttribute('data-value'));
        gsap.to(stat, {
          innerText: value,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          }
        });
      });

      // About Text Reveal
      gsap.from(".about-text", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        }
      });

      // Experience Zone Curtain Sweep
      gsap.to(".curtain-sweep", {
        x: "100%",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".curtain-sweep",
          start: "top 70%",
        }
      });

      // Horizontal Scroll
      const horizontalContainer = document.querySelector('.horizontal-container');
      if (horizontalContainer) {
        gsap.to(horizontalContainer, {
          x: () => -(horizontalContainer.scrollWidth - window.innerWidth + 200),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-gallery-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      {/* SECTION 1: HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={heroImgRef}
          className="absolute inset-0 z-0 bg-cover bg-center grayscale-[0.3] brightness-[0.4]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
        />

        <div ref={heroContentRef} className="relative z-10 container mx-auto px-6 text-center">
          <p className="hero-eyebrow text-gold text-[9px] tracking-eyebrow uppercase mb-6">
            Al-Rehman Garden Phase 2 · Lahore, Pakistan
          </p>

          <h1 className="hero-title mb-8 overflow-hidden flex flex-col items-center">
            <span className="block text-white leading-[1.1] font-heading italic" style={{ fontSize: 'clamp(72px, 11vw, 160px)' }}>
              Where Fitness
            </span>
            <span className="block text-gold leading-[1.1] font-heading italic" style={{ fontSize: 'clamp(72px, 11vw, 160px)' }}>
              Meets Luxury
            </span>
          </h1>

          <p className="hero-subhead max-w-2xl mx-auto text-white-soft text-lg mb-12">
            Experience a new paradigm of wellness. Designed for the elite, engineered for performance, and curated for the most discerning members of Lahore.
          </p>

          <button className="clip-luxury bg-gold text-black px-10 py-5 text-[9px] tracking-nav uppercase font-bold hover:bg-gold-light transition-colors">
            Discover Membership
          </button>
        </div>

        {/* Floating Cards */}
        <div className="hero-cards absolute bottom-12 right-12 hidden lg:flex gap-6 z-20">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i - 1] = el)}
              className="w-48 h-64 border border-border bg-panel p-2 transform rotate-3"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop&sig=${i}")` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: MARQUEE TICKER */}
      <section className="py-12 border-y border-border overflow-hidden bg-dark">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center">
              {["OLYMPIC WEIGHTLIFTING", "AQUA THERAPY", "ELITE BOXING", "LUXURY SPA", "FINE DINING"].map((text, idx) => (
                <div key={idx} className="flex items-center mx-12">
                  <span className="text-[42px] font-heading italic text-white/10 uppercase">{text}</span>
                  <div className="w-2 h-2 bg-gold mx-12 rotate-45" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marquee-right mt-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center">
              {["7 DAYS OPEN", "MODERN EQUIPMENT", "PERSONAL TRAINING", "FAMILY LOUNGE", "PARKING AVAILABLE"].map((text, idx) => (
                <div key={idx} className="flex items-center mx-12">
                  <span className="text-[42px] font-heading italic text-gold/20 uppercase">{text}</span>
                  <div className="w-2 h-2 border border-gold/30 mx-12" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: STATS BAR */}
      <section className="py-24 px-6 border-b border-border bg-black">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "World-Class Facilities", value: 25, suffix: "+" },
            { label: "Elite Members", value: 500, suffix: "+" },
            { label: "Days Open Weekly", value: 7, suffix: "" },
            { label: "Established In Lahore", value: 2019, suffix: "" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="mb-4">
                <span className="gold-gradient-text font-heading text-6xl italic stat-value" data-value={stat.value}>
                  0{stat.suffix}
                </span>
              </div>
              <p className="text-[9px] tracking-eyebrow text-white-soft uppercase group-hover:text-gold transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ABOUT */}
      <section className="py-32 px-6 bg-dark overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="about-img-main w-full aspect-[4/5] bg-panel border border-border relative z-10 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop")' }}
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-80 bg-panel border border-border z-20 hidden md:block overflow-hidden">
               <div
                className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop")' }}
              />
            </div>
          </div>

          <div className="about-content">
            <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Established 2019</p>
            <h2 className="text-white font-heading italic mb-8" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
              Redefining <br /> Performance
            </h2>
            <div className="space-y-6 text-white-soft text-base max-w-xl mb-12">
              <p className="about-text">
                Shapes Community Club isn't just a gymnasium; it is a sanctuary for those who demand excellence in every facet of their lives. Located in the heart of Al-Rehman Garden Phase 2, we provide an unparalleled environment where elite fitness meets ultra-luxury lifestyle.
              </p>
              <p className="about-text">
                Our facilities are meticulously engineered to support the highest levels of athletic performance, featuring world-class equipment and personalized training programs tailored to your specific goals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Olympic Gear", "Private Trainers", "Aqua Zone",
                "Steam & Sauna", "Healthy Cafe", "Boxing Ring"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 py-4 border-b border-white/5">
                  <div className="w-1 h-1 bg-gold" />
                  <span className="text-[10px] tracking-widest uppercase text-white/60">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HORIZONTAL SCROLL GALLERY */}
      <section className="horizontal-gallery-wrapper relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center">
          <div className="horizontal-container flex gap-12 px-24 h-[70vh]">
            {[
              { title: "Olympic Gymnasium", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" },
              { title: "Aqua Zone & Spa", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075" },
              { title: "Boxing Arena", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069" },
              { title: "Cardio Loft", img: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085" },
              { title: "Elite Lounge", img: "https://images.unsplash.com/photo-1544117518-30df578096a8?q=80&w=2148" },
              { title: "Recovery Studio", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070" },
              { title: "Fine Dining", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" },
              { title: "Roof Court", img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070" },
            ].map((panel, i) => (
              <div key={i} className="flex-shrink-0 w-[600px] h-full relative group overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundImage: `url("${panel.img}")` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                <div className="absolute bottom-12 left-12">
                  <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-2">0{i + 1} / Facility</p>
                  <h3 className="text-white font-heading text-4xl italic">{panel.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: SERVICES GRID */}
      <section className="py-32 px-6 bg-black border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Our Ecosystem</p>
              <h2 className="text-white font-heading italic" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
                Elite Services
              </h2>
            </div>
            <p className="text-white-soft max-w-sm text-right">
              A comprehensive suite of luxury wellness services designed to optimize your physical and mental well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "I", title: "Gymnasium", desc: "High-performance training floor with customized gear." },
              { id: "II", title: "Aqua Zone", desc: "Temperature controlled pools and therapeutic recovery." },
              { id: "III", title: "Fine Dining", desc: "Nutrition-focused gourmet experiences for members." },
              { id: "IV", title: "Courts", desc: "Professional grade indoor and rooftop sports arenas." },
              { id: "V", title: "Family", desc: "Dedicated spaces for collective family wellness." },
              { id: "VI", title: "Lifestyle", desc: "Private lounges and concierge services for the elite." },
            ].map((service, i) => (
              <div key={i} className="group border border-border p-12 hover:bg-panel transition-all duration-500 relative overflow-hidden">
                <span className="gold-gradient-text font-heading text-4xl italic mb-12 block opacity-40">{service.id}</span>
                <h3 className="text-white font-heading text-3xl italic mb-6 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-white-soft leading-relaxed mb-8">{service.desc}</p>
                <div className="w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: EXPERIENCE ZONE */}
      <section className="py-32 px-6 bg-dark">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-12">
            {[
              { num: "01", title: "Personalized Assessment", desc: "Comprehensive physical and metabolic analysis." },
              { num: "02", title: "Elite Coaching", desc: "One-on-one sessions with certified masters." },
              { num: "03", title: "Nutritional Planning", desc: "Bespose meal plans from our culinary team." },
              { num: "04", title: "Recovery Protocol", desc: "Advanced physical therapy and spa treatments." },
            ].map((step, i) => (
              <div key={i} className="experience-step group flex gap-8 border-b border-white/5 pb-8 transition-all duration-500 hover:pl-8">
                <span className="text-gold font-heading text-2xl italic">{step.num}</span>
                <div>
                  <h3 className="text-white font-heading text-2xl italic mb-2 group-hover:text-gold transition-colors">{step.title}</h3>
                  <p className="text-white-soft">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2 relative group overflow-hidden">
             <div className="curtain-sweep absolute inset-0 bg-gold z-20 pointer-events-none" />
             <div className="aspect-square bg-panel border border-border overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544117518-30df578096a8?q=80&w=2148")' }}
                />
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PHOTO MOSAIC */}
      <section className="py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-6 mb-24">
          <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6 text-center">Visual Diary</p>
          <h2 className="text-white font-heading italic text-center" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
            The Member Experience
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0">
          {[
            { img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070", span: "col-span-2 row-span-2", title: "Strength" },
            { img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075", span: "col-span-1 row-span-1", title: "Focus" },
            { img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069", span: "col-span-1 row-span-2", title: "Power" },
            { img: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085", span: "col-span-2 row-span-1", title: "Endurance" },
            { img: "https://images.unsplash.com/photo-1544117518-30df578096a8?q=80&w=2148", span: "col-span-1 row-span-1", title: "Luxury" },
            { img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070", span: "col-span-1 row-span-1", title: "Recovery" },
            { img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070", span: "col-span-1 row-span-2", title: "Social" },
            { img: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070", span: "col-span-2 row-span-2", title: "Performance" },
            { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070", span: "col-span-1 row-span-1", title: "Growth" },
            { img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070", span: "col-span-1 row-span-1", title: "Elite" },
          ].map((item, i) => (
            <div key={i} className={`relative group overflow-hidden ${item.span} border border-white/5 aspect-square md:aspect-auto h-full min-h-[300px]`}>
              <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                style={{ backgroundImage: `url("${item.img}")` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
              <div className="absolute bottom-8 left-8 overflow-hidden">
                <p className="text-white font-heading text-2xl italic translate-y-full group-hover:translate-y-0 transition-transform duration-700">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: TIMINGS GRID */}
      <section className="py-32 px-6 bg-dark">
        <div className="container mx-auto">
          <div className="mb-24">
            <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Operational Hours</p>
            <h2 className="text-white font-heading italic" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
              Weekly Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 border border-border">
            {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day, i) => (
              <div key={i} className={`p-12 border border-border/50 text-center flex flex-col justify-between items-center group transition-colors ${day === "FRIDAY" ? "bg-gold/5" : "hover:bg-panel"}`}>
                <p className={`text-[10px] tracking-[0.3em] uppercase mb-12 ${day === "FRIDAY" ? "text-gold" : "text-white/40 group-hover:text-gold transition-colors"}`}>{day}</p>
                <div className="space-y-4">
                  <p className="text-white font-heading text-3xl italic">6AM</p>
                  <div className="w-[1px] h-8 bg-gold/30 mx-auto" />
                  <p className="text-white font-heading text-3xl italic">10PM</p>
                </div>
                {day === "FRIDAY" && (
                  <div className="mt-12 py-2 px-4 border border-gold text-gold text-[8px] tracking-widest uppercase">
                    Jummah Break: 1PM - 2PM
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: MEMBERSHIP TIERS */}
      <section className="py-32 px-6 bg-black border-y border-border">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Join The Elite</p>
            <h2 className="text-white font-heading italic" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
              Membership Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tier: "Essential",
                price: "15,000",
                features: ["Gymnasium Access", "Locker Room", "Standard Spa", "Basic Assessment"]
              },
              {
                tier: "Signature",
                price: "25,000",
                featured: true,
                features: ["All Essential Features", "Aqua Zone Access", "Group Classes", "Nutritional Guide", "Guest Passes"]
              },
              {
                tier: "Prestige",
                price: "45,000",
                features: ["All Signature Features", "Private Trainer (4/mo)", "VIP Lounge Access", "Fine Dining Credits", "Laundry Service"]
              }
            ].map((pkg, i) => (
              <div key={i} className={`p-12 border transition-all duration-500 flex flex-col h-full ${pkg.featured ? "border-gold bg-panel scale-105 z-10" : "border-border hover:border-gold/50 bg-dark"}`}>
                <p className={`text-[9px] tracking-eyebrow uppercase mb-8 ${pkg.featured ? "text-gold" : "text-white/40"}`}>{pkg.tier}</p>
                <div className="mb-12">
                  <span className="text-white font-heading text-5xl italic">PKR {pkg.price}</span>
                  <span className="text-white/40 text-sm ml-2">/ month</span>
                </div>
                <div className="space-y-6 mb-12 flex-grow">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-1 h-1 bg-gold" />
                      <span className="text-[11px] uppercase tracking-wider text-white-soft">{feat}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-5 text-[9px] tracking-nav uppercase font-bold transition-all clip-luxury ${pkg.featured ? "bg-gold text-black hover:bg-gold-light" : "border border-gold text-gold hover:bg-gold hover:text-black"}`}>
                  Apply For Membership
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: CONTACT MODULE */}
      <section className="py-32 px-6 bg-dark">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Contact Us</p>
            <h2 className="text-white font-heading italic mb-12" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>
              Start Your <br /> Journey
            </h2>

            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[9px] tracking-eyebrow text-gold uppercase mb-2">Call Us</p>
                  <p className="text-white text-xl font-heading italic">0304 111 6454</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[9px] tracking-eyebrow text-gold uppercase mb-2">Email Us</p>
                  <p className="text-white text-xl font-heading italic">concierge@shapesclub.pk</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[9px] tracking-eyebrow text-gold uppercase mb-2">Find Us</p>
                  <p className="text-white text-xl font-heading italic leading-relaxed">
                    Al-Rehman Garden Phase 2,<br />
                    Main Sharaqpur Road, Lahore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-panel p-12 border border-border">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[8px] tracking-[0.3em] uppercase text-white/40">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border py-4 text-white focus:border-gold outline-none transition-colors"
                  placeholder="ABDULLAH BIN FAISAL"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[8px] tracking-[0.3em] uppercase text-white/40">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border py-4 text-white focus:border-gold outline-none transition-colors"
                    placeholder="ABDULLAH@EXAMPLE.COM"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] tracking-[0.3em] uppercase text-white/40">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-border py-4 text-white focus:border-gold outline-none transition-colors"
                    placeholder="+92 300 0000000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] tracking-[0.3em] uppercase text-white/40">Membership Tier</label>
                <select className="w-full bg-transparent border-b border-border py-4 text-white focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                  <option className="bg-panel">ESSENTIAL TIERS</option>
                  <option className="bg-panel">SIGNATURE (FEATURED)</option>
                  <option className="bg-panel">PRESTIGE ELITE</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] tracking-[0.3em] uppercase text-white/40">Message</label>
                <textarea
                  rows="4"
                  className="w-full bg-transparent border-b border-border py-4 text-white focus:border-gold outline-none transition-colors resize-none"
                  placeholder="TELL US ABOUT YOUR FITNESS GOALS..."
                />
              </div>
              <button className="w-full bg-gold text-black py-6 text-[9px] tracking-nav uppercase font-bold hover:bg-gold-light transition-all clip-luxury mt-8">
                Request Invitation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 12: LOCATION PARALLAX BANNER */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center border-y border-border">
        <div
          className="absolute inset-0 z-0 bg-cover bg-fixed bg-center grayscale brightness-[0.3]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070")' }}
        />
        <div className="relative z-10 text-center">
          <p className="text-gold text-[9px] tracking-eyebrow uppercase mb-6">Our Location</p>
          <h2 className="text-white font-heading italic text-6xl mb-8">Al-Rehman Garden Phase 2</h2>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-gold group"
          >
            <span className="text-[10px] tracking-widest uppercase border-b border-gold/30 pb-1 group-hover:border-gold transition-all">Open In Google Maps</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* SECTION 13: FOOTER */}
      <footer className="py-24 px-6 bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-gold font-heading text-4xl italic block mb-8">Shapes.</span>
              <p className="text-white-soft leading-relaxed max-w-xs">
                The pinnacle of luxury fitness and community in Lahore. Join the elite.
              </p>
            </div>

            <div>
              <p className="text-white text-[9px] tracking-eyebrow uppercase mb-8">Quick Links</p>
              <ul className="space-y-4">
                {["Membership", "Facilities", "Services", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white-soft text-[11px] uppercase tracking-wider hover:text-gold transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-[9px] tracking-eyebrow uppercase mb-8">Social Connect</p>
              <div className="flex gap-6">
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            <div>
              <p className="text-white text-[9px] tracking-eyebrow uppercase mb-8">Newsletter</p>
              <div className="flex border-b border-border pb-2 group focus-within:border-gold transition-all">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="bg-transparent border-none outline-none text-[10px] w-full text-white placeholder:text-white/20"
                />
                <button className="text-gold px-2">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 text-[9px] tracking-widest uppercase">
              © 2024 SHAPES COMMUNITY CLUB. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-12">
              <a href="#" className="text-white/20 text-[9px] tracking-widest uppercase hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/20 text-[9px] tracking-widest uppercase hover:text-gold transition-colors">Terms of Service</a>
            </div>
            <p className="text-white/20 text-[9px] tracking-widest uppercase">
              DESIGNED BY THE ELITE AGENCY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
