const paginate = (array, page, displayedItems) => {
    const startIndex = (page-1)*displayedItems
    return [...array].splice(startIndex, displayedItems)
}

export default paginate