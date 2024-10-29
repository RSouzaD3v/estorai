'use client'
import { useEffect } from "react";
import { IoMdPlayCircle } from "react-icons/io";

interface StoryChapter {
    chapter_title: string;
    description: string;
}

interface StoryPagesProps {
    storyChapter: StoryChapter;
}

const StoryPages = ({ storyChapter }: StoryPagesProps) => {

    const playSpeech = (text: string) => {
        const synth = window?.speechSynthesis;
    
        if (!synth) {
            console.warn("Speech synthesis is not supported in this browser.");
            return;
        }
    
        if (synth.speaking) {
            synth.cancel(); // Para interromper qualquer fala anterior antes de iniciar uma nova.
        }
    
        const textToSpeech = new SpeechSynthesisUtterance(text);
    
        // Seleciona a voz em português do Brasil
        const voices = synth.getVoices();
        const brazilianVoice = voices.find(voice => voice.lang === 'pt-BR');
    
        if (brazilianVoice) {
            textToSpeech.voice = brazilianVoice;
        } else {
            console.warn("Portuguese (Brazil) voice not found.");
        }
    
        synth.speak(textToSpeech);
    };

    useEffect(() => {
        playSpeech("Seja Bem vindos!"); // Servindo apenas para inicializar.
    }, []);
    
    

    return (
        <div>
            <h2 className="text-2xl font-bold text-violet-500 flex justify-between items-center">
                {storyChapter.chapter_title}
                <span className="text-3xl text-violet-500 cursor-pointer" onClick={() => playSpeech(storyChapter.description)}><IoMdPlayCircle /></span>
            </h2>
            <p className="text-xl p-5 mt-3 rounded-lg bg-slate-800 text-white">
                {storyChapter.description}
            </p>
        </div>
    );
};

export default StoryPages;
