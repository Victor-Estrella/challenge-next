"use client"
import { useEffect } from 'react';

interface WatsonAssistantOptions {
  integrationID: string;
  region: string;
  serviceInstanceID: string;
  onLoad: (instance: { render: () => Promise<void> }) => Promise<void>;
  clientVersion?: string; // Tornar clientVersion opcional
}

declare global {
  interface Window {
    watsonAssistantChatOptions?: WatsonAssistantOptions;
  }
}

export default function Chatbot() {
  useEffect(() => {
    // Definindo as opções do Watson Assistant
    window.watsonAssistantChatOptions = {
      integrationID: "b282140d-9ec1-4e31-b233-356034ce8636",
      region: "us-south",
      serviceInstanceID: "4895944c-12f0-4b43-9a58-2390e3fc6fd0",
      onLoad: async (instance) => { await instance.render(); }
    };

    // Função para carregar o script do Watson Assistant
    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${window.watsonAssistantChatOptions.clientVersion || 'latest'}/WatsonAssistantChatEntry.js`;
    script.async = true;
    document.head.appendChild(script);

    // Limpeza do efeito ao desmontar o componente
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Esse componente não precisa renderizar nada na tela
}
