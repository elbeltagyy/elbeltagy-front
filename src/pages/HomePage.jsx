import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import HeroScience from '../components/home/HeroScience'
import Services from '../components/home/Services'

import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'
import LatestCourses from '../components/home/LatestCourses'

function HomePage() {

    const user = useSelector(s => s.global.user)

    if (user) {
        return <>
            <SEOHelmetAsync
                title={' الصفحه الرئيسيه - ' + "منصه مستر البلتاجي"}
                desc="منصه مستر البلتاجي للتفوق فى الاحياء و الجيولوجيا والعلوم المتكامله"
                url={window.location.href}
            />

            <UserHome />
        </>
    }
    return (
        <div>
            <SEOHelmetAsync
                title={' الصفحه الرئيسيه - ' + "منصه مستر البلتاجي"}
                desc="منصه مستر البلتاجي للتفوق فى الاحياء و الجيولوجيا والعلوم المتكامله"
                url={window.location.href}
                isSiteLink
            />

            <Hero />
            <LatestCourses />
            <HeroScience />
            {/* <AboutUS /> */}
            <Services />
            <Grades />
        </div>
    )
}

export default HomePage
