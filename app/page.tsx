'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return <div className="grid grid-cols-4 gap-4 p-5">
    <Button onClick={() => router.push('/scroll-trigger-1')}>Scroll Trigger Animation 1</Button>
    <Button onClick={() => router.push('/scroll-trigger-2')}>Scroll Trigger Animation 2</Button>
    <Button onClick={() => router.push('/scroll-trigger-3')}>Scroll Trigger Animation 3</Button>
    <Button onClick={() => router.push('/scroll-trigger-4')}>Scroll Trigger Animation 4</Button>
    <Button onClick={() => router.push('/scroll-trigger-5')}>Scroll Trigger Animation 5</Button>
    <Button onClick={() => router.push('/scroll-trigger-6')}>Scroll Trigger Animation 6</Button>
    <Button onClick={() => router.push('/scroll-trigger-7')}>Scroll Trigger Animation 7</Button>
    <Button onClick={() => router.push('/scroll-trigger-video-8')}>Scroll Trigger Animation 8</Button>
    <Button onClick={() => router.push('/scroll-trigger-9')}>Scroll Trigger Animation 9</Button>
    <Button onClick={() => router.push('/scroll-trigger-10')}>Scroll Trigger Animation 10</Button>
    <Button onClick={() => router.push('/motion-1')}>Motion 1</Button>
    <Button onClick={() => router.push('/motion-2')}>Motion 2</Button>
    <Button onClick={() => router.push('/step-1')}>Step 1</Button>
    <Button onClick={() => router.push('/nature')}>Nature</Button>
  </div>;
}