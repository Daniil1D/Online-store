import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="Logo"
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
      />
    </div>
  );
};
