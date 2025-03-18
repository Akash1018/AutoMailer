import Express from "express";
import NodeMailer from "nodemailer";
import telegrambot from "node-telegram-bot-api";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

configDotenv();

const app = Express();
const token = process.env.TOKEN;

const bot = new telegrambot(token, { polling: true });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.includes("@")) {
    let msg = {
      from: process.env.EMAIL,
      to: text,
      subject: "Working Easy Shit",
      text: "This is a text script",
      attachments: [
        {
          fileName: "Akash_Resume",
          path: __dirname + "/Akash-Resume.pdf",
          contentType: "application/pdf",
        },
      ],
    };

    await transportMsg.sendMail(msg);
    bot.sendMessage(chatId, "Mail Sended");
  } else bot.sendMessage(chatId, "Please send a mail ID");
});

const transportMsg = NodeMailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

app.listen(3000, () => {
  console.log("Server Running");
});
