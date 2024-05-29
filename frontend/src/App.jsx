import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/heroSection";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatSection from "./components/chatSection";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HeroSection />,
    },
    {
        path: "/chat",
        element: <ChatSection />,
    },
]);

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
