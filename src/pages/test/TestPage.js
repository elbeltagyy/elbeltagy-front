import React, { useEffect, useRef, useState } from 'react'
import { animate, LayoutGroup, motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { Box, Button, Divider } from "@mui/material"
import { FlexColumn } from '../../style/mui/styled/Flexbox'

import { Fm } from "./Fm.js"
import TestDate from './TestDate.jsx'
import { DataGrid } from '@mui/x-data-grid'
import TestAgg from './TestAgg.jsx'

// in framer motion ===> varient and initial and animate to parent 
// only varient for child but has same object properties(keys) in parent

// *** projects FM ***
// 1- typing
// 2- infinite scroll
// 3- in video we see
// 4- pages transitions
// 5- on scroll animation

const btn = {
  backgroundColor: 'green', color: '#fff', transition: '.5s linear', padding: '6px 8px', borderRadius: '8px'
}

const BoxFm = motion(Box)

function TestPage() {


  console.log('hello test')

  const [isTrue, setTrue] = useState(false)

  const list = {
    hidden: { x: -10, opacity: 0 },
    view: {
      x: 10, opacity: 1, transition: {
        staggerChildren: 0.4, type: 'spring'
      }
    }
  }

  const item = {
    hidden: {
      opacity: 0
    },
    view: {
      opacity: 1
    }
  }
  const bgBox = {
    backgroundColor: 'red',
    height: '50%', width: '50%',
    margin: '20px auto', minHeight: '100vh',
  }

  useEffect(() => {
    animate('red', "green", {
      repeat: Infinity,
      onUpdate: (params) => {
        console.log(params)
      }
    })
  }, [])

  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'start start']
  })
  const x = useMotionValue(0)

  const opacity = useTransform(
    x,
    [-100, 0, 100, 200],
    [0, 1, 1, 0]
  )

  const rows = [
    { name: 'mahmoud', _id: 1, age: 20, role: 'tester', hello: 'hellow', test: 'test' },
    { name: 'mahmoud', _id: 2, age: 20, role: 'tester', hello: 'hellow', test: 'test' },
    { name: 'mahmoud', _id: 3, age: 20, role: 'tester', hello: 'hellow', test: 'test' },
    { name: 'mahmoud', _id: 4, age: 20, role: 'tester', hello: 'hellow', test: 'test' },
  ]

  const columns = [
    { headerName: 'name', field: 'name', width: 300 },
    { headerName: 'age', field: 'age', width: 300 },
    { headerName: '_id', field: '_id', width: 300 },
    { headerName: 'role', field: 'role', width: 300 },
    { headerName: 'hello', field: 'hello', width: 300 },
    { headerName: 'test', field: 'test', width: 300 },
  ]
  // x
  // dir
  return <TestAgg />
  return (
    <FlexColumn position={'relative'}>

      <Box minHeight={'100vh'} width={"100%"} p={'20px'}>
        <DataGrid rows={rows} columns={columns}
          getRowId={(param) => param._id}
          loading={true}
        />
      </Box>
      <TestDate />

      <BoxFm ref={targetRef}
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%' }}>

        <BoxFm
          style={{
            opacity
          }}
          sx={{ flexBasis: '40%' }}>
          <h1>Full Stack</h1>
          <p>lorem ipsum</p>
          <Button>start</Button>
        </BoxFm>

        <BoxFm style={{
        }} sx={{ bgcolor: 'green', flexBasis: '40%', height: '250px' }}>
        </BoxFm>
      </BoxFm>

      {/* <BoxFm ref={targetRef} sx={{ minHeight: '200vh', width: '100%', bgcolor: 'white' }} style={{ rotate }}>
        <BoxFm>test me</BoxFm>
        <BoxFm>test me</BoxFm>
      </BoxFm> */}



      <Divider />
      <Button>
        render
      </Button>

      <motion.div style={{
        backgroundColor: 'green',
        height: '500px', width: '500px',
        borderRadius: '8px'
      }}
        animate={{ y: ['50px', 0, '50px'] }}
        transition={{ duration: 10, repeat: Infinity }}

      />


      <motion.div style={{
        scaleX: scrollYProgress,
        backgroundColor: 'red',
        height: '20px', width: '100%',
        position: 'sticky', top: 0, zIndex: '5000',
        borderRadius: '8px'
      }} />

      <motion.ul variants={list} initial='hidden' animate='view' layout onClick={() => setTrue(!isTrue)}>
        <LayoutGroup>
          <motion.li variants={item} layout >user hide</motion.li>
          <motion.li variants={item} layout >{isTrue ? 'true' : 'false'}</motion.li>
          <motion.li variants={item} layout >user</motion.li>
          <motion.li variants={item} layout >user</motion.li>
          <motion.li variants={item} layout >user</motion.li>
        </LayoutGroup>
      </motion.ul>

      <hr />
      <br />
      <motion.div whileHover={{ x: 100 }}> click me </motion.div>
      <motion.div style={bgBox}>1</motion.div>

      <motion.div style={bgBox}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >show in view multiple</motion.div>


      <motion.div style={bgBox}>1</motion.div>

      <motion.div style={bgBox}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}

        viewport={{ once: true }}>inview at once</motion.div>


      <motion.div style={bgBox}>1</motion.div>
    </FlexColumn>
  )
}

export default TestPage




const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <ul>
          <li>heloo</li>
          <li>heloo</li>
          <li>heloo</li>
          <li>heloo</li>
          <li>heloo</li>
        </ul>
      </motion.nav>

      <button onClick={() => setIsOpen(isOpen => !isOpen)}> open </button>

    </>

  )
}