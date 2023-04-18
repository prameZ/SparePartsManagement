import {
  CardBody,
  Card,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useRecoilState } from "recoil";
import {
  ReturnPartsAtom,
  ReturnPartSuccesAtom,
} from "../../../recoil/RecoilForData";
import Head from "next/head";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import CounterInput from "react-counter-input";
import { v4 as uuidv4 } from "uuid";

const ReturnParts = () => {
  const [HistorySparepartPickup, setHistorySparepartPickup] = useState();
  const [HistorySparepartPickupDisplay, setHistorySparepartPickupDisplay] =
    useState();
  const [DisplaySortItemPickUp, setDisplaySortItemPickUp] = useState("ปกติ");
  const [SearchInput, setSearchInput] = useState();

  // Modal
  const [openModalReturnParts, setOpenModalReturnParts] = useState(false);
  const handleOpenModalReturnParts = () =>
    setOpenModalReturnParts(!openModalReturnParts);

  // ReturnParts Modal
  const [ReturnParts, setReturnParts] = useRecoilState(ReturnPartsAtom);
  const [InputAmountForReturn, setInputAmountForReturn] = useState(0);
  const [Sparepart, setSparepart] = useState();
  const [HistorySparepartPickup2, setHistorySparepartPickup2] = useState();
  const [DisplayValueAmount, setDisplayValueAmount] = useState();

  //   const [GeneralClerk, setGeneralClerk] = useState();
  //   const [SelectEMP, setSelectEMP] = useState("");

  const [RequiredInputAmountForReturn, setRequiredInputAmountForReturn] =
    useState(true);

  // ReturnParts page Alart
  const [ReturnPartSucces, setReturnPartSucces] =
    useRecoilState(ReturnPartSuccesAtom);

  useEffect(() => {
    axios
      .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartPickupAmountForReturn")
      .then(function (response) {
        // handle success
        setHistorySparepartPickup(response.data);
        setHistorySparepartPickupDisplay(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://blush-seahorse-boot.cyclic.app/getSparepart")
      .then(function (response) {
        // handle success
        setSparepart(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartPickup")
      .then(function (response) {
        // handle success
        setHistorySparepartPickup2(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const LessToMoreItemsPickUp = () => {
    let arr = _.cloneDeep([...HistorySparepartPickupDisplay]);
    let addDate = arr.map((x) => {
      return {
        ...x,
        d: new Date(x.year, x.month, x.date, x.hour, x.min, x.sec),
      };
    });
    const sortedDesc = addDate.sort(
      (objA, objB) => Number(objA.d) - Number(objB.d)
    );
    setHistorySparepartPickupDisplay(sortedDesc);
    setDisplaySortItemPickUp("น้อย-มาก");
  };

  const MoreToLessItemsPickUp = () => {
    let arr = _.cloneDeep([...HistorySparepartPickupDisplay]);
    let addDate = arr.map((x) => {
      return {
        ...x,
        d: new Date(x.year, x.month, x.date, x.hour, x.min, x.sec),
      };
    });
    const sortedDesc = addDate.sort(
      (objA, objB) => Number(objB.d) - Number(objA.d)
    );
    setHistorySparepartPickupDisplay(sortedDesc);
    setDisplaySortItemPickUp("มาก-น้อย");
  };

  const searchFunction = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    let arr = _.cloneDeep([...HistorySparepartPickup]);
    if (value !== "") {
      const results = arr.filter((item) => {
        return item.Forerunner.toLowerCase().startsWith(value.toLowerCase());
      });
      setHistorySparepartPickupDisplay(results);
      setDisplaySortItemPickUp("ปกติ");
    } else {
      setHistorySparepartPickupDisplay(arr);
      setDisplaySortItemPickUp("ปกติ");
    }
  };

  const ReturnSpatepartFN = (
    PartSubID,
    Image,
    PartName,
    Category,
    PartCode,
    Brand,
    year,
    month,
    hour,
    min,
    date,
    sec,
    Status,
    Unit,
    Forerunner,
    AmountForReturn,
    RequisitionAmount,
    SparepartsPickupSubID
  ) => {
    let DataForReturnPart = {
      PartSubID,
      Image,
      PartName,
      Category,
      PartCode,
      Brand,
      year,
      month,
      hour,
      min,
      date,
      sec,
      Status,
      Unit,
      Forerunner,
      AmountForReturn,
      RequisitionAmount,
      SparepartsPickupSubID,
    };
    setReturnParts(DataForReturnPart);
    handleOpenModalReturnParts();
  };

  // ReturnParts Modal
  useEffect(() => {
    if (InputAmountForReturn !== 0) {
      setRequiredInputAmountForReturn(true);
    }
  }, [InputAmountForReturn]);

  useEffect(() => {
    setDisplayValueAmount(ReturnParts.Amount);
  }, [ReturnParts.Amount]);

  const inputAmountRequire = (count) => {
    setInputAmountForReturn(count);
    let value = ReturnParts.AmountForReturn - count;
    setDisplayValueAmount(value);
  };

  const closeModalReturn = () => {
    setRequiredInputAmountForReturn(true);
    setInputAmountForReturn(0);
    handleOpenModalReturnParts();
  };

  const SubmitReturn = async (e) => {
    e.preventDefault();

    let DataPartSubID = ReturnParts.PartSubID;
    let ObjectPartSubID = { DataPartSubID };
    // Update Sparepart Collection
    let arr = _.cloneDeep([...Sparepart]);
    let filterPart = arr.filter((x) => x.PartSubID === ReturnParts.PartSubID);
    let PartAmountOld = filterPart.map((x) => x.Amount);
    let PartAmountOldInt = parseInt(PartAmountOld);
    let Amount = PartAmountOldInt + InputAmountForReturn;
    const DataAmountReturn = {
      Amount,
    };

    let DataPartSubID2 = ReturnParts.SparepartsPickupSubID;
    let ObjectPartSubID2 = { DataPartSubID2 };
    // Update HistorySparepartPickup Collection
    let arr2 = _.cloneDeep([...HistorySparepartPickup2]);
    let filterPart2 = arr2.filter(
      (x) => x.SparepartsPickupSubID === ReturnParts.SparepartsPickupSubID
    );
    let AmountForReturnOld2 = filterPart2.map((x) => x.AmountForReturn);
    let AmountForReturnOldInt2 = parseInt(AmountForReturnOld2);
    let Amount2 = AmountForReturnOldInt2 - InputAmountForReturn;

    const DataAmountReturn2 = {
      AmountForReturn: Amount2,
    };
    //   AmountForReturn: ReturnParts.AmountForReturn - InputAmountForReturn,

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

    const DataHistoryReturn = {
      PartSubID: ReturnParts.SubID,
      SparepartsReturnSubID: uuidv4(),
      PartName: ReturnParts.PartName,
      Category: ReturnParts.Category,
      Brand: ReturnParts.Brand,
      ReturnAmount: InputAmountForReturn,
      Unit: ReturnParts.Unit,
      PartCode: ReturnParts.PartCode,
      Image: ReturnParts.Image,
      year,
      month,
      date,
      hour,
      min,
      sec,
      Oldyear: ReturnParts.year,
      Oldmonth: ReturnParts.month,
      Olddate: ReturnParts.date,
      Oldhour: ReturnParts.hour,
      Oldmin: ReturnParts.min,
      Oldsec: ReturnParts.sec,
      AmountForReturn: Amount2,
      RequisitionAmount: ReturnParts.RequisitionAmount,
      Status: "คืนพาร์ท",
      Forerunner: ReturnParts.Forerunner,
    };

    if (InputAmountForReturn !== 0) {
      try {
        // Update Spareparts Amount
        await axios.post("https://blush-seahorse-boot.cyclic.app/findIDSpareparts", ObjectPartSubID);
        await axios.post(
          "https://blush-seahorse-boot.cyclic.app/updateSpareparts",
          DataAmountReturn
        );

        // Update HistorySparepartPickup
        await axios.post(
          "https://blush-seahorse-boot.cyclic.app/findIDSparepartPickup",
          ObjectPartSubID2
        );
        await axios.post(
          "https://blush-seahorse-boot.cyclic.app/updateSparepartPickup",
          DataAmountReturn2
        );

        // History Add
        await axios.post(
          "https://blush-seahorse-boot.cyclic.app/historySparepartReturn",
          DataHistoryReturn
        );
        axios
          .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartPickupAmountForReturn")
          .then(function (response) {
            // handle success
            setHistorySparepartPickup(response.data);
            setHistorySparepartPickupDisplay(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

        axios
          .get("https://blush-seahorse-boot.cyclic.app/getSparepart")
          .then(function (response) {
            // handle success
            setSparepart(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

        axios
          .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartPickup")
          .then(function (response) {
            // handle success
            setHistorySparepartPickup2(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        console.log("ReturnAmount to SpareParts Success");
        handleOpenModalReturnParts();
        setReturnPartSucces(true);
      } catch (error) {
        console.log("ReturnAmount to SpareParts Error", error);
      }
    } else {
      //   console.log("No InputAmount");
      setRequiredInputAmountForReturn(false);
    }
  };

  const d = new Date(ReturnParts.year, ReturnParts.month, ReturnParts.date);

  const resultDay = d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col">
      <div className="grow-0">
        <Navbar />
      </div>

      <div className="flex grow h-screen">
        <Sidebar />
        <main className="w-full h-full bg-[#eceff1]">
          <Head>
            <title>ทำรายการคืนพาร์ท | Spareparts warehouse management </title>
          </Head>

          {HistorySparepartPickup !== undefined ? (
            <>
              {HistorySparepartPickup.length !== 0 ? (
                <div className="md:ml-[20rem] bg-[#eceff1] pt-32 px-0 md:px-12 pb-12">
                  <div className="w-64 md:w-96 pb-12 ml-4 sm:ml-0">
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-gray-200">
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
                        placeholder="ค้นหา ชื่อผู้เบิก..."
                        onChange={searchFunction}
                        maxLength={20}
                      />
                    </div>
                  </div>

                  <Card>
                    <CardHeader
                      variant="gradient"
                      color="green"
                      className="mb-8 p-6 flex flex-row"
                    >
                      <Typography variant="h6" color="white">
                        คืนพาร์ท
                      </Typography>
                    </CardHeader>

                    {HistorySparepartPickupDisplay !== undefined ? (
                      <>
                        {HistorySparepartPickupDisplay.length <= 0 ? (
                          <CardBody className="px-0 pt-0 pb-2">
                            <div className="flex justify-center">
                              <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                            </div>
                            <p className="text-center">ไม่พบชื่อผู้เบิก</p>
                            <p className="text-center">"{SearchInput}"</p>
                          </CardBody>
                        ) : (
                          <CardBody className="overflow-x-scroll px-0 pt-2 pb-2">
                            <Menu placement="bottom-start">
                              <MenuHandler>
                                <Typography className="text-md font-bold cursor-pointer hover:text-blue-600 w-64 pl-6">
                                  เรียงตาม วันเวลาเบิก : {DisplaySortItemPickUp}
                                </Typography>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem onClick={LessToMoreItemsPickUp}>
                                  วันเวลา : น้อย-มาก
                                </MenuItem>
                                <MenuItem onClick={MoreToLessItemsPickUp}>
                                  วันเวลา : มาก-น้อย
                                </MenuItem>
                              </MenuList>
                            </Menu>

                            {HistorySparepartPickupDisplay.length > 0 ? (
                              <>
                                <span className="text-xs font-semibold pl-6 text-gray-500">
                                  ทั้งหมด :{" "}
                                  {HistorySparepartPickupDisplay.length}
                                </span>
                                <table className="w-full min-w-[640px] table-auto">
                                  <thead>
                                    <tr>
                                      {[
                                        "ชื่อพาร์ท",
                                        "หมวดหมู่",
                                        "รหัสพาร์ท",
                                        "ยี่ห้อ",
                                        "ผู้เบิก",
                                        "เบิกจำนวน",
                                        "คืนได้จำนวน",
                                        "วัน-เวลา เบิก",
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
                                    {HistorySparepartPickupDisplay.map(
                                      (
                                        {
                                          PartSubID,
                                          Image,
                                          PartName,
                                          Category,
                                          PartCode,
                                          Brand,
                                          RequisitionAmount,
                                          year,
                                          month,
                                          hour,
                                          min,
                                          date,
                                          sec,
                                          Status,
                                          Unit,
                                          Forerunner,
                                          AmountForReturn,
                                          SparepartsPickupSubID,
                                        },
                                        key
                                      ) => {
                                        const className = `py-3 px-4 w-[15rem] border text-center ${
                                          key ===
                                          HistorySparepartPickupDisplay.length
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                        const d = new Date(year, month, date);

                                        const resultDay = d.toLocaleDateString(
                                          "th-TH",
                                          {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          }
                                        );

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
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {Forerunner}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {RequisitionAmount} {Unit}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {AmountForReturn} {Unit}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {resultDay}
                                              </Typography>
                                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                                เวลา : {hour}:{min}:{sec}
                                              </Typography>
                                            </td>

                                            <td className={className}>
                                              {AmountForReturn !== 0 ? (
                                                <div className="flex justify-center">
                                                  <Button
                                                    size="sm"
                                                    variant="text"
                                                    color="blue"
                                                    onClick={() =>
                                                      ReturnSpatepartFN(
                                                        PartSubID,
                                                        Image,
                                                        PartName,
                                                        Category,
                                                        PartCode,
                                                        Brand,
                                                        year,
                                                        month,
                                                        hour,
                                                        min,
                                                        date,
                                                        sec,
                                                        Status,
                                                        Unit,
                                                        Forerunner,
                                                        AmountForReturn,
                                                        RequisitionAmount,
                                                        SparepartsPickupSubID
                                                      )
                                                    }
                                                  >
                                                    คืนพาร์ท
                                                  </Button>
                                                </div>
                                              ) : (
                                                <div className="flex justify-center">
                                                  <span className="text-red-600 font-bold">
                                                    คืนพาร์ทหมดเเล้ว
                                                  </span>
                                                </div>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <div className="px-0 pt-0 pb-2">
                                <div className="flex justify-center">
                                  <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                                </div>
                                <p className="text-center">
                                  ไม่พบการค้นหาชื่อพาร์ท
                                </p>
                                <p className="text-center font-bold truncate">
                                  "{SearchInputPickUp}"
                                </p>
                              </div>
                            )}
                          </CardBody>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Card>
                </div>
              ) : (
                <div className="flex h-screen md:ml-[20rem] bg-[#eceff1]">
                  <div className="m-auto">
                    <XCircleIcon className="w-24 h-24 opacity-25 ml-10" />
                    <p className="font-bold text-gray-600 text-center">
                      ไม่พบข้อมูลการเบิกพาร์ท
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </main>
      </div>

      {/* ReturnParts Modal */}
      <Dialog
        open={openModalReturnParts}
        handler={handleOpenModalReturnParts}
        className="w-full min-w-[320px]"
      >
        <div className="flex justify-center py-4 text-black">
          <Typography variant="h5" className="flex flex-row">
            คืนพาร์ท
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
                {ReturnParts.PartName}
              </p>
            </span>

            <span className="text-gray-800 font-bold flex flex-row truncate pb-2">
              หมวดหมู่ :
              <p className="text-gray-600 font-normal truncate pl-2">
                {ReturnParts.Category}
              </p>
            </span>

            {ReturnParts.Brand === "" ? (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">-</p>
              </span>
            ) : (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">
                  {ReturnParts.Brand}
                </p>
              </span>
            )}

            <span className="text-gray-800 font-bold flex flex-row truncate pb-2 pl-8">
              ผู้คืน :
              <p className="text-gray-600 font-normal truncate pl-2">
                {ReturnParts.Forerunner}
              </p>
            </span>

            <div className="flex flex-row">
              <span className="text-gray-800 font-bold flex flex-row truncate pb-2 pl-2">
                วันที่เบิก :
                <p className="text-gray-600 font-normal truncate pl-1.5">
                  {resultDay}
                </p>
              </span>

              <span className="text-gray-800 font-bold flex flex-row truncate pb-2 pl-2">
                เวลา :
                <p className="text-gray-600 font-normal truncate pl-1.5">
                  {ReturnParts.hour}:{ReturnParts.min}:{ReturnParts.sec}
                </p>
              </span>
            </div>

            <div className="flex flex-row">
              <span className="text-gray-800 font-bold flex flex-row truncate pl-4 pt-3">
                จำนวน :
              </span>
              <div className="ml-2 bg-gray-100 border border-gray-300 shadow-md rounded-md">
                <CounterInput
                  min={0}
                  max={ReturnParts.AmountForReturn}
                  // onCountChange={(count) => console.log(count)}
                  onCountChange={(count) => {
                    inputAmountRequire(count);
                  }}
                />
              </div>

              <span className="text-gray-600 font-normal truncate pl-4 pt-3">
                จำนวนทั้งหมด {DisplayValueAmount} {ReturnParts.Unit}
              </span>
            </div>

            <p
              className="text-sm text-red-600 truncate pt-2 pl-[95px] aria-hidden:hidden"
              aria-hidden={RequiredInputAmountForReturn}
            >
              กรอกจำนวน
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            className="mr-2"
            onClick={closeModalReturn}
          >
            <span>ยกเลิก</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={SubmitReturn}>
            <span>ยืนยัน</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default ReturnParts;
