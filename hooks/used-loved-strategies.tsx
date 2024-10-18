import { toast } from "@/components/ui/use-toast";
import { Strategy } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseLovedStrategiesType {
  lovedItems: Strategy[];
  addLoveItem: (data: Strategy) => void;
  removeLovedItem: (id: string) => void;
}

export const useLovedStrategies = create(
  persist<UseLovedStrategiesType>(
    (set, get) => ({
      lovedItems: [],
      addLoveItem: (data: Strategy) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(
          (item) => item.id === data.id
        );

        if (existingItem) {
          return toast({
            title: "Ya has añadido esta estrategia a tu lista de favoritos",
          });
        }

        set({
          lovedItems: [...get().lovedItems, data],
        });

        toast({ title: "Estrategia añadido a tu lista de favoritos" });
      },

      removeLovedItem: (id: string) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)],
        });
        toast({ title: "Estrategia eliminada de tu lista de favoritos" });
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);