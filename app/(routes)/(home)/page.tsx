import { Navbar } from "@/components/Shared/NavBar";
import { Separator } from "@/components/ui/separator";
import { FirstBlock } from "./components/FirstBlock";
import { SliderSymbols } from "./components/SliderSymbols";
import { Features } from "./components/Features";
import { OurStrategies } from "./components/OurStrategies";
import { ProbeToday } from "./components/ProbeToday";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Separator/>
      <FirstBlock/>
      <SliderSymbols/>
      <Separator/>
      <Features/>
      <Separator/>
      <OurStrategies/>
      <Separator/>
      <ProbeToday/>
      <Separator/>
      <Contact/>
    </div>
  );
}
