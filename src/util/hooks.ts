import { debounce as db, throttle as th } from "lodash";
import { RefObject, useEffect, useRef, useState } from "react";

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        var handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollPosition;
}

export function useWindowSize() {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        var updateSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}

export function useHasWindow() {
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") setHasWindow(true);
    }, []);

    return hasWindow;
}

export function useContainerSize<T extends HTMLElement>(
    ref: RefObject<T>,
    throttle: number = 0,
) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        var updateDimensions = () => {
            if (ref.current) {
                setDimensions({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        };

        if (throttle > 0) {
            updateDimensions = th(updateDimensions, throttle);
        }

        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [ref, throttle]);

    return dimensions;
}

export function useIsVisible<T extends HTMLElement | null | undefined>(
    ref: RefObject<T>,
    threshold = 1,
) {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        let observerRef = null;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: threshold,
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
            observerRef = ref.current;
        }

        return () => {
            if (observerRef) {
                observer.unobserve(observerRef);
            }
        };
    }, [ref, threshold]);

    return isVisible;
}
