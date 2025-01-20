import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";

interface FormData {
  nombre: string;
  horario: string;
  carrito: string;
}

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://n8n.upcarrito.com/webhook/registro-carrito",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      
      toast({
        title: "¡Registro exitoso!",
        description: result.message || "Tu inscripción ha sido registrada.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al enviar los datos. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          {...register("nombre", { required: "El nombre es requerido" })}
          className={errors.nombre ? "border-red-500" : ""}
        />
        {errors.nombre && (
          <p className="text-sm text-red-500">{errors.nombre.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="horario">Horario</Label>
        <Select
          onValueChange={(value) => setValue("horario", value)}
          defaultValue={watch("horario")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un horario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10:00">10:00</SelectItem>
            <SelectItem value="12:00">12:00</SelectItem>
            <SelectItem value="14:00">14:00</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carrito">Carrito</Label>
        <Select
          onValueChange={(value) => setValue("carrito", value)}
          defaultValue={watch("carrito")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un carrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Carrito 1</SelectItem>
            <SelectItem value="2">Carrito 2</SelectItem>
            <SelectItem value="3">Carrito 3</SelectItem>
            <SelectItem value="4">Carrito 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar inscripción"
        )}
      </Button>
    </form>
  );
};