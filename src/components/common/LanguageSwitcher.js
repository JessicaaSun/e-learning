"use client";
import React from "react";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";
import LinkLocale from "next-intl/link";
import { usePathname } from "next/navigation";

const languages = [
  {
    name: "Khmer",
    flag: <span className="fi fi-kh"></span>,
    locale: "km",
  },
  {
    name: "English",
    flag: <span className="fi fi-us"></span>,
    locale: "en",
  },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [selectedLocale, setSelectedLocale] = React.useState(
    languages[0].locale
  );

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsMenuOpen(false);
    setSelectedLocale(language.locale);
  };

  const renderItems = languages.map((language) => (
    <LinkLocale
      href={
        pathname == "/en"
          ? "/"
          : pathname.startsWith("/en")
          ? `${language.locale}/${pathname.slice(pathname.indexOf("/", 1))}`
          : `${language.locale}/${pathname}`
      }
      locale={language.locale}
      key={language.name}
    >
      <MenuItem
        key={language.name}
        onClick={() => {
          handleLanguageSelect(language);
        }}
      >
        <div className="flex">
          <div className="h-5 w-5 rounded-full object-cover mr-2">
            {language.flag}
          </div>
          {language.name}
        </div>
      </MenuItem>
    </LinkLocale>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" variant="small" className="font-normal">
            <button
              role="menuitem"
              className="w-full py-[7.7px] px-3 text-start leading-tight cursor-pointer select-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none flex justify-center items-center gap-2 lg:flex rounded-full"
            >
              <div className="w-5 rounded-full object-cover">
                {selectedLanguage.flag}
              </div>
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </Typography>
        </MenuHandler>
        <MenuList className=" min-w-0">{renderItems}</MenuList>
      </Menu>
    </React.Fragment>
  );
}
