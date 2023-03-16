import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AddAmountAtom } from "../../../recoil/RecoilForData";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import CounterInput from "react-counter-input";

export function Notifications() {
  const [Sparepart, setSparepart] = useState();
  const [PartAlartDisplay, setPartAlartDisplay] = useState();

  // Modal
  const [openAddamountModal, setOpenAddamountModal] = useState(false);
  const handleOpenAddamountModal = () =>
    setOpenAddamountModal(!openAddamountModal);

  // Addamount Modal
  const [AddAmount, setAddAmount] = useRecoilState(AddAmountAtom);
  const [InputRequisition, setInputRequisition] = useState();
  const [DisplayValueAmount, setDisplayValueAmount] = useState();

  useEffect(() => {
    axios
      .get("http://[::1]:8000/getSparepart")
      .then(function (response) {
        // handle success
        // console.log("Data Sparepart", response.data);
        setSparepart(response.data);
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
      setPartAlartDisplay(Alart);
    }
  }, [Sparepart]);

  const AddAmountFN = (SubID, PartName, Category, Brand, Amount) => {
    let data = {
      SubID,
      PartName,
      Category,
      Brand,
      Amount,
    };
    setAddAmount(data);
    handleOpenAddamountModal();
  };

  // Addamount Modal
  useEffect(() => {
    setDisplayValueAmount(AddAmount.Amount);
  }, [AddAmount.Amount]);

  const inputAmountRequire = (count) => {
    setInputRequisition(count);
    let value = AddAmount.Amount + count;
    setDisplayValueAmount(value);
  };

  const SubmitAmount = async (e) => {
    e.preventDefault();
    let DataSubID = AddAmount.SubID;
    let ObjectSubID = { DataSubID };
    let Amount = InputRequisition + AddAmount.Amount;

    const DataAddAmount = {
      Amount,
    };

    if (InputRequisition !== 0) {
      try {
        await axios.post("http://[::1]:8000/findIDSpareparts", ObjectSubID);
        await axios.post("http://[::1]:8000/updateSpareparts", DataAddAmount);
        axios
          .get("http://[::1]:8000/getSparepart")
          .then(function (response) {
            setSparepart(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        console.log("AddAmount to SpareParts Success");
        handleOpenAddamountModal();
      } catch (error) {
        console.log("AddAmount to SpareParts Error", error);
      }
    } else {
      // console.log("No InputAddAmountRequire");
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
          <div className="md:ml-[20rem] pt-4">
            <Head>
              <title>เเจ้งเตือนพาร์ท | Spareparts warehouse management </title>
            </Head>

            <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
              <Card>
                <CardHeader
                  color="blue-gray"
                  floated={false}
                  shadow={false}
                  className="m-0 p-4"
                >
                  <Typography variant="h5" color="white">
                    เเจ้งเตือนพาร์ท
                  </Typography>
                </CardHeader>
                {PartAlartDisplay !== undefined ? (
                  <>
                    {PartAlartDisplay.length > 0 ? (
                      <CardBody className="flex flex-col gap-4 p-4">
                        {PartAlartDisplay.map((item, index) => (
                          <Alert key={index} color="orange">
                            <span className="text-black">
                              {"ชื่อพาร์ท : " +
                                item.PartName +
                                " " +
                                "จำนวนเหลือต่ำกว่าหรือเท่ากับ" +
                                " " +
                                item.Amountalart +
                                " " +
                                "(มีจำนวนทั้งหมด" +
                                " " +
                                item.Amount +
                                " " +
                                item.Unit +
                                ")"}
                            </span>
                            <div className="flex w-max gap-4 pt-2">
                              <Button
                                size="sm"
                                color="amber"
                                onClick={() =>
                                  AddAmountFN(
                                    item.SubID,
                                    item.PartName,
                                    item.Category,
                                    item.Brand,
                                    item.Amount
                                  )
                                }
                              >
                                เพิ่มจำนวน
                              </Button>
                            </div>
                          </Alert>
                        ))}
                      </CardBody>
                    ) : (
                      <CardBody className="px-0 pt-2 pb-2">
                        <div className="flex justify-center">
                          <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                        </div>
                        <p className="text-center">ไม่มีเเจ้งเตือนพาร์ท</p>
                      </CardBody>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Addamount Modal */}
      <Dialog
        open={openAddamountModal}
        handler={handleOpenAddamountModal}
        className="w-full min-w-[320px]"
      >
        <Head>
          <title>เพิ่มจำนวนพาร์ท | Spareparts warehouse management </title>
        </Head>

        <div className="flex justify-center py-4 text-black ">
          <Typography variant="h5" className="flex flex-row">
            เพิ่มจำนวนพาร์ท
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
                {AddAmount.PartName}
              </p>
            </span>

            <span className="text-gray-800 font-bold flex flex-row truncate pb-2">
              หมวดหมู่ :
              <p className="text-gray-600 font-normal truncate pl-2">
                {AddAmount.Category}
              </p>
            </span>

            {AddAmount.Brand === "" ? (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">-</p>
              </span>
            ) : (
              <span className="text-gray-800 font-bold flex flex-row truncate pl-8 pb-2">
                ยี่ห้อ :
                <p className="text-gray-600 font-normal truncate pl-2">
                  {AddAmount.Brand}
                </p>
              </span>
            )}

            <div className="flex flex-row">
              <span className="text-gray-800 font-bold flex flex-row truncate pl-4 pt-3">
                จำนวน :
              </span>
              <div className="ml-2 bg-gray-100 border border-gray-300 shadow-md rounded-md">
                <CounterInput
                  min={0}
                  // onCountChange={(count) => console.log(count)}
                  onCountChange={(count) => {
                    inputAmountRequire(count);
                  }}
                />
              </div>

              <span className="text-gray-600 font-normal truncate pl-4 pt-3">
                จำนวนทั้งหมด {DisplayValueAmount} {AddAmount.Unit}
              </span>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            className="mr-2"
            onClick={() => handleOpenAddamountModal()}
          >
            <span>ยกเลิก</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={SubmitAmount}>
            <span>ยืนยัน</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Notifications;
