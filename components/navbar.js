import { Bars3Icon } from "@heroicons/react/24/solid";
import logo from "../asset/ptwlogo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { BtnSidebarAtom } from "../recoil/RecoilForData";

const Navbar = () => {
  const [BtnSidebar, setBtnSidebar] = useRecoilState(BtnSidebarAtom);

  const SidebarFN = () => {
    setBtnSidebar(true);
  };
  return (
    <>
      <nav className="absolute px-4 py-4 visible md:invisible">
        <div className="flex flex-row">
          <Bars3Icon
            className="w-10 h-10 opacity-75 mr-1 mt-4 text-gray-800"
            onClick={SidebarFN}
          />
          <Image
            src={logo}
            alt="UserPicture"
            layout="fixed"
            className="object-cover w-28 h-16 mr-4"
          />
        </div>
      </nav>
    </>
  );
};
export default Navbar;
