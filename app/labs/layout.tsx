import { ReactNode } from "react";
import "../(kambaz)/kambaz.css";
import KambazNavigation from "../(kambaz)/Navigation";
import TOC from "./TOC";
export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[100px]" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td valign="top" className="w-[100px]">
                <TOC />
              </td>
              <td valign="top" className="min-w-0">
                <div className="min-w-0 overflow-x-auto">{children}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
