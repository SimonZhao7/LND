import { useEffect, useState } from "react"

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        const updateMatch = () => setMatches(media.matches)
        window.addEventListener('resize', updateMatch)
        return () => window.removeEventListener('resize', updateMatch)
    }, [query, matches])
    return matches
}