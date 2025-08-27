import { defineStore } from "pinia";

interface Link {
    name: string,
    href: string,
    active: boolean,
}

interface State {
    links: Array<Link>
}

export const useNavStore = defineStore('navStore', {
    state: (): State => ({
        links: [
            { name: "Home", href: "/", active: true },
            { name: "About", href: "/about", active: false },
            { name: "Blog", href: "/blog", active: false },
            { name: "Projects", href: "/projects", active: false },
            { name: "Photos", href: "/photos", active: false },
            { name: "Stripe", href: "/stripe", active: false },
        ]
    }),
    getters: {
        getLinks: (state) => {
            return state.links
        },
    },
    actions: {
        updateActive(routeName: string) {
            this.links.map(
                link => ({
                    ...link,
                    f: link.active = routeName.includes(link.name.toLowerCase())
                })
            )
        }
    }
})