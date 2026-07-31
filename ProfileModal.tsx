import * as React from "react"
import * as ReactDOM from "react-dom" // 1. Imported ReactDOM for Portals
import { addPropertyControls, ControlType } from "framer"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfileModal(props) {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        window.addEventListener("keydown", onKey)

        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
            <img
                src={props.thumbnail}
                onClick={() => setOpen(true)}
                style={{
                    width: props.thumbnailSize,
                    height: props.thumbnailSize,
                    borderRadius: "999px",
                    cursor: "pointer",
                    objectFit: "cover",
                    display: "block",
                }}
            />

            {/* 2. Used ReactDOM.createPortal to inject the modal directly into the body */}
            {typeof document !== "undefined" &&
                ReactDOM.createPortal(
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setOpen(false)}
                                style={{
                                    position: "fixed",
                                    inset: 0,
                                    background: "rgba(0,0,0,.3)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 99999, // High z-index to stay on top
                                }}
                            >
                                <motion.div
                                    initial={{
                                        scale: 0.85,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        scale: 0.85,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={props.image}
                                        style={{
                                            width: props.imageSize,
                                            height: props.imageSize,
                                            borderRadius: "999px",
                                            objectFit: "cover",
                                            display: "block",
                                            boxShadow:
                                                "0 20px 60px rgba(0,0,0,.35)",
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    )
}

ProfileModal.defaultProps = {
    thumbnailSize: 32,
    imageSize: 260,
}

addPropertyControls(ProfileModal, {
    thumbnail: {
        type: ControlType.Image,
        title: "Thumbnail",
    },

    image: {
        type: ControlType.Image,
        title: "Large Image",
    },

    thumbnailSize: {
        type: ControlType.Number,
        title: "Thumb Size",
        min: 20,
        max: 100,
    },

    imageSize: {
        type: ControlType.Number,
        title: "Image Size",
        min: 100,
        max: 500,
    },
})
