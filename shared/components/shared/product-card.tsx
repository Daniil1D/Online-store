import React from "react";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";

import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn("border-[1px] border-black p-4 rounded-lg h-full flex flex-col", className)}>
      <Link href={`/product/${id}`} className="h-full flex flex-col">
          <div className="flex justify-center p-6 bg-white rounded-lg h-[200px]">
            <img className="bg-gradient-to-bl" src={imageUrl} alt={name} />
          </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <div className="flex-grow"></div> {/* Растягивает пространство между заголовком и ценой */}

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus className="w-5 h-5 mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>

  );
};
