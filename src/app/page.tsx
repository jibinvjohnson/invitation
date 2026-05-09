"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Search,
  Menu,
  Heart,
  MessageCircle,
  Globe,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DataService } from "@/lib/data-service";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [trendingTemplates, setTrendingTemplates] = useState<any[]>([]);
  const [featuredTemplates, setFeaturedTemplates] = useState<any[]>([]);
  const [premiumTemplates, setPremiumTemplates] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, featured, trending, premium, fresh] = await Promise.all([
          DataService.getCategories(supabase),
          DataService.getTemplates(supabase, { featured: true, limit: 3 }),
          DataService.getTemplates(supabase, { trending: true, limit: 6 }),
          DataService.getTemplates(supabase, { premium: true, limit: 6 }),
          DataService.getTemplates(supabase, { limit: 6 }) // New Arrivals
        ]);

        setCategories(cats);
        setFeaturedTemplates(featured);
        setTrendingTemplates(trending);
        setPremiumTemplates(premium);
        setNewArrivals(fresh);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    DataService.seedIfEmpty(supabase);
  }, [supabase]);

  return (
    <div className="relative min-h-screen bg-[#fdfbf7] overflow-hidden selection:bg-gold-200 selection:text-gold-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">I</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                Invite<span className="text-gold-600">Nest</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#templates" className="text-sm font-medium text-stone-600 hover:text-gold-600 transition-colors">Templates</a>
              <a href="#categories" className="text-sm font-medium text-stone-600 hover:text-gold-600 transition-colors">Categories</a>
              <a href="#testimonials" className="text-sm font-medium text-stone-600 hover:text-gold-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-sm font-medium text-stone-600 hover:text-gold-600 transition-colors">FAQ</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-stone-600 hover:text-gold-600 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-sm font-medium text-stone-800 hover:text-gold-600 transition-colors">Log in</button>
              <button className="bg-stone-900 hover:bg-gold-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-stone-900/20">
                Get Started
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gold-100/50 blur-[120px]" />
            <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-stone-200/50 blur-[100px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="flex-1 text-center lg:text-left"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gold-200 bg-gold-50/50 text-gold-700 text-sm font-medium tracking-wide">
                  ✨ The New Standard in Digital Invites
                </motion.div>
                <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-6">
                  Set the perfect tone for your <span className="gold-gradient-text italic">special day</span>
                </motion.h1>
                <motion.p variants={fadeIn} className="text-lg lg:text-xl text-stone-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Design, send, and track stunning digital invitations that feel as premium as paper. Beautifully crafted for life's most important moments.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button className="w-full sm:w-auto px-8 py-4 bg-stone-900 hover:bg-gold-600 text-white rounded-full text-base font-medium transition-all duration-300 shadow-xl shadow-stone-900/20 flex items-center justify-center gap-2 group">
                    Browse Templates
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 rounded-full text-base font-medium transition-all duration-300">
                    View Demo
                  </button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto"
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card p-4 shadow-2xl">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/hero.png"
                      alt="Luxury Wedding Invitation"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Floating elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -right-6 top-1/4 glass-card p-4 rounded-2xl flex items-center gap-3 shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Star className="text-green-600" size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">4.9/5</p>
                      <p className="text-xs text-stone-500">2k+ Reviews</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Templates */}
        <section id="templates" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">Featured Collections</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">Discover our most loved designs, handcrafted by top typography experts and digital artists.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTemplates.length > 0 ? featuredTemplates.map((template: any, idx: number) => (
                <Link href={`/templates/${template.id}`} key={template.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                      <Image
                        src={template.image_url}
                        alt={template.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {template.is_premium && (
                        <div className="absolute top-4 left-4 bg-gold-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
                          Premium
                        </div>
                      )}
                      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                        <Heart size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-gold-600 transition-colors">{template.title}</h3>
                        <p className="text-sm text-stone-500 mt-1">{template.categories?.name}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )) : (
                <div className="col-span-3 text-center py-12 text-stone-500">Loading premium templates...</div>
              )}
            </div>
            
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 text-gold-700 font-medium hover:text-gold-900 transition-colors border-b border-gold-200 hover:border-gold-900 pb-1">
                View all templates <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
            >
              <div>
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">Shop by Category</h2>
                <p className="text-stone-600">Find the perfect design for your specific celebration.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {categories.length > 0 ? categories.map((cat: any, idx: number) => (
                <Link href={`/categories/${cat.slug}`} key={cat.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-gold-900/5 transition-all duration-300 cursor-pointer border border-stone-100 group hover:-translate-y-1 h-full"
                  >
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{cat.icon || '✨'}</div>
                    <h3 className="font-medium text-stone-900 text-sm">{cat.name}</h3>
                  </motion.div>
                </Link>
              )) : (
                <div className="col-span-full text-center py-8 text-stone-500">Loading categories...</div>
              )}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="lg:w-1/3"
              >
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-900 mb-6">Trending Now</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  Explore our most popular designs this week. From minimalist elegance to rich cultural aesthetics, these templates are setting the standard for modern celebrations.
                </p>
                <button className="px-6 py-3 bg-stone-900 hover:bg-gold-600 text-white rounded-full font-medium transition-all duration-300">
                  Explore Trending
                </button>
              </motion.div>

              <div className="lg:w-2/3 flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                {trendingTemplates.length > 0 ? trendingTemplates.map((item: any, idx: number) => (
                  <Link href={`/templates/${item.id}`} key={item.id}>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="min-w-[280px] sm:min-w-[320px] snap-center cursor-pointer group"
                    >
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                        <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        {item.is_premium && (
                          <div className="absolute top-4 left-4 bg-gold-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
                            Premium
                          </div>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-gold-600 transition-colors">{item.title}</h3>
                      <p className="text-stone-500 text-sm">{item.categories?.name}</p>
                    </motion.div>
                  </Link>
                )) : (
                  <div className="text-stone-500 py-12">Loading trending designs...</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features / Value Prop */}
        <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-4">More than just an invite</h2>
              <p className="text-stone-400 max-w-2xl mx-auto">A complete suite of tools to manage your event effortlessly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { title: "RSVP Tracking", desc: "Real-time updates when guests respond, complete with meal preferences and plus-ones." },
                { title: "Smart Reminders", desc: "Automated, polite reminders sent to guests who haven't responded yet." },
                { title: "Guest Messaging", desc: "Broadcast updates or message guests individually directly from your dashboard." }
              ].map((feature: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                    <Star className="text-gold-400" size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Templates Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">Premium Exclusives</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">The absolute pinnacle of digital invitation design.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumTemplates.length > 0 ? premiumTemplates.map((template: any, idx: number) => (
                <Link href={`/templates/${template.id}`} key={template.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-stone-100 border-2 border-gold-200">
                      <Image src={template.image_url} alt={template.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-gold-600 text-white px-3 py-1 text-xs rounded-full font-semibold shadow-md">Premium Exclusives</div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-gold-600 transition-colors">{template.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{template.categories?.name} • ₹{template.price}</p>
                  </motion.div>
                </Link>
              )) : (
                <div className="col-span-3 text-center py-12 text-stone-500">Loading premium templates...</div>
              )}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-24 bg-stone-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-2">New Arrivals</h2>
                <p className="text-stone-600">Freshly added templates to make your event stand out.</p>
              </div>
              <Link href="/templates" className="hidden md:inline-flex items-center gap-2 text-stone-900 font-medium hover:text-gold-600 transition-colors">
                View all <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {newArrivals.length > 0 ? newArrivals.map((template: any, idx: number) => (
                <Link href={`/templates/${template.id}`} key={template.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-stone-100">
                      <Image src={template.image_url} alt={template.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      {template.is_premium && (
                        <div className="absolute top-2 left-2 bg-gold-600 text-white px-2 py-0.5 text-[10px] rounded-full font-semibold shadow-md">
                          Premium
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-stone-900 truncate group-hover:text-gold-600 transition-colors">{template.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 truncate">{template.categories?.name}</p>
                  </motion.div>
                </Link>
              )) : (
                <div className="col-span-full text-center py-12 text-stone-500">Loading new arrivals...</div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-[#fdfbf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-900 mb-4">Loved by hosts</h2>
              <p className="text-stone-600">Join thousands of happy couples and event planners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah & James", event: "Wedding", text: "The templates are breathtaking. We saved hundreds of dollars on paper invites, and our guests couldn't stop complementing the design!" },
                { name: "Priya M.", event: "Engagement", text: "InviteNest made RSVP tracking so easy. The design perfectly matched our aesthetic and it felt incredibly premium." },
                { name: "Elena R.", event: "Baby Shower", text: "I've never used a digital invite platform that felt this luxurious. The animations when opening the invite are just magical." }
              ].map((review: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 relative"
                >
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-gold-400" fill="currentColor" />)}
                  </div>
                  <p className="text-stone-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                  <div>
                    <p className="font-semibold text-stone-900">{review.name}</p>
                    <p className="text-sm text-stone-500">{review.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-4">Common Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: "How does the RSVP tracking work?", a: "Guests receive a unique link. When they respond, your dashboard instantly updates with their status, meal choices, and any custom questions you've asked." },
                { q: "Can I customize the typography and colors?", a: "Yes! Every template is fully customizable. You can change fonts, colors, add your own photos, and adjust the layout to match your exact vision." },
                { q: "Do my guests need to download an app?", a: "Not at all. The invitations open beautifully in any mobile or desktop web browser, providing a seamless experience for all your guests." }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-stone-200 pb-6">
                  <h3 className="text-lg font-medium text-stone-900 mb-2">{faq.q}</h3>
                  <p className="text-stone-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">I</span>
                </div>
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  Invite<span className="text-gold-600">Nest</span>
                </span>
              </div>
              <p className="text-sm mb-6 max-w-xs">Elevating digital invitations with premium design and seamless technology.</p>
              <div className="flex gap-4">
                <MessageCircle size={20} className="hover:text-gold-400 cursor-pointer transition-colors" />
                <Mail size={20} className="hover:text-gold-400 cursor-pointer transition-colors" />
                <Globe size={20} className="hover:text-gold-400 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Templates</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition-colors">Weddings</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Birthdays</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Baby Showers</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Corporate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gold-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} InviteNest Inc. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed with ❤️ for special moments.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
