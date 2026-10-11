export default function Dimensions() {
    return (
      <div id="wd-css-dimensions">
        <h2>Dimension</h2>
        <div>
          <div className="wd-dimension-portrait wd-bg-color-yellow">Portrait</div>
          <div className="wd-dimension-landscape wd-bg-color-blue wd-fg-color-white">
            Landscape
          </div>
          <div className="wd-dimension-square wd-bg-color-red">Square</div>
          <div id="wd-ai-dimension" className="wd-ai-dimension-box">
            This sentence is far too long to fit inside a box that is only
            120px wide and 60px tall, so it spills out below the yellow area
          </div>
          <div className="wd-dimension-banner wd-bg-color-gray">Banner</div>
        </div>
      </div>
    );
  }