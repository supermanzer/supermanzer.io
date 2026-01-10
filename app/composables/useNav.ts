interface Link {
    name: string
    href: string
    active: boolean
}

export const useNav = () => {
    // 1. The State (Equivalent to state)
    // 'navLinks' is a unique key to ensure state is shared
    const links = useState<Link[]>('navLinks', () => [
        { name: "Home", href: "/", active: true },
        { name: "About", href: "/about", active: false },
        { name: "Blog", href: "/blog", active: false },
        { name: "Projects", href: "/projects", active: false },
        { name: "Photos", href: "/photos", active: false },
    ])

    // 2. The Logic (Equivalent to actions)
    const updateActive = (routeName: string) => {
        links.value = links.value.map(link => ({
            ...link,
            active: routeName === 'index'
                ? link.href === '/'
                : routeName.includes(link.name.toLowerCase())
        }))
    }

    // 3. Computed (Equivalent to getters)
    const activeLinks = computed(() => links.value)

    return {
        links,
        activeLinks,
        updateActive
    }
}