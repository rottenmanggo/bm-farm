'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/content/site-content';
import { MessageSquare, X, Send, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  escalate?: boolean;
  mapsCta?: boolean;
}

export default function ChatbotWidget() {
  const { chatbot, brand } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const waUrl = `https://wa.me/${brand.waNumber}?text=${encodeURIComponent(
    brand.waDefaultMessage
  )}`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: chatbot.welcomeMessage,
      escalate: false,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (userQuery?: string) => {
    const textToSend = userQuery || inputText.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInputText('');

    // Rule-based FAQ Keyword Matching Logic
    setTimeout(() => {
      const queryLower = textToSend.toLowerCase();
      
      // Search through FAQs for matching keywords
      const matchedFaq = chatbot.faqs.find((faq) =>
        faq.keywords.some((keyword) => queryLower.includes(keyword.toLowerCase()))
      );

      let botReplyText = '';
      let isEscalated = false;
      let isMapsCta = false;

      if (matchedFaq) {
        botReplyText = matchedFaq.answer;
        isEscalated = matchedFaq.escalate;
        isMapsCta = !!matchedFaq.mapsCta;
      } else {
        botReplyText =
          'Terima kasih atas pertanyaannya. Untuk pertanyaan ini atau penawaran khusus, dapat langsung menghubungi via WhatsApp.';
        isEscalated = true;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        escalate: isEscalated,
        mapsCta: isMapsCta,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const quickSuggestions = [
    'Berapa Harga?',
    'Manfaat Telur Omega',
    'Alamat Lokasi Indralaya',
    'Pemesanan Grosir / B2B',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">
                    {chatbot.adminName}
                  </h4>
                  <p className="text-[11px] text-primary-light flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    {chatbot.status}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-surface space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-text-primary border border-border rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Google Maps CTA inside Bot Bubble */}
                    {msg.sender === 'bot' && msg.mapsCta && (
                      <div className="mt-3 pt-3 border-t border-border/60">
                        <a
                          href={brand.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-secondary text-on-secondary-fixed hover:bg-secondary-dark hover:text-white px-3.5 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            map
                          </span>
                          Lihat di Google Maps
                        </a>
                      </div>
                    )}

                    {/* WhatsApp Escalation CTA inside Bot Bubble */}
                    {msg.sender === 'bot' && msg.escalate && (
                      <div className="mt-3 pt-3 border-t border-border/60">
                        <p className="text-[11px] text-text-secondary mb-2 font-medium">
                          {chatbot.escalationText}
                        </p>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-secondary text-on-secondary-fixed hover:bg-secondary-dark hover:text-white px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            chat
                          </span>
                          Hubungi via WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="p-2.5 bg-white border-t border-border flex gap-2 overflow-x-auto no-scrollbar">
              {quickSuggestions.map((text, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="px-3 py-1 bg-primary-light hover:bg-primary hover:text-white text-primary text-[11px] font-semibold rounded-full shrink-0 transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-border focus:outline-none focus:border-primary bg-surface text-text-primary"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shrink-0 disabled:opacity-50"
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - Locked Position to Right */}
      <div className="flex justify-end w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-center h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer border border-white/20 ${
            isOpen ? 'w-14' : 'group px-4 hover:pr-4'
          }`}
          aria-label={isOpen ? 'Close Chatbot' : 'Open Chatbot'}
        >
          {/* Hover Expandable Text - Expands to Left only when closed */}
          {!isOpen && (
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-[120px] opacity-0 group-hover:opacity-100 pr-0 group-hover:pr-2">
              Ada pertanyaan?
            </span>
          )}

          {/* Chat Icon - Fixed Right */}
          <div className="relative flex items-center justify-center shrink-0 w-6 h-6">
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

            {hasUnread && !isOpen && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-error border-2 border-white rounded-full animate-ping" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
