// resources/js/Components/SplashScreen.jsx
import React, { useEffect, useState } from "react";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start the fade out animation after 1.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2250);
        // Completely hide the component after 2 seconds (500ms for fade animation)
        const hideTimer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        // Clean up the timers if component unmounts
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Return null once the splash screen is no longer visible
    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#29262E] transition-opacity duration-500 ease-in-out ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
            id="splash-screen"
        >
            <div className="flex flex-col items-center justify-center w-full h-full px-6">
                {/* Use an image with much larger maximum size on bigger screens */}
                <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
                    <img
                        src="/images/cluco-logo.png"
                        alt="CLUCO - The Clue Collective"
                        className="w-full h-auto"
                        onError={(e) => {
                            // Fallback to text if image fails to load
                            e.target.style.display = "none";
                            document.getElementById(
                                "fallback-logo"
                            ).style.display = "block";
                        }}
                    />

                    {/* Fallback if image fails to load */}
                    <div
                        id="fallback-logo"
                        style={{ display: "none" }}
                        className="text-center"
                    >
                        <div className="text-[#517DC7] text-8xl md:text-9xl font-bold relative">
                            <span className="absolute -left-1 -top-1 text-[#0dc5c1] opacity-30 blur-sm">
                                CLUCO
                            </span>
                            <span className="absolute left-px top-px text-[#0df0e7] opacity-80">
                                CLUCO
                            </span>
                            <span className="relative">CLUCO</span>
                        </div>
                        <div className="text-[#0df0e7] text-2xl md:text-3xl mt-4 animate-fadeIn">
                            The Clue Collective
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
