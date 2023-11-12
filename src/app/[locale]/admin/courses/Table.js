"use client";
import { useState } from "react";
import { Table } from "@nextui-org/react";
import React from "react";
import { courseData } from "@/data/mockCourse";
import { RenderCell } from "./render-cell";
import { Input } from "antd";
const { Search } = Input;

export const TableWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredUsers = searchQuery
    ? courseData.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courseData;

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "LEVEL", uid: "level" },
    { name: "LESSON", uid: "lesson" },
    { name: "REQUIRED TIME", uid: "requiredTime" },
    // {name: 'STATUS', uid: 'status'},
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div>
      <div className="mb-5 w-full flex justify-end">
        <Search
          placeholder="Search course"
          allowClear
          size="large"
          style={{ width: 300 }}
          onSearch={handleSearch}
        />
      </div>
      <Table
        aria-label="Example table with custom cells"
        css={{
        
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        //   selectionMode="multiple"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={filteredUsers}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({ data: item, columnKey: columnKey })}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </div>
  );
};
