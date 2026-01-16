import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// 1. استخدام اسم مستعار لـ Chakra Provider لتجنب التكرار
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { store } from './app/store'
// 2. استيراد Redux Provider كاسمه الطبيعي
import { Provider as ReduxProvider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ReduxProvider>
);