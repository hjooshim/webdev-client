"use client";
import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import CounterBroken from "./CounterBroken";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PropDrilling from "./PropDrilling";
import UrlEncoding from "./UrlEncoding";
import ContextExamples from "./context/ContextExamples";
import ZustandExamples from "./zustand/ZustandExamples";
import ReduxExamples from "./redux/ReduxExamples";
import Effect from "./Effect";
export default function Lab4() {
  return (
    <div id="wd-lab4" className="flex max-w-4xl flex-col gap-8 p-4">
      <h1>Lab 4</h1>
      <nav className="flex gap-4">
        <Link href="/labs/lab4/profile-form">Profile forms</Link>
        <Link href="/labs/lab4/hooks">Custom hooks</Link>
      </nav>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions
        message="Hello from Lab 4"
        theFunction={(message) => alert(message)}
        thePersonalFunction={() => alert("Hyunjoo Shim")}
        theOtherFunction={() => alert("Sample from parent")}
      />
      <CounterBroken />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <PropDrilling />
      <UrlEncoding />
      <ContextExamples />
      <ZustandExamples />
      <ReduxExamples />
      <Effect />
    </div>
  );
}
