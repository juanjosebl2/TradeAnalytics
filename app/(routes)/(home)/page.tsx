import { Navbar } from "@/components/Shared/NavBar";
import { Separator } from "@/components/ui/separator";
import { FirstBlock } from "./components/FirstBlock";
import { SliderSymbols } from "./components/SliderSymbols";
import { Features } from "./components/Features";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Separator/>
      <FirstBlock/>
      <SliderSymbols/>
      <Separator/>
      <Features/>
    </div>
  );
}
