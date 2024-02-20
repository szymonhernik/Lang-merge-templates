import { motion } from 'framer-motion'

const AnimatedBorder = ({ isCurrentPath }) => {
  return (
    <motion.div
      className="w-[2px] bg-white"
      initial={{ height: '1px', opacity: 0 }}
      animate={{
        height: isCurrentPath ? '50px' : '1px',
        opacity: isCurrentPath ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    />
  )
}

export default AnimatedBorder
