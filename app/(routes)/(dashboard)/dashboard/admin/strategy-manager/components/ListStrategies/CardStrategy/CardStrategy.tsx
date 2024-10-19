"use client";

import Image from "next/image";
import { Trash, Upload, FolderKanban  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { CardStrategyProps } from "./CardStrategy.types";
import { ButtonEditStrategy } from "./ButtonEditStrategy";

export function CardStrategy(props: CardStrategyProps) {
  const { strategy, onSelectStrategy } = props;
  const router = useRouter();

  const deleteStrategy = async () => {
    try {
      await axios.delete(`/api/strategy/${strategy.id}`);
      toast({
        title: "Estrategia eliminado correctamente",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al eliminar la estrategia " + error,
        variant: "destructive",
      });
    }
  };

  const handlePublicStrategy = async (publiC: boolean) => {
    try {
      await axios.patch(`/api/strategy/${strategy.id}`, { isPublic: publiC });
      if (publiC) {
        toast({
          title: "Estrategia publicado correctamente",
        });
      } else {
        toast({
          title: "Estrategia despublicado correctamente",
        });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Error al publicar la Estrategia " + error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg">
      <Image
        src={strategy.photo}
        alt={strategy.name}
        width={400}
        height={600}
        className="rounded-t-lg"
      />
      {strategy.isPublic ? (
        <div className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Publicado
        </div>
      ) : (
        <div className="absolute top-0 right-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          No publicado
        </div>
      )}

      <div className="p-3">
        <div className="mb-4 gap-x-4">
          <p className="flex items-center text-xl min-h-16 lg:min-h-fit font-bold">
            {strategy.name}
          </p>
        </div>

        <div className="mb-4 gap-x-4">
          <p className="flex items-center text-xl min-h-16 lg:min-h-fit">
            {strategy.description}
          </p>
        </div>

        <div className="flex justify-between mt-3 gap-x-4 ">
          <Button
            className="text-white bg-red-500 "
            variant="outline"
            onClick={deleteStrategy}
          >
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          <ButtonEditStrategy strategyData={strategy} />
        </div>

        <Button
          className="w-full mt-3 text-white bg-orange-400"
          variant="outline"
          onClick={() => onSelectStrategy(strategy)}
        >
          Gestionar parametros
          <FolderKanban className="w-4 h-4 ml-2" />
        </Button>

        {strategy.isPublic ? (
          <Button
            className="w-full mt-3 text-white bg-slate-800"
            variant="outline"
            onClick={() => handlePublicStrategy(false)}
          >
            No publicar
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="w-full mt-3 text-white bg-slate-800"
            variant="outline"
            onClick={() => handlePublicStrategy(true)}
          >
            Publicar
            <Upload className="w-4 h-4 ml-2 " />
          </Button>
        )}
      </div>
    </div>
  );
}
