
<div align="center">
  <img src="./public/assets/banner.webp" alt="Invest-IQ Banner" width="100%" />
</div>

# 💼 Invest-IQ – AI-Powered Investment Assistant

🔗 **Live Demo:** [my-investiq.vercel.app](https://my-investiq.vercel.app)

**Invest-IQ** is an AI-powered investment platform that helps beginners understand and plan their investments based on risk, capital, age, and financial goals. Powered by **Gemini AI**, real-time gold prices, and a clean UI — Invest-IQ explains everything in a way even an 18-year-old can understand.

---

## ✨ Key Highlights

- 🤖 **AI-Powered Recommendations** – Get personalized fund suggestions using Gemini AI
- 📊 **Smart Calculators** – SIP, EMI, Mutual Fund, FD & SWP calculators with interactive charts
- 📈 **Live Gold Rates** – Real-time gold price tracking via GoldAPI
- 💬 **AI Chatbot (FunBot)** – Ask any financial question and get simple answers
- 📚 **Blog Section** – Gemini-powered articles with beginner-friendly summarization
- 🎓 **"I'm 18" Mode** – Simplifies complex financial concepts for beginners
- 📝 **Smart Profile System** – Multi-step form for goal & risk-based investing
- 🔐 **Secure Auth** – User authentication powered by Appwrite
- ⚡ **Smooth UI/UX** – Beautiful animations with Framer Motion

---

## 🛠️ Tech Stack

| Category       | Technology                                  |
|----------------|---------------------------------------------|
| **Frontend**   | React 19, Tailwind CSS, Framer Motion       |
| **Backend**    | Appwrite (Auth & Database)                  |
| **AI Engine**  | Gemini API (Google AI)                      |
| **APIs**       | GoldAPI (Live Gold Prices)                  |
| **Charts**     | Chart.js, React Chart.js 2                  |
| **Build Tool** | Vite                                        |
| **Hosting**    | Vercel                                      |

---

## 📸 Screenshots

<div align="center">
  <img src="./public/assets/banner.webp" alt="Home Page" width="80%" />
</div>

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/jhasubhash620/Invest-IQ.git
cd Invest-IQ

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# Fill in the actual keys in the .env file

# 4. Run the app locally
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOLD_API_KEY=your_gold_api_key
```

---

## 🗃️ Appwrite Database Schema

### Collection: `investIQUsers`

| Attribute        | Type           | Description              |
|-----------------|----------------|--------------------------|
| `userId`        | Text           | User's unique ID         |
| `age`           | Integer        | User's age               |
| `capital`       | Integer        | Monthly investment       |
| `initialInvestment` | Integer    | Starting investment      |
| `goal`          | Text           | Investment goal          |
| `goalYears`     | Integer        | Goal duration (years)    |
| `riskAppetite`  | Text           | Risk tolerance level     |
| `riskProfile`   | Text           | Conservative/Moderate/Aggressive |
| `investmentType`| Text (Array)   | Types of investments     |
| `createdAt`     | Text           | Profile creation date    |

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own:

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set Framework Preset: **Vite**
4. Add all environment variables
5. Deploy! 🚀

> **Important:** Add your Vercel domain to Appwrite → Settings → Platforms for CORS to work.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This project is for **educational purposes only**. Invest-IQ is not a SEBI-registered advisor. Always consult a qualified financial advisor before making investment decisions.

---

## 🙏 Acknowledgements

- [Gemini AI](https://ai.google.dev/) – AI-powered recommendations
- [GoldAPI](https://www.goldapi.io/) – Real-time gold prices
- [Appwrite](https://appwrite.io/) – Backend & authentication
- [Vercel](https://vercel.com/) – Hosting & deployment
- [Chart.js](https://www.chartjs.org/) – Interactive charts

---

## 📧 Contact

**Subhash Kumar Jha**  
📩 Email: subhashkumarjha162@gmail.com  
🔗 GitHub: [@jhasubhash620](https://github.com/jhasubhash620)

---

## 💬 Feedback

Got feedback or ideas? [Create an issue](https://github.com/jhasubhash620/Invest-IQ/issues) or reach out!

---

<div align="center">
  
  🧠 _"Invest smart, even if you're just starting out."_ – **Invest-IQ**
  
  ⭐ Star this repo if you found it helpful!

</div>
