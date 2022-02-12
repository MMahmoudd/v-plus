export const getFieldByKey = (object, key, fallbackObject) => {
    if (typeof key === 'string') {
        if (object[key]) {
            return object[key]
        } else if (fallbackObject[key]) {
            return fallbackObject[key]
        } else {
            return ''
        }
    } else if (Array.isArray(key)) {
        const result = []
        key.forEach(k => {
            if (object[k]) {
                result.push(object[k])
            } else if (fallbackObject[k]) {
                result.push(fallbackObject[k])
            }
        })

        return result.join(' - ')
    } else {
        throw new Error('لم يتم اختيار اسم للتقرير')
    }
}

export const getKey = (array, findFn, key) => {
    const result = array.find(findFn)
    if (result) {
        return result[key]
    } else {
        throw new Error('لم يتم اختيار اسم للتقرير')
    }
}
