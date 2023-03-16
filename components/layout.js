import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <div className="grow-0">
        <Navbar />
      </div>

      <div className="flex grow h-screen">
        <Sidebar />
        <main className="w-full h-full bg-[#eceff1]">{children}</main>
      </div>
    </div>
  );
}
