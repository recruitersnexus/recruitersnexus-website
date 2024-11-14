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
<<<<<<< HEAD
    
=======
      {/* <Partners/> */}
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
      <div id="why-us">
        <WhyUs />
      </div>
      <div id="experts">
<<<<<<< HEAD
  <OurTeam />
</div>

  <Pricing />

=======
        <OurTeam />
      </div>
      <Pricing />
>>>>>>> baea275b85407d6cc494f7e68aba398acd25d353
      <Testimonial />
      <Faq />
    
      {/* <Footer /> */}
      <ScrollToTopButton />
    </div>
  );
}
