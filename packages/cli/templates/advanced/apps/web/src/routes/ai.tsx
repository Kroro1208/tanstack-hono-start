import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface AIProvider {
  name: string;
  configured: boolean;
}

interface AIResponse {
  response: string;
  timestamp: string;
  provider: string;
}

const AIChat = () => {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [currentProvider, setCurrentProvider] = useState("anthropic");
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Load providers on component mount
  useEffect(() => {
    fetch("http://localhost:8000/api/ai/providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.providers);
        setCurrentProvider(data.currentProvider);
      })
      .catch((err) => console.error("Failed to load providers:", err));
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context,
          provider: currentProvider,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Failed to send message:", error);
      setResponse({
        response: "Failed to connect to AI service",
        timestamp: new Date().toISOString(),
        provider: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 AI Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chat with AI using multiple providers. Switch between OpenAI,
            Anthropic, Google, and Azure models.
          </p>
        </div>

        {/* Provider Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔧 AI Provider Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select AI Provider
              </label>
              <select
                value={currentProvider}
                onChange={(e) => setCurrentProvider(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {providers.map((provider) => (
                  <option
                    key={provider.name}
                    value={provider.name}
                    disabled={!provider.configured}
                  >
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Provider Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider Status
              </label>
              <div className="space-y-2">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      provider.configured
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {provider.name}:{" "}
                    {provider.configured ? "Ready" : "Not Configured"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            💬 Chat with AI
          </h2>

          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Context (Optional)
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., React development, Python coding, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "🤔 Thinking..." : `💬 Send to ${currentProvider}`}
            </button>
          </form>
        </div>

        {/* AI Response */}
        {response && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                🤖 AI Response
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Provider:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {response.provider}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="prose max-w-none">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {response.response}
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Response generated at:{" "}
              {new Date(response.timestamp).toLocaleString()}
            </div>
          </div>
        )}
    </div>
  );
};

export const Route = createFileRoute("/ai")({
  component: AIChat,
});
