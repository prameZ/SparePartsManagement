import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  CardBody,
  Card,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {
  QuestionMarkCircleIcon,
  ReceiptRefundIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import Head from "next/head";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";

const History = () => {
  // /////////////////////////////// History Spareparts Pickup ///////////////////////////////
  const [HistorySparepartPickup, setHistorySparepartPickup] = useState();
  const [HistorySparepartPickupDisplay, setHistorySparepartPickupDisplay] =
    useState();
  const [DisplaySortItemPickUp, setDisplaySortItemPickUp] = useState("ปกติ");
  const [SearchInputPickUp, setSearchInputPickUp] = useState();

  // /////////////////////////////// History Spareparts Return ///////////////////////////////
  const [HistorySparepartReturn, setHistorySparepartReturn] = useState();
  const [HistorySparepartReturnDisplay, setHistorySparepartReturnDisplay] =
    useState();
  const [DisplaySortItemReturn, setDisplaySortItemReturn] = useState("ปกติ");
  const [SearchInputReturn, setSearchInputReturn] = useState();

  useEffect(() => {
    axios
      .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartPickup")
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
      .get("https://blush-seahorse-boot.cyclic.app/gethistorySparepartReturn")
      .then(function (response) {
        // handle success
        setHistorySparepartReturn(response.data);
        setHistorySparepartReturnDisplay(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  // /////////////////////////////// History Spareparts Pickup ///////////////////////////////
  const searchFunctionPickUp = (e) => {
    const { value } = e.target;
    setSearchInputPickUp(value);
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

  // /////////////////////////////// History Spareparts Return ///////////////////////////////
  const searchFunctionReturn = (e) => {
    const { value } = e.target;
    setSearchInputReturn(value);
    let arr = _.cloneDeep([...HistorySparepartReturn]);
    if (value !== "") {
      const results = arr.filter((item) => {
        return item.Forerunner.toLowerCase().startsWith(value.toLowerCase());
      });
      setHistorySparepartReturnDisplay(results);
      setDisplaySortItemReturn("ปกติ");
    } else {
      setHistorySparepartReturnDisplay(arr);
      setDisplaySortItemReturn("ปกติ");
    }
  };

  const LessToMoreItemsReturn = () => {
    let arr = _.cloneDeep([...HistorySparepartReturnDisplay]);
    let addDate = arr.map((x) => {
      return {
        ...x,
        d: new Date(x.year, x.month, x.date, x.hour, x.min, x.sec),
      };
    });
    const sortedDesc = addDate.sort(
      (objA, objB) => Number(objA.d) - Number(objB.d)
    );
    setHistorySparepartReturnDisplay(sortedDesc);
    setDisplaySortItemReturn("น้อย-มาก");
  };

  const MoreToLessItemsReturn = () => {
    let arr = _.cloneDeep([...HistorySparepartReturnDisplay]);
    let addDate = arr.map((x) => {
      return {
        ...x,
        d: new Date(x.year, x.month, x.date, x.hour, x.min, x.sec),
      };
    });
    const sortedDesc = addDate.sort(
      (objA, objB) => Number(objB.d) - Number(objA.d)
    );
    setHistorySparepartReturnDisplay(sortedDesc);
    setDisplaySortItemReturn("มาก-น้อย");
  };

  const data = [
    {
      label: "เบิกพาร์ท",
      value: "PickUp",
      desc: (
        <>
          {HistorySparepartPickup !== undefined ? (
            <>
              {HistorySparepartPickup.length !== 0 ? (
                <>
                  <div className="w-64 md:w-96 pb-4">
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
                        onChange={searchFunctionPickUp}
                        maxLength={20}
                      />
                    </div>
                  </div>

                  {HistorySparepartPickupDisplay !== undefined ? (
                    <>
                      {HistorySparepartPickupDisplay.length <= 0 ? (
                        <CardBody className="px-0 pt-0 pb-2">
                          <div className="flex justify-center">
                            <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                          </div>
                          <p className="text-center">ไม่พบชื่อผู้เบิก</p>
                          <p className="text-center">"{SearchInputPickUp}"</p>
                        </CardBody>
                      ) : (
                        <>
                          {HistorySparepartPickupDisplay.length > 0 ? (
                            <>
                              <Menu placement="bottom-start">
                                <MenuHandler>
                                  <Typography className="text-md font-bold cursor-pointer hover:text-blue-600 w-64">
                                    เรียงตาม วันเวลาเบิก :{" "}
                                    {DisplaySortItemPickUp}
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

                              <span className="text-xs font-semibold text-gray-500">
                                ทั้งหมด : {HistorySparepartPickupDisplay.length}
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
                                      "วัน-เวลา เบิก",
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
                                              {resultDay}
                                            </Typography>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                              เวลา : {hour}:{min}:{sec}
                                            </Typography>
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
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="flex h-screen">
                  <div className="m-auto">
                    <XCircleIcon className="w-24 h-24 opacity-25 ml-7" />
                    <p className="font-bold text-gray-600 text-center">
                      ไม่พบข้อมูลเบิกพาร์ท
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },

    {
      label: "คืนพาร์ท",
      value: "Return",
      desc: (
        <>
          {HistorySparepartReturn !== undefined ? (
            <>
              {HistorySparepartReturn.length !== 0 ? (
                <>
                  <div className="w-64 md:w-96 pb-4">
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
                        onChange={searchFunctionReturn}
                        maxLength={20}
                      />
                    </div>
                  </div>

                  {HistorySparepartReturnDisplay !== undefined ? (
                    <>
                      {HistorySparepartReturnDisplay.length <= 0 ? (
                        <CardBody className="px-0 pt-0 pb-2">
                          <div className="flex justify-center">
                            <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                          </div>
                          <p className="text-center">ไม่พบชื่อผู้เบิก</p>
                          <p className="text-center">"{SearchInputReturn}"</p>
                        </CardBody>
                      ) : (
                        <>
                          {HistorySparepartReturnDisplay.length > 0 ? (
                            <>
                              <Menu placement="bottom-start">
                                <MenuHandler>
                                  <Typography className="text-md font-bold cursor-pointer hover:text-blue-600 w-64">
                                    เรียงตาม วันเวลาคืน :{" "}
                                    {DisplaySortItemReturn}
                                  </Typography>
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem onClick={LessToMoreItemsReturn}>
                                    วันเวลา : น้อย-มาก
                                  </MenuItem>
                                  <MenuItem onClick={MoreToLessItemsReturn}>
                                    วันเวลา : มาก-น้อย
                                  </MenuItem>
                                </MenuList>
                              </Menu>

                              <span className="text-xs font-semibold text-gray-500">
                                ทั้งหมด : {HistorySparepartReturnDisplay.length}
                              </span>
                              <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                  <tr>
                                    {[
                                      "ชื่อพาร์ท",
                                      "หมวดหมู่",
                                      "รหัสพาร์ท",
                                      "ยี่ห้อ",
                                      "ผู้คืน",
                                      "เบิกจำนวน",
                                      "คืนจำนวน",
                                      "วัน-เวลา เบิก",
                                      "วัน-เวลา คืน",
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
                                  {HistorySparepartReturnDisplay.map(
                                    (
                                      {
                                        PartSubID,
                                        Image,
                                        PartName,
                                        Category,
                                        PartCode,
                                        Brand,
                                        ReturnAmount,
                                        year,
                                        month,
                                        hour,
                                        min,
                                        date,
                                        sec,
                                        Oldyear,
                                        Oldmonth,
                                        Oldhour,
                                        Oldmin,
                                        Olddate,
                                        Oldsec,
                                        Status,
                                        Unit,
                                        Forerunner,
                                        AmountForReturn,
                                        SparepartsPickupSubID,
                                        RequisitionAmount,
                                      },
                                      key
                                    ) => {
                                      const className = `py-3 px-4 w-[15rem] border text-center ${
                                        key ===
                                        HistorySparepartReturnDisplay.length
                                          ? ""
                                          : "border-b border-blue-gray-50"
                                      }`;

                                      const d2 = new Date(
                                        Oldyear,
                                        Oldmonth,
                                        Olddate
                                      );

                                      const resultDay2 = d2.toLocaleDateString(
                                        "th-TH",
                                        {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        }
                                      );

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
                                            {AmountForReturn === 0 ? (
                                              <Typography className="pb-2 pt-2 text-md font-bold text-red-600">
                                                --คืนพาร์ทหมดเเล้ว--
                                              </Typography>
                                            ) : (
                                              <></>
                                            )}
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
                                              {ReturnAmount} {Unit}
                                            </Typography>
                                          </td>

                                          <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                              {resultDay2}
                                            </Typography>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                              เวลา : {Oldhour}:{Oldmin}:{Oldsec}
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
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="flex h-screen">
                  <div className="m-auto">
                    <XCircleIcon className="w-24 h-24 opacity-25 ml-6" />
                    <p className="font-bold text-gray-600 text-center">
                      ไม่พบข้อมูลคืนพาร์ท
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grow-0">
        <Navbar />
      </div>

      <div className="flex grow h-screen">
        <Sidebar />
        <main className="w-full h-full bg-[#eceff1]">
          <div className="md:ml-[20rem] bg-[#eceff1] pt-32 px-0 md:px-12 pb-12">
            <Head>
              <title>
                ประวัติการเบิกเเละคืนพาร์ท | Spareparts warehouse management
              </title>
            </Head>

            <Card>
              <CardHeader
                variant="gradient"
                color="purple"
                className="mb-8 p-6 flex flex-row"
              >
                <Typography variant="h6" color="white">
                  ประวัติการเบิกเเละคืนพาร์ท
                </Typography>
              </CardHeader>

              <CardBody className="overflow-x-scroll px-0 pt-2 pb-2">
                <Tabs value="PickUp">
                  <TabsHeader>
                    {data.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {data.map(({ value, desc }) => (
                      <TabPanel key={value} value={value}>
                        {desc}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
export default History;
