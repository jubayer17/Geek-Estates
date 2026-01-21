"use client"
import { motion, Variants, easeOut, useInView } from 'framer-motion'
import { useRef } from 'react'
import TeamMemberCard from '../reuseable/TeamMemberCard'
import teamMembers from '../../public/data/teamMember.json'
import TitleSubtitle from '../reuseable/TitleSubtitle'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

export default function MeetTeam() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2 })

  return (
    <section className="lg:mt-50 md:mt-30 mt-10">
      <TitleSubtitle
        title="Meet Our Team Of Experts"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto mt-3"
        variants={containerVariants}
        animate={isInView ? 'visible' : 'hidden'} // 👈 reset + reanimate
        initial="hidden"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.name} variants={itemVariants}>
            <TeamMemberCard
              imageSrc={member.image}
              name={member.name}
              role={member.role}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

