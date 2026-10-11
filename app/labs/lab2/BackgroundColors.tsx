export default function BackgroundColors() {
    return (
      <div id="wd-css-background-colors">
        <h2 className="wd-bg-color-blue wd-fg-color-white">Background color</h2>
        <p className="wd-bg-color-red wd-fg-color-black">
          This background of this paragraph is red but{" "}
          <span className="wd-bg-color-green wd-fg-color-white">
            the background of this text is green and the foreground white
          </span>
        </p>
        <p id="wd-ai-bg" className="wd-bg-color-yellow wd-fg-color-black">
          Pairing a light background with a dark foreground keeps text
          readable
        </p>
        <p className="wd-bg-color-yellow wd-fg-color-black">
          A yellow background with black text stays easy to read, and{" "}
          <span className="wd-bg-color-gray wd-fg-color-black">
            so does light gray with black text
          </span>
        </p>
      </div>
    );
  }