"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { suggestTechTopics, SuggestTechTopicsOutput } from "@/ai/flows/suggest-tech-topics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, Loader2 } from "lucide-react";

const formSchema = z.object({
  discussionPace: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  numberOfSuggestions: z.coerce.number().min(1, "Must be at least 1").max(10, "Cannot be more than 10"),
  currentTopics: z.string().optional(),
});

export default function TopicSuggesterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestTechTopicsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discussionPace: 'Beginner',
      numberOfSuggestions: 5,
      currentTopics: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await suggestTechTopics(values);
      setResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="discussionPace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discussion Pace</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a pace" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfSuggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Suggestions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currentTopics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Topics (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Serverless, AI Ethics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Suggest Topics
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {result && (
            <div className="mt-6">
                <h3 className="font-headline text-lg font-semibold mb-3">Suggested Topics:</h3>
                <div className="flex flex-wrap gap-2">
                    {result.suggestedTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                            {topic}
                        </Badge>
                    ))}
                </div>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
