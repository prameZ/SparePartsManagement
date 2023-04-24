import Head from "next/head";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { WrenchIcon, UsersIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [GeneralClerk, setGeneralClerk] = useState();
  const [WarehouseClerk, setWarehouseClerk] = useState();
  const [Sparepart, setSparepart] = useState();
  const [AllCategory, setAllCategory] = useState();
  const [MonthofPickupAndReturn, setMonthofPickupAndReturn] = useState();
  const [TheMostPickedPart, setTheMostPickedPart] = useState();

  useEffect(() => {
    axios
      .get("https://db-spare-parts-vercel.vercel.app/getEmployeeGeneralClerk")
      .then(function (response) {
        // handle success
        setGeneralClerk(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://db-spare-parts-vercel.vercel.app/getEmployeeWarehouseClerk")
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

    axios
      .get("https://db-spare-parts-vercel.vercel.app/getSparepart")
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
      .get("https://db-spare-parts-vercel.vercel.app/getAllCategory")
      .then(function (response) {
        // handle success
        setAllCategory(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://db-spare-parts-vercel.vercel.app/MonthofPickupAndReturn")
      .then(function (response) {
        // handle success
        setMonthofPickupAndReturn(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://db-spare-parts-vercel.vercel.app/TheMostPickedPart")
      .then(function (response) {
        // handle success
        setTheMostPickedPart(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const DataCategory = [
    {
      label: "สายไฟ",
      value: "สายไฟ",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category1}</> : <></>}</>
      ),
    },
    {
      label: "อุปกรณ์ไฟฟ้า",
      value: "อุปกรณ์ไฟฟ้า",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category2}</> : <></>}</>
      ),
    },
    {
      label: "น็อตหรือสกรู",
      value: "น็อตหรือสกรู",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category3}</> : <></>}</>
      ),
    },
    {
      label: "อุปกรณ์นิวเเมติก",
      value: "อุปกรณ์นิวเเมติก",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category4}</> : <></>}</>
      ),
    },
    {
      label: "มอเตอร์",
      value: "มอเตอร์",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category5}</> : <></>}</>
      ),
    },
    {
      label: "อลูมิเนียมโปรไฟล์",
      value: "อลูมิเนียมโปรไฟล์",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category6}</> : <></>}</>
      ),
    },
    {
      label: "StandardPartMisumi",
      value: "StandardPartMisumi",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category7}</> : <></>}</>
      ),
    },
    {
      label: "เซนเซอร์",
      value: "เซนเซอร์",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category8}</> : <></>}</>
      ),
    },
    {
      label: "อื่นๆ",
      value: "อื่นๆ",
      desc: (
        <>{AllCategory !== undefined ? <>{AllCategory.Category9}</> : <></>}</>
      ),
    },
  ];

  if (MonthofPickupAndReturn !== undefined) {
    var BasicCoulumn = {
      chart: {
        type: "column",
      },
      title: {
        text:
          "จำนวนเบิกพาร์ท เเละคืนพาร์ทในเเต่ละเดือน (ปี " +
          MonthofPickupAndReturn.Year +
          ")",
      },
      subtitle: {
        text: "",
      },
      xAxis: {
        categories: [
          "ม.ค.",
          "ก.พ.",
          "มี.ค.",
          "เม.ษ.",
          "พ.ค.",
          "มิ.ย.",
          "ก.ค.",
          "ส.ค.",
          "ก.ย.",
          "ต.ค.",
          "พ.ย.",
          "ธ.ค.",
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "จำนวน (ชิ้น)",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.0f} ชิ้น</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "เบิกพาร์ท",
          data: MonthofPickupAndReturn.MonthofPickup,
        },
        {
          name: "คืนพาร์ท",
          data: MonthofPickupAndReturn.MonthofReturn,
        },
      ],
    };
  }

  if (TheMostPickedPart !== undefined) {
    let PartNameArr = TheMostPickedPart.map((x) => x.PartName);
    let AmountArr = TheMostPickedPart.map((x) => x.Amount);

    var BasicBar = {
      chart: {
        type: "bar",
      },
      title: {
        text: "พาร์ทที่เบิกมากที่สุด",
        align: "center",
      },
      subtitle: {
        text: "",
      },
      xAxis: {
        categories: PartNameArr,
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "จำนวน (ชิ้น)",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
      },
      tooltip: {
        valueSuffix: "ชิ้น",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "เบิกพาร์ท",
          data: AmountArr,
        },
      ],
    };
  }

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
              <title>Dashboard | Spareparts warehouse management </title>
            </Head>

            <Typography
              variant="h3"
              className="pb-4 px-4 drop-shadow-md mt-32 md:mt-0"
            >
              Dashboard
            </Typography>

            <div className="grid gap-8 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 px-4">
              {WarehouseClerk !== undefined ? (
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <UserIcon className="object-cover w-full rounded-t-lg h-32 md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      พนักงานคลังทั้งหมด
                    </h5>
                    <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-center">
                      {WarehouseClerk.length}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {GeneralClerk !== undefined ? (
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <UsersIcon className="object-cover w-full rounded-t-lg h-32 md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      พนักงานทั่วไปทั้งหมด
                    </h5>
                    <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-center">
                      {GeneralClerk.length}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {Sparepart !== undefined ? (
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <WrenchIcon className="object-cover w-full rounded-t-lg h-32 md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      พาร์ททั้งหมด
                    </h5>
                    <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 text-center">
                      {Sparepart.length}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <Typography variant="h5" className="pt-4 pb-2 px-4">
              หมวดหมู่พาร์ททั้งหมด
            </Typography>

            <div className="bg-[#eceff1]">
              <Tabs value="สายไฟ" className="mx-4 shadow-md bg-white">
                <TabsHeader className="bg-white shadow-md flex flex-col md:flex-row">
                  {DataCategory.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody className="text-center py-12">
                  {DataCategory.map(({ value, desc }) => (
                    <TabPanel key={value} value={value} className="text-4xl">
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>

            <div className="pb-12 bg-[#eceff1] pt-4 grid gap-8 grid-cols-1 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 px-4">
              <HighchartsReact highcharts={Highcharts} options={BasicCoulumn} />
              <HighchartsReact highcharts={Highcharts} options={BasicBar} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
