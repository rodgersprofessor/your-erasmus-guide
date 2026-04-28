import mentor from "@/assets/avatar-mentor.jpg";
import priya from "@/assets/avatar-priya.jpg";
import mateo from "@/assets/avatar-mateo.jpg";
import olena from "@/assets/avatar-olena.jpg";
import kwame from "@/assets/avatar-kwame.jpg";
import amira from "@/assets/avatar-amira.jpg";

export type Avatar = {
  id: string;
  name: string;
  role: string;
  origin: string;
  image: string;
  voice: string;
  greeting: string;
};

export const avatars: Avatar[] = [
  {
    id: "mentor",
    name: "Magister Aldwin",
    role: "Programme Director",
    origin: "Craiova",
    image: mentor,
    voice: "scholarly and warm",
    greeting:
      "Welcome, traveler. I oversee the Erasmus + Shakespeare programme. Ask me anything about its structure, partners, or purpose.",
  },
  {
    id: "priya",
    name: "Priya",
    role: "Performer · Symbolism Lab",
    origin: "India",
    image: priya,
    voice: "lyrical and symbolic",
    greeting:
      "Namaste. I bring the expressiveness of Indian tradition to Shakespeare. Ask about the workshops, the labs, or how cultures meet here.",
  },
  {
    id: "mateo",
    name: "Mateo",
    role: "Playwright · Emotional Intensity",
    origin: "Argentina",
    image: mateo,
    voice: "passionate and direct",
    greeting:
      "Hola. I write with the fire of the Argentine stage. Ask me about creative workshops or the collaborative projects we build over two months.",
  },
  {
    id: "olena",
    name: "Olena",
    role: "Set Designer · Depth & Atmosphere",
    origin: "Ukraine",
    image: olena,
    voice: "thoughtful and quiet",
    greeting:
      "Pryvit. I design spaces where Shakespeare breathes. Ask about the research labs, mentorship, or what makes Craiova our stage.",
  },
  {
    id: "kwame",
    name: "Kwame",
    role: "Performer · Community Energy",
    origin: "Africa",
    image: kwame,
    voice: "joyful and rhythmic",
    greeting:
      "Sannu! I bring drum, dance, and community to the festival. Ask me about life in Craiova or the festival team experience.",
  },
  {
    id: "amira",
    name: "Amira",
    role: "Street Artist · Contemporary Forms",
    origin: "Tunisia",
    image: amira,
    voice: "bold and contemporary",
    greeting:
      "Ahla. I take Shakespeare beyond the stage — to the walls and streets. Ask me about contemporary forms or how to apply.",
  },
];

export type QA = { q: string; a: (avatar: Avatar) => string };

export const sharedQuestions: QA[] = [
  {
    q: "What is the Erasmus + Shakespeare programme?",
    a: () =>
      "It is the festival's international platform for creation and research — developed by the University of Craiova in partnership with the Shakespeare Festival. Over 150 students from around 30 countries spend two months in Craiova in an intensive experience where Shakespeare becomes a starting point for contemporary dialogue.",
  },
  {
    q: "How long is the programme and where does it take place?",
    a: () =>
      "Two months in Craiova, Romania. Students live, create, and collaborate together — combining academic rigor with artistic freedom in workshops, labs, and shared projects.",
  },
  {
    q: "What activities are included?",
    a: () =>
      "Four pillars: Creative Workshops (acting, set design, playwriting, directing), Research Labs (interdisciplinary exploration of Shakespeare through contemporary lenses), Collaborative Projects (international teams making original work shown at the festival), and Professional Development (mentoring, networking, and joining the festival team).",
  },
  {
    q: "Who can participate?",
    a: (av) =>
      `Students from around the world — like me, from ${av.origin}. Around 150 participants from 30 countries are selected each edition. Most also become part of the festival team and contribute to its organization.`,
  },
  {
    q: "How is Shakespeare interpreted in the programme?",
    a: () =>
      "Through diverse cultural lenses: the symbolism of Indian traditions, the emotional intensity of Argentine perspectives, the depth of Ukrainian approaches, the energy of African community spirit, and the contemporary street-art creativity from Tunisia. Shakespeare becomes a universal language reinterpreted through many identities.",
  },
  {
    q: "When is the full programme announced?",
    a: () =>
      "The full programme for this section will be announced soon — stay tuned via the festival newsletter at shakespearefestival.online.",
  },
];
