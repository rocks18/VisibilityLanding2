import Hero from '../sections/Hero'
import SuccessStories from '../sections/SuccessStories'
import Services from '../sections/Services'
import Process from '../sections/Process'
import TechStack from '../sections/TechStack'
import Clients from '../sections/Clients'
import Contact from '../sections/Contact'

export default function Home() {
    return (
        <>
            <Hero />

            <Services />
            <Process />
            <TechStack />
            <SuccessStories />
            <Clients />
            <Contact />
        </>
    )
}
