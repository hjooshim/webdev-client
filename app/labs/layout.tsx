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
        <table>
          <tbody>
            <tr>
              <td valign="top" width="100px">
                <TOC />
              </td>
              <td valign="top">{children}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
