
import React from 'react';
import { ExternalLink, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col gap-4 md:h-16 md:flex-row md:items-center">
        <p className="text-sm text-muted-foreground md:order-1 md:ml-auto">
          <span className="logo-text">वायु दृष्टि</span> | © {new Date().getFullYear()} Vaayu Drushti
        </p>
        <div className="flex items-center gap-4 md:order-2">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink size={14} /> API
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <Github size={14} /> Source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
