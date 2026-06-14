import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment configurations
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI on the server side securely
// Handle missing chemical key gracefully
const getAIClient = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the container environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

// POST api/ai-chat endpoint proxy
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { prompt, subjectContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required for study queries." });
    }

    const ai = getAIClient();
    
    const systemInstruction = `You are an expert OJAS Gujarat State Level Civil Services Tutor specializing in preparing candidates for GPSC, GSSSB CCE, Talati, and Police force exams.
      Provide highly structured, reassuring, accurate, and easy-to-read educational answers. 
      Use clear bullet points and bold sections. If asked, you can reply in English and Gujarati script.
      Context: User is currently standardizing their preparation on ${subjectContext || "General Knowledge"}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const resultText = response.text || "Sorry, I could not generate an answer right now. Please try again.";
    return res.status(200).json({ reply: resultText });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    return res.status(500).json({ 
      error: "Unable to reach the study assistant.", 
      details: error.message || "Unknown server error."
    });
  }
});

// Configure Vite middleware inside development environment
async function configureServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve production build files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OJAS active server booted successfully on port ${PORT}`);
  });
}

configureServer();
