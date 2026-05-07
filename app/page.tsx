import { Hero } from "@/components/home/Hero";
import { CatalogoDestacado } from "@/components/home/CatalogoDestacado";
import { ConsolasDestacadas } from "@/components/home/ConsolasDestacadas";
import { SeccionServicios } from "@/components/home/SeccionServicios";
import { ReviewWall } from "@/components/home/ReviewWall";
import { SeccionUbicacion } from "@/components/home/SeccionUbicacion";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CatalogoDestacado />
      <ConsolasDestacadas />
      <SeccionServicios />
      <ReviewWall />
      <SeccionUbicacion />
    </>
  );
}
