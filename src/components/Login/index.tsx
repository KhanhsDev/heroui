"use client";
import React, { useState } from "react";
import BackgroundGradient from "../Register/BackgroundGradient";
import Header from "../Register/Header";
import BrandPanel from "../Register/BrandPanel";
import { ArrowBackIcon, MailIcon } from "../icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import InputField from "../Register/InputField";
import PasswordInputField from "../Register/PasswordInputField";
import { Link } from "@heroui/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen relative overflow-hidden">
      <div className="flex gap-[2.4rem] px-[2.4rem] relative">
        <BackgroundGradient />
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex flex-row justify-center items-center">
            {/* Left Panel - Branding */}
            <div className="w-[36%] overflow-hidden">
              <BrandPanel />
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col relative min-w-[110.4rem] h-full">
              {/* Back Button */}
              <div className="flex items-center gap-[0.8rem] cursor-pointer pl-[6.3rem] pt-[6.3rem]">
                <div className="flex items-center justify-center size-[4rem] rounded-[1.6rem] bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-tertiary)] to-[var(--bg-primary)]">
                  <ArrowBackIcon />
                </div>
                <p className="text-[1.8rem] text-[var(--text-tertiary)]">
                  Trở lại
                </p>
              </div>
              <div className="flex gap-[12.1rem] flex-1 pt-[7.6rem] pl-[22.4rem]">
                {/* Form Content */}
                <div className="flex-1 flex justify-start pr-[6.3rem]">
                  <div className="w-full max-w-[55.8rem]">
                    <div className="flex flex-col">
                      {/* Title */}
                      <div className="flex flex-col gap-[0.8rem] mb-[4.8rem]">
                        <h1 className="text-[2.4rem] text-[var(--text-primary)]">
                          Đăng nhập tài khoản
                        </h1>
                        <div className="flex items-center gap-[1.3rem]">
                          <p className="text-[1.8rem] text-[var(--text-tertiary)]">
                            Bạn không có tài khoản
                          </p>
                          <Button
                            onClick={() => router.push("/register")}
                            variant="flat"
                            className="px-[1.2rem] py-[1rem] rounded-[1.2rem] bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card)] via-[var(--bg-tertiary)] h-fit"
                          >
                            <span className="text-[1.6rem] text-[var(--text-primary)] underline">
                              Đăng ký
                            </span>
                          </Button>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="flex flex-col gap-[2.4rem] mb-[4.8rem]">
                        <div className="flex flex-col gap-[1.2rem]">
                          <label className="text-[1.8rem] text-[var(--text-primary)]">
                            Email
                          </label>
                          <InputField
                            icon={MailIcon}
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                          />
                        </div>
                        <div className="flex flex-col gap-[1.2rem]">
                          <label className="text-[1.8rem] text-[var(--text-primary)]">
                            Mật khẩu
                          </label>
                          <PasswordInputField
                            value={password}
                            onChange={setPassword}
                            placeholder="********"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Link
                            href="/forgot-password"
                            className="text-[1.8rem] font-medium text-[#ede8e8] font-wix leading-[1.2]"
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        variant="flat"
                        className="w-full h-[5.6rem] rounded-[1.6rem] bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] mb-[2.4rem] hover:opacity-90 transition-opacity"
                      >
                        <span className="text-[1.8rem] text-[var(--text-primary)]">
                          Đăng nhập
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
