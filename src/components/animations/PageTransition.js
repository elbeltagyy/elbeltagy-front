import React from 'react'
import { motion } from 'framer-motion'



const pageVarient = {
    hidden: {
        opacity: 0,
        scaleY: 0
    },
    visible: {
        opacity: 1,
        scaleY: 1,
        transition: {
            duration: 1
        }
    }
}



function PageTransition( Compo ) {
    return (
        <motion.div variants={pageVarient} animate='visible' initial='hidden' exit={'hidden'}>
            <Compo />
        </motion.div>
    )
}

export default PageTransition
