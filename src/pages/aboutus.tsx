import About from "../Components/About";
import Seo from "@/Components/Seo";

export default function AboutUs(){
    return(
        <div>
            <Seo
              title="About Attri Industries"
              description="Learn about Attri Industries — our mission for 100% natural, Ayurvedic personal care and the direct-selling opportunity we offer across India."
              path="/aboutus"
            />
            <About/>
        </div>
    )
}