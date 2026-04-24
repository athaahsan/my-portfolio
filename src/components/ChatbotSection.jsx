import { motion } from 'framer-motion';
import { Bot, ArrowUp, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "highlight.js/styles/github-dark.css";

const ChatbotSection = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi there! I'm Atha's AI assistant. Do you have any questions about his experience, projects, or skills?"
    }
  ]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollDown(isScrolledUp);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();

    // Add user message
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    // Add empty AI placeholder
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    // Force scroll to bottom when sending a message
    setTimeout(scrollToBottom, 50);

    try {
      const response = await fetch('/aiResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeNow: new Date().toISOString(),
          responseStylePrompt: "Be friendly, professional, and slightly casual.",
          convHistory: messages.map(m => `${m.role === 'ai' ? 'Assistant' : 'User'}: ${m.content}`).join('\n'),
          userName: userName.trim() || "Guest",
          userMessage: userMessage,
          listImageData: [],
          imageLink: null,
          webSearchResult: ""
        })
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let isDone = false;
      let aiFullResponse = "";

      while (!isDone) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              isDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                aiFullResponse += content;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = { role: "ai", content: aiFullResponse };
                  return newMsgs;
                });
              }
            } catch (e) {
              // JSON invalid, skip this chunk
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: "ai", content: "Sorry, I'm having trouble connecting to my brain right now. Please check if the API keys are set up correctly." };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="py-20 relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Let's Chat</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Wanna know more about me? Go ahead and ask my chatbot! It knows all about my work, experience, what I like to build, and even some of the personal stuff about me.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-lg rounded-full px-6 py-2.5 hover:border-sky-500/30 transition-all focus-within:border-sky-500/50 focus-within:shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <span className="text-slate-400 text-sm">Chatting as:</span>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Guest" 
              className="bg-transparent border-none text-sky-400 font-semibold focus:outline-none w-32 placeholder-sky-400/30" 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col relative h-[600px] shadow-2xl shadow-sky-900/20 rounded-3xl overflow-hidden z-0">
            {/* Background glass and glowing effects */}
            <div className="absolute inset-0 glass-card bg-slate-900/60 border border-slate-700/50 -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            </div>

            {/* Chat header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-5 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-sky-500 rounded-full blur animate-pulse opacity-50"></div>
                  <div className="p-2 bg-slate-800 rounded-full text-sky-400 border border-sky-500/30 relative z-10 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                    <Bot size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                    Atha's Assistant
                  </h3>
                  <p className="text-green-300/70 text-xs flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 w-full h-full overflow-y-auto p-4 pt-24 pb-32 md:p-6 md:pt-28 md:pb-32 space-y-6 relative z-10 custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start w-full'}`}
                >
                  <div className={`${msg.role === 'user'
                      ? 'max-w-[85%] md:max-w-[75%] rounded-2xl py-3 px-4 text-sm md:text-base shadow-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-tr-sm border border-sky-400/30'
                      : 'w-full text-slate-200 text-sm md:text-base py-1 px-1 md:px-2'
                    }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      msg.content === "" && idx === messages.length - 1 ? (
                        <div className="flex items-center gap-1.5 h-6">
                          <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:first:mt-0 prose-p:last:mb-0 prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-slate-700/50 prose-a:text-sky-400 hover:prose-a:text-sky-300">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                            rehypePlugins={[rehypeHighlight, rehypeKatex]}
                            components={{
                              img: ({ node, ...props }) => (
                                <img
                                  {...props}
                                  className="max-w-50 h-auto rounded-md"
                                  alt={props.alt}
                                />
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )
                    )}
                  </div>

                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll down button */}
            {showScrollDown && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-28 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-30 p-2 bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-full text-sky-400 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:bg-slate-700/80 hover:text-sky-300 transition-all animate-bounce"
                aria-label="Scroll to bottom"
              >
                <ChevronDown size={24} />
              </button>
            )}

            {/* Input area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 pointer-events-none">
              <form onSubmit={handleSend} className="relative flex items-end max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-3xl p-2 pointer-events-auto transition-all duration-300 focus-within:bg-slate-800/80 focus-within:border-sky-500/50 focus-within:shadow-[0_8px_30px_rgba(14,165,233,0.15)]">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="w-full bg-transparent resize-none py-3 pl-4 pr-14 text-white placeholder-slate-400 focus:outline-none custom-scrollbar"
                  style={{ minHeight: '48px', maxHeight: '150px' }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:hover:from-sky-500 disabled:hover:to-blue-600 shadow-md hover:shadow-sky-500/25 group flex-shrink-0"
                >
                  <ArrowUp size={22} strokeWidth={1.5} className="transform group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;
