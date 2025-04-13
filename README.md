# 🧠 AnyChat – AI-Powered Customer Support Chatbot

A smart, customizable AI chatbot built with **Next.js 15**, **Google Gemini API**, **MongoDB**, and **Tailwind CSS** – designed for **eCommerce customer support** and general conversation.

> ⚡ Built for freelancers and businesses who want fast, friendly, and intelligent customer assistance.

---

## 🔍 Features

- ✅ Real-time AI chat with Google Gemini
- ✅ Customer-friendly UI with light/dark color palette
- ✅ Feedback system (👍 👎) for improving responses
- ✅ Conversation history storage in MongoDB
- ✅ Authentication with NextAuth.js
- ✅ Typing animation and auto-scroll
- ✅ Easily customizable for eCommerce or support use

---

## 📸 Screenshots

| Chat UI | Sidebar with Chat History | Typing Indicator |
|--------|---------------------------|------------------|
| ![Chat UI](public/screenshots/chat-ui.png) | ![Sidebar](public/screenshots/sidebar.png) | ![Typing](public/screenshots/typing.png) |

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Serverless API Routes (App Router)
- **AI:** Google Gemini (Gemini Pro / Flash)
- **Database:** MongoDB Atlas
- **Auth:** NextAuth.js (Google provider + Credentials)
- **Hosting:** (You can deploy to [Vercel](https://vercel.com))

---

## 🚀 Live Demo

> Coming soon – [Deploy to Vercel](https://vercel.com)

---

## 🧩 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/        // Serverless API routes
│   │   ├── chat/       // Chat UI page
│   ├── lib/            // MongoDB connection logic
│   ├── models/         // Mongoose models
│   ├── utils/          // Custom fetchAPI helper
├── public/             // Images & assets
├── .env.local          // API keys (not committed)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Moghadam80/chatbot-app.git
cd chatbot-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root and add:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=some_secure_string
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Now open `http://localhost:3000` and start chatting!

---

## 🛒 Use Case: eCommerce Assistant

This chatbot is optimized for answering customer questions like:

- "Do you have running shoes under $100?"
- "What's your return policy?"
- "Where's my order #123?"

You can customize product logic using `products.json` or connect to a real product API (like Shopify or WooCommerce).

---

## 🧠 Future Improvements (Optional)

- ✅ Voice input (Web Speech API)
- ✅ Product carousels / rich cards
- ✅ Admin analytics dashboard
- ✅ Integration with Telegram / WhatsApp
- ✅ Multilingual support (English, Farsi, Arabic)

---

## 📄 License

MIT License. Free to use and modify.

---

## 🙌 Author

Built with ❤️ by [Ali Moghadam](https://github.com/Moghadam80)  
For freelance inquiries, feel free to [contact me](mailto:your.email@example.com) or DM me on [LinkedIn](https://linkedin.com/in/yourname)