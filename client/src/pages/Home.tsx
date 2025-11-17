// Declaración global para window.__badgeDelay
declare global {
  interface Window {
    __badgeDelay?: number;
  }
}
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, Code2, Briefcase, GraduationCap, Award, ChevronDown, Brain, Database, Cpu, TrendingUp, Network, Cloud } from "lucide-react";
import { Smartphone } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [badgeDelay, setBadgeDelay] = useState(50);

  useEffect(() => {
    // Animación inicial del hero
    if (heroRef.current) {
      animate(heroRef.current.querySelectorAll('.hero-text'), {
        translateY: [50, 0],
        opacity: [0, 1],
  duration: 300,
        delay: stagger(150),
        easing: 'easeOutExpo'
      });

      const heroCta = heroRef.current.querySelector('.hero-cta');
      if (heroCta) {
        animate(heroCta, {
          scale: [0.8, 1],
          opacity: [0, 1],
    duration: 300,
          delay: 600,
          easing: 'easeOutElastic(1, .8)'
        });
      }
    }

    // Animaciones de scroll reveal para secciones con velocidad dinámica
    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();

    function getScrollSpeed() {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const deltaT = now - lastTimestamp;
      lastScrollY = window.scrollY;
      lastTimestamp = now;
      // px/ms
      return deltaY / (deltaT || 1);
    }

  // Inicializar delay
  setBadgeDelay(50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calcula velocidad de scroll y ajusta duración
            const speed = getScrollSpeed();
            // Si speed > 1.5 px/ms, animación muy rápida (50ms), si normal (150ms), si lento (300ms)
            const duration = speed > 1.5 ? 50 : speed > 0.5 ? 150 : 300;
            // Ajustar el delay de los badges: muy rápido (5ms), rápido (10ms), normal (30ms)
            setBadgeDelay(speed > 1.5 ? 5 : speed > 0.5 ? 10 : 30);
            animate(entry.target.querySelectorAll('.animate-item'), {
              translateY: [30, 0],
              opacity: [0, 1],
              duration,
              delay: stagger(50),
              easing: 'easeOutQuad'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    // Frontend
    "React", "NextJS", "TypeScript", "JavaScript", "Tailwind CSS",
    // Backend
    "Node.js", "NestJS", "Express",
    // Databases
    "SQL", "MongoDB", "PostgreSQL",
    // Mobile
    "Kotlin", "React Native",
    // Other Languages
    "C#", "PHP", "Python",
    // AI & ML
    "TensorFlow", "PyTorch", "Keras", "scikit-learn",
    // Big Data
    "Apache Spark", "Hadoop", "Kafka",
    // Data Analysis
    "Pandas", "NumPy", "Matplotlib", "Seaborn",
    // Cloud
    "AWS", "GCP", "Azure",
    // Tools
    "Git", "Docker", "Vite", "REST API", "GraphQL"
  ];

  const experience = [
    {
      title: "Prácticas de Empresa",
      company: "BamBam Marketing",
      location: "Granada",
      period: "03/2025 - 06/2025",
      description: "Diseño, organización y ejecución de las estrategias web de la empresa"
    },
    {
      title: "Prácticas de empresa",
      company: "EsMovil",
      location: "Granada",
      period: "03/2024 - 06/2024",
      description: "Desarrollo CRM de la empresa con Python"
    },
    {
      title: "Gerente",
      company: "Ilusion Sport",
      location: "Granada",
      period: "07/2024 - 08/2024",
      description: "Gestión de actividades y reservas del Club"
    },
    {
      title: "Camarero",
      company: "Feria San Agustín",
      location: "Linares",
      period: "08/2024",
      description: ""
    }
  ];

  const education = [
    {
      title: "Desarrollador de Aplicaciones Multiplataforma",
      institution: "Escuela Internacional de Gerencia",
      location: "Granada",
      period: "09/2024 - 06/2025"
    },
    {
      title: "Desarrollador de Aplicaciones Web",
      institution: "Escuela Internacional de Gerencia",
      location: "Granada",
      period: "09/2023 - 06/2024"
    },
    {
    title: "Especialización en IA y Big Data",
    institution: "I.E.S Oretania",
    location: "Linares, Jaén",
    period: "Septiembre 2024 - Junio 2025",
    }
  ];

  const aiSpecialization = {
    title: "Especialización en IA y Big Data",
    institution: "I.E.S Oretania",
    period: "Septiembre 2024 - Junio 2025",
    areas: [
      { icon: <Brain className="w-6 h-6" />, name: "Machine Learning", color: "primary" },
      { icon: <Network className="w-6 h-6" />, name: "Deep Learning", color: "accent" },
      { icon: <Code2 className="w-6 h-6" />, name: "NLP", color: "primary" },
      { icon: <Cpu className="w-6 h-6" />, name: "Computer Vision", color: "accent" },
      { icon: <Database className="w-6 h-6" />, name: "Data Engineering", color: "primary" },
      { icon: <Cloud className="w-6 h-6" />, name: "Cloud Computing", color: "accent" }
    ],
    technologies: {
      languages: ["Python", "SQL"],
      mlDl: ["TensorFlow", "PyTorch", "Keras", "scikit-learn"],
      bigData: ["Apache Spark", "Hadoop", "Kafka", "Airflow"],
      analysis: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
      databases: ["MongoDB", "Cassandra"],
      cloud: ["AWS", "GCP", "Azure"]
    }
  };

  const achievements = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Conocimientos importantes",
      description: "Finalicé dos ciclos formativos superiores en Desarrollo Web y Aplicaciones Multiplataforma, adquiriendo una sólida base en programación, diseño de interfaces, bases de datos y despliegue de aplicaciones."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Proyecto Técnico Relevante",
      description: "Creación de una aplicación móvil completa como proyecto final, integrando frontend con React Native y backend con Node.js, incluyendo autenticación, gestión de usuarios y conexión a base de datos."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Comprometido con el aprendizaje constante",
      description: "Actualmente cursando especialización en IA y Big Data para ampliar mi perfil profesional hacia tecnologías emergentes."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Trabajo en Equipo y Comunicación",
      description: "Participé en proyectos colaborativos durante la formación, aplicando metodologías ágiles como Scrum y mejorando mis habilidades de comunicación y resolución de problemas."
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <FloatingNav />
      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.12 0.015 250) 0%, oklch(0.15 0.025 260) 50%, oklch(0.12 0.015 250) 100%)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <ParticlesBackground />
        </div>

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="hero-text text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent opacity-0">
              PEDRO LUÍS<br />RODRÍGUEZ FLORES
            </h1>
            <p className="hero-text text-2xl md:text-3xl text-muted-foreground opacity-0">
              Desarrollador Multiplataforma & Full Stack ESPECIALIZADO en IA y Big Data
            </p>
            <p className="hero-text text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto opacity-0">
              Graduado en Desarrollo Web y Multiplataforma, con conocimientos en variados lenguajes de programación. Me apasiona la tecnología y estoy motivado por crecer profesionalmente y aportar valor en equipos dinámicos e innovadores.
            </p>
            <div className="hero-cta flex flex-wrap gap-4 justify-center opacity-0">
              <Button
                size="lg"
                className="group"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Contactar
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('experience')}
              >
                Ver Experiencia
              </Button>
            </div>
            <div className="hero-text opacity-0 mt-12">
              <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={(el) => { sectionsRef.current[0] = el; }}
        id="about"
        className="py-24 bg-background"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Sobre Mí
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="animate-item p-8 bg-card/50 backdrop-blur border-border/50 opacity-0">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Desarrollando la buena vibra <a role="img" aria-label="onda">🌊</a>
                    </h3>
                    <p className="text-muted-foreground">
                      Siempre me ha gustado el voleibol, y ahora , el padel, ademas siempre difruto jugar a cualquier pokemon.
                      Actualmente, estoy enfocado en desarrollar mis habilidades técnicas mientras disfruto de la vida fuera de la pantalla. Mi objetivo es contribuir a proyectos innovadores que combinen desarrollo de software con soluciones de inteligencia artificial.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="font-medium">Linares, Jaén</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Idiomas</p>
                    <p className="font-medium">Español (Nativo), Inglés (B1)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={(el) => { sectionsRef.current[1] = el; }}
        id="skills"
        className="py-24 bg-card/30"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Habilidades Técnicas
          </h2>
          <div className="max-w-6xl mx-auto">
            {/* Frontend */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Code2 className="w-6 h-6 text-primary" />
                Frontend
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["React", "NextJS", "TypeScript", "JavaScript", "Tailwind CSS"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * badgeDelay}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Code2 className="w-6 h-6 text-accent" />
                Backend
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["Node.js", "NestJS", "Express", "REST API", "GraphQL"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * badgeDelay}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Database className="w-6 h-6 text-primary" />
                Bases de Datos
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["SQL", "PostgreSQL", "MongoDB", "Cassandra"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * badgeDelay}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Code2 className="w-6 h-6 text-accent" />
                Lenguajes de Programación
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["Python", "JavaScript", "TypeScript", "Kotlin", "C#", "PHP", "Java"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * badgeDelay}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Brain className="w-6 h-6 text-primary" />
                Machine Learning & Deep Learning
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["TensorFlow", "PyTorch", "Keras", "scikit-learn", "XGBoost", "NLTK"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Big Data 
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Database className="w-6 h-6 text-accent" />
                Big Data & Processing
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["Apache Spark", "Hadoop", "Airflow", "Hive", "Flink"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div> */}

              {/* Full Stack Development */}
              <div className="mb-12">
                <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                  <Cpu className="w-6 h-6 text-primary" />
                  Full Stack Development
                </h3>
                <div className="flex flex-wrap gap-3 justify-start">
                  {["React + Node.js", "Next.js Full Stack", "MERN Stack", "MVC Architecture", "Microservicios"].map((skill, index) => (
                    <Badge
                      key={skill}
                      className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Android Development */}
              <div className="mb-12">
                <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                  <Smartphone className="w-6 h-6 text-accent" />
                  Desarrollo Android
                </h3>
                <div className="flex flex-wrap gap-3 justify-start">
                  {["Kotlin", "Java", "Android Studio", "Jetpack Compose", "Material Design", "Firebase", "Room Database"].map((skill, index) => (
                    <Badge
                      key={skill}
                      className="animate-item text-sm px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/50 transition-all cursor-pointer opacity-0"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <TrendingUp className="w-6 h-6 text-primary" />
                Análisis de Datos
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Jupyter"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Cloud className="w-6 h-6 text-accent" />
                Cloud & DevOps
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["AWS", "GCP", "Azure", "Docker", "GitHub Actions"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="mb-12">
              <h3 className="animate-item text-2xl font-semibold mb-6 flex items-center gap-3 opacity-0">
                <Cpu className="w-6 h-6 text-primary" />
                Herramientas & Otros
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {["Git", "Linux", "Postman", "Figma", "Jira", "Scrum", "Agile", "CI/CD"].map((skill, index) => (
                  <Badge
                    key={skill}
                    className="animate-item text-sm px-4 py-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all cursor-pointer opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Big Data Specialization Section */}
      <section
        ref={(el) => { sectionsRef.current[2] = el; }}
        id="ai-specialization"
        className="py-24 bg-background relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="animate-item inline-flex items-center gap-3 mb-6 opacity-0">
              <Brain className="w-12 h-12 text-primary" />
              <Database className="w-12 h-12 text-accent" />
              <Cpu className="w-12 h-12 text-primary" />
            </div>
            <h2 className="animate-item text-4xl md:text-6xl font-bold mb-4 opacity-0">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {aiSpecialization.title}
              </span>
            </h2>
            <p className="animate-item text-xl text-accent font-semibold opacity-0">{aiSpecialization.institution}</p>
            <p className="animate-item text-muted-foreground opacity-0">{aiSpecialization.period}</p>
          </div>

          {/* Areas de conocimiento */}
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="animate-item text-2xl font-bold text-center mb-8 opacity-0">Áreas de Conocimiento</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aiSpecialization.areas.map((area, index) => (
                <Card
                  key={area.name}
                  className={`animate-item p-6 text-center bg-card/50 backdrop-blur border-border/50 hover:border-${area.color}/50 hover:shadow-lg hover:shadow-${area.color}/20 hover:scale-105 transition-all group opacity-0`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${area.color}/20 flex items-center justify-center group-hover:bg-${area.color}/30 transition-colors`}>
                    <div className={`text-${area.color}`}>{area.icon}</div>
                  </div>
                  <h4 className="font-semibold text-foreground">{area.name}</h4>
                </Card>
              ))}
            </div>
          </div>

          {/* (Tecnologías y Herramientas removed) */}
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={(el) => { sectionsRef.current[3] = el; }}
        id="experience"
        className="py-24 bg-card/30"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Experiencia
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {experience.map((exp, index) => (
              <Card
                key={index}
                className="animate-item p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all opacity-0"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    {exp.description && (
                      <p className="text-muted-foreground mt-2">{exp.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        ref={(el) => { sectionsRef.current[4] = el; }}
        id="education"
        className="py-24 bg-background"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Educación
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="animate-item p-6 bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02] transition-all opacity-0"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{edu.title}</h3>
                    <p className="text-accent font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mt-1">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        ref={(el) => { sectionsRef.current[5] = el; }}
        id="achievements"
        className="py-24 bg-card/30"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Logros
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="animate-item p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all group opacity-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <div className="text-primary">{achievement.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={(el) => { sectionsRef.current[6] = el; }}
        id="contact"
        className="py-24 bg-card/30"
      >
        <div className="container">
          <h2 className="animate-item text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            Contacto
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="animate-item p-8 bg-card/50 backdrop-blur border-border/50 opacity-0">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <p className="text-lg text-muted-foreground">
                    ¿Interesado en trabajar juntos? ¡Hablemos!
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:eonblue.dev@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">eonblue.dev@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pedrl-rf01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">linkedin.com/in/pedrl-rf01</p>
                    </div>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © 2025 Pedro Luís Rodríguez Flores. Desarrollador Full Stack.
          </p>
        </div>
      </footer>
    </div>
  );
}


// Hook para gestionar SEO dinámico