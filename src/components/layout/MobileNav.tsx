import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SocialLinks } from "@/components/SocialLinks";
import { navItems, profile, type NavItemId } from "@/data/profile";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  activeId: NavItemId;
};

export function MobileNav({ activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md lg:hidden">
      <a href="#about" className="font-semibold tracking-tight text-foreground">
        {profile.name}
      </a>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Open menu" />
          }
        >
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(100%,20rem)]">
          <SheetHeader>
            <SheetTitle>Navigate</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <SheetClose
                  key={item.id}
                  render={
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 font-mono text-sm uppercase tracking-widest transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setOpen(false)}
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-border p-4">
            <SocialLinks showLabels />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
