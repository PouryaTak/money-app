export default function fixHeight() {
    const vh = window.innerHeight
    document.documentElement.style.setProperty("--vh", `${vh}px`)
}
