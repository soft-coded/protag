import Loader from "../../components/loader/Loader";
import Hero from "./sections/hero/Hero";
import VideoSection from "./sections/video/Video";
import Sales from "./sections/sales/Sales";
import GetApp from "./sections/get-app/GetApp";

export default function Homepage() {
  return (
    <main>
      <Loader />
      <Hero />
      <VideoSection />
      <Sales />
      <GetApp />
    </main>
  );
}
