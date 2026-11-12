"use client";

import { useEffect } from "react";
import { initPortfolioInteractions } from "@/lib/portfolio-interactions";
import { initProjectInteractions } from "@/lib/project-interactions";

export default function PortfolioClientEffects() {
  useEffect(() => {
    initPortfolioInteractions();
    initProjectInteractions();
  }, []);

  return null;
}
