import userInfo from "../userInfo.js"

import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowUp, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import "highlight.js/styles/github-dark.css";

const ChatbotSection = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [userName, setUserName] = useState("");
  const [previousRetrievedTitles, setPreviousRetrievedTitles] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi there! I'm Atha's AI assistant. Do you have any questions about his experience, projects, or skills?"
    }
  ]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const maxLength = 1000;

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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Add empty AI placeholder
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    // Force scroll to bottom when sending a message
    setTimeout(scrollToBottom, 50);

    let aiFullResponse = "";

    try {
      const response = await fetch('/aiResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeNow: new Date().toISOString(),
          responseStylePrompt: "Respond in a warm, approachable, and friendly manner, as if talking to a close friend. Use casual and conversational language. Provide detailed and engaging responses with elaboration.",
          convHistory: messages.map(m => `${m.role === 'ai' ? 'Assistant' : 'User'}: ${m.content}`).join('\n'),
          userName: userName.trim() || "Guest",
          userMessage: userMessage,
          previousRetrievedTitles,
        })
      });

      if (!response.ok) {
        let errorMessage = "Network response was not ok";
        if (response.status === 429) {
          errorMessage = "Whoa, slow down! You're sending messages too fast. Please try again in a minute.";
        } else if (response.status === 400) {
          errorMessage = "Message validation failed. Please make sure your message isn't too long.";
        }
        throw new Error(errorMessage);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let isDone = false;

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
              if (Array.isArray(parsed.athaRagTitles)) {
                setPreviousRetrievedTitles(parsed.athaRagTitles);
                console.log("Atha RAG Titles:", parsed.athaRagTitles);
                continue;
              }

              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiFullResponse += content;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = { role: "ai", content: aiFullResponse };
                  return newMsgs;
                });
              }
            } catch {
              // JSON invalid, skip this chunk
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        const displayMessage = error.message && error.message !== "Network response was not ok" 
          ? error.message 
          : "Sorry, I'm having trouble connecting to my brain right now. Please check if the API keys are set up correctly.";
        newMsgs[newMsgs.length - 1] = { role: "ai", content: displayMessage };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
      userInfo(userName, userMessage, aiFullResponse, "");
    }
  };

  return (
    <section id="chatbot" className="portfolio-section">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="portfolio-section-heading"
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
        </Motion.div>

        <Motion.div
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
                <div className="flex items-center justify-center h-11 w-11 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-sm">
                  <Bot size={24} className="text-sky-400" />
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
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start w-full'}`}
                >
                  <div className={`${msg.role === 'user'
                    ? 'wrap-anywhere max-w-[85%] md:max-w-[75%] rounded-2xl py-3 px-4 text-sm md:text-base shadow-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-tr-sm border border-sky-400/30'
                    : 'w-full text-slate-200 text-sm md:text-base py-1 px-1 md:px-2'
                    }`}>
                    {msg.role === 'user' ? (
                      <div className='whitespace-pre-wrap'>
                        {msg.content.trim()}
                      </div>
                    ) : (
                      msg.content === "" && idx === messages.length - 1 ? (
                        <div className="flex items-center gap-3 h-8 px-2 py-1">
                          <div className="flex gap-1.5 items-center">
                            <Motion.span
                              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0, ease: "easeInOut" }}
                              className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                            />
                            <Motion.span
                              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                              className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                            />
                            <Motion.span
                              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                              className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                            />
                          </div>
                          <span className="text-xs font-semibold tracking-wide bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                            Thinking...
                          </span>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none break-words prose-p:leading-relaxed prose-p:first:mt-0 prose-p:last:mb-0 prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-slate-700/50 prose-a:text-sky-400 hover:prose-a:text-sky-300">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                            components={{
                              img: (props) => {
                                const imgProps = { ...props };
                                delete imgProps.node;

                                return (
                                  <img
                                    {...imgProps}
                                    className="max-w-50 h-auto rounded-md"
                                    alt={props.alt}
                                  />
                                );
                              },
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )
                    )}
                  </div>

                </Motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">

              {/* Scroll down button */}
              <AnimatePresence>
                {showScrollDown && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-full flex justify-end mb-4 pointer-events-auto px-6"
                  >
                    <button
                      onClick={scrollToBottom}
                      className="p-2 bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-full text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all animate-bounce"
                      aria-label="Scroll to bottom"
                    >
                      <ChevronDown size={24} />
                    </button>
                  </Motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSend} className="w-full relative flex items-end gap-3 bg-white/2 backdrop-blur-xl border-t border-slate-600/50 p-4 md:p-5 pointer-events-auto transition-all duration-300 z-20 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
                <AnimatePresence>
                  {inputText.length >= maxLength - 50 && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-10 right-4 bg-rose-500/90 text-white font-medium text-xs px-3 py-1.5 rounded-lg border border-rose-400/50 backdrop-blur-md pointer-events-none"
                    >
                      {inputText.length >= maxLength ? "Maximum length reached" : `${maxLength - inputText.length} characters remaining`}
                    </Motion.div>
                  )}
                </AnimatePresence>
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                  }}
                  onKeyDown={(e) => {
                    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                    if (isTouchDevice) return;
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Ask me anything..."
                  rows={1}
                  maxLength={maxLength}
                  className="flex-1 bg-transparent resize-none py-2 px-2 text-white placeholder-slate-400 focus:outline-none custom-scrollbar text-base"
                  style={{ minHeight: '40px', maxHeight: '150px' }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading || inputText.length > maxLength}
                  className="h-[38px] w-[38px] flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-600 border border-sky-400/30 text-slate-900 rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50 group flex-shrink-0"
                >
                  <ArrowUp size={18} strokeWidth={2} className="text-white transform group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;
