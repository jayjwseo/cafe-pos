/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";

import { Button, ButtonGroup, Box, Card, CardContent } from "@mui/material";

const menuItems = [
  {
    id: "hd1",
    type: "hot",
    name: "Latte",
    value: "latte",
    price: "2.5",
  },
  {
    id: "hd2",
    type: "hot",
    name: "Cappuccino",
    value: "cappuccino",
    price: "2.5",
  },
  {
    id: "hd3",
    type: "hot",
    name: "Long Black",
    value: "longBlack",
    price: "2.5",
  },
  {
    id: "hd4",
    type: "hot",
    name: "Short Black",
    value: "shortBlack",
    price: "2.5",
  },
  {
    id: "hd5",
    type: "hot",
    name: "Flat White",
    value: "flatWhite",
    price: "2.5",
  },
  { id: "hd6", type: "hot", name: "Mocha", value: "mocha", price: "3.5" },
  {
    id: "hd7",
    type: "hot",
    name: "Hot Chocolate",
    value: "hotChocolate",
    price: "3.0",
  },
  { id: "hd8", type: "hot", name: "Tea", value: "tea", price: "2.5" },
  {
    id: "cd1",
    type: "cold",
    name: "Iced Latte",
    value: "icedLatte",
    price: "4.0",
  },
  {
    id: "cd2",
    type: "cold",
    name: "Iced Americano",
    value: "icedAmericano",
    price: "4.0",
  },
  {
    id: "cd3",
    type: "cold",
    name: "Iced Blue",
    value: "icedBlue",
    price: "3.5",
  },
  {
    id: "cd4",
    type: "cold",
    name: "Iced Mango",
    value: "icedMango",
    price: "3.5",
  },
  {
    id: "cd5",
    type: "cold",
    name: "Iced Watermelon",
    value: "icedWatermelon",
    price: "3.5",
  },
  {
    id: "cd6",
    type: "cold",
    name: "Iced Peach",
    value: "icedPeach",
    price: "3.5",
  },
  {
    id: "cd7",
    type: "cold",
    name: "Iced Chocolate",
    value: "icedChocolate",
    price: "3.5",
  },
  {
    id: "cd8",
    type: "cold",
    name: "Iced Mocha",
    value: "icedMocha",
    price: "4.5",
  },
  {
    id: "other1",
    type: "other",
    name: "Extra",
    value: "icedMocha",
    price: "0.5",
  },
  {
    id: "other2",
    type: "other",
    name: "Coupon 25",
    value: "cp25",
    price: "25.0",
  },
  {
    id: "other3",
    type: "other",
    name: "Coupon 35",
    value: "cp35",
    price: "35.0",
  },
];

const cashTypes = [
  { label: "$ 100", amount: 100 },
  { label: "$ 50", amount: 50 },
  { label: "$ 20", amount: 20 },
  { label: "$ 10", amount: 10 },
  { label: "$ 5", amount: 5 },
  { label: "$ 1", amount: 1 },
  { label: "$ 0.5", amount: 0.5 },
  { label: "$ 0.2", amount: 0.2 },
  { label: "$ 3.5 Coupon", amount: 3.5 },
  { label: "$ 2.5 Coupon", amount: 2.5 },
];

const menuButton = (menu) => {
  return (
    <__ButtonWrapper>
      <__MenuButton type="button" value={menu.is} key={menu.id}>
        <div>
          <span>{menu.name}</span>
          <span>{menu.price}</span>
        </div>
      </__MenuButton>
    </__ButtonWrapper>
  );
};

const cashButton = (cashType) => {
  return (
    <__ButtonWrapper>
      <__MenuButton
        type="button"
        value={cashType.amount}
        key={cashType.label}
        $bColor="#E0E0E0"
      >
        <div>{cashType.label}</div>
      </__MenuButton>
    </__ButtonWrapper>
  );
};

const productRow = (product) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <__ItemText
        style={{
          width: "50%",
          paddingLeft: "1.5rem",
          borderBottom: "1px solid #2e3237",
          borderRight: "1px solid #2e3237",
        }}
      >
        2
      </__ItemText>
      <__ItemText
        style={{
          width: "100%",
          paddingLeft: "1rem",
          borderBottom: "1px solid #2e3237",
          borderRight: "1px solid #2e3237",
        }}
      >
        Americano
      </__ItemText>
      <__ItemText
        style={{
          width: "50%",
          paddingLeft: "1rem",
          borderBottom: "1px solid #2e3237",
        }}
      >
        32
      </__ItemText>
    </div>
  );
};

