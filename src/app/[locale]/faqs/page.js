"use client"
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { faqsData } from "@/data/mockFaqs";
 
export default function FAQsPage() {
  const [open, setOpen] = useState(1);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <main className="mb-20 mt-16 md:mx-16 max-sm:mx-3 sm:mx-7 mx-32">
    <Fragment className="flex justify-center" >
      <h1 className="text-center max-sm:text-2xl mb-7">Frequently Asked Questions</h1>
      {
        faqsData.map((e) => (
          <Accordion
          key={e.id}
          open={open === e.id}
          className="border border-blue-gray-100 px-4 rounded-lg mb-2"
        >
          <AccordionHeader
            onClick={() => handleOpen(e.id)}
            className={`border-b-0 transition-colors ${
              open === e.id ? "text-app-primary hover:!text-blue-800" : ""
            }`}
          >
            {e.question}
          </AccordionHeader>
          <AccordionBody className="text-base font-normal pt-0">
            {e.answer}
          </AccordionBody>
        </Accordion>
        ))
      }
    </Fragment>
    </main>
  );
}
  