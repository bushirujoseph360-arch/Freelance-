/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  CheckCircle2, 
  Users, 
  Award, 
  Mail, 
  Phone, 
  Video, 
  Cpu, 
  Layout, 
  Sparkles,
  ChevronRight,
  Globe,
  ExternalLink,
  HelpCircle,
  RotateCcw,
  Check,
  X
} from "lucide-react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  key?: React.Key;
}

const FadeIn = ({ children, delay = 0 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div className={`glass rounded-3xl p-6 h-full transition-all duration-300 hover:border-white/20 hover:bg-white/10 ${className}`}>
    {children}
  </div>
);

const ModuleQuiz = ({ quiz, moduleTitle }: { quiz: any, moduleTitle: string }) => {
  const [currentStep, setCurrentStep] = useState<'start' | 'question' | 'result'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const correct = index === quiz.correctIndex;
    setIsCorrect(correct);
    setTimeout(() => setCurrentStep('result'), 800);
  };

  const reset = () => {
    setCurrentStep('start');
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="mt-6 pt-6 border-t border-glass-border">
      <AnimatePresence mode="wait">
        {currentStep === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <HelpCircle className="w-6 h-6 text-accent opacity-50" />
            <div className="text-[10px] uppercase tracking-widest text-white/50">Testez vos connaissances</div>
            <button 
              onClick={() => setCurrentStep('question')}
              className="text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 transition-all"
            >
              Démarrer le Quiz
            </button>
          </motion.div>
        )}

        {currentStep === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-xs font-medium text-white/80 leading-relaxed">{quiz.question}</div>
            <div className="space-y-2">
              {quiz.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-3 text-[11px] border transition-all ${
                    selectedAnswer === i 
                      ? (i === quiz.correctIndex ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10')
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              {isCorrect ? (
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <X className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
            <div className="text-[11px] font-medium">
              {isCorrect ? "Félicitations ! C'est la bonne réponse." : "Dommage... Réessayez pour mieux comprendre."}
            </div>
            <button 
              onClick={reset}
              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-accent hover:underline"
            >
              <RotateCcw className="w-3 h-3" /> Recommencer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const COURSE_LINK = "https://www.superproductif.fr/c/creer-video-ia-sans-limite?mcp_token=eyJwaWQiOjIwNDAwNjksInNpZCI6MjY4MTA0NzM1LCJheCI6ImMyZDEyYTZjMzlhY2ViMTlkYzg3NjgwZjdmZDQ3MzY2IiwidHMiOjE3NzY1OTYxMjAsImV4cCI6MTc3OTAxNTMyMH0.hqvN6QeyOpZ9Ncrv1mhFmpmTZi5mUWU2igFBHHGfmhI&fbclid=PAT01DUARRlABleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafUGEpMIYIknCkHVn0dKiWQitjGFfy6xri9riMxpsCupJ5AeYQPh_5QlA9mHA_aem_uHwPHACPUmeSghiO4HlDxQ";

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLaunchCourse = () => {
    window.open(COURSE_LINK, "_blank");
  };

  const aiTools = [
    { name: "D-ID", url: "https://www.d-id.com/", desc: "Animation faciale IA" },
    { name: "InVideo", url: "https://invideo.io/", desc: "Éditeur vidéo IA complet" },
    { name: "Synthesia", url: "https://www.synthesia.io/", desc: "Avatars IA" },
    { name: "Runway", url: "https://runwayml.com/", desc: "Génération vidéo Gen-3" },
    { name: "Luma Labs", url: "https://lumalabs.ai/", desc: "Vidéos 3D réalistes" },
    { name: "Pika Art", url: "https://pika.art/", desc: "Animation créative" }
  ];

  const modules = [
    {
      title: "Module 1: Bases de l'IA",
      description: "Fondamentaux et écosystème de l'IA générative.",
      icon: <Cpu className="w-5 h-5 text-accent" />,
      resources: [
        { label: "Bien débuter avec l'IA (YouTube)", url: "https://www.youtube.com/watch?v=PXqMH75rQQ0" },
        { label: "Introduction (Coursera)", url: "https://translate.google.com/translate?u=https://www.coursera.org/courses?query%3Dgenerative%2Bai&hl=fr" },
        { label: "Support de formation (CodiMD)", url: "https://codimd.apps.education.fr/s/qV8kTGS5P" }
      ],
      quiz: {
        question: "Qu'est-ce qu'un LLM ?",
        options: ["Un modèle de langage à grande échelle", "Un logiciel de montage vidéo", "Une base de données SQL"],
        correctIndex: 0
      }
    },
    {
      title: "Module 2: IA & Montage",
      description: "Utilisation de D-ID pour animer vos personnages.",
      icon: <Video className="w-5 h-5 text-accent" />,
      resources: [
        { label: "IA Générative Vidéo (AfriCode)", url: "https://www.africode.tech/courses/les-ia-generatives-de-videos" },
        { label: "Parcours Animateur 2D (Tuto.com)", url: "https://fr.tuto.com/formation-animateur-2d.htm" }
      ],
      quiz: {
        question: "Quel outil est spécialisé dans l'animation faciale par IA ?",
        options: ["Spotify", "Excel", "D-ID"],
        correctIndex: 2
      }
    },
    {
      title: "Module 3: Outils Tiers",
      description: "Maîtrise de la suite InVideo et automatisation.",
      icon: <Layout className="w-5 h-5 text-accent" />,
      resources: [
        { label: "Master InVideo AI (Udemy)", url: "https://www.udemy.com/course/invideo-ai-transformez-vos-idees-en-videos-ia/" },
        { label: "Automatisation Vidéo (YouTube)", url: "https://www.youtube.com/watch?v=qy6iMi3Eiis" }
      ],
      quiz: {
        question: "À quoi sert principalement InVideo AI ?",
        options: ["Générer de la musique", "Créer des vidéos à partir de texte", "Retoucher des photos"],
        correctIndex: 1
      }
    },
    {
      title: "Module 4: Création Pro",
      description: "Workflow complet pour du contenu haute qualité.",
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      resources: [
        { label: "Masterclass Workflow (YouTube)", url: "https://www.youtube.com/watch?v=QbNanzoBkUw" },
        { label: "Stratégie de Contenu (Dawan)", url: "https://www.dawan.fr/formations/e-marketing/e-marketing-expert/creation-de-contenu-avec-l-intelligence-artificielle-ia-fondamentaux.pdf" },
        { label: "Plan d'action IA (Creactifs)", url: "https://creactifs.com/formations/creer-du-contenu-redactionnel-et-visuel-avec-l-ia/" }
      ],
      quiz: {
        question: "Qu'est-ce qu'un 'Workflow' en création de contenu ?",
        options: ["Une suite d'étapes organisées", "Un format de fichier", "Une marque de caméra"],
        correctIndex: 0
      }
    }
  ];

  return (
    <div className="min-h-screen background-immersive relative overflow-x-hidden">
      {/* 3-Column Interface */}
      <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[80px_1fr_320px] lg:gap-10 p-4 md:p-10 max-w-[1600px] mx-auto">
        
        {/* LEFT NAV RAIL */}
        <aside className="hidden lg:flex flex-col justify-between items-center py-6">
          <div className="w-12 h-12 border border-accent flex items-center justify-center font-display italic text-2xl text-accent cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Ai
          </div>
          <nav className="rail-text flex gap-10 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <button onClick={() => handleScroll('contact')} className="hover:text-accent transition-colors">Contact</button>
            <button onClick={() => handleScroll('tools')} className="hover:text-accent transition-colors">Outils</button>
            <button onClick={() => handleScroll('modules')} className="hover:text-accent transition-colors">Programme</button>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-accent">Accueil</button>
          </nav>
          <div className="w-4 h-4 rounded-full border border-white/20" />
        </aside>

        {/* MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center mb-10 px-4">
          <div className="text-2xl font-display italic text-accent border border-accent w-10 h-10 flex items-center justify-center">Ai</div>
          <div className="flex gap-4">
            <button onClick={() => handleScroll('modules')} className="text-[10px] uppercase tracking-widest text-white/60">Savoir plus</button>
            <button onClick={handleLaunchCourse} className="text-[10px] uppercase tracking-widest text-accent font-bold">Commencer</button>
          </div>
        </div>

        {/* MAIN SHOWCASE */}
        <main className="flex flex-col">
          <FadeIn>
            <div className="tag-accent mb-6">Formation Vidéo 2026</div>
            <h1 className="font-display text-6xl md:text-[92px] font-extralight leading-[1] mb-12 tracking-tight">
              L'ESSENCE <br />
              <span className="serif-italic block pl-12 md:pl-24 opacity-80 mt-2">DE L'IA</span>
            </h1>
            
            <div className="relative group overflow-hidden rounded-sm border border-glass-border aspect-video md:aspect-[21/9] mb-12 cursor-pointer" onClick={handleLaunchCourse}>
              <img 
                src="https://picsum.photos/seed/cinema/1200/600"
                alt="Cinema AI"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 right-6 text-[9px] uppercase tracking-widest opacity-30">FORMATION RECONSTITUÉE</div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-20 h-20 rounded-full glass flex items-center justify-center border-accent/20">
                    <Play className="w-8 h-8 text-accent ml-1 fill-accent" />
                 </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-white/50 border-l border-accent/30 pl-6">
                  Transformez votre vision créative par la puissance de l'IA générative. 
                  Exploitez les outils recommandés pour créer du contenu viral instantanément.
                </p>
                <div className="flex gap-4">
                   <button onClick={() => handleScroll('contact')} className="btn-accent py-3">S'inscrire</button>
                   <button onClick={handleLaunchCourse} className="text-[10px] uppercase tracking-widest border border-white/10 px-6 py-3 hover:bg-white/5 transition-colors">Détails de l'offre</button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Programme Académique</h3>
                {modules.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer" onClick={() => handleScroll('modules')}>
                    <div className="text-[10px] text-accent/40 font-mono">0{i+1}</div>
                    <div className="text-xs font-medium group-hover:text-accent transition-colors">{m.title}</div>
                    <div className="h-px flex-grow bg-glass-border opacity-20" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <section id="modules" className="grid md:grid-cols-2 gap-6 pb-12">
            {modules.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass p-8 rounded-sm hover:border-accent/40 transition-all group flex flex-col h-full">
                   <div className="mb-6">{m.icon}</div>
                   <h4 className="text-lg mb-2">{m.title}</h4>
                   <p className="text-xs text-white/40 leading-relaxed mb-6">{m.description}</p>
                   
                   <div className="mt-auto pt-4 border-t border-glass-border">
                     <div className="text-[9px] uppercase tracking-widest text-accent mb-4">Ressources</div>
                     <div className="space-y-2 mb-6">
                       {m.resources?.map((res, idx) => (
                         <a 
                           key={idx} 
                           href={res.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center justify-between text-[11px] text-white/60 hover:text-accent transition-colors group/res"
                         >
                           <span>{res.label}</span>
                           <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/res:opacity-100 transition-opacity" />
                         </a>
                       ))}
                     </div>
                     <ModuleQuiz quiz={m.quiz} moduleTitle={m.title} />
                   </div>
                </div>
              </FadeIn>
            ))}
          </section>

          {/* SHARED TOOLS SECTION */}
          <section id="tools" className="py-12 border-t border-glass-border">
            <FadeIn>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-10">Outils IA à Maîtriser</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {aiTools.map((tool, index) => (
                  <a 
                    key={index}
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass p-4 rounded-sm flex flex-col gap-2 hover:bg-white/5 hover:border-accent/30 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm tracking-tight">{tool.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </div>
                    <span className="text-[10px] text-white/40">{tool.desc}</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </section>
        </main>

        {/* SIDEBAR RIGHT */}
        <aside className="flex flex-col gap-6 lg:justify-end pb-10">
          <FadeIn delay={0.3}>
            <div className="glass p-8 rounded-sm space-y-8">
               <div className="space-y-4">
                 <div className="text-[9px] uppercase tracking-widest text-accent">Détails du Cours</div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 className="w-3 h-3 text-accent" />
                       <span className="text-xs text-white/80">Accès Illimité • 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Award className="w-3 h-3 text-accent" />
                       <span className="text-xs text-white/80">Certification incluse</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Users className="w-3 h-3 text-accent" />
                       <span className="text-xs text-white/80">Support Communautaire</span>
                    </div>
                 </div>
               </div>

               <div id="contact" className="space-y-4 pt-6 border-t border-glass-border">
                 <div className="text-[9px] uppercase tracking-widest text-accent">Contact & Paiement</div>
                 <div className="space-y-4">
                    <div className="group cursor-pointer" onClick={() => window.location.href='mailto:bushirujoseph360@gmail.com'}>
                      <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">Email</div>
                      <div className="text-xs font-medium group-hover:text-accent transition-colors">bushirujoseph360@gmail.com</div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">Téléphone</div>
                      <div className="text-xs font-medium group-hover:text-accent transition-colors">0803359109</div>
                    </div>
                 </div>
               </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] uppercase tracking-widest text-white/40">Tarif Unique</span>
                 <span className="text-2xl font-display italic text-accent">10,000 FC</span>
              </div>
              <button 
                onClick={handleLaunchCourse} 
                className="btn-accent w-full flex items-center justify-center gap-2 group"
              >
                Lancer le cours
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </FadeIn>
        </aside>
      </div>

      <footer className="p-10 border-t border-glass-border flex flex-col items-center gap-6">
         <div className="text-[10px] uppercase tracking-[0.3em] opacity-30">AI Course • Joseph Kanyenye • 2026</div>
         <div className="flex gap-10 text-[9px] uppercase tracking-widest opacity-20">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Youtube</a>
            <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
         </div>
      </footer>
    </div>
  );
}