function App() {
  const [order, setOrder] = useState([]);
  const [paid, setPaid] = useState(0);

  return (
    <Fragment>
      <CssBaseline />
      <__Container style={{ overflow: "hidden" }}>
        <__Card>
          <__CardContent>
            <__Box>
              <__ButtonGroup orientation="vertical">
                {menuItems
                  .filter((i) => i.type === "hot")
                  .map((hotDrink) => menuButton(hotDrink))}
              </__ButtonGroup>
              <__ButtonGroup orientation="vertical">
                {menuItems
                  .filter((i) => i.type === "cold")
                  .map((coldDrink) => menuButton(coldDrink))}
              </__ButtonGroup>
              <div style={{ display: "flex", width: "100%" }}>
                {menuItems
                  .filter((i) => i.type === "other")
                  .map((other) => menuButton(other))}
              </div>
            </__Box>
          </__CardContent>
        </__Card>
        <div style={{ display: "flex" }}>
          <__Card style={{ marginTop: "0", flexGrow: "1" }}>
            <__CardContent>
              <__Box>
                <__ButtonGroup orientation="vertical">
                  {cashTypes.map((cashType) => cashButton(cashType))}
                </__ButtonGroup>
              </__Box>
            </__CardContent>
          </__Card>
          <__Card style={{ marginTop: "0", marginLeft: "0", flexGrow: "10" }}>
            <__CardContent
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <__Container style={{ height: "70%" }}>
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #2e3237",
                    padding: "0.5rem",
                    justifyContent: "space-between",
                  }}
                >
                  <__ItemText style={{ width: "50%", paddingLeft: "1rem" }}>
                    Qty
                  </__ItemText>
                  <__ItemText style={{ width: "100%", paddingLeft: "1rem" }}>
                    Item
                  </__ItemText>
                  <__ItemText style={{ width: "50%", paddingLeft: "1.5rem" }}>
                    Price ($)
                  </__ItemText>
                </div>
                {productRow()}
                {productRow()}
              </__Container>
              <div
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <__TotalBox>
                  <__TotalInnerBox
                    style={{
                      background: "#9c9c9c",
                      color: "#fff",
                    }}
                  >
                    Qty
                  </__TotalInnerBox>
                  <__TotalInnerBox
                    style={{
                      color: "#9c9c9c",
                    }}
                  >
                    6534
                  </__TotalInnerBox>
                </__TotalBox>
                <__TotalBox>
                  <__TotalInnerBox
                    style={{
                      background: "#ed7777",
                      color: "#fff",
                    }}
                  >
                    Total
                  </__TotalInnerBox>
                  <__TotalInnerBox
                    style={{
                      color: "#ed7777",
                    }}
                  >
                    6534
                  </__TotalInnerBox>
                </__TotalBox>
                <__TotalBox>
                  <__TotalInnerBox
                    style={{
                      background: "#00BFA5",
                      color: "#fff",
                    }}
                  >
                    Paid
                  </__TotalInnerBox>
                  <__TotalInnerBox
                    style={{
                      color: "#00BFA5",
                    }}
                  >
                    543
                  </__TotalInnerBox>
                </__TotalBox>
                <__TotalBox>
                  <__TotalInnerBox
                    style={{
                      background: "#607D8B",
                      color: "#fff",
                    }}
                  >
                    Change
                  </__TotalInnerBox>
                  <__TotalInnerBox
                    style={{
                      color: "#607D8B",
                    }}
                  >
                    543
                  </__TotalInnerBox>
                </__TotalBox>
              </div>
            </__CardContent>
          </__Card>
        </div>
        <__Card style={{ marginTop: "0" }}>
          <__CardContent style={{ display: "flex" }}>
            <__ButtonWrapper
              style={{ flexGrow: "1", justifyContent: "center" }}
            >
              <__MenuButton type="button" $bColor="#323232">
                <div style={{ justifyContent: "center", color: "#fff" }}>
                  Logs
                </div>
              </__MenuButton>
            </__ButtonWrapper>
            <__ButtonWrapper style={{ flexGrow: "1" }}>
              <__MenuButton type="button" $bColor="#FEE6D3">
                <div style={{ justifyContent: "center" }}>Clear Order</div>
              </__MenuButton>
            </__ButtonWrapper>
            <__ButtonWrapper style={{ flexGrow: "1" }}>
              <__MenuButton type="button" $bColor="#FEE6D3">
                <div style={{ justifyContent: "center" }}>Clear Paid</div>
              </__MenuButton>
            </__ButtonWrapper>
            <__ButtonWrapper style={{ flexGrow: "6" }}>
              <__MenuButton type="button" $bColor="#323232">
                <div style={{ justifyContent: "center", color: "#fff" }}>
                  Done
                </div>
              </__MenuButton>
            </__ButtonWrapper>
          </__CardContent>
        </__Card>
      </__Container>
    </Fragment>
  );
}

export default App;

const __Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const __Card = styled(Card)`
  margin: 1rem;
`;

const __CardContent = styled(CardContent)`
  padding: 0.5rem !important;
  background: #fff;
`;

const __ButtonGroup = styled(ButtonGroup)`
  flex-grow: 1;
`;

const __ButtonWrapper = styled.div`
  margin: 0.1rem;
  flex-grow: 1;
`;

const __MenuButton = styled(Button)`
  text-align: left;
  width: 100%;
  height: 45px;
  /* border: 1px solid #2e3237 !important; */
  border: none !important;

  background-color: ${(p) =>
    p.$bColor ? `${p.$bColor} !important` : "#F2E4CD !important"};

  > div {
    color: #323232;
    font-size: 1.5rem;
    font-weight: 600;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const __Box = styled(Box)`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
`;

const __ItemText = styled.div`
  font-size: 1.5rem;
`;

const __TotalBox = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const __TotalInnerBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
