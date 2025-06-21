import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";
import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn fullWidth>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Student Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our users have to say about their experience with our
              platform.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="h-auto">
          <div className="grid md:grid-cols-3 gap-8 ">
            <StaggerItem>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                      alt="John Doe"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-500">Computer Science</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "This platform made my hostel registration process so much
                  easier. I was able to select and pay for my accommodation in
                  minutes!"
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="h-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                      alt="Jane Smith"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Smith</h4>
                    <p className="text-sm text-gray-500">Engineering</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "No more standing in long queues! The online payment system is
                  secure and the dashboard is very user-friendly."
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="h-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                      alt="Michael Johnson"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Johnson</h4>
                    <p className="text-sm text-gray-500">
                      Business Administration
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The platform is intuitive and the support team is very
                  responsive. I highly recommend it to all students."
                </p>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export { Testimonials };
