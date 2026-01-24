/**
 * useContentQuery - Composable for querying Nuxt Content collections
 * 
 * Automatically determines collection from route name or accepts explicit collection parameter.
 * Supports filtering, ordering, and post-processing transformations.
 * 
 * @param {Object} options - Query configuration
 * @param {string} options.collection - Collection name (auto-detected from route if omitted)
 * @param {Array} options.where - Array of filter conditions: [{field, operator, value}, ...]
 * @param {Object} options.order - Ordering config: {field, direction: 'ASC'|'DESC'}
 * @param {Function} options.transform - Post-processing function to transform results
 * @returns {Object} useAsyncData result with data property
 * 
 * @example
 * // Blog with ordering
 * const { data: posts } = useContentQuery({
 *   order: { field: 'created_at', direction: 'DESC' }
 * })
 * 
 * @example
 * // Photos with where clause and custom sorting
 * const { data: photos } = useContentQuery({
 *   transform: (data) => data.sort((a, b) => 
 *     b.details?.DateTimeOriginal?.localeCompare(a.details?.DateTimeOriginal)
 *   )
 * })
 * 
 * @example
 * // Projects with where clause
 * const { data: projects } = useContentQuery({
 *   where: [{ field: 'title', operator: 'NOT LIKE', value: 'Projects' }]
 * })
 */

import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

interface WhereCondition {
    field: string
    operator: string
    value: unknown
}

interface OrderConfig {
    field: string
    direction?: 'ASC' | 'DESC'
}

interface ContentQueryOptions {
    collection?: string
    where?: WhereCondition[]
    order?: OrderConfig
    transform?: (data: unknown[]) => unknown[]
}

/**
 * useContentItem - Composable for fetching a single content item by path
 * 
 * Automatically determines collection from route name or accepts explicit collection parameter.
 * Uses the current route path to fetch the item.
 * 
 * @param {Object} options - Configuration
 * @param {string} options.collection - Collection name (auto-detected from route if omitted)
 * @param {string} options.path - Content item path (auto-detected from route if omitted)
 * @returns {Object} useAsyncData result with data property containing single item
 * 
 * @example
 * // Auto-detect collection and path from route
 * const { data: post } = useContentItem()
 * 
 * @example
 * // Explicit collection and path
 * const { data: project } = useContentItem({
 *   collection: 'projects',
 *   path: '/projects/my-project'
 * })
 */

interface ContentItemOptions {
    collection?: string
    path?: string,
}

interface ContentPhotoOptions {
    collection?: string
    path?: string,
    before?: number
    after?: number
}

const getCollectionFromRoute = (route): string => {
    const routeName = route.name?.toString() || ''
    if (routeName.startsWith('blog')) return 'blog'
    if (routeName.startsWith('photos')) return 'photos'
    if (routeName.startsWith('projects')) return 'projects'
    return 'content'
}

export const useContentPhoto = (options: ContentPhotoOptions = {}) => {
    const route = useRoute()

    const collectionName = options.collection || getCollectionFromRoute(route)
    const itemPath = options.path || route.path
    const asyncDataKey = `${collectionName}-${itemPath}`

    return useAsyncData(asyncDataKey, async () => {
        const data = { image: null, surround: { before: null, after: null } }
        data.image = await queryCollection(collectionName as any).path(itemPath).first()

        const neighbors = await queryCollectionItemSurroundings(collectionName, itemPath, { fields: ['path'] })
        data.surround.before = neighbors[0]
        data.surround.after = neighbors[1]
        return data
    })
}


export const useContentItem = (options: ContentItemOptions = {}) => {
    const route = useRoute()

    const collectionName = options.collection || getCollectionFromRoute(route)
    const itemPath = options.path || route.path
    const asyncDataKey = `${collectionName}-${itemPath}`

    return useAsyncData(asyncDataKey, async () => {
        return await queryCollection(collectionName as any).path(itemPath).first()
    })
}

export const useContentItemSurrounds = (options: ContentItemOptions = {}) => {
    const route = useRoute()
    const collectionName = options.collection || getCollectionFromRoute(route)
    const itemPath = options.path || route.path
    const asyncDataKey = `${collectionName}-${itemPath}`

    return useAsyncData(asyncDataKey, async () => {
        return await queryCollectionItemSurroundings(collectionName as any, itemPath, {
            before: 1,
            after: 1
        })
    })
}

export const useContentQuery = (options: ContentQueryOptions = {}) => {
    const route = useRoute()

    const collectionName = options.collection || getCollectionFromRoute(route)
    const asyncDataKey = `${collectionName}-${JSON.stringify(options)}`

    return useAsyncData(asyncDataKey, async () => {
        let query = queryCollection(collectionName as any)

        // Apply where clauses
        if (options.where && Array.isArray(options.where)) {
            options.where.forEach(({ field, operator, value }: WhereCondition) => {
                query = query.where(field as any, operator as any, value)
            })
        }

        // Apply ordering
        if (options.order) {
            query = query.order(options.order.field as any, options.order.direction || 'ASC')
        }

        let data = await query.all()

        // Apply post-processing transformation if provided
        if (options.transform && typeof options.transform === 'function') {
            data = options.transform(data) as any
        }

        return data
    })
}
