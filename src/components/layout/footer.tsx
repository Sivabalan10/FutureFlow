import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
             <Rocket className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">FutureFlow</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FutureFlow. Let's drive our vehicle to the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
