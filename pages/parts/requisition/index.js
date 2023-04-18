import {
  Dialog,
  DialogBody,
  Typography,
  Button,
  Card,
  CardBody,
  Alert,
} from "@material-tailwind/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// test
import { useRecoilState } from "recoil";
import {
  testDataRequisituinAtom,
  LoginAtom,
  RequisitionPartSuccesAtom,
} from "../../../recoil/RecoilForData";
import { useRouter } from "next/router";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import BarcodeReader from "react-barcode-reader";

const Requisition = () => {
  const [GeneralClerk, setGeneralClerk] = useState();
  const [SelectEMP, setSelectEMP] = useState("");
  const [RequiredEMP, setRequiredEMP] = useState(false);

  const [Sparepart, setSparepart] = useState();

  const [Login, setLogin] = useRecoilState(LoginAtom);

  // test
  const [testDataRequisituin, settestDataRequisituin] = useRecoilState(
    testDataRequisituinAtom
  );

  // Hidden Button when No Data Requisition
  const [NoDataRequisition, setNoDataRequisition] = useState(false);

  // Hidden Alart NotFoundPartCodeAlart
  const [NotFoundPartCodeAlart, setNotFoundPartCodeAlart] = useState(false);

  // SparepartAlart
  const [SparepartAlart, setSparepartAlart] = useState();

  // RequisitionPartSucces
  const [RequisitionPartSucces, setRequisitionPartSucces] = useRecoilState(
    RequisitionPartSuccesAtom
  );

  const router = useRouter();

  useEffect(() => {
    if (Login === "") {
      router.push("/login");
    }
  }, [LoginAtom]);

  useEffect(() => {
    if (testDataRequisituin.length <= 0) {
      setNoDataRequisition(true);
    } else {
      setNoDataRequisition(false);
    }
    // console.log("testDataRequisituin", testDataRequisituin);
  }, [testDataRequisituin]);

  useEffect(() => {
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

    // Data SpareParts
    axios
      .get("http://[::1]:8000/getSparepart")
      .then(function (response) {
        // handle success
        // console.log("Data Sparepart", response.data);
        setSparepart(response.data);
        setSparepartAlart(response.data);
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
    if (SelectEMP !== "") {
      setRequiredEMP(false);
    }
  }, [SelectEMP]);

  const DeleteDataRequistion = (key) => {
    let arr = _.cloneDeep([...testDataRequisituin]);
    arr.splice(key, 1);
    settestDataRequisituin(arr);
  };

  const DeleteAllDataRequistion = () => {
    settestDataRequisituin([]);
  };

  const BarcodeScannerFN = (e) => {
    let arr = _.cloneDeep([...Sparepart]);
    let filterPartCode = arr.filter((x) => x.PartCode === e);

    let PartCodeData = filterPartCode.map((x) => x.PartCode);
    let PartNameData = filterPartCode.map((x) => x.PartName);

    let PartCodeDataString = String(PartCodeData);
    let PartNameDataString = String(PartNameData);

    if (filterPartCode.length <= 0) {
      // alert("ไม่พบรหัสพาร์ทนี้");
      setNotFoundPartCodeAlart(true);
    } else {
      let arrDataRequisituin = _.cloneDeep([...testDataRequisituin]);
      arrDataRequisituin.push({
        PartCode: PartCodeDataString,
        PartName: PartNameDataString,
        RequireAmount: 1,
      });
      settestDataRequisituin(arrDataRequisituin);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNotFoundPartCodeAlart(false);
    }, "2000");
  }, [NotFoundPartCodeAlart]);

  const BarcodeScannerErrorFN = (e) => {
    alert("Scanner Error", e);
    // console.log("Scanner Error", e);
  };

  const Submit = async (e) => {
    e.preventDefault();

    let findPartCodeInData = testDataRequisituin.map((x) => x.PartCode);
    let filterPartCodeUniq = findPartCodeInData.filter(
      (e, i, a) => a.indexOf(e) === i
    );

    for (let i = 0; i < filterPartCodeUniq.length; i++) {
      let filterPartCodeUniqData = filterPartCodeUniq[i];
      let filterPartCodeUniqToString = String(filterPartCodeUniqData);

      // length
      let filterFindPart = testDataRequisituin.filter(
        (x) => x.PartCode === filterPartCodeUniqToString
      );
      let SumAmount = filterFindPart.length;

      // Submit Amount
      let arr = _.cloneDeep([...Sparepart]);
      let filterPart = arr.filter(
        (x) => x.PartCode === filterPartCodeUniqToString
      );
      let PartAmountOld = filterPart.map((x) => x.Amount);
      let PartAmountOldInt = parseInt(PartAmountOld);
      let Amount = PartAmountOldInt - SumAmount;
      const DataRequisition = {
        Amount,
      };

      // Update Data history
      const d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth();
      let date = d.getDate();
      let hour = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();

      const FindPartData = arr.find(
        (x) => x.PartCode === filterPartCodeUniqToString
      );
      const DataHistoryRequisition = {
        PartSubID: FindPartData.PartSubID,
        SparepartsPickupSubID: uuidv4(),
        PartName: FindPartData.PartName,
        Category: FindPartData.Category,
        Brand: FindPartData.Brand,
        RequisitionAmount: SumAmount,
        Unit: FindPartData.Unit,
        PartCode: FindPartData.PartCode,
        Image: FindPartData.Image,
        year,
        month,
        date,
        hour,
        min,
        sec,
        Status: "เบิกพาร์ท",
        Forerunner: SelectEMP,
        AmountForReturn: SumAmount,
      };

      // Submit Data
      let DataPartSubID = FindPartData.PartSubID;
      let ObjectPartSubID = { DataPartSubID };
      if (SelectEMP === "") {
        setRequiredEMP(true);
      } else {
        try {
          await axios.post(
            "http://[::1]:8000/findIDSpareparts",
            ObjectPartSubID
          );
          await axios.post(
            "http://[::1]:8000/updateSpareparts",
            DataRequisition
          );
          // History
          await axios.post(
            "http://[::1]:8000/historySparepartPickup",
            DataHistoryRequisition
          );
          console.log("Requisition to SpareParts Success");
          settestDataRequisituin([]);
          setRequisitionPartSucces(true);
          // router.push("/");
          router.push("/parts/");
        } catch (error) {
          console.log("Requisition to SpareParts Error", error);
        }
      }
    }
  };

  const ClosePageRequisition = () => {
    settestDataRequisituin([]);
    // router.push("/");
    router.push("/parts/");
  };

  return (
    <>
      <Head>
        <title>เบิกพาร์ทด้วยบาร์โค้ด | Spareparts warehouse management </title>
      </Head>

      <Dialog open={true} size="xxl" className="bg-[#eceff1] pb-6">
        <nav className="sticky top-0 z-50 bg-[#424242] py-2 shadow-xl">
          <Button
            className="float-left ml-4 bg-gray-300 text-black"
            onClick={ClosePageRequisition}
          >
            X
          </Button>

          <Button
            color="blue"
            className="float-right mr-4 aria-hidden:hidden"
            onClick={Submit}
            aria-hidden={NoDataRequisition}
          >
            ยืนยัน
          </Button>

          <Alert
            color="red"
            className="fixed w-full top-2 text-center"
            show={NotFoundPartCodeAlart}
          >
            ไม่พบรหัสพาร์ทนี้
          </Alert>
        </nav>

        {/* <div
          className="flex w-full flex-col gap-2 text-center aria-hidden:hidden"
          aria-hidden={NotFoundPartCodeAlart}
        >
          <Alert color="red">ไม่พบรหัสพาร์ทนี้</Alert>
        </div> */}

        <DialogBody className="flex justify-center overflow-x-auto bg-[#eceff1] overflow-y-scroll pb-12">
          <div className="w-[55rem] pb-12">
            <Typography variant="h4" className="pb-2 text-black">
              เบิกพาร์ทด้วยบาร์โค้ด
            </Typography>
            <Typography variant="h6" className="pb-6">
              รายละเอียด
            </Typography>

            <BarcodeReader
              onError={(e) => BarcodeScannerErrorFN(e)}
              onScan={(e) => BarcodeScannerFN(e)}
            />

            <div className="flex flex-row pb-6">
              <span className="text-gray-800 font-bold flex flex-row truncate pl-6 pb-2 pt-3 text-xs">
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
                        <option
                          key={index}
                          value={
                            item.Name +
                            " " +
                            item.Surname +
                            " " +
                            "(" +
                            item.NickName +
                            ")"
                          }
                        >
                          {item.Name +
                            " " +
                            item.Surname +
                            " " +
                            "(" +
                            item.NickName +
                            ")"}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : (
                <></>
              )}
              <Button
                size="sm"
                color="red"
                className="ml-4 h-10 aria-hidden:hidden"
                onClick={DeleteAllDataRequistion}
                aria-hidden={NoDataRequisition}
              >
                ยกเลิกรายการทั้งหมด
              </Button>
            </div>

            <Card>
              {testDataRequisituin.length > 0 ? (
                <>
                  <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["ลำดับ", "รหัสพาร์ท", "ชื่อพาร์ท", "จำนวน", ""].map(
                            (el) => (
                              <th
                                key={el}
                                className="border-b border-blue-gray-50 py-3 text-center bg-gray-700"
                              >
                                <Typography
                                  variant="small"
                                  className="text-[11px] font-bold uppercase text-white"
                                >
                                  {el}
                                </Typography>
                              </th>
                            )
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        <>
                          {testDataRequisituin.map(
                            ({ PartCode, PartName, RequireAmount }, key) => {
                              const className = `py-3 w-[55rem] text-center ${
                                key === testDataRequisituin.length
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              }`;

                              return (
                                <tr key={key}>
                                  <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                      {key + 1}
                                    </Typography>
                                  </td>

                                  <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600 truncate">
                                      {PartCode}
                                    </Typography>
                                  </td>

                                  <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600 truncate">
                                      {PartName}
                                    </Typography>
                                  </td>

                                  <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                      {RequireAmount}
                                    </Typography>
                                  </td>

                                  <td className={className}>
                                    <Button
                                      size="sm"
                                      color="red"
                                      variant="outlined"
                                      onClick={() => DeleteDataRequistion(key)}
                                    >
                                      ลบ
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </>
                      </tbody>
                    </table>
                  </CardBody>
                </>
              ) : (
                <CardBody className="px-0 pt-0 pb-2 py-6">
                  <div className="flex justify-center">
                    <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                  </div>
                  <p className="text-center">ไม่พบข้อมูลการเบิกพาร์ท</p>
                </CardBody>
              )}
            </Card>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default Requisition;
