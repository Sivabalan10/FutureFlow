import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Code, Users, Rocket, HelpCircle, Presentation } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Weekly Tech Talks",
    description: "Discuss new and emerging technologies every week, either online or offline.",
  },
  {
    icon: <HelpCircle className="w-8 h-8 text-primary" />,
    title: "High-Tech Helpdesk",
    description: "A space to ask any doubts, get clarifications, and solve complex problems together.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Explore Innovation",
    description: "Dive deep into true innovation and the logic behind cutting-edge technologies.",
  },
  {
    icon: <Presentation className="w-8 h-8 text-primary" />,
    title: "Project Showcase",
    description: "Present your projects in a safe space with no fear of idea theft or criticism.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Peer Learning",
    description: "It's all about collaborative learning to uplift ourselves in the fast-paced tech world.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Open Contribution",
    description: "Everyone can contribute to our shared knowledge repository. We are all co-owners.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why FutureFlow?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Technology is growing faster than we think. Let's upgrade ourselves together.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
