# AI Gmail Reply Assistant

The **AI Gmail Reply Assistant** is a sophisticated tool that enhances the Gmail experience by automating email responses. It features a backend API powered by **Spring Boot** and integrates with the **Groq Cloud API** for AI-powered responses, while offering the flexibility to customize the solution to use local large language models (LLMs) like **Ollama Starter**, based on user preferences. The solution also includes a user-friendly **Chrome extension**.

### How It Works:
1. **Chrome Extension**:
   - The extension seamlessly integrates into the Gmail interface, adding a custom "AI Reply" button with an option for tone selection (e.g., formal, casual, etc.).
   - Once clicked, the extension extracts the current email content from Gmail and streams it to the backend for processing.

2. **Backend API**:
   - The backend, powered by **Spring Boot**, processes the email content and generates a contextually appropriate reply based on the extracted data.
   - The backend is configured to interact with the **Groq Cloud API** for AI processing. However, the code is easily customizable to use **local LLMs** (via **Ollama Starter** in Spring Boot or **Anthropic**) for users who prefer to keep their data local.
   - The Spring Boot backend API is hosted and available as a Docker image under the URL "https://hub.docker.com/r/youabd/gmail-reply-assistant". To host it, ensure you set the environment variables as specified in the `resources/application.yml` file. **Important:** After hosting, replace all occurrences of `http://localhost:8080` within the Chrome extension (in `manifest.json` and `content.js`) with the URL obtained from hosting.

3. **Real-Time Response**:
   - The backend reply is streamed back to the extension via **Server-Sent Events (SSE)**.
   - The response appears character-by-character in the Gmail compose box, providing real-time feedback to the user and enhancing the overall experience.

### Key Features:
- **Tone Selection**: Users can choose the tone of the reply (e.g., formal, professional, etc.) before sending it.
- **Native Gmail Look and Feel**: The extension is built with vanilla JavaScript and uses native browser APIs, ensuring that the Gmail interface remains untouched and intuitive.
- **Real-Time Typing Effect**: The response is displayed progressively, offering a dynamic and engaging user experience.
- **Customizable AI Backend**: The solution is flexible, supporting the use of Groq Cloud API or local LLMs like Ollama and Anthropic based on user preference.

### Deploying the Backend API:
To deploy the **AI Gmail Reply Assistant** backend API, follow these steps:
1. **Package the Spring Boot App**: Navigate to the root directory of the backend API and run `mvn clean install` to package the application.
2. **Build the Docker Image**: Run `docker build -t gmail-reply-assistant .` to build the Docker image.
3. **Publish the Docker Image**: If needed, publish the Docker image to Docker Hub using `docker push yourusername/gmail-reply-assistant`.
4. **Host the Docker Image**: Go to any hosting service, such as Cloud Azure, AWS, or for free with limited resources, use Render, to host the Docker image.

### Adding the Extension to Chrome Developer Mode:
To add the **AI Gmail Reply Assistant** extension to Chrome in developer mode, follow these steps:
1. **Enable Developer Mode**: Open Chrome and navigate to `chrome://extensions/`. Enable **Developer mode** by toggling the switch in the top-right corner.
2. **Load Unpacked**: Click **Load unpacked** and select the folder containing the extension's source code.
3. **Extension Loaded**: The extension should now be loaded and visible in the extensions list.
4. **Pin the Extension**: Click the puzzle piece icon in the top-right corner of the browser and pin the **AI Gmail Reply Assistant** extension to the toolbar for easy access.

### Demo Video:
To see the **AI Gmail Reply Assistant** in action, check out the demo video below:

https://github.com/user-attachments/assets/7ecedd57-f8c1-4b54-b18c-90264e2f7769

### Technologies Used:
- **Backend**: Spring Boot, Groq Cloud API with ability to support Ollama Starter for local LLMs or other online models such as Anthropic
- **Frontend**: Chrome Extension (Vanilla JavaScript, Native Browser APIs)
- **Communication**: Server-Sent Events (SSE)

### License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.