import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-400/[0.05]"></div>
      <div className="container max-w-7xl mx-auto px-4 text-center relative">
        <div className="bg-primary/10 rounded-full px-4 py-1.5 mb-4 inline-block">
            <p className="text-sm font-medium text-primary">
                Exploring the True Innovation and Logic
            </p>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Let's Drive Our Vehicle <br />
          <span className="text-primary">to the Future</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
          Join a community of peer learners to explore emerging technologies, solve high-tech problems, and upgrade ourselves one week at a time. No competition, just collaboration.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="#events">Register for Event</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
