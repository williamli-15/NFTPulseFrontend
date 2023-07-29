"use client"; // Add this line to mark Example.jsx as a client-side entry point

import { useState } from "react";
import ReactEcharts from 'echarts-for-react';
import axios from "axios";
import {Table} from "antd";

const Example = () => {
  const [showPriceInputCard, setShowPriceInputCard] = useState(false);
  const [showNFTInputCard, setShowNFTInputCard] = useState(false);

  // State for "Get Historical Floor Prices" input
  const [priceDays, setPriceDays] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [showPriceVisualization, setShowPriceVisualization] = useState(false);
  const [priceVisualizationData, setPriceVisualizationData] = useState(null);

  // State for "Get Latest Trending NFTs" input
  const [nftDays, setNftDays] = useState("");
  const [showNFTVisualization, setShowNFTVisualization] = useState(false);
  const [nftVisualizationData, setNftVisualizationData] = useState(null);

  const [chartStatus, setChartStatus] = useState(false)
  const [tableStatus, setTableStatus] = useState(false)

  const handleTrackPriceClick = () => {
    setShowPriceInputCard(true);
    setShowNFTInputCard(false);
  };

  const handleSearchNFTClick = () => {
    setShowNFTInputCard(true);
    setShowPriceInputCard(false);
  };

  const handleCloseInputCard = () => {
    setShowPriceInputCard(false);
    setShowNFTInputCard(false);
  };

  const handlePriceFormSubmit = (event) => {
    event.preventDefault();
    // Perform any data processing or API calls here based on the "Get Historical Floor Prices" input values.
    setPriceVisualizationData({ days: priceDays, address: tokenAddress });
    setShowPriceVisualization(true);
  };

  const handleNFTFormSubmit = (event) => {
    event.preventDefault();
    // Perform any data processing or API calls here based on the "Get Latest Trending NFTs" input values.
    setNftVisualizationData({ days: nftDays });
    setShowNFTVisualization(true);
  };

  const showChart = () => {
    let paramsData = {
      'days': priceDays,
      'token_address': tokenAddress,
    }
    axios({
      url: "http://127.0.0.1:8000/get_price",
      method: "GET",
      params: paramsData
    }).then((res) => {
      console.log(res.data);
      if (JSON.parse(res.data.data).label.length > 0){
        setSales(JSON.parse(res.data.data).price)
        setLabel(JSON.parse(res.data.data).label)
      }
      setShowPriceInputCard(false);
      setShowNFTInputCard(false);
      setTableStatus(false)
      setChartStatus(true)
    });
  };

  const showTable = () => {
    let paramsData = {
      'time_interval': nftDays,
    }
    axios({
      url: "http://127.0.0.1:8000/get_nft_price",
      method: "GET",
      params: paramsData
    }).then((res) => {
      setTableData(JSON.parse(res.data.data))
      setShowPriceInputCard(false);
      setShowNFTInputCard(false);
      setChartStatus(false)
      setTableStatus(true)
    });
  };

  const [sales, setSales] = useState([]);
  const [label, setLabel] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getOption = (sal) => {
    return {
      title: {
        text: 'Historical Floor Prices'
      },
      tooltip: {},
      legend: {
        data: ['Price']
      },
      xAxis: {
        data: label
      },
      yAxis: {},
      series: [{
        name: 'Price',
        type: 'bar',
        data: sales
      }]
    }
  };

  const colums = [
    {
      title: 'contract_address',
      dataIndex: 'contract_address'
    },
    {
      title: 'vol_eth',
      dataIndex: 'vol_eth'
    },
    {
      title: 'name',
      dataIndex: 'name'
    },

    {
      title: 'symbol',
      dataIndex: 'symbol'
    },
    {
      title: 'standard',
      dataIndex: 'standard'
    }
  ]

  return (
    <div>
      <ul className="mt-14 m-auto max-w-3xl grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Feature Section 1 */}
        <li
          className="col-span-1 flex flex-col rounded-lg bg-orange-300 text-center shadow relative ring-1 ring-white/10 cursor-pointer hover:ring-sky-300/70 transition"
          onClick={handleTrackPriceClick} // Add click event handler
        >
          <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
          <div className="flex flex-1 flex-col p-8">
            <h2 className="mt-6 text-sm font-medium text-white">
              Get Historical Floor Prices
            </h2>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only"></dt>
              <dd className="text-sm text-amber-600">
                For Any Token And Time Period In The ETH Chain
              </dd>
            </dl>
          </div>
        </li>

        {/* Feature Section 2 */}
        <li
          className="col-span-1 flex flex-col rounded-lg bg-orange-300 text-center shadow relative ring-1 ring-white/10 cursor-pointer hover:ring-sky-300/70 transition"
          onClick={handleSearchNFTClick}
        >
          <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
          <div className="flex flex-1 flex-col p-8">
            <h2 className="mt-6 text-sm font-medium text-white">
              Get Latest Trending NFTs
            </h2>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only"></dt>
              <dd className="text-sm text-amber-600">
                Get Trending NFTs Over Specified Period of Time
              </dd>
            </dl>
          </div>
        </li>
      </ul>
      {chartStatus && (
          <ReactEcharts option={getOption(sales)} className="chart-margin"/>
      )}
      {tableStatus && (
          <Table dataSource={tableData} columns={colums} />
      )}
      {/* Input Cards (Forms) */}
      {showPriceInputCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-2/3">
            <h2 className="text-lg font-medium mb-4">Get Historical Floor Prices</h2>
            <form onSubmit={handlePriceFormSubmit}>
              {/* ... (input fields for "Get Historical Floor Prices" form) ... */}
              {/* Input fields for "Get Historical Floor Prices" form */}
              <div className="mb-4">
                <label htmlFor="priceDays" className="block font-medium mb-1">
                  Days (i.e. '14'):
                </label>
                <input
                  type="text"
                  id="priceDays"
                  name="priceDays"
                  value={priceDays}
                  onChange={(e) => setPriceDays(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tokenAddress" className="block font-medium mb-1">
                  Token Address (i.e. '0x0000000000A39bb272e79075ade125fd351887Ac'):
                </label>
                <input
                  type="text"
                  id="tokenAddress"
                  name="tokenAddress"
                  value={tokenAddress}
                  onChange={(e) => settokenAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              {/* Visualization Section for "Get Historical Floor Prices" */}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleCloseInputCard}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2"
                  onClick={showChart}
                >
                  Track Prices
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNFTInputCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-2/3">
            <h2 className="text-lg font-medium mb-4">Get Latest Trending NFTs</h2>
            <form onSubmit={handleNFTFormSubmit}>
              {/* ... (input fields for "Get Latest Trending NFTs" form) ... */}
              <div className="mb-4">
                <label htmlFor="nftDays" className="block font-medium mb-1">
                  Time Interval in Hours (i.e. '24'):
                </label>
                <input
                  type="text"
                  id="nftDays"
                  name="nftDays"
                  value={nftDays}
                  onChange={(e) => setNftDays(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              {/* Visualization Section for "Get Latest Trending NFTs" */}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleCloseInputCard}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2"
                  onClick={showTable}
                >
                  Search NFTs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Example;
