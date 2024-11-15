import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AppShell } from "../components/app-shell";
import { UserListBooks } from "../components/book/list-book";

const quotes = [
  "Don't Judge a Book By its Cover",
  "The only way to do great work is to love what you do.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The best way to predict the future is to create it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
];

export function HomePage() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const quote = quotes[quoteIndex];
    let timeoutId: number | undefined;

    if (isTyping) {
      let charIndex = 0;
      setCurrentQuote("");

      const typeNextChar = () => {
        if (charIndex < quote.length) {
          setCurrentQuote(quote.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 50);
        } else {
          setIsTyping(false);
        }
      };

      timeoutId = setTimeout(typeNextChar, 50);
    } else {
      // Wait for 5 seconds before starting to type the next quote
      timeoutId = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsTyping(true);
      }, 120000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [quoteIndex, isTyping]);

  return (
    <AppShell>
      <div className="relative w-full max-w-2xl mx-auto mt-0 pt-0 px-6">
        <div className="min-h-[6rem] flex items-center justify-center">
          <p className="text-2xl font-medium text-amber-700 text-center relative">
            <h1 className="text-4xl font-extrabold text-amber-900 mb-8 text-center">
              Welcome to Book Review App
            </h1>
            <b>"</b>
            {currentQuote}
            <b>"</b>
            <span
              className={`inline-block w-0.5 h-6 ml-1 bg-amber-700 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </p>
        </div>
      </div>

      <UserListBooks />

      <Toaster />
    </AppShell>
  );
}

export default HomePage;
