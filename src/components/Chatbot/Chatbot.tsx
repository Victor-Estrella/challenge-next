import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // Definir as opções de integração do Watson Assistant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).watsonAssistantChatOptions = {
      integrationID: "3b857cc3-c398-4e0d-8083-5cac9fa83e68",
      region: "us-south", // A região onde a integração está hospedada.
      serviceInstanceID: "077bc520-e9dd-420e-b5db-fc1ec03356ea",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onLoad: async (instance: any) => { await instance.render(); }
    };

    // Adicionar o script do Watson Assistant ao cabeçalho da página
    setTimeout(() => {
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ((window as any).watsonAssistantChatOptions.clientVersion || 'latest') + 
              "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []);

  return (
    <>
    </>
  );
}
