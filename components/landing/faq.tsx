import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";

export const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. There is no paid tier, no account, and no conversion limit. The app runs entirely in your browser, so there is nothing for us to meter.",
  },
  {
    q: "Do my documents get uploaded anywhere?",
    a: "No. Your Markdown is rendered and converted on your own device. There is no server that receives your content, and nothing is stored unless you opt in to local autosave in your own browser.",
  },
  {
    q: "How does the PDF download work?",
    a: "The page is paginated in your browser and handed to your browser's built-in 'Save as PDF'. That print step is what keeps everything on-device while still giving you selectable text and crisp diagrams.",
  },
  {
    q: "What does the HTML export give me?",
    a: "A single self-contained .html file with all styles, syntax colors, math, and diagrams embedded. It opens correctly offline with no external files.",
  },
  {
    q: "Which Markdown features are supported?",
    a: "GitHub Flavored Markdown, LaTeX math via KaTeX, Mermaid diagrams, fenced code with syntax highlighting, tables, task lists, and more.",
  },
  {
    q: "Does it work offline?",
    a: "Once the page has loaded, conversions do not need a network connection. Your exported HTML files are fully offline too.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Questions, answered.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <Accordion className="mt-10">
          {FAQS.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-white/10">
              <AccordionTrigger className="text-left text-base text-zinc-100 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-zinc-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
