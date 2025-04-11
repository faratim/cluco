import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import SplashScreen from "./Components/SplashScreen";
import { useState, useEffect } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Cluco";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Create a wrapper component that includes the SplashScreen
        const AppWithSplash = () => {
            const [showSplash, setShowSplash] = useState(true);

            // Check if this is the first visit in this session
            useEffect(() => {
                const hasVisited = sessionStorage.getItem("hasVisited");
                if (hasVisited) {
                    setShowSplash(false);
                } else {
                    // Set the flag after the first visit
                    sessionStorage.setItem("hasVisited", "true");
                }
            }, []);

            return (
                <>
                    {showSplash && <SplashScreen />}
                    <App {...props} />
                </>
            );
        };

        root.render(<AppWithSplash />);
    },
    progress: {
        color: "#4B5563",
    },
});
