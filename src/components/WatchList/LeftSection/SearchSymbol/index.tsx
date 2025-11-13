"use client";
import React, { useState, useRef, useEffect } from "react";
import PlusIcon from "@/svg/PlusIcon";
import "./style.scss";

interface Stock {
  symbol: string;
  name: string;
}

interface SearchSymbolProps {
  onStockSelect?: (stock: Stock) => void;
}

const SearchSymbol = ({ onStockSelect }: SearchSymbolProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fake data - 20 mã cổ phiếu
  const stockList: Stock[] = [
    { symbol: "AAA", name: "Công ty cổ phần Nhựa An Phát Xanh" },
    { symbol: "AAM", name: "Công ty cổ phần Thủy sản Mekong" },
    { symbol: "AAT", name: "Công ty cổ phần Tập đoàn Tiên Sơn" },
    { symbol: "ACB", name: "Ngân hàng TMCP Á Châu" },
    {
      symbol: "ACL",
      name: "Công ty cổ phần Xuất nhập khẩu Thủy sản Cửu Long An Giang",
    },
    {
      symbol: "AGG",
      name: "Công ty cổ phần Đầu tư và Phát triển Bất động sản An Gia",
    },
    {
      symbol: "BCM",
      name: "Tổng Công ty Đầu tư và Phát triển Công nghiệp - CTCP",
    },
    { symbol: "BID", name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam" },
    { symbol: "BVH", name: "Tập đoàn Bảo Việt" },
    { symbol: "CTG", name: "Ngân hàng TMCP Công Thương Việt Nam" },
    { symbol: "FPT", name: "Công ty cổ phần FPT" },
    { symbol: "GAS", name: "Tổng Công ty Khí Việt Nam - CTCP" },
    {
      symbol: "GMD",
      name: "Công ty cổ phần Đầu tư Phát triển Nhà Đô Thị Gemadept",
    },
    { symbol: "HPG", name: "Công ty cổ phần Tập đoàn Hòa Phát" },
    { symbol: "MBB", name: "Ngân hàng TMCP Quân đội" },
    { symbol: "MSN", name: "Công ty cổ phần Tập đoàn Masan" },
    { symbol: "MWG", name: "Công ty cổ phần Đầu tư Thế Giới Di Động" },
    { symbol: "PLX", name: "Tập đoàn Xăng dầu Việt Nam" },
    { symbol: "VCB", name: "Ngân hàng TMCP Ngoại Thương Việt Nam" },
    { symbol: "VHM", name: "Công ty cổ phần Vinhomes" },
  ];

  // Filter stocks based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = stockList.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      // Show all stocks when no search term
      setFilteredStocks(stockList);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsInputMode(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when switching to input mode
  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  const handleStockSelect = (stock: Stock) => {
    console.log("Selected stock:", stock);

    // Call parent callback if provided
    if (onStockSelect) {
      onStockSelect(stock);
    }

    setSearchTerm("");
    setIsOpen(false);
    setIsInputMode(false);
  };

  const handleButtonClick = () => {
    setIsInputMode(true);
    setIsOpen(true);
    setFilteredStocks(stockList);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (!searchTerm) {
      setFilteredStocks(stockList);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Check if clicking inside dropdown
    if (
      searchRef.current &&
      searchRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    // Delay to allow click event on dropdown items
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsInputMode(false);
        setIsOpen(false);
        setSearchTerm("");
      }
    }, 200);
  };

  return (
    <div className="search-symbol-container" ref={searchRef}>
      {!isInputMode ? (
        /* Button Mode */
        <button onClick={handleButtonClick} className="add-symbol-button">
          <PlusIcon />
          <span className="text-[1.6rem] font-400 leading-1.4">
            Thêm mã vào danh mục
          </span>
        </button>
      ) : (
        /* Input Mode */
        <>
          <div className="search-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Nhập mã chứng khoán"
              className="search-input"
            />
          </div>

          {/* Dropdown Results */}
          {isOpen && filteredStocks.length > 0 && (
            <div className="search-dropdown">
              <div className="search-results">
                {filteredStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="search-item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleStockSelect(stock);
                    }}
                  >
                    <div className="stock-info">
                      <p className="stock-symbol">{stock.symbol}</p>
                      <p className="stock-name">{stock.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchSymbol;
