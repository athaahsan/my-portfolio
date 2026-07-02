# My Portfolio - [athaahsan.com](https://athaahsan.com)

A personal portfolio website built with React and Vite, featuring a dark glassmorphism interface, smooth animations, project showcases, homelab notes, and an integrated RAG-powered AI assistant.

## Features

- **Hero Section** - Animated orbital logo, typing effect, and a quick personal intro
- **Skills** - Technical stack overview across frontend, data, automation, and AI tooling
- **Experience** - Work history timeline
- **Education & Certificates** - Academic background, publications, and certificates
- **Projects** - Featured projects with tech tags, live demo links, and context on how they were built
- **Homelab** - Personal self-hosted infrastructure setup and playground
- **n8n Workflows** - Workflow showcase backed by Supabase data
- **RAG AI Chatbot** - Portfolio assistant that retrieves relevant personal knowledge from Supabase before generating responses with OpenRouter
- **Responsive Design** - Optimized for mobile, tablet, and desktop

## Chatbot Highlights

- **RAG-powered personal knowledge** - Retrieves relevant facts from Supabase instead of relying only on a giant static prompt
- **OpenRouter embeddings** - Turns user questions into semantic queries for more accurate retrieval
- **Streaming responses** - Replies appear in real time for a smoother chat experience
- **Markdown-rich answers** - Supports formatted links, images, code blocks, math, and highlighted snippets
- **Context-aware assistant behavior** - Answers questions about Atha using retrieved knowledge while still handling general questions naturally

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | React 19, Vite 8 |
| Styling | Tailwind CSS v4, DaisyUI v5 |
| Animations | Framer Motion |
| Icons | Lucide React, React Icons |
| Markdown Rendering | react-markdown, remark-gfm, remark-math, rehype-highlight, rehype-katex, rehype-raw |
| Backend | Netlify Edge Functions, Netlify Functions |
| AI | OpenRouter Chat Completions, OpenRouter Embeddings |
| RAG / Data | Supabase, Supabase RPC |
