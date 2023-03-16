import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
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
  Tooltip,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  PencilIcon,
  FolderPlusIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  BellAlertIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import _ from "lodash";
import { useRecoilState } from "recoil";
import {
  EditPartAtom,
  DeletePartAtom,
  RequisitionAtom,
  BarcodeAtom,
} from "../../recoil/RecoilForData";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { v4 as uuidv4 } from "uuid";
import CounterInput from "react-counter-input";
import Barcode from "react-barcode";

const DisplayParts = () => {
  const [Sparepart, setSparepart] = useState();
  const [SparepartDisplay, setSparepartDisplay] = useState();

  const [EditSparepart, setEditSparepart] = useRecoilState(EditPartAtom);
  const [DeletePart, setDeletePart] = useRecoilState(DeletePartAtom);
  const [barcode, setbarcodeAtom] = useRecoilState(BarcodeAtom);

  const [SearchInput, setSearchInput] = useState();

  const [AlartSparepart, setAlartSparepart] = useState();
  const [Bell, setBell] = useState(false);
  const [AlartBell, setAlartBell] = useState(true);

  // Modal
  const [openModalRequistion, setOpenModalRequistion] = useState(false);
  const handleOpenModalRequistion = () =>
    setOpenModalRequistion(!openModalRequistion);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(!openModalDelete);
  const [openModalBarcode, setOpenModalBarcode] = useState(false);
  const handleOpenModalBarcode = () => setOpenModalBarcode(!openModalBarcode);

  // Requistion modal
  const [Requisition, setRequisition] = useRecoilState(RequisitionAtom);

  const [InputRequisition, setInputRequisition] = useState(0);
  const [DisplayValueAmount, setDisplayValueAmount] = useState();

  const [GeneralClerk, setGeneralClerk] = useState();
  const [SelectEMP, setSelectEMP] = useState("");

  const [RequiredEMP, setRequiredEMP] = useState(false);
  const [RequiredInputRequisition, setRequiredInputRequisition] =
    useState(true);

  useEffect(() => {
    axios
      .get("http://[::1]:8000/getSparepart")
      .then(function (response) {
        // handle success
        // console.log("Data Sparepart", response.data);
        setSparepart(response.data);
        setSparepartDisplay(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // Data GeneralClerk
    axios
      .get("http://[::1]:8000/getEmployeeGeneralClerk")
      .then(function (response) {
        // handle success
        // console.log("Data GeneralClerk", response.data);
        setGeneralClerk(response.data);
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
    if (Sparepart !== undefined) {
      let Alart = Sparepart.filter((x) => x.Amount <= x.Amountalart);
      if (Alart.length !== 0) {
        setBell(true);
        setAlartBell(false);
        setAlartSparepart(Alart.length + " " + "เเจ้งเตือน");
      } else {
        setBell(false);
        setAlartBell(true);
      }
    }
  }, [Sparepart]);

  const RounnterToAlartPage = () => {
    router.push("/parts/notifications");
  };

  const searchFunction = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    let arr = _.cloneDeep([...Sparepart]);
    if (value !== "") {
      const results = arr.filter((item) => {
        return item.PartName.toLowerCase().startsWith(value.toLowerCase());
      });
      setSparepartDisplay(results);
    } else {
      setSparepartDisplay(arr);
    }
  };

  const router = useRouter();

  const EditSparepartFN = (
    SubID,
    Image,
    PartName,
    Category,
    PartCode,
    Brand,
    Lock,
    No,
    Amount,
    Amountalart,
    Unit
  ) => {
    let RadioCheckOff;
    let RadioCheckOn;

    if (Amountalart <= 0) {
      RadioCheckOff = true;
      RadioCheckOn = false;
    } else {
      RadioCheckOff = false;
      RadioCheckOn = true;
    }

    const DataForEdit = {
      SubID,
      Image,
      PartName,
      Category,
      PartCode,
      Brand,
      Lock,
      No,
      Amount,
      Amountalart,
      Unit,
      RadioCheckOff,
      RadioCheckOn,
    };
    setEditSparepart(DataForEdit);
    router.push("/parts/edit/");
  };

  const DeleteSpatepartFN = (SubID, PartName) => {
    const DataForDelete = {
      SubID,
      PartName,
    };
    setDeletePart(DataForDelete);
    handleOpenModalDelete();
  };

  const RequisitionFN = (
    SubID,
    PartName,
    Category,
    Brand,
    Amount,
    Unit,
    PartCode,
    Image
  ) => {
    const DataForRequisition = {
      SubID,
      PartName,
      Category,
      Brand,
      Amount,
      Unit,
      PartCode,
      Image,
    };
    setRequisition(DataForRequisition);
    handleOpenModalRequistion();
  };

  const BarcodeFN = (PartName, PartCode) => {
    const DataBarcode = {
      PartName,
      PartCode,
    };
    setbarcodeAtom(DataBarcode);
    handleOpenModalBarcode();
  };

  // Requistion modal
  useEffect(() => {
    if (SelectEMP !== "") {
      setRequiredEMP(false);
    }

    if (InputRequisition !== 0) {
      setRequiredInputRequisition(true);
    }
  }, [SelectEMP, InputRequisition]);

  useEffect(() => {
    setDisplayValueAmount(Requisition.Amount);
  }, [Requisition.Amount]);

  const inputAmountRequire = (count) => {
    setInputRequisition(count);
    let value = Requisition.Amount - count;
    setDisplayValueAmount(value);
  };

  const closeModalRequistion = () => {
    setRequiredEMP(false);
    setRequiredInputRequisition(true);
    setInputRequisition(0);
    setSelectEMP("");
    handleOpenModalRequistion();
  };

  const SubmitModalRequistion = async (e) => {
    e.preventDefault();
    let DataSubID = Requisition.SubID;
    let ObjectSubID = { DataSubID };

    let arr = _.cloneDeep([...Sparepart]);
    let filterPart = arr.filter((x) => x.SubID === Requisition.SubID);
    let PartAmountOld = filterPart.map((x) => x.Amount);
    let PartAmountOldInt = parseInt(PartAmountOld);
    let Amount = PartAmountOldInt - InputRequisition;
    const DataRequisition = {
      Amount,
    };

    // let GetDate1 = new Date().toLocaleString("en-US", {
    //   timeZone: "Asia/Jakarta",
    // });

    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    const DataHistoryRequisition = {
      SubID: Requisition.SubID,
      SubIDRequisition: uuidv4(),
      PartName: Requisition.PartName,
      Category: Requisition.Category,
      Brand: Requisition.Brand,
      RequisitionAmount: InputRequisition,
      Unit: Requisition.Unit,
      PartCode: Requisition.PartCode,
      Image: Requisition.Image,
      year,
      month,
      date,
      hour,
      min,
      sec,
      Status: "เบิกพาร์ท",
      NickName: SelectEMP,
      AmountForReturn: InputRequisition,
    };

    if (SelectEMP === "") {
      setRequiredEMP(true);
    } else {
      if (InputRequisition !== 0) {
        try {
          await axios.post("http://[::1]:8000/findIDSpareparts", ObjectSubID);
          await axios.post(
            "http://[::1]:8000/updateSpareparts",
            DataRequisition
          );
          // History
          await axios.post(
            "http://[::1]:8000/historySparepartPickup",
            DataHistoryRequisition
          );
          axios
            .get("http://[::1]:8000/getSparepart")
            .then(function (response) {
              // handle success
              // console.log("Data Sparepart", response.data);
              setSparepart(response.data);
              setSparepartDisplay(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
          console.log("Requisition to SpareParts Success");
          handleOpenModalRequistion();
        } catch (error) {
          console.log("Requisition to SpareParts Error", error);
        }
      } else {
        // console.log("No InputAmount");
        setRequiredInputRequisition(false);
      }
    }
  };

  // Delete modal
  const SubmitDeleteParts = async (e) => {
    e.preventDefault();
    let DataSubID = DeletePart.SubID;
    let ObjectSubID = { DataSubID };

    try {
      await axios.post("http://[::1]:8000/deleteSpareparts", ObjectSubID);
      axios
        .get("http://[::1]:8000/getSparepart")
        .then(function (response) {
          // handle success
          // console.log("Data Sparepart", response.data);
          setSparepart(response.data);
          setSparepartDisplay(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      console.log("DeleteData to SpareParts Success");
      handleOpenModalDelete();
    } catch (error) {
      console.log("DeleteData to SpareParts Error", error);
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
          <Head>
            <title>ข้อมูลพาร์ท | Spareparts warehouse management </title>
          </Head>

          {Sparepart !== undefined ? (
            <>
              {Sparepart.length <= 0 ? (
                <div className="md:ml-[20rem]">
                  <div className="w-full px-4 pt-24">
                    <div className="h-96 border shadow-md sm:rounded-lg bg-white">
                      <div className="flex justify-center pt-16">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          fill="currentColor"
                          className="bi bi-folder-plus text-blue-800"
                          viewBox="0 0 16 16"
                        >
                          <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                          <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                      </div>

                      <div className="flex justify-center">
                        <Typography variant="h4" className="pt-4 text-black">
                          ข้อมูลพาร์ท
                        </Typography>
                      </div>

                      <div className="flex justify-center pt-2 text-center text-gray-600">
                        <label>
                          โปรดเพิ่มข้อมูลพาร์ท
                          เเละรายละเอียดอะไหล่เพื่อให้สามารถใช้งานระบบการจัดการคลังได้
                        </label>
                      </div>

                      <div className="flex justify-center pt-2">
                        <Link href="/parts/new">
                          <Button
                            size="md"
                            color="green"
                            className="px-12 flex flex-row"
                          >
                            <FolderPlusIcon className="w-4 h-4 opacity-75 mr-1" />
                            เพิ่มข้อมูล
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-12 mb-8 flex flex-col gap-12 md:ml-[20rem] px-0 md:px-12 bg-[#eceff1] pb-12">
                  <div className="w-full">
                    <Link href="/parts/new">
                      <Button
                        size="md"
                        color="green"
                        className="float-right mr-4 md:mr-0 flex flex-row"
                      >
                        <FolderPlusIcon className="w-4 h-4 opacity-75 mr-1" />
                        เพิ่มข้อมูลพาร์ท
                      </Button>
                    </Link>

                    <div className="flex flex-row mt-1 float-right">
                      <Tooltip content="ไม่พบการเเจ้งเตือน">
                        <BellIcon
                          className="w-6 h-6 opacity-75 mr-3 aria-hidden:hidden hover:bg-gray-100 hover:text-gray-500 rounded-lg mt-1 text-gray-700"
                          aria-hidden={Bell}
                        />
                      </Tooltip>

                      <span
                        className="pr-2 text-xs text-red-900 pt-2 aria-hidden:hidden"
                        aria-hidden={AlartBell}
                      >
                        {AlartSparepart}
                      </span>
                      <Tooltip content={"เเจ้งเตือน"}>
                        <BellAlertIcon
                          className="w-6 h-6 opacity-75 mr-3 aria-hidden:hidden cursor-pointer hover:bg-gray-100 hover:text-gray-500 rounded-lg mt-1 text-red-900"
                          aria-hidden={AlartBell}
                          onClick={RounnterToAlartPage}
                        />
                      </Tooltip>
                    </div>
                  </div>
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
                        placeholder="ค้นหา ชื่อพาร์ท..."
                        onChange={searchFunction}
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <Card>
                    <CardHeader
                      variant="gradient"
                      color="teal"
                      className="mb-8 p-6 flex flex-row"
                    >
                      <Typography variant="h6" color="white">
                        ข้อมูลพาร์ท
                      </Typography>
                    </CardHeader>

                    {SparepartDisplay.length > 0 ? (
                      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <span className="text-xs pl-8 font-semibold">
                          พาร์ททั้งหมด : {Sparepart.length}
                        </span>
                        <table className="w-full min-w-[640px] table-auto">
                          <thead>
                            <tr>
                              {[
                                "ชื่อพาร์ท",
                                "หมวดหมู่",
                                "รหัสพาร์ท",
                                "ยี่ห้อ",
                                "ตำเเหน่ง",
                                "จำนวน",
                                "",
                              ].map((el) => (
                                <th
                                  key={el}
                                  className="border-b border-blue-gray-50 py-3 text-center"
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
                            {Sparepart !== undefined ? (
                              <>
                                {SparepartDisplay.map(
                                  (
                                    {
                                      SubID,
                                      Image,
                                      PartName,
                                      Category,
                                      PartCode,
                                      Brand,
                                      Lock,
                                      No,
                                      Amount,
                                      Amountalart,
                                      Unit,
                                    },
                                    key
                                  ) => {
                                    const className = `py-3 px-4 w-[15rem] border text-center ${
                                      key === SparepartDisplay.length
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                      <tr key={key}>
                                        <td className="py-3 px-4 w-[35rem] border text-center border-b border-blue-gray-50">
                                          <div className="flex justify-center">
                                            <img
                                              className="h-32 w-48 rounded-lg "
                                              src={Image}
                                            ></img>
                                          </div>
                                          <Typography className="pt-2 text-xs font-semibold text-blue-gray-600">
                                            {PartName}
                                          </Typography>
                                        </td>

                                        <td className={className}>
                                          <Typography className="text-xs font-semibold text-blue-gray-600">
                                            {Category}
                                          </Typography>
                                        </td>

                                        {PartCode === "" ? (
                                          <>
                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                -
                                              </Typography>
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {PartCode}
                                              </Typography>
                                            </td>
                                          </>
                                        )}

                                        {Brand === "" ? (
                                          <>
                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                -
                                              </Typography>
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Brand}
                                              </Typography>
                                            </td>
                                          </>
                                        )}

                                        <td className={className}>
                                          <span className="text-xs font-semibold text-blue-gray-600 flex flex-row">
                                            ล็อค <p className="pl-[10px]"></p>:{" "}
                                            <p className="font-normal pl-1">
                                              {Lock}
                                            </p>
                                          </span>
                                          <span className="text-xs font-semibold text-blue-gray-600 flex flex-row">
                                            ลำดับ :{" "}
                                            <p className="font-normal pl-1">
                                              {No}
                                            </p>
                                          </span>
                                        </td>

                                        <td className={className}>
                                          <Typography className="text-xs font-semibold text-blue-gray-600">
                                            {Amount} {Unit}
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
                                              <p className="text-center text-red-500">
                                                เเจ้งเตือน
                                              </p>
                                              <p className="text-center pb-2">
                                                จำนวนต่ำกว่าหรือเท่ากับ "
                                                {Amountalart}"
                                              </p>
                                              <MenuItem
                                                className="flex flex-row"
                                                onClick={() =>
                                                  RequisitionFN(
                                                    SubID,
                                                    PartName,
                                                    Category,
                                                    Brand,
                                                    Amount,
                                                    Unit,
                                                    PartCode,
                                                    Image
                                                  )
                                                }
                                              >
                                                <WrenchScrewdriverIcon className="w-4 h-4 opacity-75 mr-1" />
                                                เบิกพาร์ท
                                              </MenuItem>
                                              <MenuItem
                                                className="flex flex-row"
                                                onClick={() =>
                                                  EditSparepartFN(
                                                    SubID,
                                                    Image,
                                                    PartName,
                                                    Category,
                                                    PartCode,
                                                    Brand,
                                                    Lock,
                                                    No,
                                                    Amount,
                                                    Amountalart,
                                                    Unit
                                                  )
                                                }
                                              >
                                                <PencilIcon className="w-4 h-4 opacity-75 mr-1" />
                                                เเก้ไขข้อมูล
                                              </MenuItem>
                                              <MenuItem
                                                className="flex flex-row"
                                                onClick={() =>
                                                  DeleteSpatepartFN(
                                                    SubID,
                                                    PartName
                                                  )
                                                }
                                              >
                                                <TrashIcon className="w-4 h-4 opacity-75 mr-1" />
                                                ลบข้อมูล
                                              </MenuItem>
                                              <MenuItem
                                                className="flex flex-row"
                                                onClick={() =>
                                                  BarcodeFN(PartName, PartCode)
                                                }
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  fill="currentColor"
                                                  className="bi bi-upc w-4 h-4 opacity-75 mr-1"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                                                </svg>
                                                บาร์โค้ด
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
                    ) : (
                      <CardBody className="px-0 pt-0 pb-2">
                        <div className="flex justify-center">
                          <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                        </div>
                        <p className="text-center">ไม่พบการค้นหาชื่อพาร์ท</p>
                        <p className="text-center font-bold truncate">
                          "{SearchInput}"
                        </p>
                      </CardBody>
                    )}
                  </Card>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </main>
      </div>

      {/* Requistion modal */}
      <Dialog
        open={openModalRequistion}
        handler={handleOpenModalRequistion}
        className="w-full min-w-[320px]"
      >
        <div className="flex justify-center py-4 text-black">
          <Typography variant="h5" className="flex flex-row">
            เบิกพาร์ท
          </Typography>
        </div>

        <DialogBody
          className="pt-6 pb-6 w-full min-w-[320px] overflow-auto"
          divider
        >
          <div className="">
            <span className="text-gray-800 font-bold flex flex-row truncate pb-2">
              ชื่อพาร์ท :
              <p className="text-gray-600 font-normal truncate pl-2">
                {Requisition.PartName}
              </p>
            </span>

            <span className="text-gray-800 font-bold flex flex-row truncate pb-2">
              หมวดหมู่ :
              <p className="text-gray-600 font-normal truncate pl-2">
                {Requisition.Category}
              </p>
            </span>

            {Requisition.Brand === "" ? (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">-</p>
              </span>
            ) : (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">
                  {Requisition.Brand}
                </p>
              </span>
            )}

            {Requisition.Amount <= 0 ? (
              <></>
            ) : (
              <div className="flex flex-row">
                <span className="text-gray-800 font-bold flex flex-row truncate pl-6 pb-2 pt-1">
                  ผู้เบิก :
                </span>
                {GeneralClerk !== undefined ? (
                  <>
                    <select
                      label="หมวดหมู่ (เริ่มต้น หมวดหมู่อื่นๆ)"
                      onChange={(e) => setSelectEMP(e.target.value)}
                      className="required:bg-red-100 w-72 mb-2 ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={SelectEMP}
                      required={RequiredEMP}
                    >
                      <option value="">---เลือกผู้เบิก---</option>;
                      {GeneralClerk.map((item, index) => {
                        return (
                          <option key={index} value={item.NickName}>
                            {item.NickName}
                          </option>
                        );
                      })}
                    </select>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}

            <div className="flex flex-row">
              <span className="text-gray-800 font-bold flex flex-row truncate pl-4 pt-3">
                จำนวน :
              </span>
              <div className="ml-2 bg-gray-100 border border-gray-300 shadow-md rounded-md">
                <CounterInput
                  min={0}
                  max={Requisition.Amount}
                  // onCountChange={(count) => console.log(count)}
                  onCountChange={(count) => {
                    inputAmountRequire(count);
                  }}
                  required={true}
                />
              </div>
              {Requisition.Amount <= 0 ? (
                <span className="text-red-500 font-normal truncate pl-4 pt-3">
                  พาร์ทหมด
                </span>
              ) : (
                <span className="text-gray-600 font-normal truncate pl-4 pt-3">
                  มีจำนวนทั้งหมด {DisplayValueAmount} {Requisition.Unit}
                </span>
              )}
            </div>

            <p
              className="text-sm text-red-600 truncate pt-2 pl-[95px] aria-hidden:hidden"
              aria-hidden={RequiredInputRequisition}
            >
              กรอกจำนวน
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={closeModalRequistion}
            className="mr-2"
          >
            <span>ยกเลิก</span>
          </Button>
          {Requisition.Amount <= 0 ? (
            <></>
          ) : (
            <Button
              variant="gradient"
              color="blue"
              onClick={SubmitModalRequistion}
            >
              <span>ยืนยัน</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* Delete modal */}
      <Dialog
        open={openModalDelete}
        handler={handleOpenModalDelete}
        className="w-full min-w-[320px]"
      >
        <div className="flex justify-center py-4 text-black ">
          <Typography variant="h5" className="flex flex-row">
            ลบข้อมูลพาร์ท
          </Typography>
        </div>

        <DialogBody
          className="pt-6 pb-6 w-full min-w-[320px] overflow-auto"
          divider
        >
          <div className="flex flex-col md:flex-row">
            คุณต้องการลบข้อมูลพาร์ทชื่อ{" "}
            <p className="text-gray-800 font-bold px-1">
              "{DeletePart.PartName}"
            </p>{" "}
            หรือไม่
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            className="mr-2"
            onClick={() => handleOpenModalDelete()}
          >
            <span>ยกเลิก</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={SubmitDeleteParts}>
            <span>ยืนยัน</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Barcode modal */}
      <Dialog
        open={openModalBarcode}
        handler={handleOpenModalBarcode}
        className="w-full min-w-[320px]"
      >
        <div className="flex justify-center py-4 text-black ">
          <Typography variant="h5" className="flex flex-row">
            {barcode.PartName}
          </Typography>
        </div>

        <DialogBody
          className="pt-6 pb-6 w-full min-w-[320px] overflow-auto flex justify-center"
          divider
        >
          {barcode.PartCode === "" ? (
            <>
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1 " />
                </div>
                <p className="text-center">ไม่พบบาร์โค้ดของพาร์ท</p>
              </div>
            </>
          ) : (
            <Barcode value={barcode.PartCode} />
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            className="float-left ml-4 bg-gray-300 text-black"
            onClick={() => handleOpenModalBarcode()}
          >
            X
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default DisplayParts;
