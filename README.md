
# TradeNest

TradeNest is a high-performance, full-stack real-time trading platform equipped with an intelligent stock price forecasting engine. The application establishes secure, low-latency data pipelines for continuous asset tracking and features automated transaction execution along with advanced multi-factor security.

## 🎬 Demo Video

Experience the full suite of features and live trading interfaces in action:
👉 **[Watch the TradeNest Demo Video](https://drive.google.com/file/d/1twwhtKCddAPseAxHUyw2P19vtyvaG7oM/view?usp=drivesdk)**

---

## 🚀 Key Features

* **Real-Time Price Updates:** Implements high-throughput, bidirectional **WebSockets** (via Socket.io) to stream live, continuous stock price updates directly to the user dashboard.
* **Predictive Analytics Engine:** Features an advanced **LSTM** and **GRU** time-series forecasting model processing rolling 100-day closing-price percent shifts and volume data, achieving an exceptional **99.70% accuracy** (with 56.70% directional trend accuracy).
* **Automated After-Hours Trading:** Integrated a robust background **Cron-Job Scheduler** to systematically queue, process, and automatically execute pending buy/sell limit orders during after-market hours.
* **Secure Session Management:** Authorization channels are fortified using encrypted **JWT (JSON Web Tokens) coupled with secure, stateful client-side cookies** to mitigate cross-site scripting (XSS) risks and protect user profiles.
* **Multi-Factor Authentication (MFA):** Integrates an automated security pipeline via **Nodemailer** for instant, robust OTP (One-Time Password) generation and delivery during user login.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend Frameworks:** Node.js, Express.js, Python
* **Database:** PostgreSQL
* **Real-Time & Background Processing:** WebSockets (Socket.io), Cron-Jobs
* **Machine Learning / Deep Learning:** TensorFlow, Keras, NumPy, Pandas
* **Security & Utilities:** JWT (JSON Web Tokens), Cookies, Nodemailer

---

## 📦 Installation & Setup

### Prerequisites
* Node.js (v16+ recommended)
* Python 3.8+ 
* PostgreSQL database instance

### 1. Clone the Repository
```bash
git clone [https://github.com/Shreyansh-dreamer/TradeNest.git](https://github.com/Shreyansh-dreamer/TradeNest.git)
cd TradeNest
```


### 2. Backend Configuration (Node.js & Express)

1. Navigate to the backend directory:
```bash
cd backend

```


2. Install dependencies:
```bash
npm install
pip install -r requirements.txt

```


3. Create a `.env` file in the root of the backend folder and populate the following:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/tradenest
JWT_SECRET=your_jwt_encryption_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```


4. Start the Express server:
```bash
npm start

```



### 3. AI & Forecasting Service Setup (FastAPI)


 Install required packages:
```bash
pip install -r requirements.txt

```

It is already a part of backend



### 4. Frontend Configuration (React.js)

1. Navigate to the client directory:
```bash
cd ../frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```
### 4.Dashboard Frontend Configuration (React.js)

1. Navigate to the client directory:
```bash
cd ../Dashboard/frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```


---

## 🔮 Machine Learning Architecture

The stock forecasting module operates asynchronously through the **FastAPI** server. It ingests historical financial records, scaling data based on 100-day windowed intervals.

* **Preprocessing:** Calculates rolling percent changes in closing prices combined with trading volume shifts.
* **Model Topology:** Leveraged sequential layers of **LSTM** (Long Short-Term Memory) and **GRU** (Gated Recurrent Unit) networks to capture both long-term patterns and sudden, volatile market adjustments, delivering a peak metrics performance of **99.70%** and rmse of 3.89.

```

```

