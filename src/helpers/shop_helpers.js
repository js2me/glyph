import _ from 'lodash'

export const filterItems = (items, filter) =>
  _.filter(
    items,
    item =>
      _.compact(_.values(filter)).length
        ? _.reduce(
            filter,
            (valid, value, name) => {
              if (valid) {
                if (!value) {
                  return true
                }
                switch (name) {
                  case 'search':
                    return _.toLower(item.name).includes(_.toLower(value))
                  case 'category':
                    return item.type === value
                }
              }
              return valid
            },
            true
          )
        : true
  )

export const sortItems = (items, { sortBy, sortType }) => {
  switch (sortBy) {
    case 'price':
      const sortedItems = _.sortBy(items, ['price'])
      return sortType === 'asc' ? sortedItems : sortedItems.reverse()
    default:
      return items
  }
}
