import { FadeIn, Pulse } from '@/components/animation'
import { Button } from '@/components/ui/button'
import React from 'react'

const ContactUs = () => {
  return (
    <section id="contact" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <FadeIn fullWidth>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Have questions or need assistance? Reach out to our support team.
                </p>
              </div>
            </FadeIn>

            <FadeIn fullWidth direction="up">
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
  )
}

export  {ContactUs}
