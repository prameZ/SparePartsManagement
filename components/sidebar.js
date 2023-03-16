import Image from "next/image";
import logo from "../asset/ptwlogo.png";
import user from "../asset/user.jpg";
import {
  RectangleGroupIcon,
  UserGroupIcon,
  ReceiptRefundIcon,
  ClipboardDocumentIcon,
  MinusSmallIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  UserCircleIcon,
  XMarkIcon,
  WrenchIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import {
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import {
  BtnSidebarAtom,
  LoginAtom,
  EditEmployeeAtom,
} from "../recoil/RecoilForData";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [BtnSidebar, setBtnSidebar] = useRecoilState(BtnSidebarAtom);
  const [Login, setLogin] = useRecoilState(LoginAtom);
  const [EditEmployee, setEditEmployee] = useRecoilState(EditEmployeeAtom);
  const [Employees, setEmployees] = useState();
  const [EmployeesData, setEmployeesData] = useState();
  const [EmployeesRole, setEmployeesRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (Login === "") {
      router.push("/login");
    }
  }, [LoginAtom]);

  useEffect(() => {
    axios
      .get("http://[::1]:8000/getEmployees")
      .then(function (response) {
        // handle success
        setEmployees(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    if (Employees !== undefined) {
      let obj = Employees.filter((x) => x.Username === Login);
      setEmployeesData(obj);
      let obj2 = obj.map((x) => x.Role);
      let convertObj2 = String(obj2);
      setEmployeesRole(convertObj2);
    }
  }, [Employees]);

  const SidebarFN = () => {
    setBtnSidebar(false);
  };

  const HomePage = () => {
    router.push("/");
  };

  const Category1 = () => {
    router.push("/parts/category/1");
  };

  const Category2 = () => {
    router.push("/parts/category/2");
  };

  const Category3 = () => {
    router.push("/parts/category/3");
  };

  const Category4 = () => {
    router.push("/parts/category/4");
  };

  const Category5 = () => {
    router.push("/parts/category/5");
  };

  const Category6 = () => {
    router.push("/parts/category/6");
  };

  const Category7 = () => {
    router.push("/parts/category/7");
  };

  const Category8 = () => {
    router.push("/parts/category/8");
  };

  const Category9 = () => {
    router.push("/parts/category/9");
  };

  const PartsPage = () => {
    router.push("/parts");
  };

  const EmployeesPage = () => {
    router.push("/employees");
  };

  const RequisitionPage = () => {
    router.push("/parts/requisition");
  };

  const ReturnPartsPage = () => {
    router.push("/parts/return");
  };

  const HistoryPage = () => {
    router.push("/parts/history");
  };

  const EditDataEmployees = (
    Name,
    Surname,
    Username,
    Password,
    SubID,
    Role,
    NickName
  ) => {
    const DataForEdit = {
      Name,
      Surname,
      Username,
      Password,
      SubID,
      Role,
      NickName,
    };
    setEditEmployee(DataForEdit);
    // router.push("/employees/edit");
    router.push("/account/");
  };

  const Logout = () => {
    setLogin("");
    router.push("/login");
  };

  return (
    <sidebar
      aria-label="Sidebar"
      className="hidden md:block aria-hidden:block"
      aria-hidden={BtnSidebar}
    >
      <div className="flex flex-col justify-between h-screen bg-[#212121] w-[20rem] fixed inset-0 z-50 overflow-auto 2xl:overflow-hidden lg:overflow-auto md:overflow-auto">
        <div className="px-4 py-6">
          <XMarkIcon
            className="block md:hidden w-6 h-6 text-white opacity-75 float-right"
            onClick={SidebarFN}
          />
          <button onClick={HomePage}>
            <Image
              src={logo}
              alt="PtwLogo"
              width="350px"
              height="300px"
              layout="fixed" // layout="fill", layout="intrinsic"
              className="pb-4"
            />
          </button>

          <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1">
            <button
              onClick={HomePage}
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              <HomeIcon className="w-7 h-7 opacity-75" />
              <span className="ml-3 text-lg font-medium"> หน้าหลัก </span>
            </button>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center px-4 py-3 text-white rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                <RectangleGroupIcon className="w-7 h-7 opacity-75" />
                <span className="ml-3 text-lg font-medium">หมวดหมู่พาร์ท</span>
                <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <nav aria-label="Teams Nav" className="mt-1.5 ml-8 flex flex-col">
                <button
                  onClick={Category1}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">สายไฟ</span>
                </button>

                <button
                  onClick={Category2}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">อุปกรณ์ไฟฟ้า</span>
                </button>

                <button
                  onClick={Category3}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">น็อตหรือสกรู</span>
                </button>

                <button
                  onClick={Category4}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">
                    อุปกรณ์นิวเเมติก
                  </span>
                </button>

                <button
                  onClick={Category5}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">มอเตอร์</span>
                </button>

                <button
                  onClick={Category6}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">
                    อลูมิเนียมโปรไฟล์
                  </span>
                </button>

                <button
                  onClick={Category7}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">
                    Standard part misumi
                  </span>
                </button>

                <button
                  onClick={Category8}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">เซนเซอร์</span>
                </button>

                <button
                  onClick={Category9}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <MinusSmallIcon className="w-4 h-4 opacity-75" />
                  <span className="ml-3 text-sm font-medium">อื่นๆ</span>
                </button>
              </nav>
            </details>

            {EmployeesRole !== "พนักงานทั่วไป" ? (
              <>
                <button
                  onClick={PartsPage}
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <WrenchIcon className="w-7 h-7 opacity-75" />
                  <span className="ml-3 text-lg font-medium">ข้อมูลพาร์ท</span>
                </button>
                <button
                  onClick={EmployeesPage}
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <UserGroupIcon className="w-7 h-7 opacity-75" />
                  <span className="ml-3 text-lg font-medium">
                    ข้อมูลพนักงาน
                  </span>
                </button>

                <div className="hidden sm:block">
                  <button
                    onClick={RequisitionPage}
                    className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer w-full"
                  >
                    <WrenchScrewdriverIcon className="w-7 h-7 opacity-75" />
                    <span className="ml-3 text-lg font-medium">
                      เบิกพาร์ทด้วยบาร์โค้ด
                    </span>
                  </button>
                </div>

                <button
                  onClick={ReturnPartsPage}
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <ReceiptRefundIcon className="w-7 h-7 opacity-75" />
                  <span className="ml-3 text-lg font-medium">
                    ทำรายการคืนพาร์ท
                  </span>
                </button>
                <button
                  onClick={HistoryPage}
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <ClipboardDocumentIcon className="w-7 h-7 opacity-75" />
                  <span className="ml-3 text-lg font-medium">
                    ประวัติการเบิกเเละคืนพาร์ท
                  </span>
                </button>
              </>
            ) : (
              <></>
            )}
          </nav>
        </div>

        {EmployeesData !== undefined ? (
          <>
            {EmployeesData.map((item, index) => {
              return (
                <div className="sticky inset-x-0 bottom-0" key={index}>
                  <a className="flex items-center p-4 bg-[#424242] shrink-0">
                    <Image
                      src={user}
                      alt="UserPicture"
                      layout="fixed"
                      className="object-cover w-10 h-10 rounded-full"
                    />

                    <div className="ml-2.5 flex flex-row">
                      <p className="text-xs text-white w-52">
                        <strong className="block font-bold text-sm">
                          {Login}
                        </strong>
                        <span> {item.Role} </span>
                      </p>

                      <div className="mt-1 text-white">
                        <Menu>
                          <Tooltip content="ตั้งค่า">
                            <MenuHandler>
                              <Cog8ToothIcon className="flex w-6 h-6 opacity-75 cursor-pointer hover:bg-gray-100 hover:text-gray-700 rounded-lg" />
                            </MenuHandler>
                          </Tooltip>
                          <MenuList>
                            <MenuItem
                              className="flex flex-row"
                              onClick={() =>
                                EditDataEmployees(
                                  item.Name,
                                  item.Surname,
                                  item.Username,
                                  item.Password,
                                  item.SubID,
                                  item.Role,
                                  item.NickName
                                )
                              }
                            >
                              <UserCircleIcon className="w-4 h-4 opacity-75 mr-1" />
                              ข้อมูลบัญชี
                            </MenuItem>
                            <MenuItem
                              className="flex flex-row"
                              onClick={Logout}
                            >
                              <ArrowLeftOnRectangleIcon className="w-4 h-4 opacity-75 mr-1" />
                              ออกจากระบบ
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </sidebar>
  );
};

export default Sidebar;
