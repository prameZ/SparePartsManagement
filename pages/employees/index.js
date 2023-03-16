import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { useRecoilState } from "recoil";
import {
  EditEmployeeAtom,
  DeleteEmployeeAtom,
  LoginAtom,
} from "../../recoil/RecoilForData";
import {
  Card,
  CardHeader,
  CardBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  UserPlusIcon,
  UserMinusIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

export default function DataOfTheEmployees() {
  const [GeneralClerk, setGeneralClerk] = useState();
  const [WarehouseClerk, setWarehouseClerk] = useState();
  const [SearchInput, setSearchInput] = useState();

  // For Search
  const [GeneralClerkNew, setGeneralClerkNew] = useState();

  // Recoil
  const [EditEmployee, setEditEmployee] = useRecoilState(EditEmployeeAtom);
  const [DeleteEmployee, setDeleteEmployee] =
    useRecoilState(DeleteEmployeeAtom);
  const [Login, setLogin] = useRecoilState(LoginAtom);

  // Hidden ลำดับ
  const [HiddenNo, setHiddenNo] = useState(false);

  // Modal Delete
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(!openModalDelete);

  useEffect(() => {
    // Data GeneralClerk
    axios
      .get("http://[::1]:8000/getEmployeeGeneralClerk")
      .then(function (response) {
        // handle success
        setGeneralClerk(response.data);
        setGeneralClerkNew(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // Data WarehouseClerk
    axios
      .get("http://[::1]:8000/getEmployeeWarehouseClerk")
      .then(function (response) {
        // handle success
        setWarehouseClerk(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const searchFunction = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    let arr = _.cloneDeep([...GeneralClerk]);
    if (value !== "") {
      const results = arr.filter((item) => {
        return item.Name.toLowerCase().startsWith(value.toLowerCase());
      });
      setGeneralClerkNew(results);
      setHiddenNo(true);
    } else {
      setGeneralClerkNew(arr);
      setHiddenNo(false);
    }
  };

  const router = useRouter();

  // Edit
  const EditForGeneralClerk = (
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
    router.push("/employees/edit");
  };

  const EditForWarehouseClerk = (
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
    router.push("/employees/edit");
  };

  // Delete
  const DeleteForGeneralClerk = (Name, Surname, SubID, Role) => {
    const DataForEdit = { Name, Surname, SubID, Role };
    setDeleteEmployee(DataForEdit);
    handleOpenModalDelete();
  };

  const DeleteForWarehouseClerk = (Name, Surname, SubID, Role) => {
    const DataForEdit = { Name, Surname, SubID, Role };
    setDeleteEmployee(DataForEdit);
    handleOpenModalDelete();
  };

  const SubmitDelete = async (e) => {
    e.preventDefault();
    let DataSubID = DeleteEmployee.SubID;
    let ObjectDataSubID = { DataSubID };
    let Role = DeleteEmployee.Role;
    if (Role === "พนักงานทั่วไป") {
      try {
        await axios.post("http://[::1]:8000/deleteEmployees", ObjectDataSubID);
        console.log("DeleteData to GeneralClerk Success");
        axios
          .get("http://[::1]:8000/getEmployeeGeneralClerk")
          .then(function (response) {
            // handle success
            setGeneralClerk(response.data);
            setGeneralClerkNew(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        handleOpenModalDelete();
      } catch (error) {
        console.log("DeleteData GeneralClerk Error", error);
      }
    } else if (Role === "พนักงานคลัง") {
      try {
        await axios.post("http://[::1]:8000/deleteEmployees", ObjectDataSubID);
        console.log("DeleteData to WarehouseClerk Success");
        axios
          .get("http://[::1]:8000/getEmployeeWarehouseClerk")
          .then(function (response) {
            // handle success
            setWarehouseClerk(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        handleOpenModalDelete();
      } catch (error) {
        console.log("DeleteData WarehouseClerk Error", error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grow-0">
        <Navbar />
      </div>

      <div className="flex grow h-screen">
        <Sidebar />
        <main className="w-full h-full bg-[#eceff1]">
          <div className="mt-12 mb-8 flex flex-col gap-12 md:ml-[20rem] px-0 md:px-12 bg-[#eceff1] pb-12">
            <Head>
              <title>ข้อมูลพนักงาน | Spareparts warehouse management </title>
            </Head>

            <div className="w-full">
              <Link href="/employees/new">
                <Button
                  size="md"
                  color="green"
                  className="float-right mr-4 md:mr-0 flex flex-row"
                >
                  <UserPlusIcon className="w-4 h-4 opacity-75 mr-1" />
                  เพิ่มข้อมูลพนักงาน
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-8 p-6 flex flex-row"
              >
                <Typography variant="h6" color="white">
                  ข้อมูลพนักงานคลัง
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {[
                        "ชื่อ",
                        "นามสกุล",
                        "ชื่อเล่น",
                        "ชื่อผู้ใช้งาน",
                        "รหัสผ่าน",
                        "",
                      ].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 pl-12 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-600"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {WarehouseClerk !== undefined ? (
                      <>
                        {WarehouseClerk.map(
                          (
                            {
                              Name,
                              Surname,
                              Username,
                              Password,
                              SubID,
                              Role,
                              NickName,
                            },
                            key
                          ) => {
                            const className = `py-3 pl-12 w-[55rem] ${
                              key === WarehouseClerk.length
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={key}>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {Name}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {Surname}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {NickName}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {Username}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {Password}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Menu>
                                    <MenuHandler>
                                      <Typography className="text-xs font-semibold text-blue-600 cursor-pointer hover:text-blue-gray-600 text-center">
                                        ตัวเลือก
                                      </Typography>
                                    </MenuHandler>
                                    <MenuList className="text-xs font-semibold">
                                      <MenuItem
                                        className="flex flex-row"
                                        onClick={() =>
                                          EditForWarehouseClerk(
                                            Name,
                                            Surname,
                                            Username,
                                            Password,
                                            SubID,
                                            Role,
                                            NickName
                                          )
                                        }
                                      >
                                        <PencilIcon className="w-4 h-4 opacity-75 mr-1" />
                                        เเก้ไขข้อมูล
                                      </MenuItem>
                                      {Username !== Login ? (
                                        <MenuItem
                                          className="flex flex-row"
                                          onClick={() =>
                                            DeleteForWarehouseClerk(
                                              Name,
                                              Surname,
                                              SubID,
                                              Role
                                            )
                                          }
                                        >
                                          <UserMinusIcon className="w-4 h-4 opacity-75 mr-1" />
                                          ลบข้อมูล
                                        </MenuItem>
                                      ) : (
                                        <></>
                                      )}
                                    </MenuList>
                                  </Menu>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>

            {GeneralClerk !== undefined ? (
              <>
                {GeneralClerk.length > 0 ? (
                  <>
                    <div className="ml-[1rem] md:ml-[0rem] w-64 md:w-96">
                      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>

                        <input
                          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                          type="text"
                          id="search"
                          placeholder="ค้นหา ชื่อพนักงานทั่วไป..."
                          onChange={searchFunction}
                        />
                      </div>
                    </div>
                    <Card>
                      <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-8 p-6 flex flex-row"
                      >
                        <Typography variant="h6" color="white">
                          ข้อมูลพนักงานทั่วไป
                        </Typography>
                      </CardHeader>

                      {GeneralClerkNew.length > 0 ? (
                        <>
                          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <span className="text-xs pl-8 font-semibold">
                              พนักงานทั่วไปทั้งหมด : {GeneralClerk.length}
                            </span>
                            <table className="w-full min-w-[640px] table-auto">
                              <thead>
                                <tr>
                                  {[
                                    "ชื่อ",
                                    "นามสกุล",
                                    "ชื่อเล่น",
                                    "ชื่อผู้ใช้งาน",
                                    "รหัสผ่าน",
                                    "",
                                  ].map((el) => (
                                    <th
                                      key={el}
                                      className="border-b border-blue-gray-50 py-3 pl-12 text-left"
                                    >
                                      <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-600"
                                      >
                                        {el}
                                      </Typography>
                                    </th>
                                  ))}
                                </tr>
                              </thead>

                              <tbody>
                                {GeneralClerk !== undefined ? (
                                  <>
                                    {GeneralClerkNew.map(
                                      (
                                        {
                                          Name,
                                          Surname,
                                          Username,
                                          Password,
                                          SubID,
                                          Role,
                                          NickName,
                                        },
                                        key
                                      ) => {
                                        const className = `py-3 pl-12 w-[55rem] ${
                                          key === GeneralClerkNew.length
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                        return (
                                          <tr key={key}>
                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Name}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Surname}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {NickName}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Username}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Password}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Menu>
                                                <MenuHandler>
                                                  <Typography className="text-xs font-semibold text-blue-600 cursor-pointer hover:text-blue-gray-600 text-center">
                                                    ตัวเลือก
                                                  </Typography>
                                                </MenuHandler>
                                                <MenuList className="text-xs font-semibold">
                                                  <MenuItem
                                                    className="flex flex-row"
                                                    onClick={() =>
                                                      EditForGeneralClerk(
                                                        Name,
                                                        Surname,
                                                        Username,
                                                        Password,
                                                        SubID,
                                                        Role,
                                                        NickName
                                                      )
                                                    }
                                                  >
                                                    <PencilIcon className="w-4 h-4 opacity-75 mr-1" />
                                                    เเก้ไขข้อมูล
                                                  </MenuItem>
                                                  <MenuItem
                                                    className="flex flex-row"
                                                    onClick={() =>
                                                      DeleteForGeneralClerk(
                                                        Name,
                                                        Surname,
                                                        SubID,
                                                        Role
                                                      )
                                                    }
                                                  >
                                                    <UserMinusIcon className="w-4 h-4 opacity-75 mr-1" />
                                                    ลบข้อมูล
                                                  </MenuItem>
                                                </MenuList>
                                              </Menu>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </tbody>
                            </table>
                          </CardBody>
                        </>
                      ) : (
                        <CardBody className="px-0 pt-0 pb-2">
                          <div className="flex justify-center">
                            <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                          </div>
                          <p className="text-center">
                            ไม่พบการค้นหาชื่อพนักงานทั่วไป
                          </p>
                          <p className="text-center font-bold truncate">
                            "{SearchInput}"
                          </p>
                        </CardBody>
                      )}
                    </Card>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>

      {/* Modal DeleteEmployee */}
      <Dialog
        open={openModalDelete}
        handler={handleOpenModalDelete}
        className="w-full min-w-[320px]"
      >
        <div className="flex justify-center py-4 text-black ">
          <Typography variant="h5" className="flex flex-row">
            ลบข้อมูลพนักงาน
          </Typography>
        </div>

        <DialogBody
          className="pt-6 pb-6 w-full min-w-[320px] overflow-auto"
          divider
        >
          <div className="flex flex-col md:flex-row">
            คุณต้องการลบข้อมูลพนักงานชื่อ{" "}
            <p className="text-gray-800 font-bold px-1">
              "{DeleteEmployee.Name}"
            </p>{" "}
            นามสกุล{" "}
            <p className="text-gray-800 font-bold px-1">
              "{DeleteEmployee.Surname}"
            </p>{" "}
            หรือไม่
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            className="mr-2"
            onClick={handleOpenModalDelete}
          >
            <span>ยกเลิก</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={SubmitDelete}>
            <span>ยืนยัน</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
