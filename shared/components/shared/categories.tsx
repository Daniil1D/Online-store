"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}

// const cats = [
//     { id: 1, name: 'Мониторы'},
//     { id: 2, name: 'Мышки'},
//     { id: 3, name: 'Коврики'},
//     { id: 4, name: 'Наушники'},
//     { id: 5, name: 'Клавиатуры'},
// ]

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ name, id }, i) => (
        <a
          key={i}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl mx-5",
            categoryActiveId === id &&
              "bg-white shadow-md sgadow-gray-200 text-primary px-5"
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
