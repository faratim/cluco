// resources/js/Components/SplashScreen.jsx
import React, { useEffect, useState } from "react";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start the fade out animation after 1.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        // Completely hide the component after 2 seconds (500ms for fade animation)
        const hideTimer = setTimeout(() => {
            setVisible(false);
        }, 2000);

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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0e1421] transition-opacity duration-500 ease-in-out ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="text-center">
                <div className="relative">
                    {/* Main logo text with 3D effect */}
                    <div className="text-[#3b82f6] text-8xl md:text-9xl font-bold relative">
                        {/* Shadow layers for 3D effect */}
                        <span className="absolute -left-1 -top-1 text-[#0dc5c1] opacity-30 blur-sm">
                            CLUCO
                        </span>
                        <span className="absolute left-px top-px text-[#0df0e7] opacity-80">
                            CLUCO
                        </span>
                        {/* Main text */}
                        <span className="relative">CLUCO</span>
                    </div>

                    {/* Tagline with fade-in animation */}
                    <div className="text-[#0df0e7] text-2xl md:text-3xl mt-4 animate-fadeIn">
                        The Clue Collective
                    </div>
                </div>
            </div>
        </div>
    );
}
