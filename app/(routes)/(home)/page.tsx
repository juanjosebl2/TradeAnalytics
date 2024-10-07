import { Navbar } from "@/components/Shared/NavBar";
import { Separator } from "@/components/ui/separator";
import { FirstBlock } from "./components/FirstBlock";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Separator/>
      <FirstBlock/>
    </div>
  );
}
