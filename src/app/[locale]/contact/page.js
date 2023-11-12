"use client"
import Image from "next/image";
import React from "react";
import contactus from "../../../../public/assets/images/info-center.png";
import { useTranslations } from "next-intl";

export const Page = () => {
	const t = useTranslations()
	return (
		<div className="w-full  bg-[#fafafa] lg:px-16 md:px-2 sm md:py-8">
			<div className="flex justify-center items-center lg:gap-[70px] md:gap-[40px]">
				<div className="md:w-[300px] lg:w-[43%] max-sm:hidden sm:hidden md:flex">
					<Image
						src={contactus}
						alt=""
						style={{ width: "100%", height: "100%" }}
					/>
				</div>

				<div className="sm:w-full max-sm:w-full md:w-[40%]">
					<div>
						<div
							style={{
								backgroundImage:
									"linear-gradient(to top right, #c1dbfe, #E8D5FF)"
							}}
							className=" dark:bg-slate-900 md:rounded-2xl shadow sm:py-10 sm-py-10 dark:shadow-gray-800 py-6 sm:px-12 max-sm:px-14 md:px-10 lg:px-16"
						> 
							<h2 className="mb-6 leading-normal">{t("Contact Us")}</h2>

							<form
								method="post"
								name="myForm"
								id="myForm"
								// onClick="return validateForm()"
							>
								<p className="mb-0" id="error-msg"></p>
								<div id="simple-msg"></div>
								<div className="grid grid-cols-1">
									<div className="mb-5">
										<div className="text-start">
											<label htmlFor="email" className="font-semibold">
												{t("Email")}
											</label>
											<div className="form-icon relative mt-2">
												<input
													name="email"
													id="email"
													className="form-input w-full py-2 px-3 h-10 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-lg outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0 text-start"
													
												/>
											</div>
										</div>
									</div>
									<div className="mb-5">
										<div className="text-start">
											<label htmlFor="name" className="font-semibold">
												{t("Username")}
											</label>
											<div className="form-icon relative mt-2">
												<input
													name="name"
													id="name"
													className="form-input w-full py-2 px-3 h-10 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-lg outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0 text-start"
													
												/>
											</div>
										</div>
									</div>

									<div className="mb-5">
										<div className="text-start">
											<label htmlFor="messages" className="font-semibold">
												{t("Message")}
											</label>
											<div className="form-icon relative mt-2">
												<textarea
													name="messages"
													id="messages"
													className="form-input w-full py-2 px-3 h-28 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-lg outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0 text-start"	
												></textarea>
											</div>
										</div>
									</div>
								</div>
								<button
									type="submit"
									id="submit"
									name="send"
									className="btn bg-gradient-primary py-2 px-5  rounded-full text-white  justify-center flex items-center"
								>
									{t("Send Message")}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
