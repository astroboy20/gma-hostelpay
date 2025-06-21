import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";
import { User, Building, CreditCard } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 ">
        <FadeIn fullWidth>
          <div className="mx-auto text-center flex flex-col mb-16 w-full ">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 ">Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers a seamless experience for students to manage
              their accommodation needs.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="h-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Student Dashboard
                </h3>
                <p className="text-gray-600">
                  Access your personal information, view your current hostel,
                  and manage your accommodation preferences.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="h-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Hostel Selection
                </h3>
                <p className="text-gray-600">
                  Browse available hostels, view details, and select the one
                  that best suits your preferences.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem className="h-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Secure Payments
                </h3>
                <p className="text-gray-600">
                  Make secure online payments for your hostel accommodation with
                  multiple payment options.
                </p>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export { Features };
