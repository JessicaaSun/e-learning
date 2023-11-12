"use client"
import Image from "next/image";
import certificateicon from "../../../../public/assets/images/certificate2.png";
import certificateimage from "../../../../public/assets/images/certificate3.png";
import { useTranslations } from "next-intl";

const CetificatePage = () => {
	
	const t = useTranslations()
	
	return (
		// text-app-primary (color)
		<main className="text-app-text mb-[72px] flex min-h-screen flex-col items-center justify-between overflow-hidden">
			<section className="flex justify-center mx-[90px] pb-20 pt-28">
				<div className="md:w-[60%] sm:w-full mt-9 mr-4">
					<h1 className="text-[45px] max-sm:text-[36px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] pb-5">
						{t("My Certificates")}
					</h1>
					<p className="text-[18px] max-md:text-[16px] leading-[27px]">
						{t("Complete this course to get your certificate!")} 
					</p>
					<div className="flex space-x-6">
						<button
							type="button"
						
							className={`text-base primaryButton font-medium mt-10  text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
						>
							{t("Continue learning")}
						</button>
						<button
							type="button"
							className={`text-base secondaryButton font-medium mt-10  text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
						>
						{t("View Courses")}
						</button>
					</div>
				</div>
				<div className="md:w-[40%] ] max-sm:hidden h-full relative">
					<Image
						alt="certificate-icon"
						src={certificateicon}
						style={{ width: "100%" }}
					/>
				</div>
			</section>

			<section className="px-[72px] flex-col items-center flex w-full bg-[#ecefff] py-20 justify-center">
				<div className=" justify-center flex-wrap gap-8 flex">
					<Image
						src={certificateimage}
						alt="certificateimage"
						style={{ width: "69%", height: "100%" }}
					/>
				</div>
			</section>
		</main>

	);
};
export default CetificatePage;
