export default function VariableTypes() {
  let numberVariable = 123;
  let floatingPointNumber = 234.345;
  let stringVariable = "Hello World!";
  let booleanVariable = true;
  let isNumber = typeof numberVariable;
  let isString = typeof stringVariable;
  let isBoolean = typeof booleanVariable;
  let personalCount = 7;
  let personalLabel = "TypeScript";
  let personalCountType = typeof personalCount;
  let personalLabelType = typeof personalLabel;
  let sampleCount = 42;
  let sampleLabel = "Lab 3";
  let isSampleCount = typeof sampleCount;
  let isSampleLabel = typeof sampleLabel;
  return (
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = {numberVariable} <br />
      floatingPointNumber = {floatingPointNumber} <br />
      stringVariable = {stringVariable} <br />
      booleanVariable = {booleanVariable + ""} <br />
      isNumber = {isNumber} <br />
      isString = {isString} <br />
      isBoolean = {isBoolean} <br />
      personalCount = {personalCount} ({personalCountType}) <br />
      personalLabel = {personalLabel} ({personalLabelType}) <br />
      sampleCount = {sampleCount} ({isSampleCount}) <br />
      sampleLabel = {sampleLabel} ({isSampleLabel})
      <hr />
    </div>
  );
}
