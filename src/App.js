/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { format } from "date-fns";

import { Button, ButtonGroup, Box, Card, CardContent } from "@mui/material";

const menuItems = [
  {
    id: "hd1",
    type: "hot",
    name: "Latte",
    value: "latte",
    price: 2.5,
    qty: 1,
  },
  {
    id: "hd2",
    type: "hot",
    name: "Cappuccino",
    value: "cappuccino",
    price: 2.5,
    qty: 1,
  },
  {
    id: "hd3",
    type: "hot",
    name: "Long Black",
    value: "longBlack",
    price: 2.5,
    qty: 1,
  },
  {
    id: "hd4",
    type: "hot",
    name: "Short Black",
    value: "shortBlack",
    price: 2.5,
    qty: 1,
  },
  {
    id: "hd5",
    type: "hot",
    name: "Flat White",
    value: "flatWhite",
    price: 2.5,
    qty: 1,
  },
  {
    id: "hd6",
    type: "hot",
    name: "Mocha",
    value: "mocha",
    price: 3.5,
    qty: 1,
  },
  {
    id: "hd7",
    type: "hot",
    name: "Hot Chocolate",
    value: "hotChocolate",
    price: 3.0,
    qty: 1,
  },
  { id: "hd8", type: "hot", name: "Tea", value: "tea", price: 2.5, qty: 1 },
  {
    id: "cd1",
    type: "cold",
    name: "Iced Latte",
    value: "icedLatte",
    price: 4.0,
    qty: 1,
  },
  {
    id: "cd2",
    type: "cold",
    name: "Iced Americano",
    value: "icedAmericano",
    price: 4.0,
    qty: 1,
  },
  {
    id: "cd3",
    type: "cold",
    name: "Iced Blue",
    value: "icedBlue",
    price: 3.5,
    qty: 1,
  },
  {
    id: "cd4",
    type: "cold",
    name: "Iced Mango",
    value: "icedMango",
    price: 3.5,
    qty: 1,
  },
  {
    id: "cd5",
    type: "cold",
    name: "Iced Watermelon",
    value: "icedWatermelon",
    price: 3.5,
    qty: 1,
  },
  {
    id: "cd6",
    type: "cold",
    name: "Iced Peach",
    value: "icedPeach",
    price: 3.5,
    qty: 1,
  },
  {
    id: "cd7",
    type: "cold",
    name: "Iced Chocolate",
    value: "icedChocolate",
    price: 3.5,
    qty: 1,
  },
  {
    id: "cd8",
    type: "cold",
    name: "Iced Mocha",
    value: "icedMocha",
    price: 4.5,
    qty: 1,
  },
  {
    id: "other1",
    type: "other",
    name: "Extra",
    value: "extra",
    price: 0.5,
    qty: 1,
  },
  {
    id: "other2",
    type: "other",
    name: "Coupon 25",
    value: "cp25",
    price: 25.0,
    qty: 1,
  },
  {
    id: "other3",
    type: "other",
    name: "Coupon 35",
    value: "cp35",
    price: 35.0,
    qty: 1,
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
  { label: "$ 0.1", amount: 0.1 },
  { label: "$ 3.5 CP", amount: 3.5 },
  { label: "$ 2.5 CP", amount: 2.5 },
];

const productRow = (product) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      key={product.id}
    >
      <__ItemText
        style={{
          width: "50%",
          paddingLeft: "1.5rem",
          borderBottom: "1px solid #2e3237",
          borderRight: "1px solid #2e3237",
        }}
      >
        {product.qty}
      </__ItemText>
      <__ItemText
        style={{
          width: "100%",
          paddingLeft: "1rem",
          borderBottom: "1px solid #2e3237",
          borderRight: "1px solid #2e3237",
        }}
      >
        {product.name}
      </__ItemText>
      <__ItemText
        style={{
          width: "50%",
          paddingLeft: "1rem",
          borderBottom: "1px solid #2e3237",
        }}
      >
        {product.price}
      </__ItemText>
    </div>
  );
};

const sumProp = (arr, key) => arr.reduce((a, b) => a + (b[key] || 0), 0);

