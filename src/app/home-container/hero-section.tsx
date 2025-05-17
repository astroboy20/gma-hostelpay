import { FadeIn, Float, Pulse } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center w-full">
      <FadeIn fullWidth direction="right">
        <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Simplify Your{" "}
          <span className="text-blue-600">Hostel Payment</span> Process
        </h1>
        <p className="text-lg text-gray-600">
          Select and pay for your hostel accommodation online with just a
          few clicks. No more long queues or paperwork.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register">
            <Pulse>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Pulse>
          </Link>
          <Link href="#how-it-works">
            <Button
            size="lg"
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
            Learn More
            </Button>
          </Link>
        </div>
        </div>
      </FadeIn>
      <FadeIn fullWidth direction="left">
        <Float yOffset={8} duration={3}>
        <div className=" h-[400px] w-full">
          <Image
            key="hero-image"
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="University campus with students"
            width={500}
            height={400}
            className="rounded-lg shadow-xl object-cover w-full h-full"
          />
        </div>
        </Float>
      </FadeIn>
    </div>
    </section>
  );
};

export { HeroSection };
