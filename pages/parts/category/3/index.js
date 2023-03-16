import { useState, useEffect } from "react";
import axios from "axios";
import { XCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import _ from "lodash";
import Head from "next/head";
import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";

const Category1 = () => {
  const [Category, setCategory] = useState();
  const [CategoryDisplay, setCategoryDisplay] = useState();

  const [SearchInput, setSearchInput] = useState();

  useEffect(() => {
    axios
      .get("http://[::1]:8000/getCategory3")
      .then(function (response) {
        // handle success
        // console.log("Data Category", response.data);
        setCategory(response.data);
        setCategoryDisplay(response.data);
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

    let arr = _.cloneDeep([...Category]);
    if (value !== "") {
      const results = arr.filter((item) => {
        return item.PartName.toLowerCase().startsWith(value.toLowerCase());
      });
      setCategoryDisplay(results);
    } else {
      setCategoryDisplay(arr);
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
          <div className="md:ml-[20rem] bg-[#eceff1]">
            <Head>
              <title>
                หมวดหมู่: น็อตหรือสกรู | Spareparts warehouse management{" "}
              </title>
            </Head>

            {Category !== undefined ? (
              <>
                {Category.length <= 0 ? (
                  <div className="flex h-screen">
                    <div className="m-auto">
                      <XCircleIcon className="w-24 h-24 opacity-25" />
                      <p className="font-bold text-gray-600 text-center">
                        ไม่พบข้อมูล
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full px-4 pt-32">
                      <Card>
                        <CardHeader
                          variant="gradient"
                          color="brown"
                          className="mb-8 p-6 flex flex-row"
                        >
                          <Typography variant="h6" color="white">
                            น็อตหรือสกรู
                          </Typography>
                        </CardHeader>
                        <CardBody>
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
                                placeholder="ค้นหา ชื่อพาร์ท..."
                                onChange={searchFunction}
                                maxLength={50}
                              />
                            </div>
                          </div>

                          {CategoryDisplay.length > 0 ? (
                            <div className="grid gap-2 grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                              {CategoryDisplay.map((item, index) => {
                                return (
                                  <div
                                    className="border-2 border-gray-200 py-2"
                                    key={index}
                                  >
                                    <div className="flex justify-center px-2">
                                      <img
                                        className="h-48 w-72 rounded-lg"
                                        src={item.Image}
                                      ></img>
                                    </div>

                                    <p className="text-center font-bold pt-2 truncate px-4">
                                      {item.PartName}
                                    </p>

                                    <span className="text-center text-xs truncate">
                                      <p className="truncate">
                                        ล็อค {item.Lock} ลำดับ {item.No}
                                      </p>
                                    </span>

                                    {item.Amount !== 0 ? (
                                      <p className="text-right text-xs pt-2 px-2 font-bold">
                                        จำนวน {item.Amount} {item.Unit}
                                      </p>
                                    ) : (
                                      <p className="text-right text-xs text-red-500 pt-2 px-2 font-bold">
                                        พาร์ทหมด
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <CardBody className="px-0 pt-0 pb-2">
                              <div className="flex justify-center">
                                <QuestionMarkCircleIcon className="w-24 h-24 opacity-75 mr-1" />
                              </div>
                              <p className="text-center">
                                ไม่พบการค้นหาชื่อพาร์ท
                              </p>
                              <p className="text-center font-bold truncate">
                                "{SearchInput}"
                              </p>
                            </CardBody>
                          )}
                        </CardBody>
                      </Card>
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Category1;
