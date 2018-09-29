import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'

export const showTooltip = ref => ReactTooltip.show(findDOMNode(ref))
export const hideTooltip = ref => ReactTooltip.hide(findDOMNode(ref))
