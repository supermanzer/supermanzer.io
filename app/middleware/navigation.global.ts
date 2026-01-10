// middleware/navigation.global.ts
export default defineNuxtRouteMiddleware((to) => {
    // Access your new useState-based composable
    const { updateActive } = useNav()

    // Use 'name' or 'path' depending on your preference. 
    // 'to.name' is usually safest with Nuxt's named routes.
    const routeName = (to.name as string) || ''

    updateActive(routeName)
})