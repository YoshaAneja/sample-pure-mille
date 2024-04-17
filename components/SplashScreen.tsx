"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SplashScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // whatever you need to do
    setLoading(false);
  }, []);

  return !loading ? (
    children
  ) : (
    <div className="h-screen flex items-center justify-center">
      <Image
        src={"/pure_mille_splash_screen.gif"}
        width={300}
        height={300}
        alt="Pure Mille"
        // unoptimized={true}
      />
    </div>
  );
};

export default SplashScreen;
