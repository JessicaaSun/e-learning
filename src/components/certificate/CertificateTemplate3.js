"use client"
import Image from "next/image";
import istademyLogo from "../../../public/assets/logos/logo.png";
import courseHtml from "../../../public/assets/images/logohtml.png";

const CertificateTemplate3 = () => {
	return (
		<main>
			<div className="text-app-text my-[72px] flex  flex-col items-center justify-between overflow-hidden">
				<div className="certificate3 bg-white border-8 border-blue-800">
				<div className="pb-40 ">
							<div className="flex justify-center">
								<div className="pt-10">
									<Image
										src={istademyLogo}
										alt="istademy logo"
										className="w-28"
									/>
								</div>
								<div className="text-center pl-20">
									<h1 className="mt-14 font-serif  text-3xl md:text-5xl lg:text-6xl font-poppins font-bold ">
										CERTIFICATE{" "}
										<span className="block  text-xl lg:text-2xl mt-0.5 md:mt-3">
											of Achievement
										</span>
									</h1>
								</div>
								<div className="pl-28 mt-5">
									<Image src={courseHtml} alt="html course" className="w-24" />
								</div>
							</div>
							<div className="w-4/5 md:w-2/5 mx-auto text-center">
								<em className="block font-normal text-gray-500 text-xl mt-4 md:mt-7 mb-2 md:mb-5">
									This is to certify that
								</em>{" "}
								<h2 className="font-nunito font-bold text-gray-800 text-xl border-b border-gray-800">
									Chhanny Vichhai
								</h2>{" "}
								<em className="block font-normal text-gray-500 text-xl mt-4 md:mt-7 mb-2 md:mb-5">
									Has complete the course in
								</em>{" "}
								<h3 className="text-2xl font-normal rounded-xl p-2.5 text-center bg-gray-200">
									HTML Basic
								</h3>{" "}
							</div>

							<div className="flex text-center mt-10 cert-footer w-11/12 xl:w-3/5 mx-auto flex-col md:flex-row items-center md:justify-between mb-12">
								<p className="left-side md:w-2/5">
									<span className="border-b border-gray-800 text-xs text-gray-900 font-nunito block">
										#16b525689c3d3a5735481d78aba4dc03
									</span>
									<em className="text-sm text-gray-500 font-nunito block">
										certificate
									</em>
								</p>

								<p className="right-side md:w-2/5">
									<span className="border-b border-gray-800 text-xs text-gray-900 font-nunito block">
										July 14, 2023
									</span>
									<em className="text-sm text-gray-500 font-nunito block">
										Issued by <a href="">ISTADemy</a>
									</em>
								</p>
							</div>
						</div>
				</div>
			</div>
		</main>
	);
};

export default CertificateTemplate3;
