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
import { LoginAtom, AddPartSuccesAtom } from "../../../recoil/RecoilForData";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Head from "next/head";

const CreateParts = () => {
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

  // GetData
  const [CheckPart, setCheckPart] = useState();

  // Parts Page Alart
  const [AddPartSucces, setAddPartSucces] = useRecoilState(AddPartSuccesAtom);

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
      const size = event.target.files[0].size;
      // const name = event.target.files[0].name;
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
    let obj = arr.map((x) => x.PartName);

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
    let obj = filteredArray.map((x) => x.PartCode);

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

  const GenerateCodeFN = () => {
    let Code = uuidv4();
    const regex = /-/g;
    let regexData = Code.replace(regex, "");
    let subTo15 = regexData.substring(0, 15);
    setPartCode(subTo15);
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
    let Amountalart = parseInt(StringPartAlartQuantity);
    let Amount = parseInt(StringPartQuantity);
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
      } else if (AlartPartCodeThai === false) {
      } else {
        const DataWithNoImage = {
          PartSubID: uuidv4(),
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
          await axios.post("http://[::1]:8000/addSparepart", DataWithNoImage);
          console.log("AddPartWithNoImage to Sparepart Success");
          router.push("/parts/");
          setAddPartSucces(true);
        } catch (error) {
          console.log("AddPartWithNoImage to Sparepart Error", error);
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
      } else if (AlartPartCodeThai === false) {
      } else {
        if (CatchAxiosFromIMG === false) {
          let fileData = await toBase64(selectedImage);
          const DataWithImage = {
            PartSubID: uuidv4(),
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
            await axios.post("http://[::1]:8000/addSparepart", DataWithImage);
            console.log("AddPartWithImage to Sparepart Success");
            router.push("/parts/");
            setAddPartSucces(true);
          } catch (error) {
            console.log("AddPartWithImage to Sparepart Error", error);
          }
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>เพิ่มข้อมูลพาร์ท | Spareparts warehouse management </title>
      </Head>

      <Dialog open={true} size="xxl" className="bg-white">
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
              เพิ่มข้อมูลพาร์ท
            </Typography>
            <Typography variant="h6" className="pb-2">
              รายละเอียดพาร์ท
            </Typography>
            <div className="flex justify-center">
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
                  <div className="pl-3 pt-4">
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
                defaultValue={Category}
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
                className="required:bg-red-100 text-hidden"
                required={RequirePartCode}
                maxLength={20}
                value={PartCode}
              />
              <p
                className="text-sm pt-2 pl-3 text-red-600 aria-hidden:hidden"
                aria-hidden={AlartPartCode}
              >
                รหัสพาร์ทนี้ถูกใช้เเล้ว
              </p>
            </div>

            <div className="flex w-max gap-4 pt-2">
              <Button variant="outlined" size="sm" onClick={GenerateCodeFN}>
                สุ่มรหัสพาร์ท
              </Button>
              <p
                className="text-sm pt-2 text-red-600 aria-hidden:hidden"
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
              />
            </div>
            <div className="pt-4">
              <Input
                label="ลำดับ"
                onChange={(e) => setNo(e.target.value)}
                className="required:bg-red-100"
                required={RequireNo}
                maxLength={10}
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
              />
            </div>

            <div className="pt-4 w-48">
              <Select
                label="หน่วย"
                onChange={(value) => setUnit(value)}
                defaultValue={Category}
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
                />
                <Radio
                  id="off"
                  name="type"
                  label="เเจ้งเตือนเมื่อจำนวนเท่ากับ 0"
                  onClick={(e) => AlartOff(e)}
                  defaultChecked
                />
              </div>
              {AlartToggle ? (
                <>
                  <p className="pl-3 flex flex-row">
                    เมื่อจำนวนพาร์ทในคลังเหลือไม่เกิน {NumAlartforShow}{" "}
                    จะเเจ้งเตือน
                  </p>
                  <div className="pt-4 pb-12">
                    <Input
                      label="เเจ้งเตือนจำนวน"
                      type="number"
                      className="required:bg-red-100"
                      defaultValue={StringPartAlartQuantity}
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
export default CreateParts;