function App() {
  const [order, setOrder] = useState([]);
  const [paid, setPaid] = useState([]);
  const [smallCouponPaidCount, setSmallCouponPaidCount] = useState(0);
  const [bigCouponPaidCount, setBigCouponPaidCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const logsCollectionRef = collection(db, "logs");
  useEffect(() => {
    const getLogs = async () => {
      const data = await getDocs(logsCollectionRef);
      setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getLogs();
  }, []);

  const todayDate = format(new Date(2014, 1, 11), "yyyy-MM-dd");

  const doneClickHandler = async () => {
    await addDoc(logsCollectionRef, {
      order: order,
      paid: paid,
      date: todayDate,
    });

    const data = await getDocs(logsCollectionRef);
    setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    setSmallCouponPaidCount(0);
    setBigCouponPaidCount(0);
    setPaid([]);
    setOrder([]);
  };

  const menuClickHandler = (e) => {
    if (!e?.target) {
      return;
    }

    const value = e.target.value;
    const menuItem = [menuItems.find((item) => item.value === value)];

    const result = Object.values(
      [...order, ...menuItem].reduce((acc, { id, type, name, price, qty }) => {
        acc[id] = {
          id,
          type,
          name,
          value,
          price: (acc[id] ? acc[id].price : 0) + price,
          qty: (acc[id] ? acc[id].qty : 0) + qty,
        };
        return acc;
      }, {})
    );

    setOrder(result);
  };

  const cashClickHandler = (e) => {
    if (!e?.target) {
      return;
    }

    const amount = parseFloat(e.target.value);
    const cashType = cashTypes.find((type) => type.amount === amount);

    if (amount === 2.5) {
      setSmallCouponPaidCount(smallCouponPaidCount + 1);
    }

    if (amount === 3.5) {
      setBigCouponPaidCount(bigCouponPaidCount + 1);
    }

    setPaid([...paid, cashType]);
  };

  const clearOrderClickHandler = (e) => {
    if (!e?.target) {
      return;
    }

    setOrder([]);
  };

  const logsClickHandler = () => {
    setIsLogsOpen(true);
  };

  const closeLogsClickHandler = () => {
    setIsLogsOpen(false);
  };

  const clearPaidClickHandler = (e) => {
    if (!e?.target) {
      return;
    }

    setSmallCouponPaidCount(0);
    setBigCouponPaidCount(0);
    setPaid([]);
  };

  const totalQty = sumProp(order, "qty");

  const totalPrice = sumProp(order, "price").toFixed(1);

  const totalPaid = sumProp(paid, "amount").toFixed(1);

  const totalChange = Math.max(0, totalPaid - totalPrice).toFixed(1);

  const menuButton = (menu) => {
    return (
      <__ButtonWrapper key={menu.id}>
        <__MenuButton
          type="button"
          value={menu.value}
          onClick={menuClickHandler}
        >
          <div style={{ pointerEvents: "none" }}>
            <span>{menu.name}</span>
            <span>{menu.price}</span>
          </div>
        </__MenuButton>
      </__ButtonWrapper>
    );
  };

  const cashButton = (cashType) => {
    return (
      <__ButtonWrapper key={cashType.label}>
        <__MenuButton
          type="button"
          value={cashType.amount}
          $bColor="#e6e6e6"
          onClick={cashClickHandler}
        >
          <div style={{ pointerEvents: "none" }}>{`${cashType.label} ${
            cashType.label === "$ 2.5 CP" ? `(${smallCouponPaidCount})` : ""
          } ${
            cashType.label === "$ 3.5 CP" ? `(${bigCouponPaidCount})` : ""
          }`}</div>
        </__MenuButton>
      </__ButtonWrapper>
    );
  };

  const todayLogs = logs.filter((log) => log.date === todayDate).reverse();

  return (
    <Fragment>
      <CssBaseline />
      {isLogsOpen ? (
        <__Container style={{ overflow: "hidden", height: "100vh" }}>
          <__ButtonWrapper style={{ justifyContent: "center" }}>
            <__MenuButton
              type="button"
              $bColor="#2e3237"
              onClick={closeLogsClickHandler}
              style={{
                width: "auto",
                margin: "16px",
                padding: "0",
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                  color: "#fff",
                  pointerEvents: "none",
                  backgroundColor: "#ed7777",
                  padding: "0 10px",
                  borderRadius: "5px",
                }}
              >
                Close Logs
              </div>
            </__MenuButton>
          </__ButtonWrapper>

          <__Card style={{ marginTop: "0", height: "100%", overflow: "auto" }}>
            <__CardContent style={{ display: "flex", fontSize: "16px" }}>
              {!!todayLogs.length ? (
                todayLogs.map((log) => (
                  <div key={log.id}>
                    {log.id} {console.log(log)}
                  </div>
                ))
              ) : (
                <div>No sales today :(</div>
              )}
            </__CardContent>
          </__Card>
        </__Container>
      ) : (
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
            <__Card style={{ marginTop: "0", flex: "1" }}>
              <__CardContent>
                <__Box>
                  <__ButtonGroup orientation="vertical">
                    {cashTypes.map((cashType) => cashButton(cashType))}
                  </__ButtonGroup>
                </__Box>
              </__CardContent>
            </__Card>
            <__Card style={{ marginTop: "0", marginLeft: "0", flex: "3" }}>
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
                  {order.map((product) => productRow(product))}
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
                      {totalQty}
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
                      {totalPrice}
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
                      {totalPaid}
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
                      {totalChange}
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
                <__MenuButton
                  type="button"
                  $bColor="#2e3237"
                  onClick={logsClickHandler}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      color: "#fff",
                      pointerEvents: "none",
                    }}
                  >
                    Logs
                  </div>
                </__MenuButton>
              </__ButtonWrapper>
              <__ButtonWrapper style={{ flexGrow: "1" }}>
                <__MenuButton
                  type="button"
                  $bColor="#f3e5f5"
                  onClick={clearOrderClickHandler}
                >
                  <div
                    style={{ justifyContent: "center", pointerEvents: "none" }}
                  >
                    Clear Order
                  </div>
                </__MenuButton>
              </__ButtonWrapper>
              <__ButtonWrapper style={{ flexGrow: "1" }}>
                <__MenuButton
                  type="button"
                  $bColor="#f3e5f5"
                  onClick={clearPaidClickHandler}
                >
                  <div
                    style={{ justifyContent: "center", pointerEvents: "none" }}
                  >
                    Clear Paid
                  </div>
                </__MenuButton>
              </__ButtonWrapper>
              <__ButtonWrapper style={{ flexGrow: "6" }}>
                <__MenuButton
                  type="button"
                  $bColor="#2e3237"
                  onClick={doneClickHandler}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      color: "#fff",
                      pointerEvents: "none",
                    }}
                  >
                    Done
                  </div>
                </__MenuButton>
              </__ButtonWrapper>
            </__CardContent>
          </__Card>
        </__Container>
      )}
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
  border: none !important;

  background-color: ${(p) =>
    p.$bColor ? `${p.$bColor} !important` : "#e3f2fd !important"};

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
