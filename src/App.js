/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";

import { Button, ButtonGroup, Box, Card, CardContent } from "@mui/material";

const hotDrinks = [
  {
    name: "Latte",
    value: "latte",
    price: 2.5,
  },
  { name: "Cappuccino", value: "cappuccino", price: "2.5" },
  { name: "Long Black", value: "longBlack", price: "2.5" },
  { name: "Short Black", value: "shortBlack", price: "2.5" },
  { name: "Flat White", value: "flatWhite", price: "2.5" },
  { name: "Mocha", value: "mocha", price: "3.5" },
  { name: "Hot Chocolate", value: "hotChocolate", price: "3.0" },
  { name: "Tea", value: "tea", price: "2.5" },
];

const coldDrinks = [
  { name: "Iced Latte", value: "icedLatte", price: "4.0" },
  { name: "Iced Americano", value: "icedAmericano", price: "4.0" },
  { name: "Iced Blue", value: "icedBlue", price: "3.5" },
  { name: "Iced Mango", value: "icedMango", price: "3.5" },
  { name: "Iced Watermelon", value: "icedWatermelon", price: "3.5" },
  { name: "Iced Peach", value: "icedPeach", price: "3.5" },
  { name: "Iced Chocolate", value: "icedChocolate", price: "3.5" },
  { name: "Iced Mocha", value: "icedMocha", price: "4.5" },
];

const cashTypes = [
  { label: "$ 50", amount: 50 },
  { label: "$ 20", amount: 20 },
  { label: "$ 10", amount: 10 },
  { label: "$ 5", amount: 5 },
  { label: "$ 3.5 CP", amount: 3.5 },
  { label: "$ 2.5 CP", amount: 2.5 },
  { label: "$ 1", amount: 1 },
  { label: "$ 0.5", amount: 0.5 },
  { label: "$ 0.2", amount: 0.2 },
  { label: "$ 0.1", amount: 0.1 },
];

const menuButton = (menu) => {
  return (
    <__ButtonWrapper>
      <__MenuButton type="button" value={menu.value} key={menu.value}>
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
      <__MenuButton type="button" value={cashType.amount} key={cashType.label}>
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
          paddingLeft: "1.5rem",
          borderBottom: "1px solid #2e3237",
          borderRight: "1px solid #2e3237",
        }}
      >
        Americano
      </__ItemText>
      <__ItemText
        style={{
          width: "50%",
          paddingLeft: "1.5rem",
          borderBottom: "1px solid #2e3237",
        }}
      >
        32
      </__ItemText>
    </div>
  );
};

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <__Container style={{ overflow: "hidden" }}>
        <__Card>
          <__CardContent>
            <__Box>
              <__ButtonGroup orientation="vertical">
                {hotDrinks.map((hotDrink) => menuButton(hotDrink))}
              </__ButtonGroup>
              <__ButtonGroup orientation="vertical">
                {coldDrinks.map((coldDrink) => menuButton(coldDrink))}
                {menuButton({
                  name: "Extra Shot",
                  value: "extraShot",
                  price: "0.5",
                })}
              </__ButtonGroup>
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
                  <__ItemText style={{ width: "50%", paddingLeft: "1rem" }}>
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
                <div
                  style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  TOTAL
                </div>
                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  hello
                </div>
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Paid
                </div>
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Change
                </div>
              </div>
            </__CardContent>
          </__Card>
        </div>
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
  padding: 1rem !important;
`;

const __ButtonGroup = styled(ButtonGroup)`
  flex-grow: 1;
`;

const __ButtonWrapper = styled.div`
  margin: 0.2rem;
`;

const __MenuButton = styled(Button)`
  text-align: left;
  width: 100%;
  height: 45px;
  border: 1px solid #2e3237 !important;
  background-image: linear-gradient(
    to right,
    #fff3e0 0%,
    #fff3e0 80%,
    #ffefd6 100%
  ) !important;

  > div {
    color: #2e3237;
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
