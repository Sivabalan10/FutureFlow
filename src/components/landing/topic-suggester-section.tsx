import TopicSuggesterForm from "./topic-suggester-form";

export default function TopicSuggesterSection() {
    return (
        <section id="suggest" className="w-full py-16 md:py-24 bg-secondary">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Need Topic Ideas?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Use our AI assistant to generate tech topic suggestions tailored to your desired discussion pace.
                    </p>
                </div>

                <TopicSuggesterForm />
            </div>
        </section>
    );
}
