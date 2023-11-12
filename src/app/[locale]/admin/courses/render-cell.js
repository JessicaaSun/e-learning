import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { IconButton, StyledBadge } from "@/components/table/table.styled";
import { BsEyeFill } from "react-icons/bs";
import { RiDeleteBack2Fill, RiEdit2Fill } from "react-icons/ri";

export const RenderCell = ({ data, columnKey }) => {
  const cellValue = data[columnKey];
  switch (columnKey) {
    case "title":
      return <User squared src={data.image} name={cellValue} css={{ p: 0 }} />;
      return (
        <Col>
          <Row justify="center" align="center">
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
          </Row>
        </Col>
      );
    case "description":
      return (
        <Col>
          <Row>
            <Text
              size={14}
              css={{
                width: "250px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.description}
            </Text>
          </Row>
        </Col>
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
              <IconButton onClick={() => console.log("View data", user.id)}>
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
