import { useEffect, useState } from "react";
import { animate } from "animejs";
import { Home, User, Code2, Briefcase, GraduationCap, Award, Mail, Brain } from "lucide-react";

const navItems = [
  { id: "hero", icon: Home, label: "Inicio" },
  { id: "about", icon: User, label: "Sobre Mí" },
  { id: "skills", icon: Code2, label: "Habilidades" },
  { id: "ai-specialization", icon: Brain, label: "IA & Big Data" },
  { id: "experience", icon: Briefcase, label: "Experiencia" },
  { id: "education", icon: GraduationCap, label: "Educación" },
  { id: "achievements", icon: Award, label: "Logros" },
  { id: "contact", icon: Mail, label: "Contacto" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar navegación después de scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Detectar sección activa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-3 bg-card/80 backdrop-blur-lg border border-border/50 rounded-full p-3 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                group relative w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isActive 
                  ? "bg-primary text-primary-foreground scale-110" 
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
                }
              `}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-3 py-1 bg-card border border-border rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
