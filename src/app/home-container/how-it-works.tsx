import { FadeIn } from "@/components/animation";
import React from "react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <FadeIn fullWidth>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to secure your hostel accommodation.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-8">
          <FadeIn fullWidth delay={0.1}>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Register</h3>
              <p className="text-gray-600">
                Create an account with your student details.
              </p>
            </div>
          </FadeIn>

          <FadeIn fullWidth delay={0.2}>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Browse Hostels
              </h3>
              <p className="text-gray-600">
                View available hostels and their details.
              </p>
            </div>
          </FadeIn>

          <FadeIn fullWidth delay={0.3}>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Select Hostel
              </h3>
              <p className="text-gray-600">
                Choose your preferred hostel accommodation.
              </p>
            </div>
          </FadeIn>

          <FadeIn fullWidth delay={0.4}>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Make Payment
              </h3>
              <p className="text-gray-600">
                Complete your payment securely online.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export { HowItWorks };
