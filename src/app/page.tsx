import Hero from "./comps/Hero";
import {OurTeam} from "./comps/OurTeam";
import {WhyUs} from "./comps/WhyUs";
import Faq from "./comps/Faq";
import {Testimonial} from "./comps/Testamonials";
import {HowTo} from "./comps/HowTo";
import Pricing from "./comps/Pricing";
import ScrollToTopButton from "./comps/scrollTop";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <HowTo />
      {/* <Partners/> */}
      <div id="why-us">
        <WhyUs />
      </div>
      <div id="experts">
        <OurTeam />
      </div>
      <Pricing />
      <Testimonial />
      <Faq />
    
      {/* <Footer /> */}
      <ScrollToTopButton />
    </div>
  );
}
