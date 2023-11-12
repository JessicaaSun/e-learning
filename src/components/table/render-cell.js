import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";

import { users } from "./data";
import { IconButton, StyledBadge } from "./table.styled";
import { BsEyeFill } from "react-icons/bs";
import { RiDeleteBack2Fill, RiEdit2Fill } from "react-icons/ri";

export const RenderCell = ({ user, columnKey }) => {
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
          {user.email}
        </User>
      );
    case "age":
      return (
        <Col>
          <Row>
            <Text b size={14}>
              {user.age}
            </Text>
          </Row>
        </Col>
      );
    case "courseEnrolled":
      return (
        <Col>
          <Row justify="center" align="center">
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
          </Row>
        </Col>
      );
    case "status":
      return (
        // @ts-ignore
        <StyledBadge type={String(user.status)}>{cellValue}</StyledBadge>
      );

    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user", user.id)}>
                <BsEyeFill size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => console.log("Edit user", user.id)}>
                <RiEdit2Fill size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => console.log("Delete user", user.id)}
            >
              <IconButton>
                <RiDeleteBack2Fill size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return cellValue;
  }
};
