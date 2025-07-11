// This file is generated by Firebase Genkit.
'use server';

/**
 * @fileOverview A tech topic suggestion AI agent.
 *
 * - suggestTechTopics - A function that suggests relevant tech topics for discussion.
 * - SuggestTechTopicsInput - The input type for the suggestTechTopics function.
 * - SuggestTechTopicsOutput - The return type for the suggestTechTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTechTopicsInputSchema = z.object({
  discussionPace: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The desired pace of the discussion (Beginner, Intermediate, or Advanced).'),
  currentTopics: z.string().optional().describe('The current topics being discussed.'),
  numberOfSuggestions: z.number().describe('The number of topic suggestions to provide.'),
});
export type SuggestTechTopicsInput = z.infer<typeof SuggestTechTopicsInputSchema>;

const SuggestTechTopicsOutputSchema = z.object({
  suggestedTopics: z.array(z.string()).describe('An array of suggested tech topics.'),
});
export type SuggestTechTopicsOutput = z.infer<typeof SuggestTechTopicsOutputSchema>;

export async function suggestTechTopics(input: SuggestTechTopicsInput): Promise<SuggestTechTopicsOutput> {
  return suggestTechTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTechTopicsPrompt',
  input: {schema: SuggestTechTopicsInputSchema},
  output: {schema: SuggestTechTopicsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant tech topics for discussion based on the specified pace.

  Pace: {{{discussionPace}}}
  Number of suggestions: {{{numberOfSuggestions}}}

  {{#if currentTopics}}
  Consider that the following topics are being discussed: {{{currentTopics}}}
  {{/if}}

  Suggest {{{numberOfSuggestions}}} tech topics that align with the specified pace. Return an array of strings.
  `,
});

const suggestTechTopicsFlow = ai.defineFlow(
  {
    name: 'suggestTechTopicsFlow',
    inputSchema: SuggestTechTopicsInputSchema,
    outputSchema: SuggestTechTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
