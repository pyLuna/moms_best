import { toast } from "sonner";

const systemPrompt: Record<string, string> = {
  forum: `You are a helpful AI assistant in a forum. Your task is to assist users in creating forum posts by providing suggestions and answering questions related to the forum topics. You should be able to understand the context of the discussion and provide relevant information.`,
  products: `You are a helpful AI assistant in a product discussion forum. Your task is to assist users in discussing products by providing suggestions, answering questions, and offering insights related to the products being discussed. You should be able to understand the context of the product discussions and provide relevant information.`,
  report: `You are a helpful AI assistant in a reporting forum. Your task is to assist users in reporting issues by providing guidance on how to report problems effectively and answering questions related to the reporting process. You should be able to understand the context of the issues being reported and provide relevant information.`,
} as const;

const useAiChat = (options: {
  from: string;
  category: string;
  title?: string;
  content?: string;
}) => {
  const system = systemPrompt[options.from];
  const userPrompt = `
    I want to share something on ${
      options.category
    } discussion. Generate an engaging title and content for my post.
    ${options.title || options.content ? "Here are the details:" : ""}
    ${options.title ? `Title: ${options.title}` : ""}
    ${options.content ? `Content: ${options.content}` : ""}
  `;
  /**
   * Sends a message to the AI chat service.
   * @param message The message to send to the AI chat service.
   * @returns A promise that resolves to the AI's response.
   */
  const sendMessage = async (message: string) => {
    const response = await fetch(
      "https://moms-best.app.n8n.cloud/webhook/0b51ceff-c5a3-4b4e-bd26-d0b1ce2a68be",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: message,
          systemPrompt: system,
          userPrompt,
        }),
      }
    );
    console.log("AI Chat Response:", response);
    if (!response.ok) {
      toast.error("Failed to send message to AI chat service.");
    }

    return await response.json();
  };

  return {
    sendMessage,
  };
};

export default useAiChat;
