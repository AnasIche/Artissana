import { useEffect, useRef } from "react";
import gsap from "gsap";

const PageNotFound = () => {
    const svgRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const linkRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            svgRef.current,
            { scale: 0.8 },
            { scale: 1, duration: 0.5 }
        );
        
        gsap.fromTo(
            headingRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 0.5 }
        );
        
        gsap.fromTo(
            paragraphRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1 }
        );
        
        gsap.fromTo(
            linkRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1.5 }
        );
    }, []);

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <svg
                    ref={svgRef}
                    viewBox="0 0 541.17206 328.45184"
                    height="200"
                    width="300"
                >
                    <g transform="translate(170.14515,0.038164)">
                        <ellipse
                            ry="9.161705"
                            rx="9.3055239"
                            cy="91.32917"
                            cx="84.963676"
                            style={{ fill: "none", stroke: "black", strokeWidth: "2px" }}
                        />
                        <path
                            d="M 84.98 -0.03 C 85.89 -0.03 86.64 18.47 86.66 41.22 C 86.67 53.83 86.45 65.12 86.1 72.69 C 85.81 78.78 85.44 82.45 85.03 82.45 C 84.62 82.45 84.24 78.78 83.95 72.69 C 83.59 65.12 83.36 53.83 83.35 41.22 C 83.34 18.46 84.07 -0.03 84.98 -0.03 Z"
                            style={{ fill: "black" }}
                        />
                    </g>
                </svg>
                <h1
                    ref={headingRef}
                    className="text-6xl font-bold text-gray-800"
                >
                    404
                </h1>
                <p
                    ref={paragraphRef}
                    className="text-lg text-gray-600"
                >
                    Oops! Page not found.
                </p>
                <a
                    ref={linkRef}
                    href="/"
                    className="mt-5 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                    Go Home
                </a>
            </div>
        </main>
    );
};

export default PageNotFound;
