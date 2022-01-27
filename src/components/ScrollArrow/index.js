import React, {useState} from 'react'
import {Icon} from 'semantic-ui-react'
import './arrow.css'
const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  window.addEventListener('scroll', checkScrollTop)

  return (
    <Icon
      className="scrollTop"
      onClick={scrollTop}
      style={{
        height: 40,
        color: '#fb088c',
        display: showScroll ? 'flex' : 'none',
      }}
    >
      <i class="arrow up icon"></i>
    </Icon>
  )
}

export default ScrollArrow
