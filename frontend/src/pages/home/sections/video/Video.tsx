import "./video.scss";
import videoImg from "../../../../images/homepage/video.jpg";
import SectionHeader from "../../../../components/section-header/SectionHeader";

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="inner">
        <SectionHeader title="WHAT'S NEW" />
        <div className="video-img">
          <img src={videoImg} alt="Play video" />
          <button className="play-video-btn">PLAY VIDEO</button>
        </div>
      </div>
    </section>
  );
}
