import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <p className="font-bold text-green-500">Hello Auth</p>
      <Button className="ms-1" variant={"destructive"} size={"lg"}>Hello</Button>
    </>
  );
}
