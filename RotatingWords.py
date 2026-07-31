import * as React from "react"
import { motion } from "framer-motion"

export default function RotatingWords() {
    const words = ["analyse", "visualize", "grow"]

    // Duplicate first word for seamless looping
    const displayWords = [...words, words[0]]

    const [index, setIndex] = React.useState(0)
    const [animate, setAnimate] = React.useState(true)

    const [fontSize, setFontSize] = React.useState(56)
    const [lineHeight, setLineHeight] = React.useState(64)
    const [height, setHeight] = React.useState(64)

    React.useEffect(() => {
        const update = () => {
            const w = window.innerWidth

            if (w >= 1200) {
                setFontSize(56)
                setLineHeight(64)
                setHeight(64)
            } else if (w >= 810) {
                setFontSize(40)
                setLineHeight(48)
                setHeight(48)
            } else {
                setFontSize(32)
                setLineHeight(40)
                setHeight(40)
            }
        }

        update()

        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1)
        }, 1300) // 1s pause + 0.3s animation

        return () => clearInterval(interval)
    }, [])

    React.useEffect(() => {
        if (index === displayWords.length - 1) {
            const timer = setTimeout(() => {
                setAnimate(false)
                setIndex(0)

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimate(true)
                    })
                })
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [index])

    return (
        <div
            style={{
                width: 260, // Increase if needed
                height,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <motion.div
                animate={{
                    y: -index * height,
                }}
                transition={
                    animate
                        ? {
                              duration: 0.3,
                              ease: "easeOut",
                          }
                        : {
                              duration: 0,
                          }
                }
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {displayWords.map((word, i) => (
                    <div
                        key={i}
                        style={{
                            height,
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize,
                            lineHeight: `${lineHeight}px`,
                            letterSpacing: "0em",
                            color: "#FFF",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {word}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
