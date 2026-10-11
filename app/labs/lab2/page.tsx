import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Display from "./Display";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import MediaQueriesDemo from "./MediaQueriesDemo";
import ReactIconsSampler from "./ReactIconsSampler";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <p>
        <a href="/labs/lab2/tailwind">Open Tailwind CSS lab →</a>
      </p>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel right on the
        element. Although it&apos;s very convenient it is considered bad
        practice and you should avoid using the style attribute
      </p>
      <p id="wd-ai-style-attr" style={{ backgroundColor: "purple", color: "white" }}>
        The style attribute accepts an object of CSS properties written in
        camelCase, so background-color becomes backgroundColor
      </p>
      <p style={{ backgroundColor: "green", color: "yellow" }}>
        This is an on your own section which sets a green background
        and yellow foreground text.
      </p>
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the
          elements of the same name, e.g., P, we can refer to a
          specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here&apos;s another paragraph using a different ID and a
          different look and feel
        </p>
        <p id="wd-ai-id-selector">
          An ID must be unique within the page, so an ID selector always
          matches at most one element
        </p>
        <p id="wd-id-selector-3">
          This is an on-your-own section and I add a third paragraph
          with a new id, which is wd-id-selector-3.
        </p>
      </div>
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an
          element&apos;s CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
        <p className="wd-ai-class-selector">
          A class can be reused on any number of elements, unlike an ID
        </p>
        <h4 className="wd-ai-class-selector">
          This heading uses the same class as the paragraph above
        </h4>
        <p className="wd-your-class">
          A second class can be shared by different tags too
        </p>
        <h4 className="wd-your-class">
          This heading shares the wd-your-class look with the paragraph above
        </h4>
      </div>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular
            places in the document
            <p className="wd-selector-3">
              This paragraph&apos;s red background is referenced as
              <br />
              .wd-selector-1 .wd-selector-3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent{" "}
                <em className="wd-selector-5">
                  and this em is a grandchild of .wd-selector-3
                </em>
              </span>
              <br />
              You can combine these relationships to create specific
              styles depending on the document structure
              <br />
              <span className="wd-ai-selector-5">
                This span is matched by .wd-selector-1 .wd-ai-selector-5
              </span>
            </p>
          </div>
        </div>
      </div>
      <div id="wd-css-specificity">
        <h3>Specificity</h3>
        <p
          id="wd-specificity-target"
          className="wd-specificity-class wd-specificity-class-2"
        >
          A tag rule, a class rule, and an ID rule all set this
          paragraph&apos;s background, and the ID rule wins
        </p>
      </div>
      <div id="wd-css-ai-cascade">
        <p id="wd-ai-cascade" className="wd-ai-cascade">
          Tag, class, and ID rules all set this paragraph&apos;s background
          color, and the ID rule has the highest specificity
        </p>
      </div>
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margins />
      <BoxModel />
      <Corners />
      <Dimensions />
      <Display />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <MediaQueriesDemo />
      <ReactIconsSampler />
    </div>
  );
}