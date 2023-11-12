import React from "react";
import {
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import Link from "next/link";
import { useGetCheckIfReadQuery } from "@/store/features/content-progress/contentProgressApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/[locale]/loading";

const CurriculumTable = ({ sections, course }) => {
  const { data: user, isLoading: loadingUser } = useGetUserQuery();

  return (
    <div className="flex lg:max-w-[100%] lg:min-w-[100%] justify-center z-[2] relative ">
      <div className="bg-white rounded-2xl shadow-md w-[90%] lg:w-[90%]	">
        <Tabs value={sections[0]?.uuid} orientation="vertical">
          <div className="border-r-2 rounded-tl-2xl rounded-bl-2xl bg-blue-50">
            <TabsHeader
              className=" lg:w-80 text-left rounded-tl-2xl bg-blue-50 mb-44"
            >
              {sections?.map((section) => (
                <Tab
                  className="shadow-none place-items-start my-1 text-left bg-transparent "
                  key={section?.uuid}
                  value={section?.uuid}
                >
                  <span>{section?.title}</span>
                </Tab>
              ))}
            </TabsHeader>
          </div>
          <TabsBody>
            {sections?.map((section) => (
              <TabPanel
                key={section?.uuid}
                value={section?.uuid}
                className="py-0 cursor-pointer"
              >
                <div>
                  {section?.lessons?.map((lesson) => {
                    // console.log("lesson",lesson?.contents[0]?.uuid
                    // )
                    return user === undefined ? (
                      <Link
                        key={lesson?.uuid}
                        href={`/auth/login`}
                      >
                        <p className="border-b-2 py-5">{lesson?.title}</p>
                      </Link>
                    ) : (
                      <Link
                        key={lesson?.uuid}
                        href={`/student/courses/${(course?.title).toLowerCase()}/${
                          lesson?.uuid
                        }/${lesson?.contents[0]?.uuid}`}
                      >
                        <p className="border-b-2 py-5">{lesson?.title}</p>
                      </Link>
                    );
                  })}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default CurriculumTable;
