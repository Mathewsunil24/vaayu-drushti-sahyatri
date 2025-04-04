
import React from 'react';
import { Gauge, MapPin, User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  const NavItems = () => (
    <>
      <Button variant="ghost" className="flex items-center gap-1">
        <Gauge size={18} />
        <span>Air Quality</span>
      </Button>
      <Button variant="ghost" className="flex items-center gap-1">
        <MapPin size={18} />
        <span>Routes</span>
      </Button>
      <Button variant="ghost" className="flex items-center gap-1">
        <User size={18} />
        <span>My Profile</span>
      </Button>
    </>
  );

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="text-2xl logo-text">वायु दृष्टि</div>
          <div className="ml-2 text-sm text-muted-foreground">Vaayu Drushti</div>
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-4">
            <NavItems />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
