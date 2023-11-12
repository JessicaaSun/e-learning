"use client";
import { useState } from "react";
import { Table } from "@nextui-org/react";
import React from "react";
import { columns, users } from "@/data/mockStudent";
import { RenderCell } from "@/components/table/render-cell";
import { Input } from "antd";
const { Search } = Input;

export const TableWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div>
      <div className="mb-5 w-full flex justify-end">
        <Search
          placeholder="Search student"
          allowClear
          size="large"
          style={{ width: 300 }}
          onSearch={handleSearch}
        />
      </div>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
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
              align={column.uid == "courseEnrolled" ? "center" : "start"}
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
                  {RenderCell({ user: item, columnKey: columnKey })}
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
