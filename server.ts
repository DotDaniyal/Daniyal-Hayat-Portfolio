import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";

import { 
  validateContactSubmission, 
  checkRateLimit, 
  checkDuplicateSubmission, 
  sendContactEmail 
} from "./src/server/emailService";
import {
  handleChatRequest,
  handleChatStreamRequest,
  injectMandatorySystemMessageIntoBody,
} from "./src/server/chatService";

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Explicit resume PDF endpoints for direct download or browser viewing
app.get(["/resume/Daniyal-Hayat-Resume.pdf", "/Daniyal-Hayat-Resume.pdf", "/resume.pdf", "/cv.pdf"], (req, res) => {
  const filePath1 = path.join(process.cwd(), "public", "resume", "Daniyal-Hayat-Resume.pdf");
  const filePath2 = path.join(process.cwd(), "public", "Daniyal-Hayat-Resume.pdf");
  const targetPath = fs.existsSync(filePath1) ? filePath1 : filePath2;

  if (fs.existsSync(targetPath)) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      req.query.download === "true"
        ? 'attachment; filename="Daniyal-Hayat-Resume.pdf"'
        : 'inline; filename="Daniyal-Hayat-Resume.pdf"'
    );
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(targetPath);
  } else {
    return res.status(404).send("Resume PDF not found.");
  }
});

// Contact message endpoint with validation, rate limiting, spam defense, and email dispatch
app.post("/api/contact", async (req, res) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || 
               req.socket?.remoteAddress || 
               "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "unknown";

    // 1. Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: "Too many messages sent. Please wait a few minutes before trying again." 
      });
    }

    const { name, email, subject, message, honeypot } = req.body || {};

    // 2. Server-Side Validation
    const validation = validateContactSubmission({ name, email, subject, message, honeypot });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error || "Invalid form submission." });
    }

    // 3. Duplicate Submission Protection
    if (checkDuplicateSubmission({ name, email, subject, message })) {
      return res.status(200).json({ 
        success: true, 
        message: "Message already received. Thanks for reaching out." 
      });
    }

    // 4. Send Email via configured provider (Resend API, SMTP, or Webhook)
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
      honeypot,
      ip,
      userAgent,
    });

    if (!result.success) {
      return res.status(500).json({ 
        error: "Your message could not be sent. Please try again or reach out directly by email." 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully! Your message has been delivered. Thanks for reaching out." 
    });
  } catch (err: any) {
    console.error("[API /contact] Server error:", err);
    return res.status(500).json({ 
      error: "Something went wrong while processing your request. Please try again later." 
    });
  }
});

// Portfolio AI Assistant endpoint (supports both SSE streaming and standard JSON)
app.post("/api/chat", async (req, res) => {
  try {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "127.0.0.1";

    // Inject mandatory Dnyl AI system message as the first item in the message array at the start of every request
    const payloadWithSystemMessage = injectMandatorySystemMessageIntoBody(req.body);

    const wantsStream =
      req.body?.stream === true ||
      (req.headers.accept && req.headers.accept.includes("text/event-stream"));

    if (wantsStream) {
      await handleChatStreamRequest(payloadWithSystemMessage, ip, res);
      return;
    }

    const result = await handleChatRequest(payloadWithSystemMessage, ip);
    return res.status(result.status).json(result.body);
  } catch (err: any) {
    console.error("[API /chat] Server error:", err);
    return res.status(500).json({ 
      error: "Sorry, I couldn't process that message right now. Please try again." 
    });
  }
});

// Vite middleware setup for development / production
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
