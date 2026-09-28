export default function Images() {
    return (
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet:
        <br />
        <img
          id="wd-starship"
          width="400px"
          alt="Starship"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        <br />
        Loading a local image:
        <br />
        <img
          id="wd-teslabot"
          src="/images/teslabot.jpg"
          height="200px"
          alt="Tesla Bot (Optimus) humanoid robot"
        />
        <br />
        My favorite Naruto character:
        <br />
        <img
          id="wd-your-image"
          width="200px"
          alt="Sai, a character from Naruto"
          src="https://static.wikia.nocookie.net/naruto/images/0/07/Sai_Infobox.png/revision/latest?cb=20180314110836"
          referrerPolicy="no-referrer"
        />
        <br />
        Sample image from a public URL:
        <br />
        <img
          id="wd-ai-image"
          width="150px"
          alt="HTML5 logo and wordmark"
          src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
        />
      </div>
    );
  }