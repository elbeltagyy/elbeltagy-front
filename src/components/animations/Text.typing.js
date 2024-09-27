import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Box } from "@mui/material";

import CursorBlinker from "./CursorBlinker"

export default function TextTyping({ texts = [], delay, cursorColor, duration }) {
    const textIndex = useMotionValue(0);

    const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    const displayText = useTransform(rounded, (latest) => {
        return baseText.get().slice(0, latest)
    }
    );

    const updatedThisRound = useMotionValue(true);

    useEffect(() => {
        animate(count, 60, {
            type: "tween",
            delay: delay,
            duration: duration || 4,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
            onUpdate(latest) {
                if (updatedThisRound.get() === true && latest > 0) {
                    updatedThisRound.set(false);
                } else if (updatedThisRound.get() === false && latest === 0) {
                    if (textIndex.get() === texts.length - 1) {
                        textIndex.set(0);
                    } else {
                        textIndex.set(textIndex.get() + 1);
                    }
                    updatedThisRound.set(true);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <motion.span style={{ display: 'inline-block' }}>{displayText}</motion.span>
        <CursorBlinker cursorColor={cursorColor} />
    </>
}
