import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "create Kids story on description for 5-8 years Kids, Educacional story, and all imagens in paper cut style: story of boy and Magic school, give me 5 chapter, With detailed image text promt for each of chapter and image prompt for story cover book with story name, all in Json field format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"story_name\": \"The Boy Who Went to Magic School\",\n  \"cover_image\": {\n    \"description\": \"A paper cut style illustration of a boy with bright eyes and a mischievous grin, wearing a pointy hat, holding a wand with shimmering stars.  Behind him is a whimsical school building made of colorful paper, with a giant clock face showing swirling clouds and a sign that reads 'Magic Academy'.  The sky is filled with paper cut stars and a moon made of glitter.\",\n    \"style\": \"Paper cut\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"The Magic Mirror\",\n      \"description\": \"Oliver, a curious boy with a wild imagination, stumbled upon a dusty antique mirror in his grandmother's attic. The mirror shimmered with an otherworldly glow, and as Oliver touched it, he felt a strange tingling sensation. Suddenly, the mirror shattered, revealing a swirling vortex of colors.\",\n      \"image\": {\n        \"description\": \"Paper cut style illustration of Oliver, a boy with brown hair and bright eyes, standing in a dusty attic. He is holding a hand mirror that is shimmering with purple and blue light. Behind him, a pile of old books and a broken clock are seen, and the wall behind him is cracked and peeling, revealing a glimpse of a swirling, colorful vortex.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"A Journey Through the Vortex\",\n      \"description\": \"As Oliver watched in amazement, the vortex pulled him in, transporting him to a world unlike anything he had ever seen. The air shimmered with magical energy, and whimsical creatures flew through the sky.  He landed softly on a cloud, where a friendly, talking owl greeted him.\",\n      \"image\": {\n        \"description\": \"Paper cut style illustration of Oliver being sucked into a vortex of colors.  The vortex is made of swirls of paper cut blues, pinks, and greens, with small paper cut butterflies and stars floating around. In the distance, a whimsical castle made of candy and paper cut clouds can be seen. \",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"Welcome to Magic Academy\",\n      \"description\": \"The owl introduced Oliver to the Magic Academy, a school where children learned to control their magical powers. The academy was filled with giggling students, talking animals, and teachers who could turn themselves into anything imaginable. Oliver was excited to learn all about magic.\",\n      \"image\": {\n        \"description\": \"Paper cut style illustration of the Magic Academy. The school is a whimsical building with colorful paper cut towers, windows shaped like stars, and a sign that reads 'Magic Academy'.  Students are flying around on paper cut brooms, talking animals are having tea parties, and teachers are transforming into paper cut animals and objects. The sky is filled with stars and paper cut clouds.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"Learning the Magic\",\n      \"description\": \"Oliver quickly made friends with a bubbly girl named Luna, who was a whiz at creating illusions. Together, they learned to fly on broomsticks, make flowers bloom with a wave of their wands, and even create magical creatures out of thin air.\",\n      \"image\": {\n        \"description\": \"Paper cut style illustration of Oliver and Luna, two children with mischievous grins. They are standing in a classroom filled with bubbling potions, floating paper cut books, and a talking cat.  Luna is holding a wand and making flowers bloom, while Oliver is holding a wand and making a paper cut dragon appear.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Magic Returns Home\",\n      \"description\": \"After a magical adventure, Oliver had to return home. He missed his family, but he also knew he could use the magic he learned to make his life more wonderful. He promised Luna he would visit again, and with a wave of his wand, he was back in his grandmother's attic, forever changed by his experience.\",\n      \"image\": {\n        \"description\": \"Paper cut style illustration of Oliver waving goodbye to Luna and the Magic Academy.  He is standing at the edge of a swirling vortex, with paper cut clouds and stars surrounding him.  Luna and the other students are waving goodbye from the Magic Academy in the distance.\",\n        \"style\": \"Paper cut\"\n      }\n    }\n  ]\n}\n``` \n"},
        ],
      },
    ],
  });
