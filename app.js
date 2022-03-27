const express = require("express");
const path = require("path");
const { v4 } = require("uuid");

//import express from "express";
//import { path } from "express/lib/application";

const app = express();

let CONTACTS = [{ ib: v4(), name: "Lev", value: "123456", marked: true }];

app.use(express.json());
//GET
app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});
//POST
app.post("/api/contacts", (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

//DELETE
app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: "contact deleted" });
});

//PUT
app.put("/api/contacts/:id", (req, res) => {
  const ind = CONTACTS.findIndex((c) => c.id === req.params.id);
  console.log(req.body);
  CONTACTS[ind] = req.body;
  res.json(CONTACTS[ind]);
});

app.use(
  // - если на один порт
  express.static(path.resolve(__dirname, "client"))
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(5000, () => console.log("Start"));
