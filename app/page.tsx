"use client";

import Link from "next/link";
import "./home.scss";
import { Fuel } from "fuels";
import { defaultConnectors } from "@fuels/connectors";
import { useEffect } from "react";

const fuel = new Fuel({
  connectors: defaultConnectors({ devMode: true }),
});

export default function Home() {
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await fuel.isConnected();
      if (isConnected) {
        // Do something if connected
      }
      console.log(isConnected);
    };

    checkConnection();
  }, []);

  return <>home</>;
}
