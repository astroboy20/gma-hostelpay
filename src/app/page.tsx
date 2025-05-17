import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, Building, CreditCard, User } from "lucide-react"
import { Logo } from "@/components/logo"
import { FadeIn, Float, Pulse, StaggerContainer, StaggerItem } from "@/components/animation"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Pulse>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Login
                </Button>
              </Pulse>
            </Link>
            <Link href="/auth/register">
              <Pulse>
                <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
              </Pulse>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <FadeIn direction="right">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Simplify Your <span className="text-blue-600">Hostel Payment</span> Process
                </h1>
                <p className="text-lg text-gray-600">
                  Select and pay for your hostel accommodation online with just a few clicks. No more long queues or
                  paperwork.
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
                    <Button size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <Float yOffset={8} duration={3}>
                <div className="relative h-[400px]">
                  <Image
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

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our platform offers a seamless experience for students to manage their accommodation needs.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-8">
                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Student Dashboard</h3>
                    <p className="text-gray-600">
                      Access your personal information, view your current hostel, and manage your accommodation
                      preferences.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Hostel Selection</h3>
                    <p className="text-gray-600">
                      Browse available hostels, view details, and select the one that best suits your preferences.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payments</h3>
                    <p className="text-gray-600">
                      Make secure online payments for your hostel accommodation with multiple payment options.
                    </p>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Follow these simple steps to secure your hostel accommodation.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-4 gap-8">
              <FadeIn delay={0.1}>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Register</h3>
                  <p className="text-gray-600">Create an account with your student details.</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Browse Hostels</h3>
                  <p className="text-gray-600">View available hostels and their details.</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Select Hostel</h3>
                  <p className="text-gray-600">Choose your preferred hostel accommodation.</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Make Payment</h3>
                  <p className="text-gray-600">Complete your payment securely online.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Testimonials</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Hear what our users have to say about their experience with our platform.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-8">
                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
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
                      "This platform made my hostel registration process so much easier. I was able to select and pay
                      for my accommodation in minutes!"
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
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
                      "No more standing in long queues! The online payment system is secure and the dashboard is very
                      user-friendly."
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
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
                        <p className="text-sm text-gray-500">Business Administration</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      "The platform is intuitive and the support team is very responsive. I highly recommend it to all
                      students."
                    </p>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Have questions or need assistance? Reach out to our support team.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up">
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Pulse>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                  </Pulse>
                </form>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="footer" />
              </div>
              <p className="text-gray-400">Simplifying hostel accommodation payments for students.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-gray-400 hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@hostelpay.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: University Campus, Main Building</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HostelPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
