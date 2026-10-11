import "@/app/labs/lab2/tailwind/utilities.css";
import { FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { MdLightbulbOutline } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import { BsGithub } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";

export default function ReactIconsSampler() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4 font-sans">
      <h2 className="text-lg font-semibold">React Icons Sampler</h2>
      <div className="flex gap-3 text-3xl">
        <VscAccount />
        <AiOutlineDashboard />
        <FaBookBible />
        <FaCalendar />
        <FaEnvelopeOpenText />
        <FaRegClock />
        <MdLightbulbOutline id="wd-ai-icon-md" className="text-4xl text-blue-600" />
        <HiAcademicCap id="wd-ai-icon-hi2" className="text-4xl text-blue-600" />
        <BsGithub className="text-5xl text-gray-700" />
        <IoRocketOutline className="text-5xl text-red-500" />
      </div>
    </div>
  );
}