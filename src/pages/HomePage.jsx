import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import HeroScience from '../components/home/HeroScience'
import Services from '../components/home/Services'
import AboutUS from '../components/home/AboutUS'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'

function HomePage() {

    const user = useSelector(s => s.global.user)
    if (user) {
        return <UserHome />
    }
    return (
        <div>
            <Hero />
            <HeroScience />
            <AboutUS />
            <Services />
            <Grades />
        </div>
    )
}

export default HomePage
