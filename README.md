Here's the updated version of your README description with a section for the demo video and a note on where to place it:

---

# AI Gmail Reply Assistant

The **AI Gmail Reply Assistant** is a sophisticated tool that enhances the Gmail experience by automating email responses. It features a backend API powered by **Spring Boot** and integrates with the **Groq Cloud API** for AI-powered responses, while offering the flexibility to customize the solution to use local large language models (LLMs) like **Ollama Starter** or **Anthropic**, based on user preferences. The solution also includes a user-friendly **Chrome extension**.

### How It Works:
1. **Chrome Extension**:
   - The extension seamlessly integrates into the Gmail interface, adding a custom "AI Reply" button with an option for tone selection (e.g., formal, casual, etc.).
   - Once clicked, the extension extracts the current email content from Gmail and streams it to the backend for processing.

2. **Backend API**:
   - The backend, powered by **Spring Boot**, processes the email content and generates a contextually appropriate reply based on the extracted data.
   - The backend is configured to interact with the **Groq Cloud API** for AI processing. However, the code is easily customizable to use **local LLMs** (via **Ollama Starter** in Spring Boot or **Anthropic**) for users who prefer to keep their data local.

3. **Real-Time Response**:
   - The backend reply is streamed back to the extension via **Server-Sent Events (SSE)**.
   - The response appears character-by-character in the Gmail compose box, providing real-time feedback to the user and enhancing the overall experience.

### Key Features:
- **Tone Selection**: Users can choose the tone of the reply (e.g., formal, professional, etc.) before sending it.
- **Native Gmail Look and Feel**: The extension is built with vanilla JavaScript and uses native browser APIs, ensuring that the Gmail interface remains untouched and intuitive.
- **Real-Time Typing Effect**: The response is displayed progressively, offering a dynamic and engaging user experience.
- **Customizable AI Backend**: The solution is flexible, supporting the use of Groq Cloud API or local LLMs like Ollama and Anthropic based on user preference.

### Demo Video:
To see the **AI Gmail Reply Assistant** in action, check out the demo video below:

<video width="600" controls>
  <source src="/assets/demo.mp4" type="video/mp4">
</video>

### Technologies Used:
- **Backend**: Spring Boot, Groq Cloud API (with support for Ollama Starter or Anthropic as local options)
- **Frontend**: Chrome Extension (Vanilla JavaScript, Native Browser APIs)
- **Communication**: Server-Sent Events (SSE)