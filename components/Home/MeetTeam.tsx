
import TeamMemberCard from '../reuseable/TeamMemberCard'
import teamMembers from '../../public/data/teamMember.json'
import TitleSubtitle from '../reuseable/TitleSubtitle'

export default function MeetTeam() {
    return (
        <section className='lg:mt-50 md:mt-30 mt-10'>
            <TitleSubtitle title='Meet Our Team Of Experts' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto mt-3'>
                {teamMembers.map((member) => (
                    <TeamMemberCard
                        key={member.name}
                        imageSrc={member.image}
                        name={member.name}
                        role={member.role}
                    />
                ))}
            </div>
        </section>
    )
}
