export default function YourForm() {
  return (
    <form
      id="wd-your-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h4>Student Profile</h4>

      <h5>Name and ID</h5>
      <label htmlFor="wd-your-first-name">First name:</label>
      <input type="text" defaultValue="Hyunjoo" id="wd-your-first-name" />
      <br />
      <label htmlFor="wd-your-last-name">Last name:</label>
      <input type="text" defaultValue="Shim" id="wd-your-last-name" />
      <br />
      <label htmlFor="wd-your-student-id">Student ID:</label>
      <input
        type="password"
        placeholder="00xxxxxxx"
        title="Your NUID"
        id="wd-your-student-id"
      />

      <h5>About me</h5>
      <label htmlFor="wd-your-bio">Why I am taking this course:</label>
      <br />
      <textarea
        id="wd-your-bio"
        cols={40}
        rows={5}
        defaultValue="I'm from South Korea, and I want to learn the fundamentals of web development in this course."
      />

      <h5>Status</h5>
      <label>Class standing:</label>
      <br />
      <input type="radio" name="your-standing" id="wd-your-freshman" />
      <label htmlFor="wd-your-freshman">Freshman</label>
      <br />
      <input type="radio" name="your-standing" id="wd-your-sophomore" />
      <label htmlFor="wd-your-sophomore">Sophomore</label>
      <br />
      <input type="radio" name="your-standing" id="wd-your-junior" />
      <label htmlFor="wd-your-junior">Junior</label>
      <br />
      <input type="radio" name="your-standing" id="wd-your-senior" />
      <label htmlFor="wd-your-senior">Senior</label>
      <br />
      <input
        type="radio"
        name="your-standing"
        id="wd-your-graduate"
        defaultChecked
      />
      <label htmlFor="wd-your-graduate">Graduate</label>
      <br />
      <label>Enrollment:</label>
      <br />
      <input
        type="radio"
        name="your-enrollment"
        id="wd-your-full-time"
        defaultChecked
      />
      <label htmlFor="wd-your-full-time">Full-time</label>
      <br />
      <input type="radio" name="your-enrollment" id="wd-your-part-time" />
      <label htmlFor="wd-your-part-time">Part-time</label>

      <h5>Interests</h5>
      <input
        type="checkbox"
        name="your-interests"
        id="wd-your-interest-web"
        defaultChecked
      />
      <label htmlFor="wd-your-interest-web">Web development</label>
      <br />
      <input
        type="checkbox"
        name="your-interests"
        id="wd-your-interest-cloud"
        defaultChecked
      />
      <label htmlFor="wd-your-interest-cloud">Cloud computing</label>
      <br />
      <input type="checkbox" name="your-interests" id="wd-your-interest-react" />
      <label htmlFor="wd-your-interest-react">React and Next.js</label>
      <br />
      <input type="checkbox" name="your-interests" id="wd-your-interest-full-stack" />
      <label htmlFor="wd-your-interest-full-stack">Full-stack development</label>

      <h5>Studies</h5>
      <label htmlFor="wd-your-major">Major:</label>
      <br />
      <select id="wd-your-major" defaultValue="CS">
        <option value="CS">Computer Science</option>
        <option value="DS">Data Science</option>
        <option value="IS">Information Systems</option>
        <option value="SE">Software Engineering</option>
      </select>
      <br />
      <label htmlFor="wd-your-topics">Topics to deepen this term:</label>
      <br />
      <select
        multiple
        id="wd-your-topics"
        defaultValue={["REACT", "CLOUD"]}
      >
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JAVASCRIPT">JavaScript</option>
        <option value="REACT">React</option>
        <option value="NODE">Node.js</option>
        <option value="MONGODB">MongoDB</option>
        <option value="CLOUD">Cloud deployment</option>
      </select>

      <h5>Details</h5>
      <label htmlFor="wd-your-email">School email: </label>
      <input
        type="email"
        defaultValue="shim.hy@northeastern.edu"
        placeholder="name@northeastern.edu"
        id="wd-your-email"
      />
      <br />
      <label htmlFor="wd-your-grad-year">Expected graduation year: </label>
      <input
        type="number"
        defaultValue="2027"
        min={2026}
        max={2032}
        id="wd-your-grad-year"
      />
      <br />
      <label htmlFor="wd-your-start-date">Program start date: </label>
      <input
        type="date"
        defaultValue="2025-09-10"
        min="2020-01-01"
        max="2026-12-31"
        id="wd-your-start-date"
      />
      <br />
      <label htmlFor="wd-your-excitement">
        How excited I am about this course (0–10):{" "}
      </label>
      <input
        type="range"
        defaultValue="9"
        min="0"
        max="10"
        id="wd-your-excitement"
      />
      <br />

      <button id="wd-your-form-save" type="submit">
        Save
      </button>
      <button id="wd-your-form-cancel" type="button">
        Cancel
      </button>
    </form>
  );
}
