import {
  Input,
  Option,
  Select,
  Dialog,
  DialogBody,
  Typography,
  Radio,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { NoImageBase64Atom } from "../../../recoil/NoImageBase64";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import {
  EditPartAtom,
  LoginAtom,
  EditPartSuccesAtom,
} from "../../../recoil/RecoilForData";
import Head from "next/head";

const EditParts = () => {
  const [NoImage] = useRecoilState(NoImageBase64Atom);
  const [Login, setLogin] = useRecoilState(LoginAtom);

  const [selectedImage, setselectedImage] = useState();
  const [AlartToggle, setAlartToggle] = useState(false);

  const [PartName, setPartName] = useState("");
  const [Category, setCategory] = useState("อื่นๆ");
  const [PartCode, setPartCode] = useState("");
  const [Brand, setBrand] = useState("");
  const [No, setNo] = useState("");
  const [Lock, setLock] = useState("");
  const [StringPartQuantity, setStringPartQuantity] = useState("");
  const [StringPartAlartQuantity, setStringPartAlartQuantity] = useState("0");
  const [Unit, setUnit] = useState("");

  const [CatchAxiosFromIMG, setCatchAxiosFromIMG] = useState(false);

  const [RequirePartName, setRequirePartName] = useState(false);
  const [RequirePartCode, setRequirePartCode] = useState(false);
  const [RequireBrand, setRequireBrand] = useState(false);
  const [RequireNo, setRequireNo] = useState(false);
  const [RequireLock, setRequireLock] = useState(false);
  const [RequirePartQuantity, setRequirePartQuantity] = useState(false);
  const [RequirePartAlartQuantity, setRequirePartAlartQuantity] =
    useState(false);

  const [NumAlartforShow, setNumAlartforShow] = useState("");

  const [AlartPartName, setAlartPartName] = useState(true);
  const [AlartPartCode, setAlartPartCode] = useState(true);
  const [AlartPartCodeThai, setAlartPartCodeThai] = useState(true);

  // PartSubID
  const [PartSubID, setPartSubID] = useState();

  // GetData
  const [CheckPart, setCheckPart] = useState();

  const [EditPart, setEditPart] = useRecoilState(EditPartAtom);

  const [CheckRadioOn, setCheckRadioOn] = useState(EditPart.RadioCheckOn);
  const [CheckRadioOff, setCheckRadioOff] = useState(EditPart.RadioCheckOff);

  const [HideIMG, setHideIMG] = useState(false);

  // Dialog
  const [EditPartDialog, setEditPartDialog] = useState(true);

  // Parts Page Alart
  const [EditPartSucces, setEditPartSucces] =
    useRecoilState(EditPartSuccesAtom);

  useEffect(() => {
    if (Login === "") {
      router.push("/login");
    }
  }, [LoginAtom]);

  useEffect(() => {
    axios
      .get("http://[::1]:8000/getSparepart")
      .then(function (response) {
        // handle success
        setCheckPart(response.data);
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
    if (EditPartDialog === true) {
      setPartName(EditPart.PartName);
      setCategory(EditPart.Category);
      setPartCode(EditPart.PartCode);
      setBrand(EditPart.Brand);
      setNo(EditPart.No);
      setLock(EditPart.Lock);
      setStringPartQuantity(String(EditPart.Amount));
      setStringPartAlartQuantity(String(EditPart.Amountalart));
      setUnit(EditPart.Unit);

      // PartSubID
      setPartSubID(EditPart.PartSubID);
    }
  }, [EditPartDialog]);

  useEffect(() => {
    // if (EditPart.length === 0) {
    //   router.push("/parts/");
    // }

    if (EditPart.Amountalart <= 0) {
      // setAlartToggle(false);
      // setNumAlartforShow("(กรอกจำนวนที่ต้องการ)");
    } else {
      setAlartToggle(true);
      setNumAlartforShow(EditPart.Amountalart);
    }

    const url = EditPart.Image;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        setselectedImage(file);
      });

    if (EditPart.Image === NoImage) {
      setHideIMG(true);
    } else {
      setHideIMG(false);
    }
  }, [EditPart]);

  useEffect(() => {
    if (PartName !== "") {
      setRequirePartName(false);
    }
    if (PartCode !== "") {
      setRequirePartCode(false);
    }
    if (Brand !== "") {
      setRequireBrand(false);
    }
    if (No !== "") {
      setRequireNo(false);
    }
    if (Lock !== "") {
      setRequireLock(false);
    }
    if (StringPartQuantity !== "") {
      setRequirePartQuantity(false);
    }
    if (StringPartAlartQuantity !== "") {
      setRequirePartAlartQuantity(false);
    }
    if (NumAlartforShow === "") {
      setNumAlartforShow("(กรอกจำนวนที่ต้องการ)");
    }
  }, [
    PartName,
    PartCode,
    Brand,
    No,
    Lock,
    StringPartQuantity,
    StringPartAlartQuantity,
    NumAlartforShow,
  ]);

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setselectedImage(event.target.files[0]);
      setHideIMG(false);
      const size = event.target.files[0].size;
      if (size >= 700000) {
        setCatchAxiosFromIMG(true);
      } else {
        setCatchAxiosFromIMG(false);
      }
    }
  };

  const removeSelectedImage = (event) => {
    setselectedImage(event.target.files);
  };

  const InputPartName = (e) => {
    const { value } = e.target;
    setPartName(value);

    let arr = _.cloneDeep([...CheckPart]);
    var filteredArray = arr.filter((x) => x.PartName !== EditPart.PartName);
    let obj = filteredArray.map((x) => x.PartName);

    let CheckSameData = obj.includes(value);

    if (CheckSameData === true) {
      setAlartPartName(false);
    } else {
      setAlartPartName(true);
    }
  };

  const InputPartCode = (e) => {
    const { value } = e.target;
    setPartCode(value);

    let arr = _.cloneDeep([...CheckPart]);
    var filteredArray = arr.filter((x) => x.PartCode !== "");
    var filteredArray2 = filteredArray.filter(
      (x) => x.PartCode !== EditPart.PartCode
    );
    let obj = filteredArray2.map((x) => x.PartCode);

    let CheckSameData = obj.includes(value);

    if (CheckSameData === true) {
      setAlartPartCode(false);
    } else {
      setAlartPartCode(true);
    }

    const regex = /([\u0E00-\u0E7F]+)/g;
    if (value.match(regex)) {
      setAlartPartCodeThai(false);
    } else {
      setAlartPartCodeThai(true);
    }
  };

  const AlartOn = (e) => {
    const { checked } = e.target;
    if (checked === true) {
      setStringPartAlartQuantity("");
      setAlartToggle(true);
    }
  };

  const AlartOff = (e) => {
    const { checked } = e.target;
    if (checked === true) {
      setStringPartAlartQuantity("0");
      setRequirePartAlartQuantity(false);
      setAlartToggle(false);
      setNumAlartforShow("");
    }
  };

  const DisplayTextForAlartQuantity = (e) => {
    const { value } = e.target;
    setNumAlartforShow(value);
  };

  const toBase64 = (selectedImage) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const router = useRouter();

  const SaveData = async (e) => {
    e.preventDefault();
    // window.location.reload();
    let Amountalart = parseInt(StringPartAlartQuantity);
    let Amount = parseInt(StringPartQuantity);
    let DataPartSubID = EditPart.PartSubID;
    let ObjectPartSubID = { DataPartSubID };
    if (selectedImage === undefined) {
      if (PartName === "") {
        setRequirePartName(true);
      } else if (Lock === "") {
        setRequireLock(true);
      } else if (No === "") {
        setRequireNo(true);
      } else if (StringPartQuantity === "") {
        setRequirePartQuantity(true);
      } else if (StringPartAlartQuantity === "") {
        setRequirePartAlartQuantity(true);
      } else if (AlartPartName === false) {
      } else if (AlartPartCode === false) {
      } else {
        const DataWithNoImage = {
          // PartSubID: uuidv4(),
          PartName,
          Category,
          PartCode,
          Brand,
          No,
          Lock,
          Amount,
          Amountalart,
          Image: NoImage,
          Unit,
        };
        try {
          await axios.post(
            "http://[::1]:8000/findIDSpareparts",
            ObjectPartSubID
          );
          await axios.post(
            "http://[::1]:8000/updateSpareparts",
            DataWithNoImage
          );
          // console.log("UpdatePartWithNoImage to Sparepart Success");
          console.log("UpdatePart to Sparepart Success");
          router.push("/parts/");
          setEditPartSucces(true);
        } catch (error) {
          // console.log("UpdatePartWithNoImage to Sparepart Error", error);
          console.log("UpdatePart to Sparepart Not Success");
        }
      }
    } else {
      if (PartName === "") {
        setRequirePartName(true);
      } else if (Lock === "") {
        setRequireLock(true);
      } else if (No === "") {
        setRequireNo(true);
      } else if (StringPartQuantity === "") {
        setRequirePartQuantity(true);
      } else if (StringPartAlartQuantity === "") {
        setRequirePartAlartQuantity(true);
      } else if (AlartPartName === false) {
      } else if (AlartPartCode === false) {
      } else {
        if (CatchAxiosFromIMG === false) {
          let fileData = await toBase64(selectedImage);
          const DataWithImage = {
            // PartSubID: uuidv4(),
            PartName,
            Category,
            PartCode,
            Brand,
            No,
            Lock,
            Amount,
            Amountalart,
            Image: fileData,
            Unit,
          };
          try {
            await axios.post(
              "http://[::1]:8000/findIDSpareparts",
              ObjectPartSubID
            );
            await axios.post(
              "http://[::1]:8000/updateSpareparts",
              DataWithImage
            );
            // console.log("UpdatePartWithImage to Sparepart Success");
            console.log("UpdatePart to Sparepart Success");
            router.push("/parts/");
            setEditPartSucces(true);
          } catch (error) {
            // console.log("UpdatePartWithImage to Sparepart Error", error);
            console.log("UpdatePart to Sparepart Not Success");
          }
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>เเก้ไขข้อมูลพาร์ท | Spareparts warehouse management </title>
      </Head>

      <Dialog open={EditPartDialog} size="xxl" className="bg-white">
        <nav className="sticky top-0 z-50 bg-[#424242] py-2 shadow-xl">
          <Link href="/parts">
            <Button className="float-left ml-4 bg-gray-300 text-black">
              X
            </Button>
          </Link>
          <Button color="blue" className="float-right mr-4" onClick={SaveData}>
            บันทึกข้อมูล
          </Button>
        </nav>

        <DialogBody className="flex justify-center overflow-x-auto bg-[#eceff1] overflow-y-scroll">
          <div className="w-[55rem]">
            <Typography variant="h4" className="pb-2 text-black">
              เเก้ไขข้อมูลพาร์ท
            </Typography>
            <Typography variant="h6" className="pb-2">
              รายละเอียดพาร์ท
            </Typography>

            <div
              className="flex justify-center aria-hidden:hidden"
              aria-hidden={HideIMG}
            >
              {selectedImage && (
                <div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="h-48 w-72 border rounded-lg max-w-sm"
                    alt="Thumb"
                  />
                </div>
              )}
            </div>

            <div className="pt-4">
              <header className="border-dashed border border-gray-500 py-3 rounded-md">
                <div className="flex flex-row">
                  <PhotoIcon className="w-5 h-5 opacity-75 ml-3" />
                  <label className="pl-2 text-sm pr-1">
                    กด "อัพโหลดรูปภาพ" เพื่อทำการใส่รูปภาพ
                  </label>
                  <label
                    htmlFor="uploadImage"
                    className="text-blue-700 cursor-pointer font-semibold text-sm"
                  >
                    อัพโหลดรูปภาพ
                  </label>
                  <label className="pl-1 text-sm">(ขนาดไม่เกิน 700 kb)</label>
                  <input
                    id="uploadImage"
                    type="file"
                    className="no-underline hidden"
                    accept="image/*"
                    name="image"
                    onChange={imageChange}
                  />
                </div>

                {selectedImage && (
                  <div
                    className="pl-3 pt-4 aria-hidden:hidden"
                    aria-hidden={HideIMG}
                  >
                    <div className="h-20 w-20 rounded-md border border-gray-300 hover:border-blue-600">
                      <img
                        className="h-12 w-20 pl-2 pr-2 pt-2"
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                      />
                      <button
                        onClick={removeSelectedImage}
                        className="pl-1.5 text-sm font-semibold"
                      >
                        ลบรูปภาพ
                      </button>
                    </div>
                    <span
                      className="text-sm text-red-600 hidden aria-hidden:block"
                      aria-hidden={CatchAxiosFromIMG}
                    >
                      ไฟล์ภาพมีขนาดเกิน 700 kb
                    </span>
                  </div>
                )}
              </header>
            </div>

            <div className="pt-4">
              <Input
                label="ชื่อพาร์ท"
                onChange={(e) => InputPartName(e)}
                className="required:bg-red-100"
                required={RequirePartName}
                maxLength={50}
                defaultValue={EditPart.PartName}
              />
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartPartName}
              >
                ชื่อพาร์ทนี้ถูกใช้เเล้ว
              </p>
            </div>

            <div className="pt-4">
              <Select
                label="หมวดหมู่ (เริ่มต้น หมวดหมู่อื่นๆ)"
                onChange={(value) => setCategory(value)}
                value={EditPart.Category}
              >
                <Option value="สายไฟ">สายไฟ</Option>
                <Option value="อุปกรณ์ไฟฟ้า">อุปกรณ์ไฟฟ้า</Option>
                <Option value="น็อตหรือสกรู">น็อตหรือสกรู</Option>
                <Option value="อุปกรณ์นิวเเมติก">อุปกรณ์นิวเเมติก</Option>
                <Option value="มอเตอร์">มอเตอร์</Option>
                <Option value="อลูมิเนียมโปรไฟล์">อลูมิเนียมโปรไฟล์</Option>
                <Option value="StandardPartMisumi">Standard part misumi</Option>
                <Option value="เซนเซอร์">เซนเซอร์</Option>
                <Option value="อื่นๆ">อื่นๆ</Option>
              </Select>
            </div>

            <div className="pt-4">
              <span className="text-sm">
                * รหัสพาร์ท เเละยี่ห้อพาร์ท ไม่จำเป็นต้องระบุ
              </span>
            </div>

            <div className="pt-4">
              <Input
                label="รหัสพาร์ท"
                onChange={(e) => InputPartCode(e)}
                className="required:bg-red-100"
                required={RequirePartCode}
                maxLength={20}
                defaultValue={EditPart.PartCode}
              />
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartPartCode}
              >
                รหัสพาร์ทนี้ถูกใช้เเล้ว
              </p>
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartPartCodeThai}
              >
                ห้ามกรอกรหัสพาร์ทที่มีภาษาไทย
              </p>
            </div>

            <div className="pt-4">
              <Input
                label="ยี่ห้อ"
                onChange={(e) => setBrand(e.target.value)}
                className="required:bg-red-100"
                required={RequireBrand}
                maxLength={20}
                defaultValue={EditPart.Brand}
              />
            </div>

            <header className="border-b border-gray-300 rounded-md pt-4"></header>

            <Typography variant="h6" className="pt-4">
              ตำเเหน่ง
            </Typography>
            <div className="pt-4">
              <Input
                label="ล็อค"
                onChange={(e) => setLock(e.target.value)}
                className="required:bg-red-100"
                required={RequireLock}
                maxLength={10}
                defaultValue={EditPart.Lock}
              />
            </div>
            <div className="pt-4">
              <Input
                label="ลำดับ"
                onChange={(e) => setNo(e.target.value)}
                className="required:bg-red-100"
                required={RequireNo}
                maxLength={10}
                defaultValue={EditPart.No}
              />
            </div>

            <header className="border-b border-gray-300 rounded-md pt-4 "></header>

            <Typography variant="h6" className="pt-4">
              จำนวนพาร์ท
            </Typography>
            <div className="pt-4">
              <Input
                label="จำนวน"
                type="number"
                onChange={(e) => setStringPartQuantity(e.target.value)}
                className="required:bg-red-100"
                required={RequirePartQuantity}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                defaultValue={EditPart.Amount}
              />
            </div>

            <div className="pt-4 w-48">
              <Select
                label="หน่วย"
                onChange={(value) => setUnit(value)}
                value={EditPart.Unit}
              >
                <Option value="ตัว">ตัว</Option>
                <Option value="ชุด">ชุด</Option>
                <Option value="ชิ้น">ชิ้น</Option>
                <Option value="อัน">อัน</Option>
              </Select>
            </div>

            <header className="border-b border-gray-300 rounded-md pt-4 "></header>

            <div className="pt-4">
              <Typography variant="h6">เเจ้งเตือนจำนวนพาร์ทในคลัง</Typography>
              <div className="flex gap-10 pb-4">
                <Radio
                  id="on"
                  name="type"
                  label="กำหนดเอง"
                  onClick={(e) => AlartOn(e)}
                  defaultChecked={CheckRadioOn}
                />
                <Radio
                  id="off"
                  name="type"
                  label="เเจ้งเตือนเมื่อจำนวนเท่ากับ 0"
                  onClick={(e) => AlartOff(e)}
                  defaultChecked={CheckRadioOff}
                />
              </div>
              {AlartToggle ? (
                <>
                  {NumAlartforShow === String(EditPart.Amount) ? (
                    <p className="pl-3 flex flex-row">
                      เมื่อจำนวนพาร์ทในคลังเหลือไม่เกิน {EditPart.Amountalart}{" "}
                      จะเเจ้งเตือน
                    </p>
                  ) : (
                    <p className="pl-3 flex flex-row">
                      เมื่อจำนวนพาร์ทในคลังเหลือไม่เกิน {NumAlartforShow}{" "}
                      จะเเจ้งเตือน
                    </p>
                  )}

                  {EditPart.Amountalart === 0 ? (
                    <div className="pt-4 pb-12">
                      <Input
                        label="เเจ้งเตือนจำนวน"
                        type="number"
                        className="required:bg-red-100"
                        required={RequirePartAlartQuantity}
                        onChange={(e) => {
                          setStringPartAlartQuantity(e.target.value),
                            DisplayTextForAlartQuantity(e);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="pt-4 pb-12">
                      <Input
                        label="เเจ้งเตือนจำนวน"
                        type="number"
                        className="required:bg-red-100"
                        defaultValue={EditPart.Amountalart}
                        required={RequirePartAlartQuantity}
                        onChange={(e) => {
                          setStringPartAlartQuantity(e.target.value),
                            DisplayTextForAlartQuantity(e);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default EditParts;
